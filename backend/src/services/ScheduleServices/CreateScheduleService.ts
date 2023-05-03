import dayjs from "dayjs";
import ObjectSupport from "dayjs/plugin/objectSupport";
import schedule from "node-schedule";

import ShowContactService from "../ContactServices/ShowContactService";
import FindOrCreateTicketService from "../TicketServices/FindOrCreateTicketService";
import UpdateTicketService from "../TicketServices/UpdateTicketService";
import SendWhatsAppMedia from "../WbotServices/SendWhatsAppMedia";
import SendWhatsAppMessage from "../WbotServices/SendWhatsAppMessage";

import GetDefaultWhatsApp from "../../helpers/GetDefaultWhatsApp";
import { getIO } from "../../libs/socket";
import Contact from "../../models/Contact";
import Schedule from "../../models/Schedule";
import Ticket from "../../models/Ticket";

interface ScheduleData {
  user: {
    id: string;
  };
  body: string;
  contacts: string[];
  time: string;
  date: string;
  medias: Express.Multer.File[];
}

interface Request {
  scheduleData: ScheduleData;
}

interface MessageInfos {
  body?: string;
  medias?: Express.Multer.File[];
  tickets: Ticket[];
}

async function sendAllMessages({ body = "", medias, tickets }: MessageInfos) {
  return Promise.all(
    tickets.map(async ticket => {
      if (medias) {
        return Promise.all(
          medias.map(async (media: Express.Multer.File) => {
            SendWhatsAppMedia({ media, ticket, scheduled: true });
          })
        );
      }
      return SendWhatsAppMessage({ body, ticket });
    })
  );
}

async function CreateScheduleService({
  scheduleData
}: Request): Promise<Schedule | void> {
  dayjs.extend(ObjectSupport);
  let sent: boolean | undefined;
  let job: schedule.Job | undefined;

  const { user, body, medias, time, date, contacts } = scheduleData;
  const [hour, minute] = time.split(":");
  const fullDate = dayjs(date);
  const io = getIO();

  const whatsapp = await GetDefaultWhatsApp(+user.id);

  const tickets = await Promise.all(
    contacts.map(async contact => {
      const contactById = await ShowContactService(contact);
      const groupContact = contactById.isGroup ? contactById : undefined;
      const ticketFound = await FindOrCreateTicketService(
        contactById,
        whatsapp.id,
        0,
        groupContact
      );
      const { ticket } = await UpdateTicketService({
        ticketData: { status: "open" },
        ticketId: ticketFound.id
      });
      return ticket;
    })
  );

  const ruler = new schedule.RecurrenceRule();
  ruler.date = fullDate.get("date");
  ruler.month = fullDate.get("month");
  ruler.year = fullDate.get("year");
  ruler.hour = +hour;
  ruler.minute = +minute;
  ruler.second = 1;
  ruler.tz = "America/Fortaleza";

  const strFormat = "YYYY-MM-DD HH:mm";
  const nowDate = dayjs();
  const nowRuler = dayjs({
    year: ruler.year,
    date: ruler.date,
    month: ruler.month,
    hour: ruler.hour,
    minute: ruler.minute
  });

  console.log({
    year: ruler.year,
    date: ruler.date,
    month: ruler.month,
    hour: ruler.hour,
    minute: ruler.minute
  });

  if (nowDate.format(strFormat) === nowRuler.format(strFormat)) {
    await sendAllMessages({ body, medias, tickets });
    sent = true;
  } else {
    job = schedule.scheduleJob(nowDate.toISOString(), ruler, async fireDate => {
      console.log("Sent -->", fireDate);
      await sendAllMessages({ body, medias, tickets });
      await Schedule.update(
        {
          sent: true
        },
        {
          where: { name: nowDate.toISOString() }
        }
      );

      const scheduleDB = await Schedule.findOne({
        where: { name: nowDate.toISOString() },
        attributes: ["id", "body", "date", "mediaType", "sent", "name"],
        include: [
          {
            model: Contact,
            attributes: ["id", "name"]
          }
        ]
      });

      io.emit("schedules", {
        action: "update",
        schedule: scheduleDB
      });
    });

    if (!job) throw new Error("It was not possible schedule message");
  }

  const newSchedule = await Schedule.create(
    {
      body,
      sent,
      date: nowRuler.format(strFormat),
      name: job?.name || nowDate.format(strFormat),
      mediaType: medias ? "file" : "chat"
    },
    {
      include: [
        {
          model: Contact,
          attributes: ["id", "name"]
        }
      ]
    }
  );

  if (!newSchedule) {
    throw new Error("ERR_CREATING_MESSAGE");
  }

  await newSchedule.$set("contacts", contacts);
  await newSchedule.reload({
    attributes: ["id", "body", "date", "mediaType", "sent", "name"],
    include: [
      {
        model: Contact,
        attributes: ["id", "name"]
      }
    ]
  });

  io.emit("schedules", {
    action: "create",
    schedule: newSchedule
  });

  return newSchedule;
}

export default CreateScheduleService;

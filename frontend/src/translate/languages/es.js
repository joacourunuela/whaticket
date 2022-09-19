const messages = {
  es: {
    translations: {
      signup: {
        title: "Registro",
        toasts: {
          success:
            "¡El usuario ha sido creado satisfactoriamente! ¡Ahora inicia sesión!",
          fail: "Error creando el usuario. Verifica la data reportada.",
        },
        form: {
          name: "Nombre",
          email: "Correo Electrónico",
          password: "Contraseña",
        },
        buttons: {
          submit: "Regístrate",
          login: "¿Ya tienes una cuenta? ¡Inicia sesión!",
        },
      },
      login: {
        title: "Inicio de Sesión",
        form: {
          email: "Correo Electrónico",
          password: "Contraseña",
        },
        buttons: {
          submit: "Ingresa",
          register: "¿No tienes cuenta? ¡Regístrate!",
        },
      },
      auth: {
        toasts: {
          success: "¡Inicio de sesión exitoso!",
        },
      },
      dashboard: {
        title: "Dashboard",
        file: "Archivo",
        charts: {
          perDay: {
            title: "Tickets hoy: ",
            calls: "Iiamadas"
          },
        },
        messages: {
          inAttendance: {
            title: "En servicio"
          },
          waiting: {
            title: "Esperando"
          },
          closed: {
            title: "Finalizado"
          },
          imported: {
            title: "Importado"
          },
          sent: {
            title: "Enviado"
          },
          handedOut: {
            title: "Entregado"
          },
          read: {
            title: "Leer"
          },
          mistake: {
            title: "Errors"
          }
        }
      },
      connections: {
        title: "Conexiones",
        toasts: {
          deleted:
            "¡La conexión de WhatsApp ha sido borrada satisfactoriamente!",
        },
        confirmationModal: {
          deleteTitle: "Borrar",
          deleteMessage: "¿Estás seguro? Este proceso no puede ser revertido.",
          disconnectTitle: "Desconectar",
          disconnectMessage: "Estás seguro? Deberá volver a leer el código QR",
        },
        buttons: {
          add: "Agrega WhatsApp",
          disconnect: "Desconectar",
          tryAgain: "Inténtalo de nuevo",
          qrcode: "QR CODE",
          newQr: "Nuevo QR CODE",
          connecting: "Conectando",
        },
        toolTips: {
          disconnected: {
            title: "No se pudo iniciar la sesión de WhatsApp",
            content:
              "Asegúrese de que su teléfono celular esté conectado a Internet y vuelva a intentarlo o solicite un nuevo código QR",
          },
          qrcode: {
            title: "Esperando la lectura del código QR",
            content:
              "Haga clic en el botón 'CÓDIGO QR' y lea el Código QR con su teléfono celular para iniciar la sesión",
          },
          connected: {
            title: "Conexión establecida",
          },
          timeout: {
            title: "Se perdió la conexión con el teléfono celular",
            content:
              "Asegúrese de que su teléfono celular esté conectado a Internet y que WhatsApp esté abierto, o haga clic en el botón 'Desconectar' para obtener un nuevo código QR",
          },
        },
        table: {
          name: "Nombre",
          status: "Estado",
          lastUpdate: "Última Actualización",
          default: "Por Defecto",
          actions: "Acciones",
          session: "Sesión",
          quality: "Calidad",
          limit: "Límite"
        },
      },
      officialConnections: {
        title: "Conexiones Oficiales",
      },
      officialWhatsappModal: {
        title:{
        add:"Agregar Whatsapp Oficial",
        edit: "Para Editar WhatsApp Oficial",
        labelNumber: "Número de teléfono",
        labelToken: "Ficha de autenticación de Facebook",
        labelId: "Identificación de teléfono de Facebook",
        labelBusiness: "Identificación Comercial de Facebook",
        greetingMessage: "Mensaje de Saludo",
        farewellMessage: "Mensaje de Despedida",
        },
        buttons: {
          cancel: "Cancelar",
          testConnection: "Testar Conexion",
          add: "Agregar",
        },
      },

      whatsappModal: {
        title: {
          add: "Agrega WhatsApp",
          edit: "Edita WhatsApp",
        },
        form: {
          name: "Nombre",
          default: "Por Defecto",
          farewellMessage: "Farewell Message",
        },
        buttons: {
          okAdd: "Agregar",
          okEdit: "Guardar",
          cancel: "Cancelar",
        },
        success: "WhatsApp guardado satisfactoriamente.",
      },
      qrCode: {
        message: "Lée el código QR para empezar la sesión.",
      },
      contacts: {
        title: "Contactos",
        toasts: {
          deleted: "¡Contacto borrado satisfactoriamente!",
        },
        searchPlaceholder: "Buscar...",
        confirmationModal: {
          deleteTitle: "Borrar",
          importTitlte: "Importar contactos",
          deleteMessage:
            "¿Estás seguro que deseas borrar este contacto? Todos los tickets relacionados se perderán.",
          importMessage:
            "¿Quieres importar todos los contactos desde tu teléfono?",
        },
        buttons: {
          import: "Importar Contactos",
          add: "Agregar Contacto",
        },
        table: {
          name: "Nombre",
          whatsapp: "WhatsApp",
          email: "Correo Electrónico",
          actions: "Acciones",
        },
      },
      contactModal: {
        title: {
          add: "Agregar contacto",
          edit: "Editar contacto",
        },
        form: {
          mainInfo: "Detalles del contacto",
          extraInfo: "Información adicional",
          name: "Nombre",
          number: "Número de Whatsapp",
          email: "Correo Electrónico",
          extraName: "Nombre del Campo",
          extraValue: "Valor",
        },
        buttons: {
          addExtraInfo: "Agregar información",
          okAdd: "Agregar",
          okEdit: "Guardar",
          cancel: "Cancelar",
        },
        success: "Contacto guardado satisfactoriamente.",
      },
      quickAnswersModal: {
        title: {
          add: "Agregar respuesta rápida",
          edit: "Editar respuesta rápida",
        },
        form: {
          shortcut: "Atajo",
          message: "Respuesta rápida",
        },
        buttons: {
          okAdd: "Agregar",
          okEdit: "Guardar",
          cancel: "Cancelar",
        },
        success: "Respuesta rápida guardada correctamente.",
      },
      queueModal: {
        title: {
          add: "Agregar cola",
          edit: "Editar cola",
        },
        form: {
          name: "Nombre",
          color: "Color",
          greetingMessage: "Mensaje de saludo",
        },
        buttons: {
          okAdd: "Añadir",
          okEdit: "Ahorrar",
          cancel: "Cancelar",
        },
      },
      userModal: {
        title: {
          add: "Agregar usuario",
          edit: "Editar usuario",
        },
        form: {
          name: "Nombre",
          email: "Correo Electrónico",
          password: "Contraseña",
          profile: "Perfil",
          language: "Language",
          languages: {
            pt: "Portuguese",
            en: "English",
            es: "Spanish",
          },
        },
        buttons: {
          okAdd: "Agregar",
          okEdit: "Guardar",
          cancel: "Cancelar",
        },
        success: "Usuario guardado satisfactoriamente.",
      },
      chat: {
        noTicketMessage: "Selecciona un ticket para empezar a chatear.",
      },
      ticketsManager: {
        buttons: {
          newTicket: "Nuevo",
        },
      },
      ticketsQueueSelect: {
        placeholder: "Linhas",
      },
      tickets: {
        toasts: {
          deleted: "El ticket en el que estabas ha sido borrado.",
        },
        notification: {
          message: "Mensaje de",
        },
        tabs: {
          open: { title: "Bandeja" },
          closed: { title: "Resueltos" },
          search: { title: "Buscar" },
        },
        search: {
          placeholder: "Buscar tickets y mensajes.",
        },
        buttons: {
          showAll: "Todos",
        },
      },
      transferTicketModal: {
        title: "Transferir Ticket",
        fieldLabel: "Escriba para buscar usuarios",
        fieldQueueLabel: "Transferir a la cola",
        fieldQueuePlaceholder: "Seleccione una cola",
        noOptions: "No se encontraron usuarios con ese nombre",
        buttons: {
          ok: "Transferir",
          cancel: "Cancelar",
        },
      },
      ticketsList: {
        pendingHeader: "Cola",
        assignedHeader: "Trabajando en",
        noTicketsTitle: "¡Nada acá!",
        noTicketsMessage:
          "No se encontraron tickets con este estado o término de búsqueda",
        buttons: {
          accept: "Acceptar",
        },
      },
      newTicketModal: {
        title: "Crear Ticket",
        fieldLabel: "Escribe para buscar un contacto",
        add: "Añadir",
        buttons: {
          ok: "Guardar",
          cancel: "Cancelar",
        },
      },
      mainDrawer: {
        listItems: {
          dashboard: "Dashboard",
          template: "Plantilla",
          tickets: "Tickets",
          contacts: "Contactos",
          quickAnswers: "Respuestas rápidas",
          importation: "Importar",
          queues: "Linhas",
          administration: "Administración",
          users: "Usuarios",
          settings: "Configuración",
          reportsTalk: "Informe de Conversación",
          reportsTicket: "Informe de entradas",
          logReports: "Informes de Registro",
          reports: "Informes",
          whatsOff: "WhatsApp",
          whatsNoOff: "WhatsApp 2",
          company: "Compañías",
          menus: "Menus",
        },
        whatsApp: {
          connections: "Conexiones",
          officialConnections: "Conexiones",
          settings: "Configuración",
        },

        appBar: {
          user: {
            profile: "Perfil",
            logout: "Cerrar Sesión",
          },
        },
      },
      notifications: {
        noTickets: "Sin notificaciones.",
      },
      queues: {
        title: "Linhas",
        table: {
          name: "Nombre",
          color: "Color",
          greeting: "Mensaje de saludo",
          actions: "Comportamiento",
        },
        buttons: {
          add: "Agregar cola",
        },
        confirmationModal: {
          deleteTitle: "Eliminar",
          deleteMessage:
            "¿Estás seguro? ¡Esta acción no se puede revertir! Los tickets en esa cola seguirán existiendo, pero ya no tendrán ninguna cola asignada.",
        },
      },
      queueSelect: {
        inputLabel: "Linhas",
      },
      quickAnswers: {
        title: "Respuestas rápidas",
        table: {
          shortcut: "Atajo",
          message: "Respuesta rápida",
          actions: "Acciones",
        },
        buttons: {
          add: "Agregar respuesta rápida",
        },
        toasts: {
          deleted: "Respuesta rápida eliminada correctamente",
        },
        searchPlaceholder: "Buscar ...",
        confirmationModal: {
          deleteTitle:
            "¿Está seguro de que desea eliminar esta respuesta rápida?",
          deleteMessage: "Esta acción no se puede deshacer.",
        },
      },
      importation: {
        title: "Importar",
        form: {
          status: "Estado",
          date: "Fecha",
        },
        buttons: {
          import: "Fotos Importadas",
          filter: "Filtrar",
        },
        table: {
          uploadDate: "Fecha de Carga",
          fileName: "Nombre del Archivo",
          sentBy: "Enviado Por",
          numberOfRecords: "Número de Registros",
          status: "Estado",
          official: "Oficial",
          actions: "Comportamiento",
        },
        registryModal:{
          title: "Registros",
          id: "Id",
          name: "Nombre",
          template: "Template",
          message: "Mensaje",
          phoneNumber: "Número de Teléfono",
          documentNumber: "Número del Documento",
          cancel: "Cancelar",
          refuse: "Rechazar",
          approve: "Aprobar",
        },
      },
      importModal: {
        title: "Importar",
        buttons: {
          uploadFile: "Importar Archivo",
          cancel: "Cancelar",
          import: "Importar",
        },
        form: {
          shotType: "Tipo de Disparo",
          official: "Oficial",
          notOfficial: "No Oficial",
          noFile: "Sin Archivos Importados",
          uploadedFile: "Archivo Importado",
          supportedTriggerModel: "Modelo de Disparo Compatible",
          connection:"Conexión",
          selectAConnection: "Seleccione una Conexión",
          show: "Mostrar",
          toHide: "Esconder"
        },
      },
      users: {
        title: "Usuarios",
        table: {
          name: "Nombre",
          email: "Correo Electrónico",
          profile: "Perfil",
          actions: "Acciones",
        },
        buttons: {
          add: "Agregar usuario",
        },
        toasts: {
          deleted: "Usuario borrado satisfactoriamente.",
        },
        confirmationModal: {
          deleteTitle: "Borrar",
          deleteMessage:
            "Toda la información del usuario se perderá. Los tickets abiertos de los usuarios se moverán a la cola.",
        },
      },
      settings: {
        success: "Configuración guardada satisfactoriamente.",
        title: "Configuración",
        settings: {
          userCreation: {
            name: "Creación de usuarios",
            options: {
              enabled: "Habilitado",
              disabled: "Deshabilitado",
            },
          },
        },
      },
      reports: {
        title: "Informes",
        buttons: {
          filter: "Filtrar informes",
          exportPdf: "Export PDF",
        },
        form: {
          initialDate: "Fecha inicial",
          finalDate: "Fecha final",
          user: "Usuario",
        },
        table: {
          messageId: "Message ID",
          messageBody: "Message Body",
          read: "Read",
          mediaURL: "Media URL",
          ticketId: "Ticket ID",
          date: "Date",
        }
      },
      reportsTicket: {
        title: "Reports Ticket",
      },
      messagesList: {
        header: {
          assignedTo: "Asignado a:",
          buttons: {
            return: "Devolver",
            resolve: "Resolver",
            reopen: "Reabrir",
            accept: "Aceptar",
          },
        },
      },
      messagesInput: {
        placeholderOpen: "Escriba un mensaje o presione '' / '' para usar las respuestas rápidas registradas",
        placeholderClosed:
          "Vuelva a abrir o acepte este ticket para enviar un mensaje.",
        signMessage: "Firmar",
      },
      contactDrawer: {
        header: "Detalles del contacto",
        buttons: {
          edit: "Editar contacto",
        },
        extraInfo: "Otra información",
      },
      ticketOptionsMenu: {
        delete: "Borrar",
        transfer: "Transferir",
        confirmationModal: {
          title: "¿Borrar ticket #",
          titleFrom: "del contacto ",
          message:
            "¡Atención! Todos los mensajes Todos los mensajes relacionados con el ticket se perderán.",
        },
        buttons: {
          delete: "Borrar",
          cancel: "Cancelar",
        },
      },
      confirmationModal: {
        buttons: {
          confirm: "Ok",
          cancel: "Cancelar",
        },
      },
      messageOptionsMenu: {
        delete: "Borrar",
        reply: "Responder",
        confirmationModal: {
          title: "¿Borrar mensaje?",
          message: "Esta acción no puede ser revertida.",
        },
      },
      templates: {
          title: "Plantilla",
          table:{
            name: "Nombre",
            preview: "Avance",
            category: "Categoría",
            classification: "Clasificación",
            language: "Idioma",
            status: "Estado",
            action: "Comportamiento"
          },
          buttons:{
            newTemplate: "Nueva Plantilla",
            cancel: "Cancelar",
            add: "Agregar",
            connection: "Conexiones"
          },
          templateModal:{
            title: "Nueva Plantilla",
            name: "Nombre",
            category: "Categoría",
            body: "Cuerpo",
            footer: "Zócalo",
            connection: "Conexiones",
            transactional: "Transaccional",
            marketing: "Marketing",
            edit: "Para Editar",
            cancel: "Cancelar",
            success: "¡Plantilla creada con éxito!",
            connectionFailed: "¡Seleccione una conexión!",
            delete: "¡Plantilla eliminada con éxito!",
            toastErr: "¡Límite de parámetro excedido!"
          },
        },
        logReport:{
          title: "Informes de Registro",
          select:{
            file: "Archivo",
            status: "Estado",
            all: "Todos",
            sent: "Enviado",
            delivered: "Repartido",
            read: "Leer",
            errors: "Errores",
          },
          buttons:{
            createPdf: "Crea Pdf",
            exportPdf:  "Exportar Pdf",
            previous: "Anterior",
            next: "Siguinte",
            page: "Página: " ,
          },
          grid:{
            name: "Nombre",
            sent: "Enviado",
            delivered: "Repartido",
            read: "Leer",
            errors: "Errores"
          },
        },

        settingsWhats:{
          title: "Configuración",
          triggerTime: "Tiempo de activación entre instancias",
          connections: "conexiones",
          all: "Todos",
      },

      historicTicket:{
        button: "Histórico",
      historicModal:{
        title: "Histórico",
        name: "Nombre",
        message: "Mensaje",
        status: "Estado",
        createAt: "Fecha de Creación",
        actions: "Comportamiento",
        closed: "Cerca",
        back: "Regresar"
        },
      },

      company:{
        title: "Compañías",
        search: "Búsqueda",
          grid:{
          companyId: "ID de la Compañía",
          name: "Nombres",
          cnpj: "CNPJ",
          phone: "Teléfono",
          email: "Email",
          address:  "Endereço",
          actions: "Acción"
          },
          buttons: {
            addCompany: "Registrar Compañía"
          },
          companyModal: {
            titleAdd: "Añadir Compañía",
            titleEdit: "Editar Registro de Compañía",
            name: "Nombre da Compañía",
            cnpj: "CNPJ",
            phone: "Teléfono",
            email: "Email",
            address: "Endereço"
          },
          success: "Compañía registrada con éxito!",
          deleteCompany: "Todos los datos de la compañía registrada se perderán, ¿realmente desea eliminarlos? ",
          toast: "¡Compañía eliminada con éxito!"
          },

          menu:{
            title: "Menú",
            success: "¡Menú guardado con éxito!!",
          buttons:{
            save: "Guardar",
            menus: "Menú",
            company: "Compañías"
          },
        },
      templatesData:{
        title: "Plantillas",
        buttons: {
          connection: "Conexión",
          search: "Búsqueda",
          newTemplate: "Nueva Plantilla"
        },
        grid: {
          name: "Nombre",
          status: "Status",
          text: "Texto",
          footer: "Zócalo",
          createdAt: "Fecha de Creación",
          updateAt: "Editado en",
          actions: "Comportamiento",
        },
        templateModal: {
          add: "Agregar Plantilla",
          edit: "Editar Plantilla",
          name: "Nombre",
          bodyText: "cuerpo do Texto",
          footer: "Zócalo",
          buttonAdd: "Agregar",
          buttonEdit: "Editar",
        },
        modalConfirm: {
          delete: "¡Realmente quiero eliminar, todos los datos de la plantilla se perderán!",
          successDelete: "¡Plantilla eliminada con éxito!",
          successAdd: "¡Plantilla agregada con éxito!",
        },
      },

      backendErrors: {
        ERR_NO_OTHER_WHATSAPP:
          "Debe haber al menos una conexión de WhatsApp predeterminada.",
        ERR_NO_DEF_WAPP_FOUND:
          "No se encontró WhatsApp predeterminado. Verifique la página de conexiones.",
        ERR_WAPP_NOT_INITIALIZED:
          "Esta sesión de WhatsApp no ​​está inicializada. Verifique la página de conexiones.",
        ERR_WAPP_CHECK_CONTACT:
          "No se pudo verificar el contacto de WhatsApp. Verifique la página de conexiones.",
        ERR_WAPP_INVALID_CONTACT: "Este no es un número de whatsapp válido.",
        ERR_WAPP_DOWNLOAD_MEDIA:
          "No se pudieron descargar los medios de WhatsApp. Verifique la página de conexiones.",
        ERR_INVALID_CREDENTIALS: "Error de autenticación. Vuelva a intentarlo.",
        ERR_SENDING_WAPP_MSG:
          "Error al enviar el mensaje de WhatsApp. Verifique la página de conexiones.",
        ERR_DELETE_WAPP_MSG: "No se pudo borrar el mensaje de WhatsApp.",
        ERR_OTHER_OPEN_TICKET: "Ya hay un ticket abierto para este contacto.",
        ERR_SESSION_EXPIRED: "Sesión caducada. Inicie sesión.",
        ERR_USER_CREATION_DISABLED:
          "La creación de usuarios fue deshabilitada por el administrador.",
        ERR_NO_PERMISSION: "No tienes permiso para acceder a este recurso.",
        ERR_DUPLICATED_CONTACT: "Ya existe un contacto con este número.",
        ERR_NO_SETTING_FOUND:
          "No se encontró ninguna configuración con este ID.",
        ERR_NO_CONTACT_FOUND: "No se encontró ningún contacto con este ID.",
        ERR_NO_TICKET_FOUND: "No se encontró ningún ticket con este ID.",
        ERR_NO_USER_FOUND: "No se encontró ningún usuario con este ID.",
        ERR_NO_WAPP_FOUND: "No se encontró WhatsApp con este ID.",
        ERR_CREATING_MESSAGE: "Error al crear el mensaje en la base de datos.",
        ERR_CREATING_TICKET: "Error al crear el ticket en la base de datos.",
        ERR_FETCH_WAPP_MSG:
          "Error al obtener el mensaje en WhtasApp, tal vez sea demasiado antiguo.",
        ERR_QUEUE_COLOR_ALREADY_EXISTS:
          "Este color ya está en uso, elija otro.",
        ERR_WAPP_GREETING_REQUIRED:
          "El mensaje de saludo es obligatorio cuando hay más de una cola.",
        ERR_NO_COMPANY_FOUND: "Error al eliminar empresa.",
        ERR__SHORTCUT_DUPLICATED_COMPANY: "Ya hay una empresa con este CNPJ.",
      },
    },
  },
};

export { messages };

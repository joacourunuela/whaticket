import Product from "../../database/models/Products";
import ShowProductService from "./ShowProductService";

interface ProductData {
  name: string;
  triggerFee: number;
  monthlyInterestRate: number;
  penaltyMount: number;
  receivedMessageFee: number;
  sentMessageFee: number;
  inboundSessionFee: number;
  outboundSessionFee: number;
}

interface Request {
  productData: ProductData;
  productId: number | string;
}

const UpdateProductService = async ({
  productData,
  productId
}: Request): Promise<Product> => {
  const product = await ShowProductService(productId);

  const {
    name,
    triggerFee,
    monthlyInterestRate,
    penaltyMount,
    receivedMessageFee,
    sentMessageFee,
    inboundSessionFee,
    outboundSessionFee,
  } = productData;

  await product.update({
    name,
    triggerFee,
    monthlyInterestRate,
    penaltyMount,
    receivedMessageFee,
    sentMessageFee,
    inboundSessionFee,
    outboundSessionFee,
  });

  await product.reload();

  return product;
};

export default UpdateProductService;

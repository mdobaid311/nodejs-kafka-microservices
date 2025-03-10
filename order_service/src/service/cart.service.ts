import { CartLineItem } from "../db/schema";
import { CartEditRequestInput, CartRequestInput } from "../dto/cartRequest.dto";
import { CartRepositoryType } from "../repository/cart.repository";
import { logger, NotFoundError } from "../utils";
import { GetProductDetails } from "../utils/broker";

export const CreateCart = async (
  input: CartRequestInput,
  repo: CartRepositoryType
) => {
  const product = await GetProductDetails(input.productId);
  logger.info(product);

  if (product.stock < input.qty) {
    throw new NotFoundError("product is out of stock");
  }

  return await repo.createCart(input.customerId, {
    productId: input.productId,
    itemName: product.name,
    price: product.price.toString(),
    qty: input.qty,
    variant: product.variant,
  } as CartLineItem);
};

export const GetCart = async (id: number, repo: CartRepositoryType) => {
  const data = await repo.findCart(id);
  if (!data) {
    throw new NotFoundError("cart not found");
  }

  return data;
};

export const EditCart = async (
  input: CartEditRequestInput,
  repo: CartRepositoryType
) => {
  const data = await repo.updateCart(input.id, input.qty);
  return data;
};

export const DeleteCart = async (id: number, repo: CartRepositoryType) => {
  const data = await repo.deleteCart(id);
  return data;
};

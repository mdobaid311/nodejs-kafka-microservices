import { CartRequestInput } from "../dto/cartRequest.dto";
import { CartRepositoryType } from "../types/repository";
import { GetProductDetails } from "../utils/broker";

export const CreateCart = async (
  input: CartRequestInput,
  repo: CartRepositoryType
) => {
  const product = await GetProductDetails(input.productId);

  if (product.stock < input.qty) {
    throw new Error("Product out of stock");
  }

  const data = await repo.create(input);
  return data;
};

export const GetCart = async (input: any, repo: CartRepositoryType) => {
  const data = await repo.find(input);
  return data;
};

export const EditCart = async (input: any, repo: CartRepositoryType) => {
  const data = await repo.edit(input);
  return data;
};

export const DeleteCart = async (input: any, repo: CartRepositoryType) => {
  const data = await repo.delete(input);
  return data;
};

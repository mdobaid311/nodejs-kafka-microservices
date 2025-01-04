import { CartRepositoryType } from "../types/repository";

const createCart = async (input: any): Promise<{}> => {
  return Promise.resolve({ message: "Cart created" });
};

const findCart = async (input: any): Promise<{}> => {
  return Promise.resolve({ message: "Cart retrieved" });
};

const updateCart = async (input: any): Promise<{}> => {
  return Promise.resolve({ message: "Cart updated" });
};

const deleteCart = async (input: any): Promise<{}> => {
  return Promise.resolve({ message: "Cart deleted" });
};

export const CartRepository: CartRepositoryType = {
  create: createCart,
  find: findCart,
  edit: updateCart,
  delete: deleteCart,
};

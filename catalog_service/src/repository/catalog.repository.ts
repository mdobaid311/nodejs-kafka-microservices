import { PrismaClient } from "@prisma/client";
import { ICatalogRespostory } from "../interface/catalogRepository.interface";
import { Product } from "../models/product.model";
import { NotFoundError } from "../utils";

export class CatalogRepostiory implements ICatalogRespostory {
  _prisma: PrismaClient;

  constructor() {
    this._prisma = new PrismaClient();
  }

  async create(data: Product): Promise<Product> {
    return this._prisma.product.create({
      data: data,
    });
  }

  async update(data: Product): Promise<Product> {
    return this._prisma.product.update({
      where: { id: data.id },
      data: data,
    });
  }

  async delete(id: any): Promise<{}> {
    return this._prisma.product.delete({
      where: { id: id },
    });
  }

  async find(): Promise<Product[]> {
    return this._prisma.product.findMany();
  }

  async findOne(id: number): Promise<Product> {
    const product = await this._prisma.product.findFirst({
      where: { id: id },
    });
    if (!product) {
      throw new NotFoundError("Product not found");
    }
    return product;
  }
}

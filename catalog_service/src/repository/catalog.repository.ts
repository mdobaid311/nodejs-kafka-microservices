import { ICatalogRespostory } from "../interface/catalogRepository.interface";
import { Product } from "../models/product.model";

export class CatalogRepostiory implements ICatalogRespostory {
  create(data: Product): Promise<Product> {
    throw new Error("Method not implemented.");
  }
  update(data: Product): Promise<Product> {
    throw new Error("Method not implemented.");
  }
  delete(id: any): Promise<{}> {
    throw new Error("Method not implemented.");
  }
  find(): Promise<Product[]> {
    throw new Error("Method not implemented.");
  }
  findOne(id: number): Promise<Product> {
    throw new Error("Method not implemented.");
  }
}

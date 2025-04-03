import { Product } from "../models/product.model";

export interface ICatalogRespostory {
  create(data: Product): Promise<Product>;
  update(data: Product): Promise<Product>;
  delete(id: any): Promise<{}>;
  find(limit: number, offset: number): Promise<Product[]>;
  findOne(id: number): Promise<Product>;
  findStock(ids: number[]): Promise<Product[]>;
}

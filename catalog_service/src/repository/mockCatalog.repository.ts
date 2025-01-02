import { ICatalogRespostory } from "../interface/catalogRepository.interface";
import { Product } from "../models/product.model";

export class MockCatalogRepository implements ICatalogRespostory {
  find(limit: number, offset: number): Promise<Product[]> {
    return Promise.resolve([]);
  }
  create(data: Product): Promise<Product> {
    const mockProduct = {
      id: 123,
      ...data,
    } as Product;
    return Promise.resolve(mockProduct);
  }
  update(data: Product): Promise<Product> {
    return Promise.resolve(data as unknown as Product);
  }
  delete(id: any) {
    return Promise.resolve(id);
  }
  findOne(id: number): Promise<Product> {
    return Promise.resolve({ id } as unknown as Product);
  }
}

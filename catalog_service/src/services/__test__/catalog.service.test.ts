import { ICatalogRespostory } from "../../interface/catalogRepository.interface";
import { Product } from "../../models/product.model";
import { MockCatalogRepository } from "../../repository/mockCatalog.repository";
import { productFactory } from "../../utils/fixtures";
import { CatalogService } from "../catalog.service";
import { faker } from "@faker-js/faker";

const mockProduct = (rest: any) => {
  return {
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    stock: faker.number.int({ min: 1, max: 100 }),
    ...rest,
  };
};

describe("catalogService", () => {
  let repository: ICatalogRespostory;
  beforeEach(() => {
    repository = new MockCatalogRepository();
  });
  afterEach(() => {
    repository = {} as ICatalogRespostory;
  });

  describe("createProduct", () => {
    test("should create a product", async () => {
      const service = new CatalogService(repository);
      const reqBody = mockProduct({
        price: +faker.commerce.price(),
      });
      const result = await service.createProduct(reqBody);

      expect(result).toMatchObject({
        id: expect.any(Number),
        name: expect.any(String),
        description: expect.any(String),
        price: expect.any(Number),
        stock: expect.any(Number),
      });
    });

    test("should throw error with unable to create product", async () => {
      const service = new CatalogService(repository);
      const reqBody = mockProduct({
        price: +faker.commerce.price(),
      });

      jest
        .spyOn(repository, "create")
        .mockImplementation(() => Promise.resolve({} as Product));

      await expect(service.createProduct(reqBody)).rejects.toThrow(
        "unable to create product",
      );
    });

    test("should throw error with product already exist", async () => {
      const service = new CatalogService(repository);
      const reqBody = mockProduct({
        price: +faker.commerce.price(),
      });

      jest
        .spyOn(repository, "create")
        .mockImplementation(() =>
          Promise.reject(new Error("product already exist")),
        );

      await expect(service.createProduct(reqBody)).rejects.toThrow(
        "product already exist",
      );
    });
  });

  describe("updateProduct", () => {
    test("should update a product", async () => {
      const service = new CatalogService(repository);
      const reqBody = mockProduct({
        id: faker.number.int({ min: 10, max: 100 }),
        price: +faker.commerce.price(),
      });
      const result = await service.updateProduct(reqBody);

      expect(result).toMatchObject(reqBody);
    });

    test("should throw error with product does not exist", async () => {
      const service = new CatalogService(repository);
      jest
        .spyOn(repository, "create")
        .mockImplementation(() =>
          Promise.reject(new Error("product does not exist")),
        );

      await expect(service.createProduct({})).rejects.toThrow(
        "product does not exist",
      );
    });
  });

  describe("getProducts", () => {
    test("should get products by offset and limit", async () => {
      const service = new CatalogService(repository);
      const randomLimit = faker.number.int({ min: 1, max: 50 });
      const products = productFactory.buildList(randomLimit);

      jest
        .spyOn(repository, "find")
        .mockImplementationOnce(() => Promise.resolve(products));

      const result = await service.getProducts(randomLimit, 0);

      expect(result.length).toEqual(randomLimit);
      expect(result).toMatchObject(products);
    });

    test("should throw error with product does not exist", async () => {
      const service = new CatalogService(repository);
      jest
        .spyOn(repository, "find")
        .mockImplementation(() =>
          Promise.reject(new Error("products does not exist")),
        );

      await expect(service.getProducts(0, 0)).rejects.toThrow(
        "products does not exist",
      );
    });
  });

  describe("getProducts", () => {
    test("should get product by id", async () => {
      const service = new CatalogService(repository);
      const product = productFactory.build();

      jest
        .spyOn(repository, "findOne")
        .mockImplementationOnce(() => Promise.resolve(product));

      const result = await service.getProduct(product.id!);
      expect(result).toMatchObject(product);
    });
  });

  describe("deleteProducts", () => {
    test("should delete product by id", async () => {
      const service = new CatalogService(repository);
      const product = productFactory.build();

      jest
        .spyOn(repository, "delete")
        .mockImplementationOnce(() => Promise.resolve(product));

      const result = await service.deleteProduct({ id: product.id });

      expect(result).toMatchObject({
        id: product.id,
      });
    });
  });
});

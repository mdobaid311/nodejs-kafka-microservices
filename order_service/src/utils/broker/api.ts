import axios from "axios";
import { Product } from "../../dto/product.dto";
import { NotFoundError } from "../error";
import { logger } from "../logger";

const CATALOG_BASE_URL =
  process.env.CATALOG_BASE_URL || "http://localhost:3000";

export const GetProductDetails = async (productId: number) => {
  try {
    const response = await axios.get(
      `${CATALOG_BASE_URL}/products/${productId}`
    );
    return response.data as Product;
  } catch (error) {
    logger.error(error);
    throw new NotFoundError("product not found");
  }
};

import axios from "axios";
import { AuthorizeError, NotFoundError } from "../error";
import { logger } from "../logger";
import { User } from "../../dto/User.model";
import { InProcessOrder } from "../../dto/Order.model";

const ORDER_SERVIVCE_BASE_URL =
  process.env.ORDER_SERVIVCE_BASE_URL || "http://localhost:3001";

const AUTH_SERVICE_BASE_URL =
  process.env.AUTH_SERVICE_BASE_URL || "http://localhost:9000";

export const GetOrderDetails = async (orderNumber: number) => {
  try {
    console.log(`${ORDER_SERVIVCE_BASE_URL}/orders/${orderNumber}/checkout`)
    const response = await axios.post(
      `${ORDER_SERVIVCE_BASE_URL}/orders/${orderNumber}/checkout`
    );
    return response.data as InProcessOrder;
  } catch (error) {
    logger.error(error);
    throw new NotFoundError("error on getting stock details from order service");
  }
};

export const ValidateUser = async (token: string) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const response = await axios.get(`${AUTH_SERVICE_BASE_URL}/auth/validate`, {
      headers: {
        Authorization: token,
      },
    });
    if (response.status !== 200) {
      throw new AuthorizeError("User not authenticated");
    }

    return response.data as User;
  } catch (error) {
    throw new AuthorizeError("user not authorised");
  }
};

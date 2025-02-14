import axios from "axios";
import { AuthorizeError } from "./error";
import { User } from "../dto/User.model";

export const ValidateUser = async (token: string) => {
    try {
      console.log("ValidateUser called", token);
      const response = await axios.get(`${AUTH_SERVICE_BASE_URL}/auth/validate`, {
        headers: {
          Authorization: token,
        },
      });
  
      console.log("response", response.data);
  
      if (response.status !== 200) {
        throw new AuthorizeError("user not authorised");
      }
      return response.data as User;
    } catch (error) {
      throw new AuthorizeError("user not authorised");
    }
  };
import expressApp from "./expressApp";
import { logger } from "./utils";

const PORT = process.env.PORT || 3000;

export const StartServer = async () => {
  expressApp.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
  });

  process.on("uncaughtException", (error) => {
    logger.error(error);
    process.exit(1);
  });
};
StartServer().then(() => {
  logger.info("Server is runnning");
});

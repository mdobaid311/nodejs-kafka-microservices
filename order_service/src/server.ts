import { ExpressApp } from "./expressApp";
import { logger } from "./utils";

const PORT = process.env.APP_PORT || 3000;

export const StartServer = async () => {
  const expressApp = await ExpressApp();

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

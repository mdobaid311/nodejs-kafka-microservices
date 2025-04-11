import * as cfg from "./config";
import { logger } from "./utils";
import { ExpressApp } from "./express-app";

export const StartServer = async () => {
  const expressApp = await ExpressApp();

  expressApp.listen(cfg.PORT, () => {
    logger.info(`Server running on port ${cfg.PORT}`);
  });

  process.on("uncaughtException", (error) => {
    logger.error(error);
    process.exit(1);
  });
};
StartServer().then(() => {
  logger.info("Server is runnning");
});

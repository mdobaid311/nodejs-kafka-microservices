import expressApp from "./expressApp";

const PORT = process.env.APP_PORT || 3000;

export const StartServer = async () => {
  console.log("Server started");

  expressApp.listen(PORT, () => {
    console.log("Server running on port 3000");
  });

  process.on("uncaughtException", (error) => {
    console.log(error);
    process.exit(1);
  });
};
StartServer().then(() => {
  console.log("Server is runnning");
});

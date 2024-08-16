import app from "./app";
import config from "./config";
import mongoose from "mongoose";

async function main() {
  try {
    console.log("Connecting to Mongoose");
    await mongoose.connect(config.database_url as string);

    app.listen(config.port, () => {
      console.log(`Bike Rental listening on port ${config.port}`);
    });
  } catch (error: any) {
    console.log(error.message);
  }
}
main();

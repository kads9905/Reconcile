import dotenv from "dotenv";
import connectDB from "./src/db/index.js";
import { app } from "./src/app.js";

dotenv.config({
  path: "./.env",
});

connectDB()
  .then(() => {
    // starts express only after db is ready
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port : ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("Server failed to start", err);
  });
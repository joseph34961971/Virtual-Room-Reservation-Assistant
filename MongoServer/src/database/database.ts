import * as Mongoose from "mongoose";
import { UserModel } from "./users/users.model";

let database: Mongoose.Connection;

export const connect = () => {
  // add your own uri below
  const uri =
    "mongodb+srv://VRRA_Admin:VRRA1234@cluster0.tulwc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

  if (database) {
    return;
  }

  Mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  database = Mongoose.connection;

  database.once("open", async () => {
    console.log("Connected to database");
  });

  database.on("error", () => {
    console.log("Error connecting to database");
  });

  return {
    UserModel,
  };
};

export const disconnect = () => {
  if (!database) {
    return;
  }

  Mongoose.disconnect();
};

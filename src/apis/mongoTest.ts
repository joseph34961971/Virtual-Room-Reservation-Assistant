import * as Mongoose from "mongoose";
//import { UserModel } from "./users/users.model";

let database: Mongoose.Connection;

const uri = "mongodb+srv://VRRA_Admin:VRRA1234@cluster0.tulwc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

    export const connectMongo = () => {
        // add your own uri below
        if (database) {
          return;
        }
        Mongoose.connect(uri);
        database = Mongoose.connection;
        database.once("open", async () => {
          console.log("Connected to database");
        });
        database.on("error", () => {
          console.log("Error connecting to database");
        });
      };

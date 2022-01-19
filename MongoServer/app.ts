import { Fort, MustacheViewEngine } from 'fortjs';
import { routes } from './routes';
import * as mongoose from "mongoose";

export class App extends Fort {
    constructor() {
        super();
        this.routes = routes;
        this.viewEngine = MustacheViewEngine;
    }

    async initDatabase() {
        await mongoose.connect("mongodb+srv://VRRA_Admin:VRRA1234@cluster0.tulwc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", { useNewUrlParser: true });
        this.logger.debug('db connected');
    }
}



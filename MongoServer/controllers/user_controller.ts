import { Controller, textResult, DefaultWorker, jsonResult, Worker, Route, HTTP_STATUS_CODE, HTTP_METHOD, Guards, Singleton } from 'fortjs';
import { UserService } from '../services/user_service';
import { UserValidationGuard } from '../guards/user_validation_guard';
import { User } from '../models/user';
//import { connect, disconnect } from "../src/database/database";

export class UserController extends Controller {

    service: UserService;

    constructor(@Singleton(UserService) service) {
        super();
        this.service = service;
    }

    @DefaultWorker()
    async getUsers() {
        console.log(this);
        const users = await this.service.getAllUsers();
        this.logger.log(users);
        return jsonResult(users);
        //return JSON.stringify(users);
    }

    @Worker([HTTP_METHOD.Post])
    @Route("/")
    @Guards([UserValidationGuard])
    async addUser() {
        console.log('POST');
        const user = this.data.user;
        const testParse = JSON.parse(this.body.toString());
        console.log();
        const newUser = await this.service.addUser(testParse);
        console.log('POST3');
        console.log(this.body.user);
        return jsonResult(newUser, HTTP_STATUS_CODE.Created);
        /*const db = connect();

        // test static methods
        const twenties = await db.UserModel.findByAge(20, 29);
        const newUser = await db.UserModel.findOneOrCreate({
            firstName: "Mike",
            lastName: "Smith",
            age: 57,
        });
        const existingUser = await db.UserModel.findOneOrCreate({
            firstName: "Emma",
            lastName: "Bradley",
            age: 34,
        });
        const numOfUsers = (await db.UserModel.find()).length;
        console.log({ twenties, newUser, existingUser, numOfUsers });

        // test instance methods
        await existingUser.setLastUpdated();
        const siblings = await existingUser.sameLastName();
        console.log({ siblings });

        disconnect();*/
    }

    @Worker([HTTP_METHOD.Put])
    @Guards([UserValidationGuard])
    @Route("/")
    async updateUser() {
        const user: User = this.data.user;
        const result = await this.service.updateUser(user);
        if (result.n > 0) {
            return textResult("user updated");
        }
        else {
            return textResult("invalid user", 400);
        }
    }

    @Worker([HTTP_METHOD.Get])
    @Route("/{id}")
    async getUser() {
         const userId = this.param.id;
         const user = await this.service.getUserById(userId);
         if (user == null) {
             return textResult("invalid id");
         }
         return jsonResult(user);

    }

    @Worker([HTTP_METHOD.Delete])
    @Route("/{id}")
    async removeUser() {
         const userId = this.param.id;
         const user = await this.service.removeUserById(userId);
         if (user.n > 0) {
             return textResult("user deleted");
         }
         else {
             return textResult("invalid user");
         }
    }
}
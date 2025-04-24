import { Router } from "express";
import UserController from "../controllers/user.controller.js";
import UserValidator from "../middlewares/userValidator.js";

class UserRoute {
    constructor() {
        this.router = Router(); // tạo instance router riêng
        this.userController = new UserController();
        this.userValidator = new UserValidator();
        this.setupRoutes();
    }

    setupRoutes() {
        this.router.get('/', this.userController.getAllUsers);
        this.router.get('/:id', this.userController.getUserById)
        this.router.post('/', this.userValidator.checkUserValidate, this.userController.addUser);
        this.router.put('/:id', this.userValidator.checkUserValidate, this.userController.putUser);
        this.router.delete('/:id', this.userController.deleteUser);
    }

    getRouter() {
        return this.router;
    }
}

export default UserRoute;
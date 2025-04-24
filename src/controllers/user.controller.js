import UserService from "../services/user.service.js";

export default class UserController {
    constructor() {
        this.userService = new UserService();
    }
    getAllUsers = async (req, res) => {
        try {
            const users = await this.userService.getAllUsers();
        if (!users) {
            return res.status(404).json({ message: "Users not found" });
        }
        res.status(200).json(users);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    };
    getUserById = async (req, res) => {
        const id = req.params.id;
        try {
            const user = await this.userService.getUserById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    };
    addUser = async (req, res) => {
        try {
            const user = req.body;
            console.log(user);
            await this.userService.addUser(user);
            res.status(200).json({ message: "Add user successfully!" });
        } catch (error) {
            console.error(error);
            if (error.message === "User already exists with this email.") {
                return res.status(400).json({ message: error.message });
            }
            res.status(500).json({ message: "Internal Server Error" });
        }
    };
    putUser = async (req, res) => {
        const id = req.params.id;
        try {
            const user = req.body;
            const updatedUser = await this.userService.putUser(id, user);
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
            res.status(200).json({ message: "Update user successfully!" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    };
    deleteUser = async (req, res) => {
        const id = req.params.id;
        try {
            const deletedUser = await this.userService.deleteUser(id);
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "Deleted user successfully!" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    };
}

import UserModel from '../models/user.model.js';

class UserController {
    constructor() {
        this.userModel = UserModel;
    }
    getAll = async (req, res) => {
        try {
            const users = await this.userModel.findAll();
            // res.status(200).json(users);
            res.render("users/index", { users: users });
        } catch (err) {
            res.status(500).json({ message: 'Error retrieving users' });
        }
    }

    getById = async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const user = await this.userModel.findById(id);
            if (!user) return res.status(404).json({ message: 'User not found' });
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json({ message: 'Error retrieving user' });
        }
    }

    getAddUser = (req, res) => {
        res.render("users/create", { title: "create user" });
    }

    create = async (req, res) => {
        try {
            const newUser = await this.userModel.create(req.body);
            console.log(newUser);
            // res.status(201).json(newUser);
            // res.render("users/create", { title: "create user" });
            res.redirect("/users");
        } catch (err) {
            res.status(500).json({ message: 'Error creating user' });
        }
    }

    getUpdateUser = async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const user = await this.userModel.findById(id);
            if (!user) return res.status(404).json({ message: 'User not found' });
            res.render("users/update", { user: user });
        } catch (err) {
            res.status(500).json({ message: 'Error retrieving user' });
        }
    }

    update = async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const updatedUser = await this.userModel.update(id, req.body);
            if (!updatedUser) return res.status(404).json({ message: 'User not found' });
            // res.status(204)
            res.redirect("/users");
        } catch (err) {
            res.status(500).json({ message: 'Error updating user' });
        }
    }

    delete = async (req, res) => {
        const id = req.params.id;

        try {
            const id = parseInt(req.params.id);
            const deleted = await this.userModel.delete(id);
            if (!deleted) return res.status(404).json({ message: 'User not found' });
            res.redirect("/users");
            // res.status(200).json(true);
        } catch (err) {
            res.status(500).json({ message: 'Error deleting user' });
        }
    }
}
export default UserController;
import { Router } from 'express';
import UserController from '../controllers/user.controller.js';
import UserValidator from '../middlewares/validate.user.js';

const router = Router();
const userController = new UserController();

router.get('/users/create', userController.getAddUser);
router.get('/users', userController.getAll);
router.get('/users/update/:id', userController.getUpdateUser);
router.get('/users/:id', userController.getById);
router.post('/users', UserValidator?.validateCreate ?? ((req, res, next) => next()), userController.create);// bypas middleware rong de xu ly khi ben trai null or undefined
router.put('/users/:id', UserValidator?.validateUpdate ?? ((req, res, next) => next()), userController.update);// bypas middleware rong de xu ly khi ben trai null or undefined
router.delete('/users/:id', userController.delete);

export default router;

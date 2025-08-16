import express, {Router} from 'express'
const router: Router = express.Router();
import { UserController } from '../controllers/userController';
const userController = new UserController();

router.post('/', userController.createUserController);

export default router;
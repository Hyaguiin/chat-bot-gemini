import express, {Router} from 'express'
const router: Router = express.Router();
import { AuthController } from '../controllers/authController';
const authController = new AuthController();

router.post('/login', authController.login);
router.post('/register', authController.register);

export default router;
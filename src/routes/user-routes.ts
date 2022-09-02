import express from 'express';
import UserController from '../controllers/user-controller';
import {
  validateAutoSuggestUser,
  validateLogin,
  validateUser,
} from '../middlewares/body-validator';

const router = express.Router();

router.get('/', validateAutoSuggestUser, UserController.getUsers);
router.get('/:id', UserController.getUserById);
router.post('/', validateUser, UserController.createUser);
router.put('/:id', validateUser, UserController.updateUser);
router.delete('/:id', UserController.deleteUser);
router.post('/login', validateLogin, UserController.login);

export default router;

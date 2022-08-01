import express from 'express';
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/user-controller';
import {
  validateAutoSuggestUser,
  validateUser,
} from '../middlewares/bodyValidator';

const router = express.Router();

router.get('/', validateAutoSuggestUser, getUsers);
router.get('/:id', getUserById);
router.post('/', validateUser, createUser);
router.put('/:id', validateUser, updateUser);
router.delete('/:id', deleteUser);

export default router;

import express from 'express';
import { loginHandler, registerHandler } from '../controller/authController.js';

const router = express.Router();
router.post('/login',loginHandler);
router.post('/register',registerHandler)

export default router;
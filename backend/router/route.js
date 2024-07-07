// routes/api.js

import express from 'express';
const router = express.Router();
import { getQuestions, insertQuestions, dropQuestions, getResult, storeResult, dropResult, deleteQuestionById, deleteResultById } from '../controllers/controller.js';

router.get('/questions', getQuestions);
router.post('/questions', insertQuestions);
router.delete('/questions/:id', deleteQuestionById);
router.delete('/questions', dropQuestions);

router.get('/result', getResult);
router.post('/result', storeResult);
router.delete('/result/:id', deleteResultById);
router.delete('/result', dropResult);

export default router;

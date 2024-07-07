import Questions from "../models/questionSchema.js";
import Results from "../models/resultSchema.js";
import questions, { answers } from '../database/data.js';
import mongoose from 'mongoose';
const { ObjectId } = mongoose.Types;


/** get all questions */
export async function getQuestions(req, res){
    try {
        const q = await Questions.find();
        res.json(q);
    } catch (error) {
        res.json({ error });
    }
}

export async function insertQuestions(req, res) {
    const { id, question, options, answer } = req.body;

    try {
        const data = await Questions.create({ id, question, options, answer });
        res.json({ msg: "Data Saved Successfully...!", data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

/** delete all questions */
export async function dropQuestions(req, res){
   try {
        await Questions.deleteMany();
        res.json({ msg: "Questions Deleted Successfully...!" });
   } catch (error) {
        res.json({ error });
   }
}

/** get all results */
export async function getResult(req, res){
    try {
        const r = await Results.find();
        res.json(r);
    } catch (error) {
        res.json({ error });
    }
}

/** post all results */
export async function storeResult(req, res){
   try {
        const { username, result, attempts, points, achieved } = req.body;
        if (!username || !result) {
            return res.status(400).json({ error: 'Data Not Provided...!' });
        }

        const data = await Results.create({ username, result, attempts, points, achieved });
        res.json({ msg: "Result Saved Successfully...!", data });
   } catch (error) {
        res.status(500).json({ error: error.message });
   }
}

/** delete all results */
export async function dropResult(req, res){
    try {
        await Results.deleteMany();
        res.json({ msg: "Result Deleted Successfully...!" });
    } catch (error) {
        res.json({ error });
    }
}

// delete result by ID
export const deleteResultById = async (req, res) => {
    const { id } = req.params;
  
    try {
      await Results.findByIdAndDelete(id);
      res.json({ msg: 'Result deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


// delete Question by ID
export const deleteQuestionById = async (req, res) => {
    const { id } = req.params;

    try {
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid ObjectId' });
        }

        const deletedQuestion = await Questions.findByIdAndDelete(id);

        if (!deletedQuestion) {
            return res.status(404).json({ error: 'Question not found' });
        }

        res.json({ message: 'Question deleted successfully', deletedQuestion });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
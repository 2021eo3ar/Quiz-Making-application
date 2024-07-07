import mongoose from "mongoose";
const { Schema } = mongoose;

/** question model */
const questionSchema = new Schema({
    id: { type: Number, required: true },
    question: { type: String, required: true },
    options: { type: [String], required: true }, // array of strings for options
    answer: { type: Number, required: true }, // index of the correct option
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Question', questionSchema);

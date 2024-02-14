require("dotenv").config();

const Quiz = require("../models/quiz");

const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI;

const dbName = "my_database";

const collectionName = "quizQuestions";

// Create a new MongoClient
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

exports.getAllQuizQuestions = async (req, res) => {
  try {
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const quizQuestions = await collection.find().toArray();

    if (!quizQuestions || quizQuestions.length === 0) {
      return res.status(404).json({ message: "No quiz questions found" });
    }
    res
      .status(200)
      .json({ message: "Quiz questions found successfully", quizQuestions });
  } catch (error) {
    console.log("Error fetching quiz questions:", error);
    res.status(500).json({ message: "Failed to fetch quiz questions" });
  } finally {
    // Close the MongoDB connection
    await client.close();
  }
};

// Creating a quiz
exports.createQuiz = async (req, res) => {
  try {
    const { name, email, phone, correct, wrong } = req.body;
    const newQuiz = new Quiz({ name, email, phone, correct, wrong });
    await newQuiz.save();
    res
      .status(200)
      .json({ message: "Quiz created successfully", quiz: newQuiz });
  } catch (error) {
    console.log("Error during Quiz creation:", error);
    res.status(500).json({ message: "Quiz creation failed" });
  }
};

// Implementation for getting Quiz Results
exports.getAllQuizResults = async (req, res) => {
  try {
    const quiz = await Quiz.find();
    if (!quiz) {
      return res.status(404).json({ message: "quiz not found" });
    }
    res.status(200).json({ message: "quiz Found successfully", quiz: quiz });
  } catch (error) {
    res.status(500).json({ message: "quiz not found" });
  }
};

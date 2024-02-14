const express = require("express");
const router = express.Router();
const quizController = require("../controller/quiz");

router.post("/createQuiz", quizController.createQuiz);
router.get("/getAllQuiz", quizController.getAllQuizQuestions);
router.get("/getAllQuizResults", quizController.getAllQuizResults);

module.exports = router;

/* eslint-disable */
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  questions: [
    {
      id: 1,
      imgUrl: "./pictures/neo.jpg",
      questionText: "Which colour pill does Neo swallow in The Matrix?",
      options: ["Red", "Yellow", "Green", "Blue"],
      correctAnswerIndex: 0,
    },
    {
      id: 2,
      imgUrl: "./pictures/housewives.jpg",
      questionText: "Which Housewives franchise was the first to air in 2006?",
      options: ["New York", "Atlanta", "Orange County", "New Jersey"],
      correctAnswerIndex: 2,
    },
    {
      id: 3,
      imgUrl: "./pictures/ryans.png",
      questionText: "Pick the right Ryan? Who is Ryan Reynolds?",
      options: ["Ryan 1", "Ryan 2", "Ryan 3", "Ryan 4"],
      correctAnswerIndex: 2,
    },
    {
      id: 4,
      imgUrl:
        "https://i.etsystatic.com/21146347/r/il/5310da/3424626039/il_340x270.3424626039_kq8p.jpg",
      questionText: "Squidtime! Which one do you choose?",
      options: ["Circle", "Triangle", "Star", "Umbrella"],
      correctAnswerIndex: 1,
    },
    {
      id: 5,
      imgUrl: "./pictures/free-hugs.png",
      questionText: "Which bear is this?",
      options: ["Care bear", "Winnie the Pooh", "Björne", "Paddington"],
      correctAnswerIndex: 0,
    },
  ],
  answers: [],
  currentQuestionIndex: 0,
  quizOver: false,
  quizStart: true,
};

export const quiz = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    /**
     * Use this action when a user selects an answer to the question.
     * The answer will be stored in the `quiz.answers` state with the
     * following values:
     *
     *    questionId  - The id of the question being answered.
     *    answerIndex - The index of the selected answer from the question's options.
     *    question    - A copy of the entire question object, to make it easier to show
     *                  details about the question in your UI.
     *    answer      - The answer string.
     *    isCorrect   - true/false if the answer was the one which the question says is correct.
     *
     * When dispatching this action, you should pass an object as the payload with `questionId`
     * and `answerIndex` keys. See the readme for more details.
     */
    submitAnswer: (state, action) => {
      const { questionId, answerIndex } = action.payload
      const question = state.questions.find((q) => q.id === questionId)

      if (!question) {
        throw new Error(
          "Could not find question! Check to make sure you are passing the question id correctly."
        );
      }

      if (question.options[answerIndex] === undefined) {
        throw new Error(
          `You passed answerIndex ${answerIndex}, but it is not in the possible answers array!`
        );
      }

      state.answers.push({
        questionId,
        answerIndex,
        question,
        answer: question.options[answerIndex],
        isCorrect: question.correctAnswerIndex === answerIndex,
      });
    },

    /**
     * Use this action to progress the quiz to the next question. If there's
     * no more questions (the user was on the final question), set `quizOver`
     * to `true`.
     *
     * This action does not require a payload.
     */
    goToNextQuestion: (state) => {
      if (state.currentQuestionIndex + 1 === state.questions.length) {
        state.quizOver = true
      } else {
        state.currentQuestionIndex += 1
      }
    },

    /**
     * Use this action to reset the state to the initial state the page had
     * when it was loaded. Who doesn't like re-doing a quiz when you know the
     * answers?!
     *
     * This action does not require a payload.
     */
    restart: () => {
      return initialState
    },

    /**
     * Use this action to progress from the starting-page of the quiz (action added by team elephants group 1, not part of the starting code)
     */
    start: (state) => {
      state.quizStart = false
    }
  },
});

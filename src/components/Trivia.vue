<template>
  <div>
    <div aria-label="the question">{{ question }}</div>
    <button
      aria-label="Click Me for a new question!"
      @click="getNewQuestion"
      class="text-red-600"
    >
      Click Me for a new question!
    </button>
    <div
      aria-label="Possible Answers"
      v-for="(choice, index) in choiceAnswers"
      :key="index"
    >
      <input
        type="radio"
        name="answer"
        id="answer{{index}}"
        :value="choice"
        v-model="selection"
      />{{ choice }}
    </div>
    <div aria-label="Answer Results">
      {{ resultMessage }}
    </div>
    <button
      v-if="choiceAnswers.length > 0"
      class="bg-blue-500 font-bold text-white rounded-sm px-3 py-1"
      aria-label="Submit"
      @click="validateAnswer"
    >
      Submit
    </button>
  </div>
</template>

<script>
import axios from "axios";
import { ref } from "vue";

export default {
  name: "Trivia",
  setup() {
    let result = "hello";
    const question = ref(null);
    const correctAnswer = ref(null);
    const choiceAnswers = ref([]);
    const isCorrectAnswer = ref(false);
    const selection = ref(null);
    const resultMessage = ref(null);

    async function getNewQuestion() {
      await axios
        .get("https://opentdb.com/api.php?amount=1")
        .then((response) => {
          question.value = response.data.results?.[0].question;
          correctAnswer.value = response.data.results?.[0].correct_answer;
          choiceAnswers.value = response.data.results?.[0].incorrect_answers;
          choiceAnswers.value.push(correctAnswer.value);
        });
      choiceAnswers.value = shuffle(choiceAnswers.value);
    }

    function validateAnswer() {
      if (selection.value === correctAnswer.value) {
        resultMessage.value = "Correct!";
      }
      resultMessage.value = "NO!";
      getNewQuestion();
    }

    function shuffle(array) {
      let currentIndex = array.length,
        randomIndex;

      // While there remain elements to shuffle...
      while (currentIndex !== 0) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex],
          array[currentIndex],
        ];
      }

      return array;
    }

    return {
      result,
      question,
      getNewQuestion,
      correctAnswer,
      choiceAnswers,
      validateAnswer,
      isCorrectAnswer,
      selection,
      resultMessage,
    };
  },
};
</script>

<style scoped></style>

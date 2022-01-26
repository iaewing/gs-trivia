<template>
  <div>
    <div aria-label="the question">{{ question }}</div>
    <button @click="getNewQuestion">Click Me for a new question!</button>
    <div aria-label="correct answer">{{ correctAnswer }}</div>
    <div aria-label="incorrect answers">
      <div aria-label="incorrect answer">{{ wrongAnswers[0] }}</div>
      <div aria-label="incorrect answer">{{ wrongAnswers[1] }}</div>
      <div aria-label="incorrect answer">{{ wrongAnswers[2] }}</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {ref} from 'vue'

export default {
  name: "Trivia",
  setup(){
    let result = "hello";
    const question = ref(null);
    const correctAnswer = ref(null);
    const wrongAnswers = ref([]);

    async function getNewQuestion() {
      await axios.get('https://opentdb.com/api.php?amount=1')
          .then(response => {
            question.value = response.data.results?.[0].question;
            correctAnswer.value = response.data.results?.[0].correct_answer;
            wrongAnswers.value = response.data.results?.[0].incorrect_answers;
          })
    }

    return { result, question, getNewQuestion, correctAnswer, wrongAnswers }
  }


}

</script>

<style scoped>

</style>
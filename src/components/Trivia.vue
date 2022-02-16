<template>
  <div>
    <div aria-label="the question">{{ question }}</div>
    <button @click="getNewQuestion" class="text-red-600">Click Me for a new question!</button>
    <div aria-label="choices" v-for="(choice, index) in choiceAnswers" :key="index">
      <input type="radio" name="answer" id="answer{{index}}">{{ choice }}
    </div>
    <button aria-label="Submit">Submit</button>
  </div>
</template>

<script>
import axios from "axios";
import {ref} from 'vue'

export default {
  name: "Trivia",
  setup() {
    let result = "hello";
    const question = ref(null);
    const correctAnswer = ref(null);
    const choiceAnswers = ref([]);

    async function getNewQuestion() {
      await axios.get('https://opentdb.com/api.php?amount=1')
          .then(response => {
            question.value = response.data.results?.[0].question;
            correctAnswer.value = response.data.results?.[0].correct_answer;
            choiceAnswers.value = response.data.results?.[0].incorrect_answers;
            choiceAnswers.value.push(correctAnswer.value)
          })
    }

    return {result, question, getNewQuestion, correctAnswer, choiceAnswers}
  }


}

</script>

<style scoped>

</style>

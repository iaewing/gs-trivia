<template>
  <div>
    <div aria-label="the question">{{ question }}</div>
    <button @click="getNewQuestion" class="text-red-600">Click Me for a new question!</button>
    <div aria-label="Possible Answers" v-for="(choice, index) in choiceAnswers" :key="index">
      <input type="radio" name="answer" id="answer{{index}}">{{ choice }}
    </div>
    <button aria-label="Submit" @click="validateAnswer">Submit</button>
    <div aria-label="Answer Results" v-if="isSubmitted">Hi Guys</div>
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
    const isSubmitted = ref(false);

    async function getNewQuestion() {
      await axios.get('https://opentdb.com/api.php?amount=1')
          .then(response => {
            question.value = response.data.results?.[0].question;
            correctAnswer.value = response.data.results?.[0].correct_answer;
            choiceAnswers.value = response.data.results?.[0].incorrect_answers;
            choiceAnswers.value.push(correctAnswer.value)
          })
        choiceAnswers.value = shuffle(choiceAnswers.value)
    }

    function validateAnswer() {
      isSubmitted.value = true;
    }
    function shuffle(array) {
      let currentIndex = array.length,  randomIndex;

      // While there remain elements to shuffle...
      while (currentIndex !== 0) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex], array[currentIndex]];
      }

      return array;
    }

    return {result, question, getNewQuestion, correctAnswer, choiceAnswers, validateAnswer, isSubmitted}
  }


}

</script>

<style scoped>

</style>

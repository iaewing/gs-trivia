<template>
  <div>
    <button @click="getQuestions">Click Me!</button>
    <p>{{ question }}</p>
    <button @click="getNewQuestion">Click Me for a new question!</button>
  </div>
</template>

<script>
import axios from "axios";
import {onMounted, ref} from 'vue'



export default {
  name: "Trivia",
  setup(){
    let result = "hello";
    const question = ref(null);

    onMounted(() => {
      // axios.get('https://opentdb.com/api.php?amount=1')
      //     .then(response => {
      //       console.log(response);
      //       result = response.data;
      //     })
    })

    function getQuestions() {
      console.log(result);
      question.value = result.results[0].question;
      console.log(question);
    }

    function getNewQuestion() {
      axios.get('https://opentdb.com/api.php?amount=1')
          .then(response => {
            console.log(response);
            result = response.data;
          })
      question.value = result.results[0].question;
    }

    return { result, question, getQuestions, getNewQuestion }
  }


}

</script>

<style scoped>

</style>
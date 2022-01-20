<template>
  <div>
    <div aria-label="theQuestion">{{ question }}</div>
    <button @click="getNewQuestion">Click Me for a new question!</button>
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

    async function getNewQuestion() {
      // try {
      //   const {data} = await axios.get('https://opentdb.com/api.php?amount=1');
      //         console.log(data)
      //         question.value = data.results?.[0].question;
      // }
      // catch (e) {
      //   console.error(e);
      // }
      await axios.get('https://opentdb.com/api.php?amount=1')
          .then(response => {

            question.value = response.data.results?.[0].question;
            console.log(question.value)
          })
    }

    return { result, question, getNewQuestion }
  }


}

</script>

<style scoped>

</style>
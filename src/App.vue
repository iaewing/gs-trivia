<template>
  <div id="app">
    <Welcome/>
    <Trivia/>
  </div>
</template>

<script>
import Trivia from "@/components/Trivia";
import Welcome from "@/components/Welcome";

export default {
  name: 'App',
  components: {
    Trivia,
    Welcome,
  }
}
</script>

<style>

</style>

<template>
  <div id="app" class="bg-red-100 h-screen flex flex-col justify-center items-center">
    <Welcome/>
    <Trivia class="border"/>
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

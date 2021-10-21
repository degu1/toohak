<template>

  <div>
  <h1>My Quizes</h1>

  <ul>
    <li v-for="quiz in quizes" v-bind:key="quiz.quizId">{{quiz.quizName}}</li>
  </ul>
  </div>
</template>

<script>
export default {
  name: "MyQuizes",
  data: function(){
    return {
      quizes: []
    }
  },
  mounted(){
    fetch('http://127.0.0.1:3000/quiznames')
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data.quizes);
          this.quizes = data.quizes;
        });
  }

}
</script>

<style scoped>

</style>
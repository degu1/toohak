<template>
  <div id="questionContainer">
    <h1 id="quizName">Add new quiz</h1>
    <form v-on:submit="addNewQuiz">
      <label for="quizName">Quiz Name</label>
      <input type="text" v-model="quizName">
      <button>Add new question</button>
    </form>
    <form>

    </form>
    <p>{{this.quizId}}</p>
  </div>
</template>

<script>

export default {
  name: "AddQuiz",
  data: function () {
    return {
      quizName: '',
      quizId: '',
      questionAndAnswers: []
    }
  },
  methods: {
    addNewQuiz: function (){
      fetch('http://127.0.0.1:3000/quiz_name/' + this.quizName, {
        method: 'POST'
      }).then((response) => {
        response.text().then((text) => {
          let tempText = JSON.parse(text)
          this.quizId = tempText.quiz_id;
        })
      })

    }
  }

}
</script>

<style scoped>

@import '../assets/css/activeQuiz.css';

</style>

<template>

  <div>
    <h1>My Quizes</h1>

    <ul>
      <li class="quizName" v-for="quiz in quizes" v-bind:key="quiz.quiz_id" v-on:click="clickOnQuiz(quiz.quiz_id)">
        {{quiz.quiz_name }}
        <ul v-if="activeQuizId === quiz.quiz_id">
          <li v-for="question in questions"  v-bind:key="question.question_id">
            <p>{{ question.question }}</p>
            <p><input type="checkbox" id="1">{{ question.answer1 }}</p>
            <p><input type="checkbox">{{ question.answer2 }}</p>
            <p><input type="checkbox">{{ question.answer3 }}</p>
            <p><input type="checkbox">{{ question.answer4 }}</p>
          </li>
        </ul>
      </li>

    </ul>

  </div>
</template>

<script>

export default {
  name: "MyQuizes",

  data: function () {
    return {
      quizes: [],
      questions: [],
      activeQuizId: ''
    }
  },
  mounted() {
    fetch('http://127.0.0.1:3000/quiznames')
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data.quizes);
          this.quizes = data.quizes;
        });
  },

  methods: {
    clickOnQuiz: function (quiz_id) {
      this.activeQuizId = quiz_id;
      fetch('http://127.0.0.1:3000/questions/' + quiz_id)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            console.log(data.questions);
            this.questions = data.questions;
          });
    }
  },


}
</script>

<style scoped>
li {
  cursor: pointer;
}

.quizName {
  font-size: large;
}

</style>
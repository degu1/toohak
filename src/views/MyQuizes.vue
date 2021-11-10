<template>

  <div id="myquizes">
    <h1 id="myQuizName">My Quizes</h1>
    <section class="quizContainer">
      <ul class="quizName" v-for="quiz of quizes" v-bind:key="quiz.quiz_id" v-on:click="activateQuiz(quiz.quiz_id)">
        <li>
          {{ quiz.quiz_name }}
          <div v-if="quiz.quiz_id === activeQuizId">
            <button v-on:click="changeRoute(quiz.quiz_id)">Start quiz</button>
          </div>
        </li>
      </ul>
    </section>

  </div>

</template>


<script>

import router from "../router";

export default {
  name: "MyQuizes",
  data: function () {
    return {
      quizes: [],
      activeQuizId: '',
      isLoggedIn: localStorage.getItem("user_id")
    }
  },
  mounted() {
      if(this.isLoggedIn === null)
        this.$router.push({name: 'Home'})


    fetch('http://127.0.0.1:3000/quizes/users/' + localStorage.getItem("user_id"))
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data.quizes);
          this.quizes = data.quizes;
        });
  },

  methods: {
    activateQuiz: function (quiz_id) {
      this.activeQuizId = quiz_id;
    },
    changeRoute: function (quiz_id) {
      // `route` is either a string or object
      router.push("/quizes/" + quiz_id);
    }
  }
}
</script>

<style>

@import '../assets/css/myQuizes.css';

</style>
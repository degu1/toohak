<template>

  <main>
    <h1>My Quizes</h1>
    <section class="itemContainer">

        <ul v-for="quiz of quizes" v-bind:key="quiz.quiz_id" v-on:click="activateQuiz(quiz.quiz_id)">
          <li class="showQuizli">
            <p>{{ quiz.quiz_name }}</p>
            <button v-if="quiz.quiz_id === activeQuizId" v-on:click="changeRoute(quiz.quiz_id)">Start quiz</button>
          </li>
        </ul>

    </section>

  </main>

</template>


<script>

import router from "../router";

export default {
  name: "MyQuizes",
  data: function () {
    return {
      quizes: [],
      activeQuizId: '',
      get isLoggedIn() {
        return localStorage.getItem('role') || '';
      },
    }
  },
  mounted() {
    if (this.isLoggedIn === '')
      this.$router.push({name: 'Login/Register'})

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

@import '../assets/css/toohak.css';

</style>
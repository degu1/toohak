<template>

  <div id="myquizes">
    <h1>My Quizes</h1>

    <section class="quizContainer">
      <ul>
        <li class="quizName" v-for="quiz of quizes" v-bind:key="quiz.quiz_id">

          <p v-on:click="activateQuiz(quiz.quiz_id)">{{ quiz.quiz_name }}</p>

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
    activateQuiz: function (quiz_id) {
      this.activeQuizId = quiz_id;
    },
    changeRoute: function (quiz_id) {
      // `route` is either a string or object
      router.push("/quizes/" + quiz_id);
    }
  },


}
</script>

<style>

#myquizes {
  padding-top: 100px;
}

.quizContainer {
  display: flex;
  flex-direction: column;
}

.quizName {
  position: relative;
  justify-self: center;
  background-color: white;
  padding: 15px;
  width: auto;
  margin: 10px;
  border-radius: 50px;
  cursor: pointer;
}

li {
  cursor: pointer;
}

ul {
  list-style: none;
  text-align: center;
}

.quizName {
  font-size: large;
}

</style>
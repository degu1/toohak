<template>

  <div id="myquizes">
    <h1>My Quizes</h1>

    <section class="quizContainer">
      <ul class="quizName" v-for="quiz in quizes" v-bind:key="quiz.quiz_id" v-on:click="clickOnQuiz(quiz.quiz_id)">
        {{ quiz.quiz_name }}

        <li v-for="question in questions" v-bind:key="question.question_id" >
          <form v-on:submit.prevent="correctAnswers(question.correct_answer)">
            <div v-if="quiz.quiz_id === activeQuizId">
              <p>{{ question.question }}</p>
              <p><input type="radio" name="answer" value="1" v-model="test">{{ question.answer1 }}</p>
              <p><input type="radio" name="answer" value="2" v-model="test">{{ question.answer2 }}</p>
              <p><input type="radio" name="answer" value="3" v-model="test">{{ question.answer3 }}</p>
              <p><input type="radio" name="answer" value="4" v-model="test">{{ question.answer4 }}</p>
            </div>
            <button v-if="quiz.quiz_id === activeQuizId">Test</button>
          </form>
        </li>


      </ul>

    </section>
  </div>
</template>

<script>

export default {
  name: "MyQuizes",
  data: function () {
    return {
      quizes: [],
      questions: [],
      activeQuizId: '',
      chosenAnswer: '',
      test: ''
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
    },
    correctAnswers: function (question) {
      console.log(question);
      console.log(this.test);
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
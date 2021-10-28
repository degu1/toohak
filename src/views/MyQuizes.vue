<template>

  <div id="myquizes">
    <h1>My Quizes</h1>

    <section class="quizContainer">
      <ul>
        <li class="quizName" v-for="quiz of quizes" v-bind:key="quiz.quiz_id" v-on:click="activateQuiz(quiz.quiz_id)">
          {{ quiz.quiz_name }}
<!--          <p>{{ activeQuestions[questionIndex].}}</p>-->
            <div v-if="quiz.quiz_id === activeQuizId">
              <button v-on:click="activateQuestions(activeQuestions[questionIndex].question_id)">Start quiz</button>
              <form v-on:submit.prevent="checkAnswer">
                <label>{{ activeQuestions[questionIndex].question }}</label>
                <div v-for="answer of activeAnswers" v-bind:key="answer">
                  <input type="radio" name="answer" v-model="svar" :value="answer.answer">
                  {{ answer.answer }}
                </div>
                <button>Next</button>
              </form>
            </div>

        </li>
      </ul>
    </section>
    <p>score= {{ score }}</p>
  </div>

</template>


<!--<form>-->
<!--<div v-if="questionIndex < questions.length">-->
<!--  <div v-for="question of questions" v-bind:key="question.question">-->

<!--    <label>{{ questions[questionIndex].question }}</label>-->
<!--    <div v-for="answer of answers" v-bind:key="answer">-->
<!--      <div v-if="answer.question_id === questionIndex+1">-->
<!--        <input type="radio" name="answer" v-model="svar" :value="answer.answer">-->
<!--        {{ answer.answer }}-->
<!--      </div>-->
<!--    </div>-->
<!--    <button v-on:click="checkAnswer()">check</button>-->

<!--  </div>-->
<!--</div>-->
<!--</form>-->


<script>

export default {
  name: "MyQuizes",
  data: function () {
    return {
      quizes: [],
      activeQuestions: [{}],
      activeQuestion: '',
      activeAnswers: [{}],
      questionIndex: 0,
      activeQuizId: '',
      activeQuestionId: '',
      correct_answer: '',
      svar: '',
      score: 0
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
      fetch('http://127.0.0.1:3000/questions/' + quiz_id)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            console.log(data.questions);
            this.activeQuestions = data.questions;
          });

    },
    activateQuestions: function (question_id) {
      this.activeQuestionId = question_id;
      fetch('http://127.0.0.1:3000/answers/' + question_id)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            console.log(data.answers);
            this.activeAnswers = data.answers;
          });
    },
    checkAnswer: function () {

      var correctAnswer = this.activeQuestions[this.questionIndex].correct_answer;
      if (correctAnswer === this.svar) {
        this.score++;
      }
      this.questionIndex++;
      console.log(this.activeQuestions[this.questionIndex].question_id)
      this.activateQuestions(this.activeQuestions[this.questionIndex].question_id);
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
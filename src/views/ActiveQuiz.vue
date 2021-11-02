<template>
  <div id="questionContainer">
    <h1 id="quizName">{{ quiz[0].quiz_name }}</h1>
    <ul id="question" v-for="(question, qIndex) in questions" v-bind:key="question.question_id"
        v-on:load="getNewAnswers">

      <section id="questionNumberContainer"
               :class="[(scores[qIndex] === 1 ? 'questionNumberCorrectAnswer' : 'questionNumberContainer'), (scores[qIndex] === 0 ? 'questionNumberWrongAnswer' : 'questionNumberContainer')]">
        <h3>{{ qIndex + 1 }}</h3></section>
      <div v-if="questionIndex == qIndex" id="topBoarderQuestion"></div>
      <span>{{ question.question }}</span>
      <div>
        <div v-if="questionIndex == qIndex">

<!--          Ändra userId från hårdkodat till en variabel när den existerar på raden nedan-->
          <form id="answerForm" v-on:submit.prevent="checkAnswer(question.correct_answer, question.question_id, 11)">
            <li v-for="choice of choices" v-bind:key="choice.answer_id">

              <div id="answer" v-if="choice.question_id === question.question_id">
                <input type="radio" name="answer" v-model="answer" :value="choice.answer">
                {{ choice.answer }}
              </div>

            </li>
            <button v-if="questionIndex<questions.length-1">Next</button>
            <button v-if="questionIndex===questions.length-1">Finish</button>
          </form>
        </div>
      </div>

    </ul>
    <p>Score= {{ this.scores.filter(s => s === 1).length }} of {{ questions.length }}</p>

  </div>
</template>

<script>
export default {
  name: "ActiveQuiz",
  data: function () {
    return {
      quiz: [''],
      questions: [],
      questionIndex: 0,
      activateChoicesAtIndexNum: 0,
      choices: [],
      answer: '',
      scores: [''],
    }
  },
  mounted() {
    fetch('http://127.0.0.1:3000/quizes/' + this.$route.params.quiz_id)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data.quizes);
          this.quiz = data.quizes;
        });
    fetch('http://127.0.0.1:3000/questions/' + this.$route.params.quiz_id)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data.questions);
          this.questions = data.questions;
        });
    fetch('http://127.0.0.1:3000/answers/' + this.$route.params.quiz_id)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data.answers);
          this.choices = data.answers;
        });
  },
  methods: {
    checkAnswer: function (correctAnswer, questionId, userId) {
      let rightOrWrong = 0;
      if (correctAnswer === this.answer) {
        rightOrWrong = 1;
        this.scores[this.questionIndex] = 1;
      } else {
        this.scores[this.questionIndex] = 0;
      }
      this.questionIndex++;
      var jsonBody = '{"result":' + rightOrWrong + ', "question_id":' + questionId + ', "user_id":' + userId + '}'

      fetch('http://127.0.0.1:3000/result/', {
        method: 'POST',
        body: jsonBody,
        headers: {'Content-Type': 'application/json'}
      })
    },

    getNewAnswers: function () {

    },
    nextQuestion: function () {
      this.questionIndex++;

      this.getNewAnswers();
    }
  }
}
</script>

<style scoped>

@import '../assets/css/activeQuiz.css';

</style>
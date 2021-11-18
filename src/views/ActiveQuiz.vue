<template>
  <main>
    <h1>{{ quiz[0].quiz_name }}</h1>
    <ul class="itemContainer" id="activeQuestionContainer" v-for="(question, qIndex) in questions"
        v-bind:key="question.question_id">

      <section id="questionNumber"
               :class="[(scores[qIndex] === 1 ? 'questionNumberCorrectAnswer' : 'questionNumberContainer'),
               (scores[qIndex] === 0 ? 'questionNumberWrongAnswer' : 'questionNumberContainer')]">
        <h3>{{ qIndex + 1 }}</h3></section>
      <div v-if="questionIndex == qIndex" id="topOfQuestionContainer"></div>
      <p>{{ question.question }}</p>
      <div>
        <div v-if="questionIndex == qIndex">

          <form id="activeQuestionForm"
                v-on:submit.prevent="checkAnswer(question.correct_answer, question.question_id, userId)">
            <li v-for="choice of choices" v-bind:key="choice.answer_id">

              <div id="choices" v-if="choice.question_id === question.question_id">
                <input type="radio" name="answer" v-model="answer" :value="choice.answer" checked="checked">
                {{ choice.answer }}
              </div>

            </li>
            <button v-if="questionIndex<questions.length-1">Next</button>
            <button v-if="questionIndex===questions.length-1" v-on:click="gradeQuiz">Finish</button>
          </form>
        </div>
      </div>
    </ul>

    <div v-if="questionIndex === questions.length">
      <p v-if="passing">Congratulations you have passed the quiz!!</p>
      <p v-if="passing">Score= {{ this.scores.filter(s => s === 1).length }} of {{ questions.length }}</p>
      <p v-if="!passing">You have not passed the quiz.</p>
    </div>

  </main>
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
      sumOfResults: {'user_id': '', 'results': []},
      passing: '',
      get userId() {
        return localStorage.getItem('user_id')
      }
    }
  },
  mounted() {
    if (this.isLoggedIn === null)
      this.$router.push({name: 'Login/Register'})

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
    gradeQuiz: function () {
      let numberOfPointsNeeded = Math.round(this.questions.length * (this.quiz[0].quiz_passing / 100))

      if (numberOfPointsNeeded <= this.scores.filter(s => s === 1).length) {
        this.passing = true
      }

      let jsonBody = JSON.stringify(this.sumOfResults)

      fetch('http://127.0.0.1:3000/results/', {
        method: 'POST',
        body: jsonBody,
        headers: {'Content-Type': 'application/json'}
      })

    },
    checkAnswer: function (correctAnswer, questionId) {
      let rightOrWrong = 0;

      if (correctAnswer === this.answer) {
        rightOrWrong = 1;
        this.scores[this.questionIndex] = 1;
      } else {
        this.scores[this.questionIndex] = 0;
      }

      this.sumOfResults.results.push({'question_id': questionId, 'result': rightOrWrong})

      if (this.sumOfResults.user_id === '') {
        this.sumOfResults.user_id = this.userId
      }

      this.questionIndex++;

    }
  }
}
</script>

<style scoped>

@import '../assets/css/toohak.css';

</style>
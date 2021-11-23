<template>
  <main>

    <transition name="error">
      <ErrorMessage v-if="showError" v-bind:error-message="this.message"></ErrorMessage>
    </transition>
    <transition name="success">
      <SuccessMessage v-if="showSuccess" v-bind:success-message="this.message"></SuccessMessage>
    </transition>

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
            <li v-for="(answer, cIndex) of answers" v-bind:key="answer.answer_id">

              <div id="choices" v-if="answer.question_id === question.question_id">
                <input type="radio" name="answer" v-model="userInput" :value="answer.answer" v-bind:id="cIndex">
                {{ answer.answer }}
              </div>

            </li>
            <button v-if="questionIndex<questions.length-1">Next</button>
            <button v-if="questionIndex===questions.length-1">Finish</button>
          </form>
        </div>
      </div>
    </ul>

  </main>
</template>

<script>

import ErrorMessage from "../components/ErrorMessage";
import SuccessMessage from "../components/SuccessMessage";

export default {
  name: "ActiveQuiz",
  components: {SuccessMessage, ErrorMessage},
  data: function () {
    return {
      quiz: [''],
      questions: [],
      questionIndex: 0,
      activateChoicesAtIndexNum: 0,
      answers: [],
      userInput: '',
      scores: [''],
      sumOfResults: {'user_id': '', 'results': []},
      message: '',
      showError: false,
      showSuccess: false,
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
          this.answers = data.answers;
        });
  },
  methods: {
    submitAnswers: function () {
      let jsonBody = JSON.stringify(this.sumOfResults)

      fetch('http://127.0.0.1:3000/results/', {
        method: 'POST',
        body: jsonBody,
        headers: {'Content-Type': 'application/json'}
      }).then(() => {
        this.triggerSuccessMessage('Thank you for successfully finish the Quiz')
      })
    },
    checkAnswer: function (correctAnswer, questionId) {
      let rightOrWrong = 0;

      if (this.userInput === '') {
        this.triggerErrorMessage('You need to make a choice.')
      } else {
        if (correctAnswer === this.userInput) {
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
        this.userInput = '';

        if (this.questions.length === this.sumOfResults.results.length) {
          this.submitAnswers()
        }

      }
    },
    triggerErrorMessage: function (message) {
      this.showError = true;
      this.message = message
      setTimeout(() => this.showError = false, 3000)
    },
    triggerSuccessMessage: function (message) {
      this.showSuccess = true;
      this.message = message
      setTimeout(() => this.showSuccess = false, 3000)
    }
  }
}
</script>

<style scoped>

.error-enter-active {
  animation: error-fade-show 0.5s ease;
}

.error-leave-active {
  animation: fade-leave 0.5s ease;
}

.success-enter-active {
  animation: success-fade-show 0.5s ease;
}

.success-leave-active {
  animation: fade-leave 0.5s ease;
}

@keyframes error-fade-show {
  0% {
    transform: translateY(-100px);
    opacity: 0
  }
  50% {
    transform: translateY(0);
    opacity: 1
  }
  60% {
    transform: translateX(8px);
  }
  70% {
    transform: translateX(-8px);
  }
  80% {
    transform: translateX(4px);
  }
  90% {
    transform: translateX(-4px);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes success-fade-show {
  0% {
    transform: translateY(-100px);
    opacity: 0
  }
  100% {
    transform: translateY(0);
    opacity: 1
  }
}

@keyframes fade-leave {
  0% {
    transform: translateY(0);
    opacity: 1
  }
  100% {
    transform: translateY(-100px);
    opacity: 0
  }
}

@import '../assets/css/toohak.css';

</style>
<template>
  <main>

    <transition name="error">
      <ErrorMessage v-if="showError" v-bind:error-message="this.message"></ErrorMessage>
    </transition>
    <transition name="success">
      <SuccessMessage v-if="showSuccess" v-bind:success-message="this.message"></SuccessMessage>
    </transition>

    <div v-if="activeQuizName == ''" class="itemContainer">
      <h1>Add new quiz</h1>
      <form class="editForm" v-on:submit.prevent="addNewQuiz(); updateQuizes()">

        <input type="text" v-model="quizName" placeholder="Quiz name...">
        <button>Add quiz</button>

      </form>

      <h2>Your quizes</h2>
      <ul v-for="(quiz, qIndex) in quizes" v-bind:key="quiz.quiz_id">
        <li class="editItemContainer">
          <p>{{ quiz.quiz_name }}</p>
          <img class="editBtn" src="../assets/edit-btn.svg" v-on:click="setActiveQuizId(quiz), getQuestions()">
          <img class="deleteBtn" src="../assets/delete-btn.svg" v-on:click="removeQuiz(quiz.quiz_id, qIndex)">
        </li>
      </ul>
    </div>


    <div v-if="activeQuizName!= ''" class="itemContainer">
      <form class="editForm" v-on:submit.prevent="checkInput(); addNewQuestion()">
        <h1>{{ this.activeQuizName }}</h1>
        <section class="formAddItemContainer">
          <label for="questionName"></label>
          <input type="text" id="questionName" v-model="question" placeholder="Question...">
        </section>

        <section class="formAddItemContainer">
          <input type="text" placeholder="Choice 1" v-model="choiceOne">
          <input type="text" placeholder="Choice 2" v-model="choiceTwo">
          <input type="text" placeholder="Choice 3" v-model="choiceThree">
          <input type="text" placeholder="Choice 4" v-model="choiceFour">
        </section>

        <section class="formAddItemContainer">
          <input type="text" v-model="rightAnswer" placeholder="Right answer...">
        </section>

        <button>Add question</button>
      </form>


      <h2>Questions</h2>
      <ul>
        <section v-if="this.activeQuestions.length != 0">

          <li class="questionList" v-for="(question, qIndex) in activeQuestions" v-bind:key="question.question_id">
            <p style="grid-area: questionTitle">{{ question.question }}</p>
            <img class="deleteBtn" src="../assets/delete-btn.svg"
                 v-on:click="removeQuestion(question.question_id, qIndex)">
          </li>

        </section>
        <section v-if="this.activeQuestions.length === 0">
          <p>No questions added yet!</p>
        </section>
      </ul>

      <!--------------------------------------->

      <h2>Percent to pass the quiz</h2>
      <section id="percentageContainer">
        <p v-if="percentToPass!=''">{{ this.percentToPass }}%</p>
        <input type="range" v-model="percentToPass">
      </section>
      <button v-on:click="changeGrading">Change grading</button>
      <button v-on:click="activeQuizName=''; updateQuizes();">Back</button>
    </div>

  </main>
</template>

<script>

import ErrorMessage from "../components/ErrorMessage";
import SuccessMessage from "../components/SuccessMessage";

export default {
  name: "Add Quiz",
  data: function () {

    return {
      quizName: '',
      message: '',
      quizId: 0,
      question: '',
      choiceOne: '',
      choiceTwo: '',
      choiceThree: '',
      choiceFour: '',
      choices: [],
      rightAnswer: '',
      jsonBody: '',
      quizes: [],
      activeQuizId: '',
      activeQuizName: '',
      activeQuestions: [],
      percentToPass: '',
      showError: false,
      showSuccess: false,
      get loggedInRole() {
        return localStorage.getItem('role') || '';
      }
    }
  }, mounted() {
    if (this.loggedInRole === '')
      this.$router.push({name: 'Login/Register'})
    if (this.loggedInRole === 'student')
      this.$router.push({name: 'My Quizes'})

    this.updateQuizes();
  },
  methods: {
    updateQuizes: function () {
      fetch('http://127.0.0.1:3000/quizes')
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            console.log(data.quizes);
            this.quizes = data.quizes;
          })
    },
    changeGrading: function () {
      fetch('http://127.0.0.1:3000/passing/' + this.activeQuizId + '/' + this.percentToPass, {
        method: 'PUT'
      })
      this.triggerSuccessMessage('Successfully changed grading!')
    },
    removeQuiz: function (quizId, index) {
      fetch('http://127.0.0.1:3000/quizes/' + quizId, {
        method: 'DELETE'
      })
      this.triggerSuccessMessage('Successfully removed quiz!')
      this.quizes.splice(index, 1)
    },
    removeQuestion: function (questionId, index) {
      fetch('http://127.0.0.1:3000/questions/' + questionId, {
        method: 'DELETE'
      })
      this.triggerSuccessMessage('Successfully removed question!')
      this.activeQuestions.splice(index, 1)
    },
    addNewQuiz: function () {
      fetch('http://127.0.0.1:3000/quiz_name/' + this.quizName.charAt(0).toUpperCase() + this.quizName.substring(1), {
        method: 'POST'
      }).then((response) => {
        if(response.status === 200){
          response.text().then((text) => {
            let tempText = JSON.parse(text)
            this.quizId = tempText.quiz_id;
            this.triggerSuccessMessage('Successfully added quiz!')
          })
        }else if(response.status === 403){
          this.triggerErrorMessage('There is already a Quiz with that name.')
        }else {
          this.triggerErrorMessage("Something went wrong.")
        }
      })

      //this.insertChoices();
      //this.addNewQuestion();
    },
    addNewQuestion: function () {

      var question = {
        quiz_id: this.activeQuizId,
        question: this.question,
        correct_answer: this.rightAnswer,
        answers: [{"answer": this.choiceOne}, {"answer": this.choiceTwo}, {"answer": this.choiceThree}, {"answer": this.choiceFour}]
      }

      if (this.correctInput) {
        var jsonQuestion = JSON.stringify(question);
        console.log(jsonQuestion)
        fetch('http://127.0.0.1:3000/quiz_question/', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: jsonQuestion
        })

        this.question = ''
        this.choices = [];
        this.rightAnswer = ''
        this.message = ''

        this.triggerSuccessMessage('Successfully added question!')
      }
      setTimeout(this.getQuestions, 10)

    },
    setActiveQuizId: function (quiz) {
      this.activeQuizId = quiz.quiz_id
      this.activeQuizName = quiz.quiz_name
      this.percentToPass = quiz.quiz_passing;
    },
    getQuestions: function () {
      fetch('http://127.0.0.1:3000/questions/' + this.activeQuizId)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            console.log(data.questions);
            this.activeQuestions = data.questions;
          });
    },
    checkInput: function () {
      if (this.question === '') {
        this.correctInput = false;
        this.triggerErrorMessage('You need to write a question name.')
      } else if (!(this.choices.includes(this.rightAnswer))) {
        this.correctInput = false;
        this.triggerErrorMessage('Right answer does not match any of the choices.')
      } else if (this.choices.filter(c => c !== '').length < 2) {
        this.correctInput = false;
        this.triggerErrorMessage('You need at least two choices.')
      } else {
        this.correctInput = true;
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
  },


}
</script>

<style>

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

.list-enter-active {
  animation: test 0.5s ease;
}

@keyframes test {
  0% {opacity: 0; transform: scale(0.6)}
  100% {opacity: 1; transform: scale(1)}
}


@import '../assets/css/toohak.css';

</style>

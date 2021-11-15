<template>
  <main>

    <div v-if="activeQuizName == ''" class="itemContainer">
      <h1>Add new quiz</h1>
      <form class="editForm" v-on:submit.prevent="addNewQuiz">

        <input type="text" v-model="quizName" placeholder="Quiz name...">
        <button v-on:click="updateQuizes()">Add quiz</button>

      </form>

      <h2>Your quizes</h2>
      <ul v-for="(quiz, qIndex) in quizes" v-bind:key="quiz.quiz_id">
        <li class="editItemContainer">
          <p>{{ quiz.quiz_name }}</p>
          <img id="editBtn" src="../assets/edit-btn.svg" v-on:click="setActiveQuizId(quiz), getQuestions()" >
          <img class="deleteBtn" src="../assets/delete-btn.svg" v-on:click="removeQuiz(quiz.quiz_id, qIndex)">
        </li>
      </ul>
    </div>



    <div v-if="activeQuizName!= ''" class="itemContainer">
      <form class="editForm" v-on:submit.prevent="addNewQuestion">
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
          <li id="questionList" v-for="(question, qIndex) in activeQuestions" v-bind:key="question.question_id">
            <p>{{ question.question }}</p>
            <img class="deleteBtn" src="../assets/delete-btn.svg" v-on:click="removeQuestion(question.question_id, qIndex)">
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

export default {
  name: "Add Quiz",
  data: function () {

    return {
      quizName: '',
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
      get loggedInRole() {
        return localStorage.getItem('role') || '';
      },

    }
  }, mounted() {
    if(this.loggedInRole === '')
      this.$router.push({name: 'Login/Register'})
    if(this.loggedInRole === 'student')
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
    },
    removeQuiz: function (quizId, index) {
      fetch('http://127.0.0.1:3000/quizes/' + quizId, {
        method: 'DELETE'
      })
      this.quizes.splice(index, 1)
    },
    removeQuestion: function (questionId, index) {
      fetch('http://127.0.0.1:3000/questions/' + questionId, {
        method: 'DELETE'
      })
      this.activeQuestions.splice(index, 1)
    },
    addNewQuiz: function () {
      fetch('http://127.0.0.1:3000/quiz_name/' + this.quizName.toUpperCase(), {
        method: 'POST'
      }).then((response) => {
        response.text().then((text) => {
          let tempText = JSON.parse(text)
          this.quizId = tempText.quiz_id;
        })
      })

      //this.insertChoices();
      //this.addNewQuestion();
    },

    insertChoices: function () {

      this.choices.push(this.choiceOne)
      this.choices.push(this.choiceTwo)
      this.choices.push(this.choiceThree)
      this.choices.push(this.choiceFour)

    },
    addNewQuestion: function () {
      this.choices = []
      this.insertChoices()


      var question = {
        quiz_id: this.activeQuizId,
        question: this.question,
        correct_answer: this.rightAnswer,
        answers: [{"answer": this.choiceOne}, {"answer": this.choiceTwo}, {"answer": this.choiceThree}, {"answer": this.choiceFour}]
      }
      var jsonQuestion = JSON.stringify(question);
      console.log(jsonQuestion)
      fetch('http://127.0.0.1:3000/quiz_question/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: jsonQuestion
      })

      setTimeout(this.getQuestions, 10)
      this.question = ''
      this.choiceOne = ''
      this.choiceTwo = ''
      this.choiceThree = ''
      this.choiceFour = ''
      this.rightAnswer = ''
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
    }
  },


}
</script>

<style>

@import '../assets/css/toohak.css';

</style>

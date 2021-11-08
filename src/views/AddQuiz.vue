<template>
  <div id="questionContainer">
    <h1 id="quizName">Add new quiz</h1>
    <form v-on:submit.prevent="addNewQuiz">
      <label for="quizName">Quiz Name</label>
      <input type="text" v-model="quizName">
      <button v-on:click="updateQuizes()">Add quiz</button>
    </form>
    <ul>
      <li v-for="quiz in quizes" v-bind:key="quiz.quiz_id" v-on:click="setActiveQuizId(quiz), getQuestions()">
        {{ quiz.quiz_name }}
      </li>
    </ul>
    <form v-on:submit.prevent="addNewQuestion">
      <p>Quiz id: {{ activeQuizId }}</p>
      <label for="questionName">Question</label>
      <input type="text" id="questionName" v-model="question">

      <label for="choices">Choices</label>
      <input type="text" placeholder="Choice 1" id="choices" v-model="choiceOne">
      <input type="text" placeholder="Choice 2" v-model="choiceTwo">
      <input type="text" placeholder="Choice 3" v-model="choiceThree">
      <input type="text" placeholder="Choice 4" v-model="choiceFour">

      <label for="rightAnswer">Right answer</label>
      <input type="text" id="rightAnswer" v-model="rightAnswer">

      <button>Add question</button>
    </form>
    <ul>
      <li v-for="question in activeQuestions" v-bind:key="question.question_id">
        {{question.question}}
      </li>
    </ul>

  </div>
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
      activeQuestions: []

    }
  }, mounted() {
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
    updateQuizes: function () {
      fetch('http://127.0.0.1:3000/quiznames')
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            console.log(data.quizes);
            this.quizes = data.quizes;
          })
    },

    addNewQuiz: function () {
      fetch('http://127.0.0.1:3000/quiz_name/' + this.quizName, {
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


        setTimeout(this.getQuestions,10)
      this.question = ''
      this.choiceOne = ''
      this.choiceTwo = ''
      this.choiceThree = ''
      this.choiceFour = ''
      this.rightAnswer = ''
    },
    setActiveQuizId: function (quiz) {
      this.activeQuizId = quiz.quiz_id
    },
    getQuestions: function (){
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

<style scoped>

@import '../assets/css/activeQuiz.css';

</style>

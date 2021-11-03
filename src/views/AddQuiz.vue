<template>
  <div id="questionContainer">
    <h1 id="quizName">Add new quiz</h1>
    <form v-on:submit.prevent="addNewQuiz">
      <label for="quizName">Quiz Name</label>
      <input type="text" v-model="quizName">

      <label for="questionName">Question</label>
      <input type="text" id="questionName" v-model="question">

      <label for="choices">Choices</label>
      <input type="text" placeholder="Choice 1" id="choices" v-model="choiceOne">
      <input type="text" placeholder="Choice 2" v-model="choiceTwo">
      <input type="text" placeholder="Choice 3" v-model="choiceThree">
      <input type="text" placeholder="Choice 4" v-model="choiceFour">

      <label for="rightAnswer">Right answer</label>
      <input type="text" id="rightAnswer" v-model="rightAnswer">

      <button>Add quiz</button>
    </form>
    <p>{{ this.quizId }}</p>

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
      jsonBody: ''
    }
  },
  methods: {
    addNewQuiz: async function () {
      fetch('http://127.0.0.1:3000/quiz_name/' + this.quizName, {
        method: 'POST'
      }).then((response) => {
        response.text().then((text) => {
          let tempText = JSON.parse(text)
          this.quizId = tempText.quiz_id;
        })
      })

      this.insertChoices();


      this.parseJsonBody();

    },
    insertChoices: function () {
      this.choices.push(this.choiceOne)
      this.choices.push(this.choiceTwo)
      this.choices.push(this.choiceThree)
      this.choices.push(this.choiceFour)
    },
    parseJsonBody: async function () {
      var question =  { quiz_id: this.quizId, question: this.question, correct_answer: this.rightAnswer, answers: [this.choices]}
      var jsonQuestion = JSON.stringify(question);
      console.log(jsonQuestion)
      fetch('http://127.0.0.1:3000/quiz_question/',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: jsonQuestion
      })
    }

  }

}
</script>

<style scoped>

@import '../assets/css/activeQuiz.css';

</style>

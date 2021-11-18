<template>
  <main>
    <div v-if="activeClassName === ''" class="itemContainer">
      <h1>Add new class</h1>

      <form class="editForm" v-on:submit.prevent="addNewClass">
        <input type="text" v-model="className" placeholder="Class name...">
        <button v-on:click="updateClasses()">Add class</button>
      </form>

      <h2>Your classes</h2>
      <ul v-for="(c, cIndex) in classes" v-bind:key="c.classes_id">
        <li class="editItemContainer">
          <p>{{ c.classes_name }}</p>
          <img class="editBtn" src="../assets/edit-btn.svg"
               v-on:click="setActiveClassId(c), getStudents(), getQuizes()">
          <img class="deleteBtn" src="../assets/delete-btn.svg" v-on:click="removeClass(c.classes_id, cIndex)">
        </li>
      </ul>
    </div>

    <div v-if="activeClassName!= ''" class="itemContainer">
      <h1>{{ this.activeClassName }}</h1>

      <!--      Students      -->

      <h2>Students</h2>
      <ul>
        <section v-if="this.activeStudents.length != 0">
          <li class="questionList" v-for="(student, sIndex) in activeStudents" v-bind:key="student.user_id">
            <div>
              <p style="padding: 0">{{ student.user_username }}</p>
              <p style="font-weight: 300; font-size: 0.8em;padding: 0 0 5px 0">{{ student.user_role }}</p>
            </div>
            <img class="deleteBtn" src="../assets/delete-btn.svg" v-on:click="removeStudent(student.user_id, sIndex)">
          </li>
        </section>
        <section v-if="this.activeStudents.length === 0">
          <p>No students added yet!</p>
        </section>
      </ul>

      <button v-on:click="searchOpen(); showStudents();">Add new student</button>

      <div class="searchContainer" v-on:click="searchClose">
        <div v-if="this.addStudent" class="itemContainer">
          <input type="search" placeholder="Search for student..." v-model="searchStudent">
          <ul style="max-height: 1000px; overflow-y: auto;">
            <section>

              <li class="questionList" v-for="(user, uIndex) in users" v-bind:key="user.user_id">
                <p v-if="user.user_username.toLowerCase().includes(searchStudent.toLowerCase()) && activeStudents.map(s => s.user_username).filter(u => u === user.user_username).length === 0">
                  {{ user.user_username }}</p>
                <img
                    v-if="user.user_username.toLowerCase().includes(searchStudent.toLowerCase()) && activeStudents.map(s => s.user_username).filter(u => u === user.user_username).length === 0"
                    class="addStudentBtn"
                    src="../assets/edit-btn.svg" v-on:click="addStudentToClass(user.user_id, uIndex)">
              </li>
            </section>
          </ul>
        </div>
      </div>

      <!--      Quizes       -->

      <div>
        <h2>Quizes</h2>
        <ul>
          <li class="questionList" v-for="(quiz, qIndex) in activeQuizConnections" v-bind:key="quiz.quiz_id">
            <p>{{ quiz.quiz_name }}</p>
            <img class="deleteBtn" src="../assets/delete-btn.svg" v-on:click="removeQuiz(quiz.quiz_id, qIndex)">
          </li>
        </ul>
      </div>

      <button v-on:click="searchOpen(); showQuizes();">Add new quiz</button>
      <div class="searchContainer" v-on:click="searchClose">
        <div class="itemContainer">
          <input type="search" placeholder="Search for quiz..." v-model="searchQuiz">
          <ul style="max-height: 1000px; overflow-y: auto;">
            <section>
              <li class="questionList" v-for="(quiz, qIndex) in quizes" v-bind:key="quiz.quiz_id">
                <p v-if="quiz.quiz_name.toLowerCase().includes(searchQuiz.toLowerCase()) && activeQuizConnections.map(q => q.quiz_id).filter(i => i === quiz.quiz_id).length === 0">
                  {{ quiz.quiz_name }}</p>
                <img
                    v-if="quiz.quiz_name.toLowerCase().includes(searchQuiz.toLowerCase()) && activeQuizConnections.map(q => q.quiz_id).filter(i => i === quiz.quiz_id).length === 0"
                    class="addStudentBtn"
                    src="../assets/edit-btn.svg" v-on:click="addStudentToClass(quiz.quiz_id, qIndex)">
              </li>
            </section>
          </ul>
        </div>
      </div>
      <button v-on:click="activeClassName=''; activeClassId=''; addStudent=false; addQuizes=false; updateClasses()">
        Back
      </button>
    </div>
  </main>
</template>

<script>

export default {
  name: "ClassSetup",
  data: function () {
    return {
      className: '',
      classes: [''],
      activeClassId: '',
      activeClassName: '',
      activeStudents: [''],
      users: [''],
      quizes: [''],
      searchStudent: '',
      searchQuiz: '',
      addStudent: false,
      addQuizes: false,
      activeQuizConnections: [],
      showSeachContainer: false
    }
  },
  mounted() {
    fetch('http://127.0.0.1:3000/classes/')
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data.classes);
          this.classes = data.classes;
        });
    fetch('http://127.0.0.1:3000/users/')
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data.users);
          this.users = data.users;
        });
    fetch('http://127.0.0.1:3000/quizes/')
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data.quizes);
          this.quizes = data.quizes;
        });
  },
  methods: {
    updateClasses: function () {
      fetch('http://127.0.0.1:3000/classes/')
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            console.log(data.classes);
            this.classes = data.classes;
          });
    },
    removeClass: function (classId, index) {
      fetch('http://127.0.0.1:3000/classes/' + classId, {
        method: 'DELETE'
      })
      this.classes.splice(index, 1)
    },
    addNewClass: function () {
      fetch('http://127.0.0.1:3000/classes/' + this.className.charAt(0).toUpperCase() + this.className.substring(1), {
        method: 'POST'
      })
    },
    setActiveClassId: function (c) {
      this.activeClassId = c.classes_id
      this.activeClassName = c.classes_name
    },
    getStudents: function () {
      fetch('http://127.0.0.1:3000/students/' + this.activeClassId)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            console.log(data.students);
            this.activeStudents = data.students;
          });
    },
    getQuizes: function () {
      fetch('http://127.0.0.1:3000/classes_quizes/' + this.activeClassId)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            console.log(data.quizes);
            this.activeQuizConnections = data.quizes;
          });
    },
    showStudents: function () {
      this.addStudent = true;
      this.addQuizes = false;
    },
    showQuizes: function () {
      this.addQuizes = true;
      this.addStudent = false;
    },
    removeStudent: function (userId, index) {
      fetch('http://127.0.0.1:3000/classes_users/' + this.activeClassId + '/' + userId, {
        method: 'DELETE'
      })
      this.activeStudents.splice(index, 1)
    },
    addStudentToClass: function (userId, index) {
      fetch('http://127.0.0.1:3000/classes_users/' + this.activeClassId + '/' + userId, {
        method: 'POST',
      })
      this.activeStudents.push(this.users[index])
    },
    removeQuiz: function (quizId, index) {
      fetch('http://127.0.0.1:3000/classes_quizes/' + this.activeClassId + '/' + quizId, {
        method: 'DELETE'
      })
      this.activeQuizConnections.splice(index, 1)
    },
    searchOpen: function () {
      const searchContainer = document.querySelector('.searchContainer');
      searchContainer.classList.add('show');
    }
    ,
    searchClose: function (event) {
      const searchContainer = document.querySelector('.searchContainer');
      const input = document.querySelector('input');
      const ul = document.querySelector('ul');

      if (input.className !== event.target.className || ul.className !== event.target.className)
        searchContainer.classList.remove('show')

      this.searchStudent = ''
      this.searchQuiz = ''
    }
  }
}
</script>

<style scoped>
@import '../assets/css/toohak.css';
</style>
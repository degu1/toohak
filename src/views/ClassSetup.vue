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
          <img class="editBtn" src="../assets/edit-btn.svg" v-on:click="setActiveClassId(c), getStudents()">
          <img class="deleteBtn" src="../assets/delete-btn.svg" v-on:click="removeClass(c.classes_id, cIndex)">
        </li>
      </ul>
    </div>

    <div v-if="activeClassName!= ''" class="itemContainer">
      <h1>{{ this.activeClassName }}</h1>


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

      <button type="button" v-on:click="showStudents">Add new student</button>
      <div v-if="this.addStudent">
        <input type="search" placeholder="Search for student..." v-model="search">
        <ul style="max-height: 1000px; overflow-y: auto;">
          <section>
            <li class="questionList" v-for="user in users" v-bind:key="user.user_id">
              <p v-if="user.user_username.toLowerCase().includes(search.toLowerCase())">{{ user.user_username }}</p>
              <img v-if="user.user_username.toLowerCase().includes(search.toLowerCase())" class="addStudentBtn"
                   src="../assets/edit-btn.svg" v-on:click="addStudentToClass(user.user_id)">
            </li>
          </section>
        </ul>
      </div>

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
      search: '',
      addStudent: false
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
    showStudents: function () {
      this.addStudent = true;
    }
  }
}
</script>

<style scoped>

</style>
<template>
<div class="addFam">

<center>
<div class="addSection">

  <div class="heading">
      <div class="box">1</div>
      <h1>Add Family Member</h1>
  </div>

  <div class="add">
      <div class="form">
        <textarea v-model="fullName" placeholder="Full Name"></textarea>
        <p></p>
        <textarea v-model="location" placeholder="Current City, State"></textarea>
        <p></p>
        <textarea v-model="birthday" placeholder="Birthday (e.g. October 8th)"></textarea>
        <p></p>
        <input type="file" name="profilePhoto" @change="fileChanged">
        <p></p>
        <button @click="upload">Upload</button>
      </div>

      <div class="upload" v-if="addPerson">
        <h2>{{addPerson.fullName}}</h2>
        <p>{{addPerson.location}}</p>
        <p>{{addPerson.birthday}}</p>
        <img :src="addPerson.peoplePath" />
      </div>
    </div>
</div>


<div class="editSection">

    <div class="heading">
      <div class="box">2</div>
      <h1>Edit/Delete Family List</h1>
    </div>
    <div class="edit">
      <div class="form">
        <input v-model="findName" placeholder="Search">
        <div class="suggestions" v-if="suggestions.length > 0">
          <div class="suggestion" v-for="s in suggestions" :key="s.id" @click="selectPerson(s)">{{s.fullName}}
          </div>
        </div>
      </div>


      <div class="display">
      <center>
        <div class="upload" v-if="findPerson">
            <textarea v-model="findPerson.fullName"></textarea>
          <p></p>
            <textarea v-model="findPerson.location"></textarea>
          <p></p>
            <textarea v-model="findPerson.birthday"></textarea>
          <p></p>
          <img :src="findPerson.peoplePath" />
        </div>
      </center>
      </div>
      <div class="actions" v-if="findPerson">
        <button @click="editPerson(findPerson)">Edit</button>
        <button @click="deletePerson(findPerson)">Delete</button>
      </div>
    </div>


</div>
</center>

</div>
</template>






<script>
import axios from 'axios';
export default {
  name: 'People',
  data() {
    return {
      fullName: "",
      location: "",
      birthday: "",
      file: null,
      addPerson: null,
      peopleList: [],
      findName: "",
      findPerson: null,
    }
  },
  computed: {
     suggestions() {
       let peopleList = this.peopleList.filter(person => person.fullName.toLowerCase().startsWith(this.findName.toLowerCase()));
       return peopleList.sort((a, b) => a.fullName > b.fullName);
     }
   },
  created() {
    this.getPeople();
  },
  methods: {
    fileChanged(event) {
      this.file = event.target.files[0]
    },
    async upload() {
        const formData = new FormData();
        formData.append('profilePhoto', this.file, this.file.fullName, this.file.location, this.file.birthday)
        let r1 = await axios.post('/api/people', formData);
        let r2 = await axios.post('/api/peopleList', {
          fullName: this.fullName,
          location: this.location,
          birthday: this.birthday,
          peoplePath: r1.data.peoplePath,
        });
        this.addPerson = r2.data;
    },
    async getPeople() {
        let response = await axios.get("/api/peopleList");
        this.peopleList = response.data;
        return true;
    },
    selectPerson(person) {
      this.findName = "";
      this.findPerson = person;
   },
   async deletePerson(person) {
       await axios.delete("/api/peopleList/" + person._id);
       this.findPerson = null;
       this.getPeople();
       return true;
   },
   async editPerson(person) {

        await axios.put("/api/peopleList/" + person._id, {
          fullName: this.findPerson.fullName,
          birthday: this.findPerson.birthday,
          location: this.findPerson.location,
        });
        this.findPerson = null;
        this.getPeople();
        return true;
    },
  },
}
</script>









<style scoped>
.image h1 {
  font-style: italic;
  font-size: 1em;
}

.image p {
  font-size: .5em;
}

.heading {
  display: flex;
  margin-bottom: 20px;
  margin-top: 20px;
}

.heading h1 {
  margin-top: 8px;
  margin-left: 10px;
}

.add,
.edit, {
  display: flex;
  justify-content: center;
  align-content:center;
}

.display{
  padding: 10px;
}

.addSection,
.editSection {
  background: #1c3738;
  margin: 60px;
  padding: 30px;
  color: #fff;
  width: 50%;
}

.box {
  width: 18px;
  height: 18px;
  padding: 8px;
  background: #84a9c0;
  color: #fff;
  text-align: center;
}


/* Form */
input,
textarea,
select,
button,
.description {
  font-family: 'Montserrat', sans-serif;
  font-size: 1em;
}

.description {
  font-size: .5em;
}

.form {
  margin-right: 50px;
}

/* Uploaded images */
.upload h2 ,
.upload p {
  margin: 0px;
}

.upload img {
  max-width: 300px;
}




/* Suggestions */
.suggestions {
  width: 200px;
  border: 1px solid #ccc;
}

.suggestion {
  min-height: 20px;
}

.suggestion:hover {
  background-color: #5BDEFF;
  color: #fff;
}








</style>

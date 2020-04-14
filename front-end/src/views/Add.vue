<template>
<div class="addFam">

<center>
<div class="addSection">

  <div class="heading">
    <div class="box">1</div>
    <h1>Add Photo</h1>
  </div>

  <div class="add">
      <div class="form">
        <input v-model="title" placeholder="Title">
        <p></p>
        <textarea v-model="people" placeholder="People in Photo"></textarea>
        <p></p>
        <textarea v-model="description" placeholder="Description"></textarea>
        <p></p>
        <input type="file" name="photo" @change="fileChanged">
              <p></p>
        <button @click="upload">Upload</button>
      </div>

      <div class="upload" v-if="addItem">
        <h2>{{addItem.title}}</h2>
        <p>{{addItem.people}}</p>
        <p>{{addItem.description}}</p>
        <img :src="addItem.path" />
      </div>
    </div>
</div>


<div class="editSection">

<div class="heading">
  <div class="box">2</div>
  <h1>Edit Post</h1>
</div>

    <div class="edit">
      <div class="form">
        <input v-model="findTitle" placeholder="Search">
        <div class="suggestions" v-if="suggestions.length > 0">
          <div class="suggestion" v-for="s in suggestions" :key="s.id" @click="selectItem(s)">{{s.title}}
          </div>
        </div>
      </div>


      <div class="display">
      <center>
        <div class="upload" v-if="findItem">
            <input v-model="findItem.title">
          <p></p>
            <textarea v-model="findItem.people"></textarea>
          <p></p>
            <textarea v-model="findItem.description"></textarea>
          <p></p>
          <img :src="findItem.path" />
        </div>
      </center>
      </div>
      <div class="actions" v-if="findItem">
        <button @click="editItem(findItem)">Edit</button>
        <button @click="deleteItem(findItem)">Delete</button>
      </div>
    </div>


</div>
</center>

</div>
</template>





<script>
import axios from 'axios';
export default {
  name: 'Add',
  data() {
    return {
      title: "",
      description: "",
      people: "",
      file: null,
      addItem: null,
      items: [],
      findTitle: "",
      findItem: null,
    }
  },
  computed: {
     suggestions() {
       let items = this.items.filter(item => item.title.toLowerCase().startsWith(this.findTitle.toLowerCase()));
       return items.sort((a, b) => a.title > b.title);
     }
   },
  created() {
    this.getItems();
  },
  methods: {
    fileChanged(event) {
      this.file = event.target.files[0]
    },
    async upload() {
        const formData = new FormData();
        formData.append('photo', this.file, this.file.name, this.file.description, this.file.people)
        let r1 = await axios.post('/api/photos', formData);
        let r2 = await axios.post('/api/items', {
          title: this.title,
          description: this.description,
          people: this.people,
          path: r1.data.path
        });
        this.addItem = r2.data;
    },
    async getItems() {
        let response = await axios.get("/api/items");
        this.items = response.data;
        return true;
    },
    selectItem(item) {
      this.findTitle = "";
      this.findItem = item;
   },
   async deleteItem(item) {
       await axios.delete("/api/items/" + item._id);
       this.findItem = null;
       this.getItems();
       return true;
   },
   async editItem(item) {

        await axios.put("/api/items/" + item._id, {
          title: this.findItem.title,
          people: this.findItem.people,
          description: this.findItem.description,
        });
        this.findItem = null;
        this.getItems();
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

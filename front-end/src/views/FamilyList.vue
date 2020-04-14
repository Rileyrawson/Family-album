<template>
<div class="home">
  <section class="image-gallery">
    <div class="image" v-for="person in peopleList" :key="person.id">
      <center>
      <h2>{{person.fullName}}</h2>
      <h4>{{person.location}}</h4>
      <p>{{person.birthday}}</p>
      <img :src="person.peoplePath" />
      </center>
    </div>
  </section>
</div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'FamilyList',
  data() {
    return {
     peopleList: [],
    }
  },
  created() {
    this.getPeople();
  },
  methods: {
    async getPeople() {
        let response = await axios.get("/api/peopleList");
        this.peopleList = response.data;
        return true;
    },
  },
}
</script>




<style scoped>
.image h2,
.image p {

}

.image h2{
  font-size: 1.2em;
}

.image h4{
  font-size: .8em;

}

.image, .home{
  margin: 0px;
  padding: 0px;
}

.image p {
  font-size: .7em;
}

/* Masonry */
*,
*:before,
*:after {
  box-sizing: inherit;
}

.image-gallery {
  column-gap: 1.5em;
}

.image {
  margin: 0 0 1.5em;
  display: inline-block;
  width: 100%;
}

.image img {
  width: 100%;
}

/* Masonry on large screens */
@media only screen and (min-width: 1024px) {
  .image-gallery {
    column-count: 4;
  }
}

/* Masonry on medium-sized screens */
@media only screen and (max-width: 1023px) and (min-width: 768px) {
  .image-gallery {
    column-count: 3;
  }
}

/* Masonry on small screens */
@media only screen and (max-width: 767px) and (min-width: 540px) {
  .image-gallery {
    column-count: 2;
  }
}
</style>

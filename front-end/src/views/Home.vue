<template>
<div class="home">

  <center>
    <h1>Welcome to the Rawson Family Digital Photo Album</h1>
  </center>

  <div  class="body">
    <img src="/fam.JPG" height=250>
    <img src="/grad.png" height=250>
    <img src="/family.png" height=250>
  </div>

  <center>
  <div class="test">
    <p>To view the photos go to the <router-link to="/gallery">Gallery</router-link> page.</p>
    <p>To add  a new post go to the <router-link to="/add">Add Photos</router-link> page.</p>
  </div>
  </center>

</div>
</template>

<script>
</script>




<style scoped>
.image h2,
.image p {
  font-style: italic;
}

h1{
  color: #1c3738;
  font-weight: bold;
}

.image p {
  font-size: .7em;
}

.body {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

img {
  margin: 10px;
}

</style>

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
  <div class="links">
    <p>To view the photos go to the <router-link to="/gallery">Gallery</router-link> page.</p>
    <p>To view membersof the Rawson Clan go to the <router-link to="/family">Family</router-link> page.</p>
    <p>To add a new photo or edit a post go to the <router-link to="/add">Edit Photos</router-link> page.</p>
    <p>To add more family members or edit existing profile go to the <router-link to="/people">Edit Family</router-link> page.</p>
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

.links{
  color: #fff;
  background: #1c3738;
  padding: 5px;
}



@media only screen and (min-width: 1024px) {
  .links{
    width:  50%;
  }
}


@media only screen and (max-width: 1023px) and (min-width: 768px) {
  .links{
    margin: 1px;
    width:  100%
  }
}


@media only screen and (max-width: 767px) and (min-width: 540px) {
  .links{
    margin: 1px;
    width: 100%;
  }
}
</style>

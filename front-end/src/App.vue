<template>
<div id="app">
  <div class="header">

    <router-link to="/">
      <div class="logo">
        <img src="/ordinary.png" height=70>
      </div>
    </router-link>
    <center>
    <div class="title">
      <h1>Rawson Family Photos</h1>
    </div>
    </center>

    <div class="addLink">
      <router-link to="/gallery">Gallery</router-link>
    </div>

    <div class="addLink">
      <router-link to="/add">Add Photos</router-link>
    </div>

  </div>
  <div class="content">
    <router-view />
  </div>

  <div class="space">
  </div>
  <div class="footer">
    <a href="https://github.com/Rileyrawson/Family-album">GitHub Repository</a>
  </div>
</div>
</template>

<style>
html {
  box-sizing: border-box;
}

body {
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  background: #f4fff8;
  padding: 0px;
  margin: 0px;
}

/* Header */
.header {
  display: flex;
  padding: 10px 100px 0px 100px;
  background-color: #84a9c0;
  color: #f4fff8;
  justify-content: center;
  align-items:center;
  flex-wrap:wrap;
}

.header a {
  color: #fff;
  text-decoration: none
}

.logo{
  padding: 15px;
}

.addLink {
  background: #1c3738;
  padding: 15px;
  margin: 5px;
}

.title {
  margin-top: 5px;
  margin-right: 20px;
}

.title h1 {
  font-size: 30px;
}

.content {
  padding: 20px 100px;
  min-height: 500px;
}



/* Footer */

.space {
  margin-top: 40px;
}

.footer {
  position: fixed;
  size: 20px;
  height: 40px;
  background: #1c3738;
  color: white;
  bottom: 0px;
  left: 0px;
  right: 0px;
  margin-bottom: 0px;
  padding: 10px;
}


.footer a {
  color: #f4fff8;
}

h1 {
  font-size: 20px;
}

h2 {
  font-size: 14px;
}
</style>

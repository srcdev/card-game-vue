<template>
  <section class="wrapper game-about">
    <h2 class="header3">About the game</h2>
    <p>This game was born from the CoVid-19 lockdown, we wanted to play the famous card version of this game but there was no online equivalent, so I made this.</p>
    <h3 class="header3">The technology used</h3>
    <p>The <strong>front end</strong> is built using VueJS, communicating with the back end via asynchronous http requests and websockets to keep the various players all in sync with the game state.</p>
    <p>The <strong>back end</strong> is built upon Express, leveraging Node and Mongoose DB (MongoDB)</p>
  </section>
</template>

<script>
  export default {
    name: "GameAbout",
  }
</script>

<style lang="scss">
  .game-about {
    .header3 {
      margin-bottom: 0;
    }
  }
</style>

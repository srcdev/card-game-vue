<template>
  <footer class="footer">
    <nav class="footer__nav">
      <ul class="list inline centered">
        <li class="list-item"><a href="/home" @click.prevent="setComponent('game-deck')" class="list-link">Home</a></li>
        <!-- <li class="list-item"><a href="/styles" @click.prevent="setComponent('styles')" class="list-link">Styles</a></li> -->
        <li class="list-item"><a href="/how-to-play" @click.prevent="setComponent('game-rules')" class="list-link">How to play</a></li>
        <li class="list-item"><a href="/about" @click.prevent="setComponent('game-about')"  class="list-link">About</a></li>
        <li class="list-item"><a href="/support" @click.prevent="setComponent('game-support')"  class="list-link">Support</a></li>
      </ul>
      <ul class="list inline centered">
        <li class="list-item"><a href="/list-answers" @click.prevent="setComponent('game-answers')"  class="list-link">View Answers</a></li>
        <li class="list-item"><a href="/list-questions" @click.prevent="setComponent('game-questions')"  class="list-link">View Questions</a></li>
      </ul>
    </nav>
  </footer>
</template>

<script>
  export default {
    name: "GameFooter",
    methods: {
      setComponent(component) {
        this.$bus.$emit('set-component', component);
      },
    },
  }
</script>

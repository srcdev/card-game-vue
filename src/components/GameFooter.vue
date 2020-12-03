<template>
  <div class="wrapper">
    <footer class="footer">
      <nav class="footer__nav">
        <ul class="list inline centered">
          <li class="list-item"><a href="/how-to-play" @click.prevent="setComponent('game-rules')" class="list-link">How to play</a></li>
          <li class="list-item"><a href="/about" @click.prevent="setComponent('game-about')"  class="list-link">About</a></li>
          <li class="list-item"><a href="/support" @click.prevent="setComponent('game-support')"  class="list-link">Support</a></li>
        </ul>
      </nav>
    </footer>
  </div>
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

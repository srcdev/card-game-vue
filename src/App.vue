<template>
  <div>
  <div class="wrapper">
    <header class="header">
      <h1 class="header3" data-test="h1-text">Fill in the blanks game</h1>
    </header>
  </div>
  <game-deck-start v-if="gameState <= 1" />
  <game-deck-player v-else />
  <div class="wrapper">
    <footer class="footer">
      <p>Footer</p>
    </footer>
  </div>
  </div>
</template>

<script>
  // import { mapGetters, mapMutations, mapState } from 'vuex';
  import { mapActions, mapState } from 'vuex';
  import GameDeckPlaying from "./components/GameDeckPlaying.vue";
  import GameDeckStart from "./components/GameDeckStart.vue";
  export default {      
    components: {
      'game-deck-player': GameDeckPlaying,
      'game-deck-start': GameDeckStart,
    },
    data () {
      return {
        info: 'Data from data()'
      }
    },
    sockets: {
      socketReconnect() {
          console.log(`socketReconnect()`);
      },
      SOCKET_GET_LATEST_GAME_DATA() {
        this.GET_LATEST_GAME_DATA();
      }
    },
    computed: {
      ...mapState('game', [
          'gameState',
      ])
    },
    methods: {
      ...mapActions('game', [
          'GET_LATEST_GAME_DATA',
      ]),
    }
  }
</script>

<style lang="scss">
  @import "./styles/imports";
  @import "./styles/main";
</style>

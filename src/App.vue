<template>
  <div>
  <div class="wrapper">
    <header class="header">
      <h1 class="header3" data-test="h1-text">Fill in the blanks game</h1>
    </header>
  </div>
  <game-deck-start v-if="isGameRunning" />
  <game-deck-playing v-else />
  <div class="wrapper">
    <footer class="footer">
      <p>Footer</p>
    </footer>
  </div>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex';
  import GameDeckPlaying from "./components/GameDeckPlaying.vue";
  import GameDeckStart from "./components/GameDeckStart.vue";
  export default {
    components: {
      'game-deck-playing': GameDeckPlaying,
      'game-deck-start': GameDeckStart,
    },
    data () {
      return {
        info: 'Data from data()'
      }
    },
    sockets: {
      SOCKET_RECONNECT() {
        console.log(`SOCKET_RECONNECT()`);
        this.GET_LATEST_GAME_DATA();
      },
      SOCKET_GET_LATEST_GAME_DATA() {
        console.log(`SOCKET_GET_LATEST_GAME_DATA()`);
        this.GET_LATEST_GAME_DATA();
      }
    },
    computed: {
      ...mapState('game', [
        'gameState',
        'playerState'
      ]),
      isGameRunning() {
        console.log(`gameState(${this.gameState}) < 2 && playerState(${this.playerState}) < 2`);
        const isTrue = (this.gameState < 2 && this.playerState < 2);
        console.log(`isTrue --> ${isTrue}`);
        return isTrue;
      }
    },
    methods: {
      ...mapActions('game', [
        'GET_LATEST_GAME_DATA',
      ]),
      // isGameRunning() {
      //   console.log(`gameState(${this.gameState}) < 2 && playerState(${this.playerState}) < 2`);
      //   const isTrue = (this.gameState < 2 && this.playerId < 2);
      //   console.log(`isTrue --> ${isTrue}`);
      //   return isTrue;
      // }
    }
  }
</script>

<style lang="scss">
  @import "./styles/imports";
  @import "./styles/main";
</style>

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
      RECEIVE_SOCKET_RECONNECT() {
        this.GET_LATEST_GAME_DATA();
      },
      RECEIVE_SOCKET_GET_LATEST_GAME_DATA() {
        this.GET_LATEST_GAME_DATA();
      },
      RECEIVE_SOCKET_GET_CURRENT_QUESTION() {
        this.GET_CURRENT_QUESTION();
      }
    },
    computed: {
      ...mapState('game', [
        'gameId',
        'gameState',
        'playerState'
      ]),
      isGameRunning() {
        return this.gameState < 2 && this.playerState < 2;
      }
    },
    watch: {
      gameId(newVal) {
        if (newVal !== null) {
          this.$socket.emit("BROADCAST_SOCKET_KEEP_ALIVE", this.gameId);
        }
      }
    },
    methods: {
      ...mapActions('game', [
        'GET_LATEST_GAME_DATA',
        'GET_CURRENT_QUESTION'
      ]),
    }
  }
</script>

<style lang="scss">
  @import "./styles/imports";
  @import "./styles/main";
</style>

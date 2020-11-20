<template>
  <div>
  <div class="wrapper">
    <header class="header">
      <h1 class="header3" data-test="h1-text">Fill in the blanks game</h1>
    </header>
  </div>
  <game-deck-start v-if="gameNotStarted" />
  <game-deck-playing-review-answers v-if="reviewingAnswers && gameRunning" />
  <game-deck-playing v-else-if="!reviewingAnswers && gameRunning" />
  <div class="wrapper">
    <footer class="footer">
      <p>Footer</p>
    </footer>
  </div>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex';
  import GameDeckPlaying from "@/components/GameDeckPlaying.vue";
  import GameDeckPlayingReviewAnswers from "@/components/GameDeckPlayingReviewAnswers";
  import GameDeckStart from "@/components/GameDeckStart.vue";
  export default {
    components: {
      'game-deck-playing': GameDeckPlaying,
      'game-deck-playing-review-answers': GameDeckPlayingReviewAnswers,
      'game-deck-start': GameDeckStart,
    },
    data () {
      return {
        info: 'Data from data()'
      }
    },
    created () {
      //this.$bus.$emit('dealer-has-skipped-question')
      this.$bus.$on('dealer-has-skipped-question', () => {
        console.log('App --> dealer-has-skipped-question');
      })
    },
    sockets: {
      RECEIVE_SOCKET_KEEP_ALIVE() {
        if (this.playerId !== null) {
          const data = {
            gameId: this.gameId,
            playerId: this.playerId
          };
          //console.log(`RECEIVE_SOCKET_KEEP_ALIVE --> IF --> data --> ${data}`);
          setTimeout(() => {
            this.$socket.emit("BROADCAST_SOCKET_KEEP_ALIVE", data);
          }, 15000);
        }
        // else {
        //   console.log(`RECEIVE_SOCKET_KEEP_ALIVE --> ELSE`);
        // }
      },
      RECEIVE_SOCKET_RECONNECT() {
        this.GET_LATEST_GAME_DATA();
      },
      RECEIVE_SOCKET_GET_LATEST_GAME_DATA() {
        this.GET_LATEST_GAME_DATA();
      },
      RECEIVE_SOCKET_GET_CURRENT_QUESTION() {
        this.GET_CURRENT_QUESTION();
      },
      RECEIVE_SOCKET_GET_ROUND_IN_PLAY() {
        this.GET_ROUND_IN_PLAY();
      }
    },
    computed: {
      ...mapState('game', [
        'currentCard',
        'playerId',
        'gameId',
        'gameState',
        'playerState',
        'reviewingAnswers'
      ]),
      gameNotStarted() {
        return this.gameState < 2 && this.playerState < 2;
      },
      gameRunning() {
        return this.currentCard !== null && this.gameState === 2;
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
        'GET_CURRENT_QUESTION',
        'GET_ROUND_IN_PLAY'
      ]),
    }
  }
</script>

<style lang="scss">
  @import "@/styles/imports";
  @import "@/styles/main";
</style>

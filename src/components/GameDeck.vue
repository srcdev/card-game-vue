<template>
  <keep-alive>
    <transition name="fade" mode="out-in">
      <component :is="componentName"></component>
    </transition>
  </keep-alive>
</template>

<script>
  import { mapActions, mapState } from 'vuex';
  import GameDeckPlaying from "@/components/GameDeckPlaying.vue";
  import GameDeckPlayingReviewAnswers from "@/components/GameDeckPlayingReviewAnswers";
  import GameDeckPlayingReviewWinner from "@/components/GameDeckPlayingReviewWinner";
  import GameDeckStart from "@/components/GameDeckStart.vue";
  export default {
    components: {
      'game-deck-playing': GameDeckPlaying,
      'game-deck-playing-review-answers': GameDeckPlayingReviewAnswers,
      'game-deck-playing-review-winner': GameDeckPlayingReviewWinner,
      'game-deck-start': GameDeckStart,
    },
    created () {
      this.$bus.$on('dealer-has-skipped-question', () => {
        console.log('App --> dealer-has-skipped-question');
      });
    },
    mounted () {
      this.setComponent();
    },
    data() {
      return {
        componentName: '',
      }
    },
    sockets: {
      RECEIVE_SOCKET_KEEP_ALIVE() {
        if (this.playerId !== null) {
          const data = {
            gameId: this.gameId,
            playerId: this.playerId
          };
          setTimeout(() => {
            this.$socket.emit("BROADCAST_SOCKET_KEEP_ALIVE", data);
          }, 15000);
        }
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
      },
      RECEIVE_SOCKET_SHOW_WINNER(data) {
        this.$bus.$off('set-winner-confirmed');
        this.DISPLAY_WINNER(data);
        setTimeout(() => {
          this.GET_LATEST_GAME_DATA();
        }, this.showWinnerTimeout);
      }
    },
    computed: {
      ...mapState('game', [
        'currentCard',
        'playerId',
        'gameId',
        'gameState',
        'playerState',
        'reviewingAnswers',
        'rounds',
        'showWinner',
        'showWinnerTimeout'
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
      },
      gameRunning() {
        this.setComponent();
      },
      reviewingAnswers() {
        this.setComponent();
      },
      showWinner() {
        this.setComponent();
      }
    },
    methods: {
      ...mapActions('game', [
        'DISPLAY_WINNER',
        'GET_LATEST_GAME_DATA',
        'GET_CURRENT_QUESTION',
        'GET_ROUND_IN_PLAY'
      ]),
      setComponent() {
        if (this.gameNotStarted) {
          this.componentName = 'game-deck-start';
        } else if (this.gameRunning) {
          if (this.showWinner) {
              this.componentName = 'game-deck-playing-review-winner';
          } else {
            if (this.reviewingAnswers) {
              this.componentName = 'game-deck-playing-review-answers';
            } else {
              this.componentName = 'game-deck-playing';
            }
          }
        }
      }
    }
  }
</script>

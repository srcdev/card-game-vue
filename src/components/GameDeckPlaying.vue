<template>
  <div class="wrapper">
    <div class="game-deck-question aside">
      <game-deck-card
        :card-size="questionCardSize"
        card-type="Q"
      />
    </div>
    <div class="game-deck-answers" v-if="!playerIsDealer && !roundPlayed">
      <ul class="game-deck-cards-list">
        <li
          v-for="(answer, index) in playerHand"
          :key="index"
          class="game-deck-cards-item"
        >
          <game-deck-card
            :answer-data="{
              answerId: index,
              answerText: answer
            }"
            card-size="M"
            card-type="A"
          />
        </li>
      </ul>
    </div>
    <div class="game-deck-status aside">
      <div>
        <game-deck-playing-dealer v-if="playerIsDealer" />
        <game-deck-playing-player v-else />
        <game-deck-players v-if="!reviewingAnswers" />
      </div>
      <div>
        <game-deck-playing-actions />
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import GameDeckPlayingDealer from "@/components/GameDeckPlayingDealer";
  import GameDeckPlayingPlayer from "@/components/GameDeckPlayingPlayer";
  import GameDeckPlayingActions from "@/components/GameDeckPlayingActions";
  import Card from "./partials/Card";
  import PlayerList from "./partials/PlayerList";

  export default {
    name: "GameDeckPlaying",
    components: {
      'game-deck-playing-dealer': GameDeckPlayingDealer,
      'game-deck-playing-player': GameDeckPlayingPlayer,
      'game-deck-playing-actions': GameDeckPlayingActions,
      'game-deck-card': Card,
      'game-deck-players': PlayerList,
    },
    data() {
      return {
        questionData: {},
        questionCardSize: 'L',
        roundPlayed: false
      }
    },
    computed: {
      ...mapState('game', [
        'gameState',
        'playerHand',
        'playerIsDealer',
        'roundInPlay',
        'reviewingAnswers'
      ]),
    },
    created () {
      this.setQuestionData();
      this.$bus.$on('player-round-played', (state) => {
        this.roundPlayed = state;
        console.log('GameDeckPlaying --> player-round-played');
      })
    },

    methods: {
      setQuestionData() {
        this.questionCardSize = this.playerIsDealer ? 'XL' : 'L';
      },
    },
    destroyed () {
      this.$bus.$off('dealer-select-winner');
    }
  }
</script>

<style lang="scss">
  @import "@/styles/imports";

  .game-deck {

    &-answers {
      overflow-y: scroll;
      padding-bottom: 8px;
      -webkit-overflow-scrolling: touch;
    }

    &-cards {
      overflow-y: scroll;
      padding-bottom: 8px;
      -webkit-overflow-scrolling: touch;
      &-list {
        display: flex;
        width: max-content;
      }
      &-item {
        display: flex;
        list-style-type: none;
      }
    }
  }

  // @include breakpoint(1025) {
  //   .game-deck-answers {
  //     overflow-y: auto;
  //     padding-bottom: 0;
  //     -webkit-overflow-scrolling: none;

  //     &-list {
  //       width: inherit;
  //     }
  //   }
  // }

</style>

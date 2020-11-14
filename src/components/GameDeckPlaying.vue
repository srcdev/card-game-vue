<template>
  <div class="wrapper">
    <div class="game-deck-question aside">
      <game-deck-card
        :question-data="questionData"
        :card-size="questionCardSize"
        card-type="Q"
      />
    </div>
    <div class="game-deck-answers" v-if="!playerIsDealer">
      <ul class="game-deck-answers-list">
        <li
          v-for="(answer, index) in playerHand"
          :key="index"
          class="game-deck-answers-item"
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
      <game-deck-playing-dealer v-if="playerIsDealer" />
      <game-deck-playing-player v-else />
      <game-deck-players />
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import GameDeckPlayingDealer from "./GameDeckPlayingDealer";
  import GameDeckPlayingPlayer from "./GameDeckPlayingPlayer";
  import Card from "./partials/Card";
  import PlayerList from "./partials/PlayerList";

  export default {
    name: "GameDeckPlaying",
    components: {
      'game-deck-playing-dealer': GameDeckPlayingDealer,
      'game-deck-playing-player': GameDeckPlayingPlayer,
      'game-deck-card': Card,
      'game-deck-players': PlayerList,
    },
    data() {
      return {
        questionData: {},
        questionCardSize: 'L',
      }
    },
    computed: {
      ...mapState('game', [
        'gameData',
        'playerHand',
        'playerIsDealer',
      ]),
    },
    created() {
      this.setQuestionData();
    },
    methods: {
      setQuestionData() {
        this.questionCardSize = this.playerIsDealer ? 'XL' : 'L';
        this.questionData = {
          questionText: this.gameData.currentQuestion.text,
          questionId: this.gameData.currentQuestion.id,
        }
      }
    }
  }
</script>

<style lang="scss">
  @import "../styles/imports";

  .game-deck-answers {
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

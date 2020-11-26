<template>
  <div class="wrapper">
    <div class="game-deck-question aside">
      <game-deck-card
        :card-size="questionCardSize"
        card-type="Q"
      />
    </div>
    <div class="game-deck-answers" v-if="!playerIsDealer && !roundPlayed">
      <div class="shim shim__left"></div>
      <div class="inner">
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
      <div class="shim shim__right"></div>
    </div>
    <div class="game-deck-status aside">
      <div class="game-deck-status__players">
        <game-deck-playing-dealer v-if="playerIsDealer" />
        <game-deck-playing-player v-else />
        <game-deck-players v-if="!reviewingAnswers" />
      </div>
      <div class="game-deck-status__actions">
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
  import Card from "@/components/partials/Card";
  import PlayerList from "@/components/partials/PlayerList";

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
      }
    },
    computed: {
      ...mapState('game', [
        'gameState',
        'playerHand',
        'playerIsDealer',
        'roundInPlay',
        'reviewingAnswers',
        'roundPlayed'
      ]),
    },
    created () {
      this.setQuestionData();
    },

    methods: {
      setQuestionData() {
        this.questionCardSize = this.playerIsDealer ? 'XL' : 'L';
      },
    },
  }
</script>

<style lang="scss">
  @import "@/styles/imports";

  .game-deck {

    &-answers {
      overflow: hidden;
      position: relative;
      .inner {
        overflow-y: scroll;
        padding: 0 24px 8px 24px;
        -webkit-overflow-scrolling: touch;
      }

      .shim {
        background: linear-gradient(to right, $page-bg-light, transparent);
        bottom: 0;
        position: absolute;
        top: 1px;
        width: 24px;
        z-index: 9;

        &__right {
          background: linear-gradient(to left, $page-bg-light, transparent);
          right: 0;
        }
      }

      .question {
        margin: 8px;
      }
    }

    &-cards {
      overflow-y: scroll;
      padding-bottom: 8px;
      -webkit-overflow-scrolling: touch;
      &-list {
        display: flex;
        padding-top: 2px;
        width: max-content;
      }
      &-item {
        display: flex;
        list-style-type: none;
      }
    }

    &-status {
      align-items: flex-start;
      display: flex;
      //flex-grow: 1;
      flex-direction: column;
      &__players {
        // align-self: flex-start;
        // flex-grow: 1;
        width: 100%;
      }
      &__actions {
        // align-self: flex-end;
        // flex-grow: 1;
        margin-top: auto;
        width: 100%;
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

  @media (prefers-color-scheme: dark) {
    .game-deck {
      &-answers {
        .shim {
          background: linear-gradient(to right, $page-bg-dark, transparent);

          &__right {
            background: linear-gradient(to left, $page-bg-dark, transparent);
            right: 0;
          }
        }
      }
    }
  }
</style>

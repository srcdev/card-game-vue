<template>
  <div class="game-deck game-deck-playing">
    <div class="game-deck-question">
      <transition name="fade" mode="out-in">
        <game-deck-card
          :card-size="questionCardSize"
          card-type="Q"
        />
      </transition>
    </div>
    <div class="game-deck-answers" v-if="!playerIsDealer && !roundPlayed">
      <div class="shim shim__left"></div>
      <div class="inner">
        <div class="game-deck-cards-list">
          <li
            v-for="(answer, index) in playerHand"
            :key="index"
            class="game-deck-cards-item"
          >
            <transition name="fade" mode="out-in">
              <game-deck-card
                :answer-data="{
                  answerId: index,
                  answerText: answer
                }"
                card-size="M"
                card-type="A"
                :delay="setDelay()"
              />
            </transition>
          </li>
        </div>
      </div>
      <div class="shim shim__right"></div>
    </div>
    <div class="game-deck-status">
      <div class="game-deck-status__players">
        <game-deck-playing-dealer v-if="playerIsDealer" />
        <game-deck-playing-player v-else />
        <h4 class="header4">Players in round</h4>
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
        delay: 0,
        questionData: {},
        questionCardSize: 'L',
        timeout: 50,
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
    watch: {
      playerIsDealer() {
        this.setQuestionData();
      }
    },
    methods: {
      setDelay() {
        if (this.delay < 10) {
          this.delay = this.delay + 1;
        }
        return this.delay * this.timeout;
      },
      setQuestionData() {
        this.questionCardSize = this.playerIsDealer ? 'L' : 'M';
      },
    },
  }
</script>

<style lang="scss">

  .game-deck {

    &-answers {
      overflow: hidden;
      position: relative;
      .inner {
        overflow-y: scroll;
        padding: 0 24px;
        -webkit-overflow-scrolling: touch;

        @include breakpoint(768) {
          padding-top: 24px;
        }

      }

      .shim {
        display: none;
        background: -webkit-linear-gradient(to right, $page-bg-light-rgba, transparent);
        background: linear-gradient(to right, $page-bg-light, transparent);
        bottom: 0;
        position: absolute;
        top: 1px;
        width: 24px;
        z-index: 9;

        &__right {
          background: -webkit-linear-gradient(to left, $page-bg-light-rgba, transparent);
          background: linear-gradient(to left, $page-bg-light, transparent);
          right: 0;
        }
      }

      .question {
        margin: 8px;
      }
    }

    &-cards {
      $cards: &;
      overflow-y: scroll;
      padding-bottom: 8px;
      -webkit-overflow-scrolling: touch;
      &-list {

        display: flex;
        height: 210px;
        margin-bottom: 4px;
        padding: 2px 12px;
        width: max-content;

        &.review__answers {
          height: 365px;
          #{ $cards }-item {
            height: 365px;
            width: 216px;
          }
        }
      }
      &-item {
        display: flex;
        list-style-type: none;
        margin-left: 8px;

        &:first-child {
          margin-left: 0;
        }

        height: 206px;
        width: 125px;
        @include breakpoint(1025) {

        }
      }
    }

    &-status {
      align-items: flex-start;
      display: flex;
      flex-direction: column;
      &__players {
        width: 100%;

        .header4 {
          font-style: italic;
          font-weight: normal;
          margin-bottom: 0;
        }
      }
      &__actions {
        margin-top: auto;
        width: 100%;
      }
    }
  }

  @media (prefers-color-scheme: dark) {
    .game-deck {
      &-answers {
        .shim {
          background: -webkit-linear-gradient(to right, $page-bg-dark-rgba, transparent);
          background: linear-gradient(to right, $page-bg-dark, transparent);

          &__right {
            background: -webkit-linear-gradient(to left, $page-bg-dark-rgba, transparent);
            background: linear-gradient(to left, $page-bg-dark, transparent);
            right: 0;
          }
        }
      }
    }
  }
</style>

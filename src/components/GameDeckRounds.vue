<template>
  <div class="game-deck">
    <h2 class="header1">Previous rounds</h2>
    <div
      v-if="hasRounds"
      class="game-deck__rounds"
      >
      <div
        v-for="(round, roundIndex) in reveresedRounds"
        :key="roundIndex"
        class="game-deck__round"
      >
        <p class="game-deck__header">Round: {{ round.key }}</p>

        <div class="game-deck-answers">
          <div class="shim shim__left"></div>
          <div class="inner">

            <ul class="game-deck-cards-list">
              <li
                v-for="(answer, answerIndex) in round"
                :key="answerIndex"
                class="game-deck-cards-item"
              >
                <div v-if="typeof answer === 'object'">
                  <p class="game-deck__header">
                    {{ answer.playerName }}
                    <span v-if="answer.isWinner">(Winner)</span>
                  </p>
                  <game-deck-card
                    :qa-data="{
                      id: answerIndex,
                      data: answer
                    }"
                    card-size="L"
                    card-type="QA"
                  />
                </div>
              </li>
            </ul>
          </div>
          <div class="shim shim__right"></div>
        </div>
      </div>
    </div>
    <div v-else>
      <h3 class="header3">No rounds played yet!</h3>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import Card from "@/components/partials/Card";
  export default {
    name: "GameDeckPlayingReviewingRounds",
    components: {
     'game-deck-card': Card,
    },
    computed: {
      ...mapState('game', [
        'rounds'
      ]),
      hasRounds() {
        return typeof this.rounds === 'object';
      },
      reveresedRounds() {
        return Object.keys(this.rounds).sort().reverse().map(key=> ({ ...this.rounds[key], key }) );
      }
    },
  }
</script>

<style lang="scss" scoped>
  .header1 {
    text-align: center;
  }
  .game-deck {
    $self: &;
    &__rounds {
      max-width: 500px;

      @include breakpoint(768) {
        margin: 0 auto;
      }

      #{ $self }-answers {
        padding-top: 0;
      }
    }

    &__header {
      font-weight: bold;
      margin: 0 auto;
      text-align: center;
      text-decoration: underline;
    }

    &-answers {
      margin-bottom: 20px;
      .inner {
        padding-top: 0;
      }
    }

    &-cards-list {
      height: 366px;
    }

    &-cards-item {
      display: block;
      height: 366px;
      width: 250px;

      .card-inner.question {
        height: 320px;
        width: 250px;
      }
    }
  }
</style>

<template>
  <div class="game-deck">
    <h2 class="header1">Previous rounds</h2>
    <div
      v-if="hasRounds"
      class="game-deck__rounds"
      >
      <div
        v-for="(round, roundIndex) in rounds"
        :key="roundIndex"
        class="game-deck__round"
      >
        <p class="game-deck__header">Round: {{ roundIndex }}</p>

        <div class="game-deck-answers">
          <div class="shim shim__left"></div>
          <div class="inner">

            <ul class="game-deck-cards-list">
              <li
                v-for="(answer, answerIndex) in round"
                :key="answerIndex"
                class="game-deck-cards-item"
              >
                <p class="game-deck__header">
                  Player: {{ answer.playerName }}
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
      }
    },
  }
</script>

<style lang="scss" scoped>
  .game-deck {

    &__rounds {

    }

    &__header {
      margin: 12px auto;
      text-align: center;
    }

    &-cards-item {
      display: block;
    }
  }
</style>

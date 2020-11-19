<template>
  <div class="game-actions">
    <p>Game actions</p>
    <div v-if="playerIsDealer">
      <ul class="game-actions__list">
        <li class="game-actions__item">
          <button class="btn secondary" @click.prevent="skipQuestion()">Skip question</button>
        </li>
      </ul>
    </div>
    <div v-else>
      <ul class="game-actions__list">
        <li class="game-actions__item">
          <button
            class="btn secondary"
            @click.prevent="RESET_PLAYED_ANSWERS()"
            :disabled="canResetCard"
            >Reset answers</button>
        </li>
        <li class="game-actions__item">
          <button
            class="btn secondary"
            @click.prevent="SUBMIT_ROUND()"
            :disabled="canSubmit"
            >Submit answers</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapMutations, mapState } from 'vuex';
  export default {
    name: "GameDeckPlayingActions",
    data() {
      return {
        isDisabled: true,
      }
    },
    computed: {
      ...mapState('game', [
        'currentCard',
        'playerIsDealer',
      ]),
      canResetCard() {
        return this.currentCard['answer1'].id === null && !this.playerIsDealer;
      },
      canSubmit() {
        const answerCountRequired = this.currentCard.answerCount;
        return this.currentCard[`answer${answerCountRequired}`].id === null && !this.playerIsDealer;
      }
    },
    methods: {
      ...mapActions('game', [
        'SKIP_QUESTION',
        'SUBMIT_ROUND',
      ]),
      ...mapMutations('game', [
        'RESET_PLAYED_ANSWERS',
      ]),
      skipQuestion() {
        this.SKIP_QUESTION()
        this.$bus.$emit('dealer-has-skipped-question');
      }
    }
  }
</script>

<style lang="scss">
  @import "@/styles/imports";

  .game-actions {
    &__list {
      list-style: none;
    }
    &__item {
      margin-top: 12px;
      &:first-child {
        margin-top: 0;
      }
    }
  }

  @media (prefers-color-scheme: dark) {

  }

</style>

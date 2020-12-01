<template>
  <p
    v-if="roundPlayed"
  >Answer submitted</p>
  <ul
    v-else
    class="game-actions__list"
    >
    <li class="game-actions__item">
      <button
        class="btn secondary warning"
        @click.prevent="RESET_PLAYED_ANSWERS()"
        :disabled="canResetCard"
        >Reset</button>
    </li>
    <li class="game-actions__item">
      <button
        class="btn secondary proceed"
        @click.prevent="SUBMIT_ROUND()"
        :disabled="canSubmit"
        >Submit</button>
    </li>
  </ul>
</template>

<script>
  import { mapActions, mapMutations, mapState } from 'vuex';
  export default {
    name: "GameDeckPlayingActionsPlayer",
    computed: {
      ...mapState('game', [
        'currentCard',
        'playerId',
        'playerIsDealer',
        'roundInPlay',
        'roundPlayed'
      ]),
      canResetCard() {
        return this.currentCard['answer1'].id === null && !this.playerIsDealer;
      },
      canSubmit() {
        const answerCountRequired = this.currentCard.answerCount;
        return this.currentCard[`answer${answerCountRequired}`].id === null && !this.playerIsDealer;
      },
    },
    methods: {
      ...mapActions('game', [
        'SUBMIT_ROUND',
      ]),
      ...mapMutations('game', [
        'RESET_PLAYED_ANSWERS',
      ]),
    }
  }
</script>

<style lang="scss">

  .game-actions {
    &__list {
      align-items: baseline;
      display: flex;
      justify-content: space-between;
    }
    &__item {
      flex-grow: 1;
      .btn {
        margin: 0 auto;
        width: calc(100% - 8px);
      }
    }
  }

</style>

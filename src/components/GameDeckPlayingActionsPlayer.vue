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
        'roundInPlay'
      ]),
      canResetCard() {
        return this.currentCard['answer1'].id === null && !this.playerIsDealer;
      },
      canSubmit() {
        const answerCountRequired = this.currentCard.answerCount;
        return this.currentCard[`answer${answerCountRequired}`].id === null && !this.playerIsDealer;
      },
      roundPlayed() {
        return this.roundInPlay !== null && typeof this.roundInPlay[this.playerId] === 'object';
      }
    },
    // data() {
    //   return {
    //     roundPlayed: false,
    //   }
    // },
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

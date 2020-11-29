<template>
  <ul class="game-actions__list">
    <li class="game-actions__item">
      <button
        class="btn secondary"
        @click.prevent="confirmSkipQuestion()"
        :disabled="skipQuestionDisabled"
      >Skip question</button>
    </li>
  </ul>
</template>

<script>
  import { mapActions, mapState } from 'vuex';
  export default {
    name: "GameDeckPlayingActionsDealer",
    computed: {
      ...mapState('game', [
        'currentCard',
        'skipQuestionDisabled'
      ]),
    },
    created () {
      this.$bus.$on('skip-question-confirmed', () => {
        this.SKIP_QUESTION();
      });
    },
    methods: {
      ...mapActions('game', [
        'SKIP_QUESTION',
      ]),
      confirmSkipQuestion() {
        const message = 'Confirm skip question';
        this.$bus.$emit('confirm-skip-question', message);
      },
    }
  }
</script>

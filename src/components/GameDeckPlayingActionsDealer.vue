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
        const payload = {
          message: 'Confirm skip question',
          callback: 'skip-question-confirmed',
          cancelText: 'Cancel',
          confirmText: 'Confirm'
        }
        this.$bus.$emit('confirm-skip-question', payload);
      },
    },
    destroyed () {
      this.$bus.$off('skip-question-confirmed');
    }
  }
</script>

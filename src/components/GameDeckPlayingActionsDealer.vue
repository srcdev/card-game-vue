<template>
  <ul class="game-actions__list">
    <li class="game-actions__item">
      <button
        class="btn secondary"
        @click.prevent="SKIP_QUESTION()"
        :disabled="!allowSkipQuestion"
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
        'allowSkipQuestion'
      ]),
    },
    methods: {
      ...mapActions('game', [
        'SKIP_QUESTION',
      ]),
    }
  }
</script>

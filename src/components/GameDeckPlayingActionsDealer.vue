<template>
  <ul class="game-actions__list">
    <li class="game-actions__item">
      <button class="btn secondary" @click.prevent="SKIP_QUESTION()">Skip question</button>
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
      ]),
    },
    methods: {
      ...mapActions('game', [
        'SKIP_QUESTION',
      ]),
    }
  }
</script>

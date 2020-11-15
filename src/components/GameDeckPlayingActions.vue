<template>
  <div class="game-actions">
    <p>Game actions</p>
    <div v-if="playerIsDealer">
      <ul class="game-actions__list">
        <li class="game-actions__item">
          <button class="btn secondary" @click.prevent="SKIP_QUESTION()">Skip question</button>
        </li>
      </ul>
    </div>
    <div v-else>
      <ul class="game-actions__list">
        <li class="game-actions__item">
          <button class="btn secondary" @click.prevent="RESET_PLAYED_ANSWERS()">Reset answers</button>
        </li>
        <li class="game-actions__item">
          <button class="btn secondary" @click.prevent="SUBMIT_ROUND()">Submit answers</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapMutations, mapState } from 'vuex';
  export default {
    name: "GameDeckPlayingActions",
    computed: {
      ...mapState('game', [
        'playerIsDealer',
      ])
    },
    methods: {
      ...mapActions('game', [
          'SKIP_QUESTION',
          'SUBMIT_ROUND',
      ]),
      ...mapMutations('game', [
          'RESET_PLAYED_ANSWERS',
      ]),
    }
  }
</script>

<style lang="scss">
  @import "../styles/imports";

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

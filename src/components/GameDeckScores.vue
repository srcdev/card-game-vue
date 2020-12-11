<template>
  <div class="game-deck game-deck__stats">
    <h3 class="header-3">Game stats</h3>
    <p class="header-3">Cards left in deck</p>

    <dl class="dl-list">
      <dt class="dt">Questions: </dt>
      <dd class="dd">{{ this.questionsInGame }}</dd>
      <dt class="dt">Answers: </dt>
      <dd class="dd">{{ this.answersInGame }}</dd>
    </dl>

    <p class="header-3">Scores</p>

    <dl class="dl-list">
      <template
        v-for="(player, index) in scoresObj"
        class="player-list-item"
        >
        <dt :key="index" class="dt">{{ player.playerName }}: </dt>
        <dd :key="index" class="dd">{{ player.winCount }}</dd>
      </template>
    </dl>

  </div>
</template>

<script>
  import { mapState } from 'vuex';
  export default {
    name: "GameDeckScores",
    computed: {
      ...mapState('game', [
        'answersInGame',
        'questionsInGame',
        'scoresObj',
      ])
    },
  };
</script>

<style lang="scss">

  .game-deck {
    &__stats {
      .dl-list {
        border-top: 1px solid $border-light;
        padding-top: 8px;
        @media (prefers-color-scheme: dark) {
          border-top: 1px solid $border-dark;
        }
      }
    }
  }

</style>

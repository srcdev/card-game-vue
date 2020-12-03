<template>
  <header class="header">
    <h1 class="header3" data-test="h1-text">Fill in the blanks game</h1>
    <nav class="nav" v-if="gameRunning">
      <ul class="nav__list">
        <li class="nav__item"><button class="btn secondary" @click.prevent="setComponent('game-deck')">Game</button></li>
        <li class="nav__item"><button class="btn secondary" @click.prevent="setComponent('game-deck-rounds')">Rounds</button></li>
        <li class="nav__item"><button class="btn secondary" @click.prevent="setComponent('game-deck-scores')">Scores</button></li>
        <li class="nav__item"><button class="btn secondary" @click.prevent="setComponent('game-deck-share')">Share</button></li>
      </ul>
    </nav>
  </header>
</template>

<script>
  import { mapState } from 'vuex';
  export default {
    name: "GameHeader",
    computed: {
      ...mapState('game', [
        'gameRunning',
      ]),
    },
    methods: {
      setComponent(component) {
        this.$bus.$emit('set-component', component);
      },
    },
  }
</script>

<style lang="scss">

  .header {
    box-shadow: 0 0 0 1px $border-light;
    padding: 12px;
    @media (prefers-color-scheme: dark) {
      box-shadow: 0 0 0 1px $border-dark;
    }
    .header3 {
      margin-bottom: 8px;
    }
    .nav {
      flex: initial;
      margin-top: auto;
      &__list {
        align-content: flex-end;
        display: flex;
        list-style-type: none;
      }
    }
  }

  @include breakpoint(768) {
    .header {
      display: flex;
      padding: 12px;
      .header3 {
        flex-grow: 1;
        margin-bottom: 0;
      }
      .nav {

        flex: initial;
        margin-top: auto;
        &__list {

          display: flex;
          width: 100%;
        }
      }
    }
  }

</style>

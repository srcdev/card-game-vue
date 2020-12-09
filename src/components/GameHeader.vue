<template>
  <header class="header">
    <h1 class="header3" data-test="h1-text"><span class="header3__restrict">Fill in the blanks game</span></h1>
    <nav class="nav" v-if="gameRunning">
      <ul class="nav__list">
        <li class="nav__item"><button class="icon icon__home" @click.prevent="setComponent('game-deck')"><span class="sr-only">Game deck</span><icons icon-name="home" /></button></li>
        <li class="nav__item"><button class="icon icon__cards" @click.prevent="setComponent('game-deck-rounds')"><span class="sr-only">Previous rounds</span><icons icon-name="cards" /></button></li>
        <li class="nav__item"><button class="icon icon__scores" @click.prevent="setComponent('game-deck-scores')"><span class="sr-only">Score board</span><icons icon-name="scores" /></button></li>
        <li class="nav__item"><button class="icon icon__share" @click.prevent="setComponent('game-deck-share')"><span class="sr-only">Share game</span><icons icon-name="share" /></button></li>
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
    display: flex;
    padding: 8px;
    @media (prefers-color-scheme: dark) {
      box-shadow: 0 0 0 1px $border-dark;
    }
    .header3 {
      flex-grow: 1;
      margin: 0;

      &__restrict {
        display: inline-block;
        max-width: 120px;
      }
    }
    .nav {
      flex: initial;
      margin-top: auto;
      &__list {
        align-content: flex-end;
        display: flex;
        list-style-type: none;
        margin-right: 8px;
      }
      &__item {
        margin-left: 18px;
      }
    }
  }
/*
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
*/
</style>

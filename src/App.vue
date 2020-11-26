<template>
  <div>
    <div class="header">
      <h1 class="header3" data-test="h1-text">Fill in the blanks game</h1>
      <nav class="nav" v-if="gameRunning">
        <ul class="nav__list">
          <li class="nav__list"><button class="btn secondary" @click.prevent="setComponent('game-deck')">Game</button></li>
          <li class="nav__list"><button class="btn secondary" @click.prevent="setComponent('game-deck-scores')">Scores</button></li>
          <li class="nav__list"><button class="btn secondary" @click.prevent="setComponent('game-deck-share')">Share</button></li>
        </ul>
      </nav>
    </div>

    <keep-alive>
      <component v-bind:is="componentName"></component>
    </keep-alive>

    <div class="wrapper">
      <footer class="footer">
        <p>Footer</p>
      </footer>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import GameDeck from "@/components/GameDeck.vue";
  import GameDeckScores from "@/components/GameDeckScores.vue";
  import GameDeckShare from "@/components/GameDeckShare.vue";
  export default {
    components: {
      'game-deck': GameDeck,
      'game-deck-scores': GameDeckScores,
      'game-deck-share': GameDeckShare,
    },
    computed: {
      ...mapState('game', [
        'gameRunning',
      ]),
    },
    data() {
      return {
        componentName: 'game-deck'
      }
    },
    methods: {
      setComponent(component) {
        this.componentName = component;
      }
    }
  }
</script>

<style lang="scss">
  @import "@/styles/imports";
  @import "@/styles/main";

  .header {
    box-shadow: 0 0 0 1px $border-light;
    display: flex;
    padding: 12px;
    @media (prefers-color-scheme: dark) {
        box-shadow: 0 0 0 1px $border-dark;
    }
    .header3 {
      flex-grow: 1;
      margin-bottom: 0;
    }
    .nav {
      flex: initial;
      margin-top: auto;
      &__list {
        align-content: flex-end;
        display: flex;
      }
    }
  }

</style>

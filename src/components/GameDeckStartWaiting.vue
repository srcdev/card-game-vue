<template>
  <div class="game-deck-start">
    <h2 class="header2">Waiting to join game <strong>"{{ gameName }}"</strong></h2>
    <nav class="tabs-nav">
      <ul class="tabs-nav-list">
        <li class="tabs-nav-list-item"><button @click.prevent="selectTab('tab1')" class="btn link" :class="{ 'active' : showTab('tab1') }">Players waiting</button></li>
        <li class="tabs-nav-list-item"><button @click.prevent="selectTab('tab2')" class="btn link" :class="{ 'active' : showTab('tab2') }">Share game</button></li>
      </ul>
    </nav>
    <section v-if="showTab('tab1')">
      <ul>
        <li v-for="(player, index) in gameData.players" :key="`user-${index}`">{{ player.playerName }}</li>
      </ul>
    </section>
    <section v-if="showTab('tab2')">
      <game-deck-share />
    </section>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import GameDeckShare from './GameDeckShare'
  export default {
    name: "GameDeckStartWaiting",
    components: {
      'game-deck-share': GameDeckShare,
    },
    data() {
      return {
        activeTabId: 'tab1',
      }
    },
    computed: {
      ...mapState('game', [
        'gameData',
        'gameId',
        'gameName',
        'playerIsDealer',
      ])
    },
    created() {
      if (this.$route.query.gameId === undefined) {
        this.setRoute();
      }
    },
    methods: {
      setRoute() {
        const gameQuery = {gameId: this.gameId};
        this.$router.replace({ query: gameQuery })
      },
      selectTab(tab) {
        this.activeTabId = tab;
      },
      showTab(tab) {
        return this.activeTabId === tab;
      }
    }
  }
</script>


<style lang="scss">
  @import "../styles/imports";

  .game-deck-start {
    .tabs {
      &-nav {
        border-bottom: 2px solid $white;
        margin-bottom: 12px;
        margin-top: 12px;
        &-list {
          display: flex;
          justify-content: flex-start;
          list-style-type: none;
          &-item {
            margin-right: 12px;
            .btn.link {
              background-color: $input-bg-dark;
              color: $input-text-dark;
              &.active {
                background-color: $input-bg-light;
                color: $input-text-light;
              }
            }
          }
        }
      }
    }
  }

  @media (prefers-color-scheme: dark) {

  }

</style>

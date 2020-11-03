<template>
  <div>
  <div class="wrapper">
    <header class="header">
      <h1 class="header3" data-test="h1-text">Fill in the blanks game</h1>
    </header>
  </div>
  <game-deck-start v-if="gameState <= 1" />
  <game-deck-player v-else />
  <div class="wrapper">
    <footer class="footer">
      <p>Footer</p>
    </footer>
  </div>
  </div>
</template>

<script>
  // import { mapGetters, mapMutations, mapState } from 'vuex';
  import { mapState } from 'vuex';
  import GameDeckPlaying from "./components/GameDeckPlaying.vue";
  import GameDeckStart from "./components/GameDeckStart.vue";
  export default {      
    components: {
      'game-deck-player': GameDeckPlaying,
      'game-deck-start': GameDeckStart,
    },
    data () {
      return {
        info: 'Data from data()'
      }
    },
    computed: {
      // ...mapGetters('game', {
      //     infoText: 'getInfoText',
      // }),
      ...mapState('game', [
          'gameState',
      ])
    },
    // mounted() {
    //   this.setAppReady();
    // },
    // methods: {
    //   // ...mapActions('game', [
    //   //     'updateInfoText',
    //   // ]),
    //   ...mapMutations('game', [
    //     'setAppReady',
    //     'updateInfoText',
    //   ]),
    //   updateText() {
    //     const updatedText = 'This is updated state text';
    //     this.updateInfoText(updatedText);
    //   },
    // }
  }
</script>

<style lang="scss">
  @import "./styles/imports";
  @import "./styles/main";

  // ul {
  //   list-style-type: none;
  //   padding: 0;
  // }

  // li {
  //   display: inline-block;
  //   margin: 0 10px;
  // }

  // @media all and (min-width: 768px) {

  // }

</style>

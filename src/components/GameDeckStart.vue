<template>
  <div class="wrapper">
    <div class="game-deck-answers">
      <p>Start the game deck</p>
    </div>
  </div>
</template>

<script>
  // import { mapGetters, mapMutations, mapState } from 'vuex';
//   import { mapGetters } from 'vuex';
  export default {
    name: "GameDeckStart",
    components: {},
    // data () {
    //   return {
    //     info: 'Data from data()'
    //   }
    // },
    computed: {
    //   ...mapGetters('game', {
    //       infoText: 'getInfoText',
    //   }),
      // ...mapState('game', [
      //     'appReady',
      // ])
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
  @import "../styles/imports";

</style>

<template>
  <div class="wrapper">
    <header class="header">
      <p>Fill in the blanks game</p>
    </header>
    <aside class="aside questions-card-deck">
      <p>Question card displayed here</p>
    </aside>
    <div class="answer-cards-deck">
      <p>Answers cards here</p>
    </div>
    <aside class="aside game-status-deck">
      <p>Game status here</p>
    </aside>
    <footer class="footer">
      <p>Footer</p>
    </footer>
  </div>
</template>

<script>
  // import { mapGetters, mapMutations, mapState } from 'vuex';
  import { mapGetters } from 'vuex';
  export default {
    name: 'App',
    components: {},
    data () {
      return {
        info: 'Data from data()'
      }
    },
    computed: {
      ...mapGetters('game', {
          infoText: 'getInfoText',
      }),
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

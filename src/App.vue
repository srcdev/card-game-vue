<template>
  <div id="app" v-if="appReady">
    <h1 class="header1">&lt;h1 class="header1"&gt;Header 1 text.&lt;/h1&gt;</h1>
    <p class="header1 header1__light">&lt;p class="header1 header1__light"&gt;Header 1 text.&lt;/p&gt;</p>
    <h2 class="header2">&lt;h2 class="header2"&gt;Header 2 text.&lt;/h2&gt;</h2>
    <p class="header2 header2__light">&lt;p class="header2 header2__light"&gt;Header 2 text.&lt;/p&gt;</p>
    <h3 class="header3">&lt;h3 class="header3"&gt;Header 3 text.&lt;/h3&gt;</h3>
    <p class="header3 header3__light">&lt;p class="header3 header1__light"&gt;Header 3 text.&lt;/p&gt;</p>
    <h4 class="header4">&lt;h4 class="header4"&gt;Header 4 text.&lt;/h4&gt;</h4>
    <p class="header4 header4__light">&lt;p class="header4 header4__light"&gt;Header 4 text.&lt;/p&gt;</p>
    <h5 class="header5">&lt;h5 class="header5"&gt;Header 5 text.&lt;/h5&gt;</h5>
    <p class="header5 header5__light">&lt;p class="header5 header5__light"&gt;Header 5 text.&lt;/p&gt;</p>
    <h6 class="header6">&lt;h6 class="header1"&gt;Header 6 text.&lt;/h6&gt;</h6>
    <p class="header6 header6__light">&lt;p class="header6 header6__light"&gt;Header 6 text.&lt;/p&gt;</p>
    <p>Loaded --> {{ infoText }}</p>
    <p>Loaded --> {{ infoText }}</p>
    <p>Loaded --> {{ infoText }}</p>
  </div>
  <div v-else>
    <h1 class="header1">App loading&hellip;</h1>
  </div>
</template>

<script>
  import { mapGetters, mapMutations, mapState } from 'vuex';
  export default {
    name: 'App',
    components: {},
    data () {
      return {
        info: 'Data from data()'
      }
    },
    computed: {
      ...mapGetters('game', [
        'infoText',
      ]),
      ...mapState('game', [
          'appReady',
      ])
    },
    mounted() {
      this.setAppReady();
    },
    methods: {
      // ...mapActions('game', [
      //     'updateInfoText',
      // ]),
      ...mapMutations('game', [
        'setAppReady',
        'updateInfoText',
      ]),
      updateText() {
        const updatedText = 'This is updated state text';
        this.updateInfoText(updatedText);
      },
    }
  }
</script>

<style lang="scss">
  @import "./styles/imports";
  @import "./styles/main";

  body {
      margin: 0 auto;
      max-width: 768px;
      padding: 0;
      overflow-x: hidden;
      width: 100%;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }

  @media all and (min-width: 768px) {

  }

</style>

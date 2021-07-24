<template>
  <div class="body-inner">

    <game-header />

    <keep-alive>
      <transition name="fade" mode="out-in">
        <component :is="componentName"></component>
      </transition>
    </keep-alive>

    <game-footer />

    <confirm-modal
      v-if='confirmModal'
      :payload="confirmModalPayload"
      @confirm='confirm'
      @cancel="cancel"
    ></confirm-modal>

  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex';
  import GameDeck from "@/components/GameDeck";
  import GameDeckScores from "@/components/GameDeckScores";
  import GameDeckShare from "@/components/GameDeckShare";
  import GameDeckRounds from "@/components/GameDeckRounds";
  import GameAbout from "@/components/GameAbout";
  import GameHeader from "@/components/GameHeader";
  import GameFooter from "@/components/GameFooter";
  import GameRules from "@/components/GameRules";
  import GameSupport from "@/components/GameSupport";
  import GameAnswers from "@/components/GameListAnswers";
  import GameQuestions from "@/components/GameListQuestions";
  import Styles from "@/components/Styles";
  export default {
    components: {
      'game-deck': GameDeck,
      'game-deck-scores': GameDeckScores,
      'game-deck-share': GameDeckShare,
      'game-deck-rounds': GameDeckRounds,
      'game-about': GameAbout,
      'game-header': GameHeader,
      'game-footer': GameFooter,
      'game-rules': GameRules,
      'game-support': GameSupport,
      'game-answers': GameAnswers,
      'game-questions': GameQuestions,
      'styles': Styles
    },
    computed: {
      ...mapState('game', [
        'gameId',
        'gameRunning',
      ]),
    },
    data() {
      return {
        componentName: 'game-deck',
        confirmModal: false,
        confirmModalPayload: {},
      }
    },
    created () {
      this.checkGameExists();
      this.$bus.$on('confirm-adult-game', (confirmModalPayload) => {
        this.confirmModalPayload = confirmModalPayload;
        this.confirmModal = true;
      });
      this.$bus.$on('confirm-eject-player', (confirmModalPayload) => {
        this.confirmModalPayload = confirmModalPayload;
        this.confirmModal = true;
      });
      this.$bus.$on('confirm-skip-question', (confirmModalPayload) => {
        this.confirmModalPayload = confirmModalPayload;
        this.confirmModal = true;
      });
      this.$bus.$on('confirm-set-winner', (confirmModalPayload) => {
        this.confirmModalPayload = confirmModalPayload;
        this.confirmModal = true;
      });
      this.$bus.$on('confirm-swap-answer', (confirmModalPayload) => {
        this.confirmModalPayload = confirmModalPayload;
        this.confirmModal = true;
      });
      this.$bus.$on('confirm-copy', (confirmModalPayload) => {
        this.confirmModalPayload = confirmModalPayload;
        this.confirmModal = true;
      });
      this.$bus.$on('set-component', (component) => {
        this.componentName = component;
      });
    },
    methods: {
      ...mapActions('game', [
        'RESET_GAME',
      ]),
      confirm(eventBusName) {
        if (eventBusName !== null) {
          this.$bus.$emit(eventBusName);
        }
        this.confirmModal = false;
        this.confirmModalPayload = {};
      },
      cancel() {
        this.confirmModal = false;
        this.confirmModalPayload = {};
      },
      checkGameExists() {
        const newGameId = this.$route.query.gameId !== undefined ? this.$route.query.gameId : null;
        const sessionGameId = this.gameId !== null ? this.gameId : null;

        if (newGameId === null) {
          this.RESET_GAME();
        } else if (newGameId !== sessionGameId) {
          this.RESET_GAME();
        }
      },
    },
    destroyed () {
      this.$bus.$off('confirm-skip-question');
      this.$bus.$off('confirm-set-winner');
      this.$bus.$off('confirm-swap-answer');
      this.$bus.$off('confirm-copy');
      this.$bus.$off('set-component');
    }
  }
</script>

<template>
  <div>

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
  import { mapState } from 'vuex';
  import ConfirmModal from "@/plugins/ConfirmModal";
  import GameDeck from "@/components/GameDeck";
  import GameDeckScores from "@/components/GameDeckScores";
  import GameDeckShare from "@/components/GameDeckShare";
  import GameDeckRounds from "@/components/GameDeckRounds";
  import GameAbout from "@/components/GameAbout";
  import GameHeader from "@/components/GameHeader";
  import GameFooter from "@/components/GameFooter";
  import GameRules from "@/components/GameRules";
  import GameSupport from "@/components/GameSupport";
  export default {
    components: {
      'confirm-modal': ConfirmModal,
      'game-deck': GameDeck,
      'game-deck-scores': GameDeckScores,
      'game-deck-share': GameDeckShare,
      'game-deck-rounds': GameDeckRounds,
      'game-about': GameAbout,
      'game-header': GameHeader,
      'game-footer': GameFooter,
      'game-rules': GameRules,
      'game-support': GameSupport
    },
    computed: {
      ...mapState('game', [
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
      this.$bus.$on('confirm-skip-question', (confirmModalPayload) => {
        this.confirmModalPayload = confirmModalPayload;
        this.confirmModal = true;
      });
      this.$bus.$on('set-component', (component) => {
        this.componentName = component;
      });
    },
    methods: {
      confirm() {
        this.$bus.$emit('skip-question-confirmed');
        this.confirmModal = false;
        this.confirmModalPayload = {};
      },
      cancel() {
        this.confirmModal = false;
        this.confirmModalPayload = {};
      }
    },
    destroyed () {
      this.$bus.$off('confirm-skip-question');
      this.$bus.$off('set-component');
    }
  }
</script>

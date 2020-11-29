<template>
  <div>

    <div class="header">
      <h1 class="header3" data-test="h1-text">Fill in the blanks game</h1>
      <nav class="nav" v-if="gameRunning">
        <ul class="nav__list">
          <li class="nav__item"><button class="btn secondary" @click.prevent="setComponent('game-deck')">Game</button></li>
          <li class="nav__item"><button class="btn secondary" @click.prevent="setComponent('game-deck-rounds')">Rounds</button></li>
          <li class="nav__item"><button class="btn secondary" @click.prevent="setComponent('game-deck-scores')">Scores</button></li>
          <li class="nav__item"><button class="btn secondary" @click.prevent="setComponent('game-deck-share')">Share</button></li>
        </ul>
      </nav>
    </div>

    <keep-alive>
      <transition name="bounce" mode="out-in">
        <component :is="componentName"></component>
      </transition>
    </keep-alive>

    <div class="wrapper">
      <footer class="footer">
        <p>Footer</p>
      </footer>
    </div>

    <confirm-modal 
      v-if='confirmModal' 
      :message="confirmModalMessage" 
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
  export default {
    components: {
      'confirm-modal': ConfirmModal,
      'game-deck': GameDeck,
      'game-deck-scores': GameDeckScores,
      'game-deck-share': GameDeckShare,
      'game-deck-rounds': GameDeckRounds,

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
        confirmModalMessage: '',
      }
    },
    created () {
      this.$bus.$on('confirm-skip-question', (message) => {
        this.confirmModalMessage = message;
        this.confirmModal = true;
      });
    },
    methods: {
      setComponent(component) {
        this.componentName = component;
      },
      confirm() {
        this.$bus.$emit('skip-question-confirmed');
        this.confirmModal = false;
        this.confirmModalMessage = '';
      },
      cancel() {
        this.confirmModal = false;
        this.confirmModalMessage = '';
      }
    },
    destroyed () {
      this.$bus.$off('confirm-skip-question');
    }
  }
</script>

<style lang="scss">
  @import "@/styles/imports";
  @import "@/styles/main";

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

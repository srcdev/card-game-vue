<template>
  <div class="modal">
    <div class="modal-window">
      <p>{{ this.payload.message }}</p>
      <ul class="game-actions__list">
        <li class="game-actions__item">
          <button class="btn secondary warning" @click="onCancel">{{ this.payload.cancelText }}</button>
        </li>
        <li class="game-actions__item">
          <button class="btn secondary proceed" @click="onConfirm">{{ this.payload.confirmText }}</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ConfirmModal",
    props: {
      payload: {
        type: Object,
      },
    },
    methods: {
      onCancel() {
        this.$emit('cancel');
      },
      onConfirm() {
        this.$emit('confirm', this.payload.callback);
      }
    }
  }
</script>

<style lang="scss">

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  [v-cloak] {
    display: none;
  }

  .modal {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, .7);
    z-index: 9;
  }

  .modal-window {
    position: absolute;
    top: 50%;
    left: 50%;
    transition: .5s;
    width: 80%;
    min-width: 300px;
    max-width: 400px;
    background: white;
    box-shadow: 0 0 0 1px $input-border-light;
    @media (prefers-color-scheme: dark) {
      background: black;
      box-shadow: 0 0 0 1px $input-border-dark;
    }

    transform: translate(-50%, -50%);
    padding: 1em;
    color: black;
    text-align: center;
  }

  .modal-window .actions {
    display: flex;
    justify-content: flex-end;
  }

  .appear-enter {
    opacity: 0;
  }

  .appear-enter .modal-window {
    transform: translate(-75%, -50%);
  }

  .appear-enter-active {
    transition: .5s;
  }

  .appear-leave-active .modal-window {
    transform: translate(0, -50%);
  }

  .appear-leave-active {
    opacity: 0;
    transition: .5s;
  }
</style>

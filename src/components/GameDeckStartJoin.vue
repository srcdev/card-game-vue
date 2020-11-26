<template>
  <div class="game-deck-start">
    <h2 class="header2">Join a game</h2>
    <p>Join Game id: {{ gameId }}</p>
    <form @submit.prevent="formSubmit" class="form" :id="formId" novalidate aria-label="Join a game">
      <div class="form-row">
        <form-input-text
          v-model="formValues.playerName"
          autocomplete="off"
          input-name="playerName"
          input-label="Player name"
          input-pattern="username"
          input-pattern-error-message="Player name has bad characters"
          input-placeholder="eg. Simon"
          :input-min-length=2
          :input-max-length=50
          :input-required=true
          :input-in-error="formErrors.playerName"
        />
      </div>
      <div class="form-row">
        <div class="form-row-inner form-row-inner_actions">
          <input type="submit" class="btn" value="Submit" id="formSubmit" @click.prevent="formSubmit" />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex';
  import FormInputText from '@/components/forms/FormInputText';
  import FormValidate from '@/components/forms/FormValidate';

  export default {
    name: "GameDeckStartJoin",
    components: {
      'form-input-text': FormInputText,
    },
    mixins: [
      FormValidate
    ],
    data() {
      return {
        formId: 'gameJoin',
        formErrors: {},
        formValues: {},
      }
    },
    computed: {
      ...mapState('game', [
          'gameId',
      ])
    },
    methods: {
      ...mapActions('game', [
        'JOIN_GAME',
      ]),
      formSubmit() {

        if (this.$_formHasErrors(this.formId)) {
          return
        }

        this.JOIN_GAME(this.formValues)
      }
    }
  }
</script>

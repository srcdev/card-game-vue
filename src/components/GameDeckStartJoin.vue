<template>
    <div class="game-deck-start">
        <h2 class="header2">Join a game</h2>
        <p>Join Game id: {{ gameId }}</p>
        <form @submit.prevent="formSubmit" class="form">
          <div class="form-row">
            <div class="form-row-inner form-row-inner_text">
              <label class="form_label" for="playerName">Create Player Name</label>
              <input class="form-input_text" placeholder="eg: Joe Bloggs" type="text" id="playerName" maxlength="50" v-model="formValues.playerName" />
            </div>
          </div>
          <div class="form-row">
            <div class="form-row-inner form-row-inner_actions">
              <input type="submit" class="btn" value="Submit" />
            </div>
          </div>
        </form>
    </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex';
  export default {
    name: "GameDeckStartJoin",
    data() {
      return {
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
        this.JOIN_GAME(this.formValues)
          .then((response) => {
            console.log(response);
          });
      }
    }
  }
</script>

/*
  Actions are methods used to cause mutations and execute asynchronous code.
  Responsible for preparing everything necessary for a mutation to confirm a change in the state.

  The actions expect a promise to be resolved, hence we make a return of the promise that returns axios.
  When axios returns the data, we can execute commits with the type of mutation that we want to carry out.
  Instead of mutating the state, actions commit mutations, in this case, using the mutator SET_DATA.
  And the mutator IS_LOADING that will help to know if there is still data to load.
**/
export const actions = {
  updateInfoText({commit}, payload) {
    console.log("updateInfoText action");
    commit('updateInfoText', payload);
  }
};
export default actions;


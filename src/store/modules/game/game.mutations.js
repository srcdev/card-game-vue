/*
  Mutations is also an object that contains methods that affect the state and only care to control the states, to manipulate it.
  A mutation may have two arguments as state and payload:
  - State has the current state of an application.
  - Payload is an optional one, which will give the data to mutate.
**/
export const mutations = {
  updateInfoText: (state, payload) => {
    console.log("updateInfoText mutations");
    state.infoText = payload;
  },
  setAppReady: (state) => {
    setTimeout(() => {
      state.appReady = true;
    }, 500);
  }
};
export default mutations;

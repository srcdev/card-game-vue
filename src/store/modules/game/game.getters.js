/*
  Getters contain the methods used to abstract access to the state and to do some preprocessing tasks, if necessary (data calculation, filtering, etc …).
**/
export const getters = {
  infoText: (state) => {
    return state.infoText;
  }
};
export default getters;

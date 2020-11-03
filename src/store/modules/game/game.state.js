/*
  The state is an object that contains the state of the application data.
**/
export const state = {
  gameState: 0, // 0 - App has just loaded || 1 - Game created || 2 - Game started
  infoText: 'Welcome message text from store',
  appReady: false,
  userData: null,
  gameId: null,
};
export default state;

export const state = {
  gameState: 0, // 0 - App has just loaded || 1 - Game created || 2 - Game started
  gameCreated: false,
  gameRunning: false,
  infoText: 'Welcome message text from store',
  appReady: false,
  userData: null,
  gameId: null,
  playerIsDealer: false,
  playerId: null,
};
export default state;

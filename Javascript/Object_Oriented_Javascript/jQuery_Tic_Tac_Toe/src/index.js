const View = require('./ttt-view')// require appropriate file
const Game = require('/Users/admin/Desktop/Current_Projects/App_Academy_Projects/Javascript/The_Event_Loop/Tic_Tac_Toe/Tic_Tac_Toe_Solution/game.js') // require appropriate file

  $(() => {
    // Your code here
    const rootEl = $('.ttt');
    const game = new Game;
    new View(game, rootEl);
  });

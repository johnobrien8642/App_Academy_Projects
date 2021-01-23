class View {
  constructor(game, $el) {
    this.game = game;
    this.$el = $el;

    this.setupBoard();
    this.bindEvents();
  }

  bindEvents () {
    let that = this
    this.$el.on('click', 'li', function(event){
      const $square = $(event.currentTarget);
      
      that.makeMove($square);
    });
  }

  makeMove ($square) {
    const pos = $square.data('pos');
    const currentPlayer = this.game.currentPlayer

    try {
      this.game.playMove(pos)
    } catch (e) {
      alert("This " + e.msg.toLowerCase());
      return;
    }

    $square.addClass(currentPlayer);

    if (this.game.isOver()) {
      this.$el.off("click")
      this.$el.addClass('game-over')

      const winner = this.game.winner();
      const $figcaption = $('<figcaption>')

      if (winner) {
        this.$el.addClass(`winner-${winner}`);
        $figcaption.html(`You win, ${winner}!`);
      } else {
        $figcaption.html("It's a draw!")
      }

      this.$el.append($figcaption);
    }
  }

  setupBoard () {
    const $ul = $('<ul>');

    for(let i = 0; i < 3; i++){
      for(let j = 0; j< 3; j++){
        let $li = $('<li>');
        $li.data('pos', [i, j]);

        $ul.append($li);
      }
    }

    this.$el.append($ul);
  }
}

module.exports = View;

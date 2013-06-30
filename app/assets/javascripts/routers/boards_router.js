Kanban.Routers.Boards = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
  },

  routes: {
    "": "index",
    "boards/:id": "show"
  },

  index: function () {
    var that = this;

    var boards = new Kanban.Collections.Boards();

    boards.fetch({
      success: function (boards) {
        console.log("fetched boards");
        console.log(boards);

        var boardsIndex = new Kanban.Views.BoardsIndex({
          collection: boards
        });

        that.$rootEl.html(boardsIndex.render().$el);
      }
    });
  },

  show: function (id) {
    var that = this;

    console.log("show page");

    var board = new Kanban.Models.Board({ id: id });
    board.fetch({
      success: function (board) {
        console.log("got board");
        console.log(board);

        var boardShow = new Kanban.Views.BoardShow({
          model: board
        });

        that.$rootEl.html(boardShow.render().$el);
      }
    });
  }

});

Kanban.Routers.Boards = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
  },

  routes: {
    "": "index",
    "/boards/": "show"
  },

  index: function () {
    var that = this;

    var boards = new Kanban.Collections.Boards();

    boards.fetch({
      success: function (data) {
        console.log("fetched boards");
        console.log(boards);

        var boardsIndex = new Kanban.Views.BoardsIndex({
          collection: boards
        });

        that.$rootEl.html(boardsIndex.render().$el);
      }
    });
  }

});

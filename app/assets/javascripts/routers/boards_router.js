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

    var boardsIndex = new Kanban.Views.BoardsIndex({
      collection: Kanban.boards
    });

    that.$rootEl.html(boardsIndex.render().$el);
  },

  show: function (id) {
    var that = this;

    console.log("show page");
    var board = Kanban.boards.get(id);
    var boardShow = new Kanban.Views.BoardShow({
      model: board
    });

    that.$rootEl.html(boardShow.render().$el);

    // var sortListsUrl = "/api/boards/" + id + "/sort_lists";
    sortListsUrl = "/api/lists/sort"
    var $lists = that.$rootEl.find("div.lists");
    $lists.sortable({
      axis: "x",
      update: function () {
        var sortData = $(this).sortable("serialize");
        $.post(sortListsUrl, sortData);
      }
    });

    sortCardsUrl = "/api/cards/sort"
    var $cards = $lists.find("div.cards");
    $cards.sortable({
      axis: "y",
      delay: 150,
      update: function () {
        var sortData = $(this).sortable("serialize");
        $.post(sortCardsUrl, sortData);
      }
    });
  }

});

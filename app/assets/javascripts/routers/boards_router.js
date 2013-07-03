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

    var board = Kanban.boards.get(id);
    var boardShow = new Kanban.Views.BoardShow({
      model: board
    });

    that.$rootEl.html(boardShow.render().$el);

    sortListsUrl = "/api/lists/sort"
    var $lists = that.$rootEl.find("div.lists");
    $lists.sortable({
      axis: "x",
      items: "div.list",
      update: function (data) {
        var sortData = $(this).sortable("serialize");
        $.post(sortListsUrl, sortData, function (resortedLists) {
          board.set({ lists: new Kanban.Collections.Lists(resortedLists) });
        });
      }
    });

    sortCardsUrl = "/api/cards/sort"
    var $cards = $lists.find("div.cards");
    $cards.sortable({
      connectWith: ".cards",
      delay: 150,
      update: function (event, ui) {
        var sortData = $(this).sortable("serialize");

        if (sortData) {	        
	        // add list_id to sortData
	        var listId = parseInt($(this).data("listId"));
	        sortData += '&list_id=' + listId

	        $.post(sortCardsUrl, sortData, function (resortedLists) {
	          board.set({ lists: new Kanban.Collections.Lists(resortedLists) });
	        });
        };
      }
    });
  }

});

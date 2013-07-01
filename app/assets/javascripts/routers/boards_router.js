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

    sortListsUrl = "/api/lists/sort"
    var $lists = that.$rootEl.find("div.lists");
    $lists.sortable({
      axis: "x",
      update: function (data) {
        var sortData = $(this).sortable("serialize");
        $.post(sortListsUrl, sortData, function (resortedLists) {
          board.set({ lists: new Kanban.Collections.Lists(resortedLists) });
        });

        // var freshLists = new Kanban.Collections.Lists();
        // freshLists.url = "/api/boards/" + id + "/lists";
        // freshLists.fetch({
        //   success: function (boards) {
        //     board.set({ lists:  freshLists });
        //   }
        // });

        // board.lists().each(function (list) {
        //   console.log(list);
        // })

        // var sortArr = $(this).sortable("toArray");
        // console.log(sortArr);

        // for (var i = 0; i < sortData.length; i++) {
        //   var list = board.get({ id: sortData[i] });
        //   console.log(list);
        // }
        // board.set
        // var boardId = $(this).data("boardId");
        // Kanban.boards.trigger
        // console.log(id);
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

Kanban.Views.BoardShow = Backbone.View.extend({
  template: JST['boards/show'],
  tagName: "section",
  className: "boards_show",

  events: {
    "click div.list": "listClick",
    "click div.card": "cardClick",
  },

  listClick: function (event) {
    console.log("list click");
    event.stopPropagation();
  },

  cardClick: function (event) {
    console.log("card click")
    event.stopPropagation();
  },

  render: function () {
    var that = this;

    var board = that.model;
    var lists = that.model.lists();
    // var cards = lists.get("cards");
    // console.log(cards);
    // lists.each(function (list) {
    //   console.log(list.cards();)
    // });

    var renderedContent = that.template({
      board: board,
      lists: lists,
      // cards: cards
    });

    that.$el.html(renderedContent);
    return that;
  }

});

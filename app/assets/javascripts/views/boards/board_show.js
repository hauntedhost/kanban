Kanban.Views.BoardShow = Backbone.View.extend({
  template: JST['boards/show'],
  tagName: "section",
  className: "board-show",

  initialize: function () {
    var that = this;

    that.model.on('reset', this.render, this);
  },

  events: {
    "click div.card": "cardClick",
  },

  cardClick: function (event) {
  	var that = this;

    event.stopPropagation();

    var board = that.model;
    var cardId = parseInt($(event.target).data("card-id"));    
    var $cardModal = that.$el.find("section.card_detail");

    var card = board.getCard(cardId);
    var cardShow = new Kanban.Views.CardShow({
      model: card
    });

  	$cardModal.html(cardShow.render().$el);
  	$cardModal.find("article.card_detail").modal();
  },

  render: function () {
    var that = this;

    var board = that.model;
    var lists = that.model.lists();

    var renderedContent = that.template({
      board: board,
      lists: lists,
    });

    that.$el.html(renderedContent);
    return that;
  }

});

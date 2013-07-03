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
    console.log("card click: " + cardId);

    var card = board.getCard(cardId);
    var cardShow = new Kanban.Views.CardShow({
      model: card
    });

    // ---------------------------------------------------------------

    // OPTIMIZE: refactor
    $cardModal = that.$el.find("#card_modal");
		$cardModal.empty();

  	var renderedContent = cardShow.render().$el.html();
		$(renderedContent).appendTo($cardModal).modal();

		// var html = '<div class="modal"><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit.</p></div>';
		// $(html).appendTo($cardModal).modal();
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

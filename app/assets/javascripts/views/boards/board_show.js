Kanban.Views.BoardShow = Backbone.View.extend({
  template: JST['boards/show'],
  tagName: "section",
  className: "board-show",

  initialize: function () {
    var that = this;

    that.model.on('reset', this.render, this);
    that.model.on('add', this.render, this);
    that.model.on('remove', this.render, this);
  },

  events: {
    "click div.card": "cardClick",
    "submit #add_list": "addList",
    "click button.archive_list": "archiveList"
  },

  addList: function (event) {
  	var that = this;

    var board = that.model;
  	event.preventDefault();

  	// get form attrs, reset form
  	var $form = $(event.target);
		var attrs = $form.serializeJSON();
		$form[0].reset();

		// add board_id to attrs
		attrs.list.board_id = board.id;

		// create new list
		var list = new Kanban.Models.List();	

		// save list
		list.save(attrs.list, {
			success: function (data) {
				// add list to board				
				var lists = board.lists();
				lists.add(list);

				// re-render board
				// that.render();
				board.trigger("add");
			}
		});
  },

  archiveList: function (event) {
  	var that = this;

    var board = that.model;
    event.stopPropagation();

  	console.log("archive list");

    var listId = parseInt($(event.target).data("list-id"));
    var lists = board.lists();
    var list = lists.get(listId);    

    console.log(lists);

		// remove list
		list.destroy({
			success: function (data) {
				// remove list from board
				lists.remove({ id: listId });
		    console.log(lists);

				// re-render board
		    board.trigger("remove");
			}
		});		
  },

  cardClick: function (event) {
  	var that = this;

    var board = that.model;
    event.stopPropagation();

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

    console.log("render board");

    var board = that.model;
    var lists = board.lists();
    var renderedContent = that.template({
      board: board,
      lists: lists,
    });

    that.$el.html(renderedContent);
    return that;
  }

});

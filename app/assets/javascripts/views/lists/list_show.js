Kanban.Views.ListShow = Backbone.View.extend({
	template: JST['lists/show'],
	tagName: "div",
  className: "list",

	initialize: function () {
		var that = this;
	  that.model.on('add', this.render, this);
	  that.model.on('remove', this.render, this);
	},

	events: {
  	"click div.card": "cardClick",
    "submit form.add_card": "addCard",
    "click button.archive_card": "archiveCard",
	},

  cardClick: function (event) {
  	var that = this;

    // var board = that.model;
    event.stopPropagation();

    var cardId = parseInt($(event.target).data("card-id"));
    // var $cardModal = that.$("section.card_detail");
    var $cardModal = $("section.card_detail");

		console.log($cardModal);

		var list = that.model;
		var cards = list.get("cards");
		var card = cards.get(cardId);
    // var card = board.getCard(cardId);
    // console.log("our card:");
    // console.log(card);

    card.fetch({
    	success: function (card) {

    		console.log("card data");
    		console.log(card);

		    var cardShow = new Kanban.Views.CardShow({
		      model: card,
					// board: board
		    });

		  	$cardModal.html(cardShow.render().$el);
		  	$cardModal.find("article.card_detail").modal();
    	}
    });
  },

  addCard: function (event) {
  	var that = this;

    // var board = that.model;
  	event.preventDefault();

    var $scrollPos = $("div.lists").scrollLeft();

		// var listId = parseInt($(event.target).data("list-id"));
		//     var list = board.get("lists").get(listId)

		var list = that.model;
		var cards = list.get("cards");
		var card = new Kanban.Models.Card();

  	// get form attrs, reset form
  	var $form = $(event.target);
		var attrs = $form.serializeJSON();
		$form[0].reset();

    // add list_id to attrs
    attrs.card.list_id = list.get("id");

		// fail is no card title
    if (!attrs.card.title) {
      var $list = $("div #list_" + listId);
      var $listInput = $("div #list_" + listId + " input.card_title");

      $listInput.hide();
      $list.effect("shake", {
        distance: 9,
        times: 2,
        complete: function () {
          $listInput.show();
          $listInput.focus();
        }
      }, 350);
      $("div.lists").scrollLeft($scrollPos);
      return false;
    }

		// save card
		card.save(attrs.card, {
			success: function (data) {
				cards.add(card);
				list.trigger("add");
        var listId = card.get("list_id");
        $("div #list_" + listId + " input.card_title").focus();
        $("div.lists").scrollLeft($scrollPos);
			}
		});
  },

  archiveCard: function (event) {
  	var that = this;

    // var board = that.model;
    event.stopPropagation();

  	console.log("archive card");

    // var card = board.getCard(cardId);
    // var list = card.get("list");
		var list = that.model;
    var cardId = parseInt($(event.target).data("card-id"));
    var cards = list.get("cards");
		var card = cards.get(cardId);

		// remove list
		card.destroy({
			success: function (data) {
				cards.remove(card);
		    list.trigger("remove");
			}
		});
  },

	render: function () {
		var that = this;
		that.$el.attr("id", "list_" + that.model.get("id"));
    that.$el.html(that.template({
      list: that.model
    }));

		return that;
	}
});
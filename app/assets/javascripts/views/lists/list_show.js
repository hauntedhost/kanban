Kanban.Views.ListShow = Backbone.View.extend({
	template: JST['lists/show'],
	tagName: "div",
  className: "list",

	initialize: function () {
		var that = this;
		that.model.get("cards").on("all", that.render, that);
		// that.model.on("all", that.render, that);
	  // that.model.on('add', this.render, this);
	  // that.model.on('remove', this.render, this);
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

    var $scrollPos = $("div.lists_wrapper").scrollLeft();
		// console.log($scrollPos);

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
			var listId = list.get("id");
      var $list = $("div #list_" + listId);
      var $cardInput = $("div #list_" + listId + " input.card_title");

      $cardInput.hide();
      $list.effect("shake", {
        distance: 9,
        times: 2,
        complete: function () {
          $cardInput.show();
          $cardInput.focus();
        }
      }, 350);
      $("div.lists_wrapper").scrollLeft($scrollPos);
      return false;
    }

		// save card
		card.save(attrs.card, {
			success: function (data) {
				cards.add(card);
				// list.trigger("add");
				var listId = list.get("id");
	      var $list = $("div #list_" + listId);
	      var $cardInput = $("div #list_" + listId + " input.card_title");
				console.log($cardInput);
				$cardInput.focus();

        // $("div #list_" + listId + " input.card_title").focus();
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
		    // list.trigger("remove");
			}
		});
  },

	render: function () {
		var that = this;
		var list = that.model;
		var list_id = list.get("id");

		that.$el.attr("id", "list_" + list_id);
    that.$el.html(that.template({
      list: list
    }));

		var cards = list.get("cards");
		var cardsIndex = new Kanban.Views.CardsIndex({
			collection: cards
		});

		// console.log(that.$("section.cards"));
		that.$("section.cards").html(cardsIndex.render().el);

    sortCardsUrl = "/api/cards/sort"
    var $cards = that.$("div.cards");
    $cards.sortable({
      items: "div.card",
      connectWith: ".cards",
      delay: 125,
    	tolerance: "pointer",
      placeholder: "card-placeholder",
 			start: function (e, ui) {
        ui.placeholder.width(ui.item.width());
      	ui.placeholder.height(ui.item.height());
    	},

      update: function (event, ui) {
        var sortData = $(this).sortable("serialize");

        if (sortData) {
	        // add list_id to sortData
	        var listId = parseInt($(this).data("listId"));
	        sortData += '&list_id=' + listId;

	        $.post(sortCardsUrl, sortData, function (resortedCards) {

						console.log("card re-sort");
						console.log(resortedCards);

						// var list = board.get("lists").get(resortedCards.list_id);
						var cards = list.get("cards");
						cards.reset(resortedCards.cards);

						// board.trigger("change");
						// debugger;
	        	// board.get("lists").reset(resortedLists);

	        	// var lists = board.get("lists");
	        	// lists.reset(resortedLists);
	          // board.reset({ lists: new Kanban.Collections.Lists(resortedLists) });
	        });
        };
      }
    });

		return that;
	}
});

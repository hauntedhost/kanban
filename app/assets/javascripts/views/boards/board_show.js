Kanban.Views.BoardShow = Backbone.View.extend({
  template: JST['boards/show'],
  tagName: "section",
  className: "board-show",

  initialize: function () {
    var that = this;

    that.model.on('reset', this.render, this);
    that.model.on('add', this.render, this);
    that.model.on('remove', this.render, this);
    that.model.on('sort', this.render, this);
  },

  events: {
    "submit form.add_list": "addList",
    "click button.archive_list": "archiveList",
  },

  addList: function (event) {
  	var that = this;

    var board = that.model;
  	event.preventDefault();

  	// get form attrs, reset form
  	var $form = $(event.target);
		var attrs = $form.serializeJSON();
		$form[0].reset();

		// add board_id to attrs, create new list
		attrs.list.board_id = board.id;
		var list = new Kanban.Models.List();
		var lists = board.get("lists");

    if (!attrs.list.title) {
      console.log("no title");
      var $scrollPos = $("div.lists").scrollLeft();
      console.log($scrollPos);
      var $addList = $("div.add_list");
      var $addListInput = $("div.add_list input.list_title");

      $addListInput.hide();
      $addList.effect("shake", {
        distance: 9,
        times: 2,
        complete: function () {
          $addListInput.show();
          $addListInput.focus();
        }
      }, 350);
      $("div.lists").scrollLeft($scrollPos);
      return false;
    }

		// save list
		list.save(attrs.list, {
			success: function (data) {
				lists.add(list);
				board.trigger("add");

        $addListInput = $("div.add_list input.list_title");
        $addListInput.focus();
			}
		});
  },

  archiveList: function (event) {
  	var that = this;

    var board = that.model;
    event.stopPropagation();

  	console.log("archive list");

    var listId = parseInt($(event.target).data("list-id"));
    var lists = board.get("lists");
    var list = lists.get(listId);

		// remove list
		list.destroy({
			success: function (data) {
				lists.remove({ id: listId });
		    console.log(lists);
		    board.trigger("remove");
			}
		});
  },

  render: function () {
    var that = this;

    console.log("render board");

    var board = that.model;
    var lists = board.get("lists");

    that.$el.html(that.template({
      board: board,
      // lists: lists,
    }));

		lists.each(function (list) {
			var listShow = new Kanban.Views.ListShow({
				model: list
			});
			that.$("section.lists").append(listShow.render().el);
		});

    // that.$el.html(renderedContent);

    sortListsUrl = "/api/lists/sort"
    var $lists = that.$el.find("section.lists");
    $lists.sortable({
      items: "div.list",
    	tolerance: "pointer",
      placeholder: "list-placeholder",
 			start: function (e, ui) {
        ui.placeholder.width(ui.item.width());
      	ui.placeholder.height(ui.item.height());
    	},
      update: function (data) {
        var sortData = $(this).sortable("serialize");
        $.post(sortListsUrl, sortData, function (resortedLists) {
        	board.get("lists").reset(resortedLists);
        	// var lists = board.get("lists");
        	// lists.reset
         //  board.reset({ lists: new Kanban.Collections.Lists(resortedLists) });
        });
      }
    });

    sortCardsUrl = "/api/cards/sort"
    var $cards = $lists.find("div.cards");
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

	        $.post(sortCardsUrl, sortData, function (resortedLists) {
	        	board.get("lists").reset(resortedLists);
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

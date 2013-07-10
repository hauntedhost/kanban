Kanban.Views.BoardShow = Backbone.View.extend({
  template: JST['boards/show'],
  tagName: "section",
  className: "board-show group",

  initialize: function () {
    var that = this;
		that.model.on("all", that.render, that);
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

		// fail if no list title
    if (!attrs.list.title) {
      var $scrollPos = $("div.lists_wrapper").scrollLeft();
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
      $("div.lists_wrapper").scrollLeft($scrollPos);
      return false;
    }

		// save list
		list.save(attrs.list, {
			success: function (data) {
				lists.add(list);

				// re-select list input
        $listInput = $("div.add_list input.list_title");
        $listInput.focus();
			}
		});
  },

  archiveList: function (event) {
  	var that = this;

    var board = that.model;
    event.stopPropagation();
    var $scrollPos = $("div.lists_wrapper").scrollLeft();

    var listId = parseInt($(event.target).data("list-id"));
    var lists = board.get("lists");
    var list = lists.get(listId);

		$("#list_" + listId).addClass("animated hinge");
		setTimeout(function () {
			// remove list
			list.destroy({
				success: function (data) {
					lists.remove({ id: listId });

					// maintain horizontal scrollbar position
					$("div.lists_wrapper").scrollLeft($scrollPos);
				}
			});
		}, 1250);

  },

  render: function () {
    var that = this;

    console.log("render board");

    var board = that.model;
    var lists = board.get("lists");
		var users = board.get("users");

    that.$el.html(that.template({
      board: board
    }));

		// render lists
		lists.each(function (list) {
			var listShow = new Kanban.Views.ListShow({
				model: list
			});
			that.$("section.lists").append(listShow.render().el);
		});

    // include members in sidebar
		var usersIndex = new Kanban.Views.UsersIndex({
			collection: users
		});
		that.$("section.board-sidebar").html(usersIndex.render().el);

		// members.each(function (member) {
		// 	// var listShow = new Kanban.Views.ListShow({
		// 	// 	model: list
		// 	// });
		// 	var email = member.get("email");
		// 	that.$("section.board-sidebar").append(email);
		// });

		// var $content = $("#content");
		// $content.height($(window).height() - 55);
		// $("#content").height($(window).height());
		// console.log(that.$(".board-sidebar"));
		// that.$(".board-sidebar").height($(".lists_wrapper").height() + 95);
		// that.$(".board-sidebar").height($(window).height());
		// that.$(".lists_wrapper").width($(window).width() - 140);

    // inline edit for board title
    that.$(".js-edit-board-name").editable(function (value, settings) {
      board.set({ name: value });
      board.save();
      return value;
    }, {
      submit: "Save",
      onblur: "submit"
    });

		// sortable for lists
    sortListsUrl = "/api/lists/sort"
    var $lists = that.$("section.lists");
    $lists.sortable({
      items: "div.list",
    	tolerance: "pointer",
      placeholder: "list-placeholder",
 			start: function (e, ui) {
        ui.placeholder.width(ui.item.width());
      	ui.placeholder.height(ui.item.height());
				// ui.item.addClass("animated swing");
    	},
      update: function (data) {
        var sortData = $(this).sortable("serialize");
        $.post(sortListsUrl, sortData, function (resortedLists) {
        	board.get("lists").reset(resortedLists);
        });
      }
    });
    return that;
  }
});

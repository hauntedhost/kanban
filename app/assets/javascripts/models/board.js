Kanban.Models.Board = Backbone.Model.extend({
  initialize: function () {
    var that = this;

    var lists = that.get("lists");
    that.set({ lists: new Kanban.Collections.Lists(lists) });
  },

  lists: function () {
    var that = this;

    return that.get("lists");
  },

  getList: function (id) {
  	var that = this;

  	// OPTIMIZE: refactor
		var lists = that.lists();
		var list = lists.get(id);
		if (list) {
			// console.log("found list #" + id);
			return list;
		};
  },

  getCard: function (id) {
  	var that = this;

  	var lists = that.lists();
  	var foundCard = undefined;
		lists.each(function (list) {
			var cards = list.cards();
			var card = cards.get(id);
			if (card) {
				// console.log("found card #" + id);
				foundCard = card;
			};
		});
		return foundCard;
  }
});

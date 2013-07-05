Kanban.Models.Board = Backbone.RelationalModel.extend({

	relations: [{
		type: Backbone.HasMany,
		key: "lists",
		relatedModel: "Kanban.Models.List",
		collectionType: "Kanban.Collections.Lists",
		reverseRelation: {
			key: "board"
		}
	}],

  // initialize: function () {
  //   var that = this;

  //   debugger;
  //   var lists = that.get("lists");
  //   that.set({ lists: new Kanban.Collections.Lists(lists) });
  // },

  // lists: function () {
  //   var that = this;
  //   return that.get("lists");
  // },

  getList: function (id) {
  	var that = this;

  	// OPTIMIZE: refactor
		// var lists = that.lists();
		var lists = that.get("lists");
		var list = lists.get(id);
		return list;
		// if (list) {
		// 	// console.log("found list #" + id);
		// 	return list;
		// };
  },

  getCard: function (id) {
  	var that = this;
  	var foundCard;
  	// var lists = that.lists();
  	var lists = that.get("lists");
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

Kanban.Collections.Boards = Backbone.Collection.extend({
  model: Kanban.Models.Board,
  url: '/api/boards',

  // getList: function (id) {
  //  var that = this;
  //  var list, foundList;

  //  that.each(function (board) {
  //    list = board.lists().get(id);
  //    if (list) {
  //      foundList = list;
  //    };
  //  });
  //  return foundList;
  // },

  // getCard: function (id) {
  //  var that = this;
  //  var card, foundCard;

  //  that.each(function (board) {
  //    board.get("lists").each(function (list) {
   //     card = list.get("cards").get(id);
   //     if (card) {
   //       foundCard = card;
   //     };
  //    });
  //  });
  //  return foundCard;
  // },

});

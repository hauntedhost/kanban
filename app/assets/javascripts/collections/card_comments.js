Kanban.Collections.CardComments = Backbone.Collection.extend({
  model: Kanban.Models.CardComment,

  // comparator: function (comment) {
  //  return comment.get("created_at_timestamp");
  // }

  // url: "/api/card_comments",

  // initialize: function (models, options) {
  //  var that = this;

  //  console.log("comments init. options:");
  //  console.log(options);

  //  // that.cardId = options.cardId;
  // },

  // fetch: function (options) {
  //  var that = this;

  //  that.url = "/api/cards/" + options.cardId + "/comments";
  //  console.log("card_comments fetch:");
  //  console.log(that.url);

  //  return Backbone.Collection.prototype.fetch.call(that, options);
  // }

  // url: function () {
  //  var that = this;
  //  return "/api/cards/" + that.cardId + "/card_comments";
  // }
});

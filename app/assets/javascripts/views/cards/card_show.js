Kanban.Views.CardShow = Backbone.View.extend({
  template: JST['cards/show'],
  tagName: "article",
  className: "card_detail",

  initialize: function () {
  	var that = this;
		that.model.get("comments").on("all", this.render, this);
  },

  events: {
    "submit form#add_comment": "addComment",
  },

  addComment: function (event) {
    var that = this;
  	event.preventDefault();

    var card = that.model;
    var cards = card.collection;
    var comments = card.get("comments");

  	// get form attrs, reset form
  	var $form = $(event.target);
		var attrs = $form.serializeJSON();
		$form[0].reset();

    // TODO: research toJSON override via backbone relational
    // suspect it prevents need to patch ids in like this
    attrs.card_comment.card_id = card.id;

		// fail if comment is empty
    if (!attrs.card_comment.content) {
      that.$el.effect("shake", {
        distance: 9,
        times: 2,
        complete: function () {
          $textarea = that.$el.find(".card_comment_content");
          $textarea.focus();
        }
      }, 350);
      return;
    }

		// create and render comment
		var cardComment = new Kanban.Models.CardComment();
    cardComment.save(attrs.card_comment, {
      success: function (response) {

				comments.add(cardComment, { at: 0 });
				that.trigger('commentAdded');
      }
    });
  },

  render: function () {
  	var that = this;

  	var card = that.model;
  	var comments = card.get("comments");

  	var renderedContent = that.template({
  		card: card,
  		comments: comments
  	});

  	that.$el.html(renderedContent);
	 	that.$el.find("abbr.timeago").timeago();

  	return that;
  }
});

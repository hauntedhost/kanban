Kanban.Views.CardShow = Backbone.View.extend({
  template: JST['cards/show'],
  tagName: "article",
  className: "card_detail",

  initialize: function () {
  	var that = this;
		// TODO: refactor to listenTo
		that.model.get("comments").on("all", this.render, this);
    // that.model.on('change', this.render, this);
  },

  events: {
    "submit form#add_comment": "addComment",
  },

  addComment: function (event) {
    var that = this;
  	event.preventDefault();

  	// var cardId = parseInt($(event.target).data("card-id"));
  	console.log("add comment");
    var card = that.model;
    var cards = card.collection;
    var comments = card.get("comments");

		console.log("comments");
    console.log(comments);

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
				console.log(comments);
				// card.trigger("change");

        // TODO: this is insane
        // var commentShow = new Kanban.Views.commentShow({
        //   model: cardComment
        // });

        // var $comments = that.$el.find("ul.comments");
        // $comments.append(attrs.card_comment.content);
        // $cardModal.find("article.card_detail").modal();
      }
    });
  },

  render: function () {
  	var that = this;

  	var card = that.model;
  	var comments = card.get("comments");
  	console.log(comments);

  	// var list = card.get("list");
  	// var board = list.get("board");
  	// console.log("card show:");
  	var renderedContent = that.template({
  		card: card,
  		comments: comments
  		// comments: comments
  	});

  	that.$el.html(renderedContent);
	 	that.$el.find("abbr.timeago").timeago();

  	return that;

  	// var cardComments = new Kanban.Collections.CardComments();
  	// cardComments.fetch({
  	// 	cardId: card.id,
  	// 	success: function (comments) {

  	// 		console.log(comments);
  	// 		// card.reset(comments);
  	// 		// console.log(comments);

		 //  	var renderedContent = that.template({
		 //  		card: card,
		 //  		comments: comments
		 //  	});

		 //  	that.$el.html(renderedContent);
		 //  	return that;
  	// 	}
  	// });

  	// console.log(comments;)

  	// var comments = comments.fetch(card.id);

  	// var comments = card.fetch("comments");
  	// var comments = card.get("comments").fetch();
  	// console.log(comments);

  }

});

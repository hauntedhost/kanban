Kanban.Views.CardShow = Backbone.View.extend({
  template: JST['cards/show'],
  tagName: 'article',
  className: 'card_detail',

  initialize: function () {
    var that = this;
    that.model.on('update', that.render, that);
    that.model.on('change', that.render, that);
    that.model.get('comments').on('add', that.render, that);
  },

  events: {
    'submit form#add_comment': 'addComment',
  },

  addComment: function (event) {
    event.preventDefault();
    var that = this;

    var card = that.model;
    var cards = card.collection;
    var comments = card.get('comments');

    // get form attrs, reset form
    var $form = $(event.target);
    var attrs = $form.serializeJSON();
    $form[0].reset();

    // OPTIMIZE: investigate toJSON override via backbone relational
    // suspect it prevents the need to patch ids in like this
    attrs.card_comment.card_id = card.id;

    // shake if comment is empty
    if (!attrs.card_comment.content) {
      that.$el.effect('shake', {
        distance: 9,
        times: 2,
        complete: function () {
          $textarea = that.$el.find('.card_comment_content');
          $textarea.focus();
        }
      }, 350);
      return;
    }

    var cardComment = new Kanban.Models.CardComment();
    cardComment.save(attrs.card_comment, {
      success: function (response) {
        comments.add(cardComment, { at: 0 });

        var card = comments.card;
        var comments_count = +card.get('comments_count');
        card.set({ comments_count: comments_count + 1 });

        _.defer(function () {
          $('ul.card_comments li:first-child').addClass('animated fadeIn');
        });

        // trigger card re-render
        card.get('list').trigger('change');
        // card.collection.trigger('change'); // FIXME: this fails inconsistently (?)
      }
    });
  },

  render: function () {
    var that = this;

    // console.log('render card show');
    var card = that.model;
    var comments = card.get('comments');

    var renderedContent = that.template({
      card: card,
      list: card.get('list'),
      assignee: card.get('assignee'),
      comments: comments
    });
    that.$el.html(renderedContent);

    // inline edit for card title
    that.$('.js-edit-card-title').editable(function (value, settings) {
      card.set({ title: value });
      card.save();
      return value;
    }, {
      submit: 'Save',
      onblur: 'submit',
      cssclass : 'animated fadeIn'
    });

    // decorate comment timestamps
    that.$el.find('abbr.timeago').timeago();

    return that;
  }
});

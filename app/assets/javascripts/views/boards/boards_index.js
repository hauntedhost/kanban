Kanban.Views.BoardsIndex = Backbone.View.extend({
  template: JST['boards/index'],
  tagName: 'section',
  className: 'boards-index',

  events: {
    'submit form.create_board': 'createBoard'
  },

  initialize: function () {
    var that = this;
    that.collection.on('all', that.render, that);
  },

  render: function () {
    var that = this;

    var renderedContent = that.template({
      boards: that.collection
    });

    that.$el.html(renderedContent);
    return that;
  },

  createBoard: function (event) {
    event.preventDefault();
    var that = this;

    // get form attrs, reset form
    var $form = $(event.target);
    var attrs = $form.serializeJSON();
    $form[0].reset();

    var board = new Kanban.Models.Board();

    // fail if no board name
    if (!attrs.board.name) {
      var $createContainer = $('div.create_board');
      var $nameInput = that.$el.find('input.board_name');

      $nameInput.hide();
      $createContainer.effect('shake', {
        distance: 9,
        times: 2,
        complete: function () {
          $nameInput.show();
          $nameInput.focus();
        }
      }, 350);
      return false;
    }

    // save list
    board.save(attrs.board, {
      success: function (data) {
        board.get('users').add(Kanban.currentUser);
        that.collection.add(board);

        // keep focus on list input
        that.$el.find('input.board_name').focus();
      }
    });
  }

});

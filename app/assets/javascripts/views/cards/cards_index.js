Kanban.Views.CardsIndex = Backbone.View.extend({
  template: JST['cards/index'],

  initialize: function () {
    var that = this;
  },

  render: function () {
    var that = this;

    var cards = that.collection;
    var renderedContent = that.template({
      cards: cards
    });

    that.$el.html(renderedContent);

    // allow dropping members onto cards to assign
    var $assignees = that.$('div.card');
    $assignees.droppable({
      accept: 'li.user',
      drop: function (event, ui) {
        // get data-ids
        var user_id = ui.draggable.data('user-id');
        var card_id = $(event.target).data('card-id');

        console.log('assigning card:')
        console.log('user_id: ' + user_id + ' + card_id: ' + card_id);

        // OPTIMIZE: !!!
        // create a card and drag to new list -- cannot find that card
        // also i am reaching waaay too far through models here

        // lookup related models
        console.log('cards');
        console.log(cards);

        var card = cards.get(card_id);
        console.log('card');
        console.log(card);

        var list = card.get('list');
        console.log('list');
        console.log(list);

        var board = list.get('board');
        console.log('board');
        console.log(board);

        var user = board.get('users').get(user_id);
        console.log('user');
        console.log(user);

        // set and save card
        card.set({ assignee: user });
        card.save({ assignee_id: user.id }); // OPTIMIZE: use patch verb with rails 4!
      }
    });

    return that;
  }

});

Kanban.CardsView = Ember.View.extend({
  templateName: 'cards',

  didInsertElement: function() {
    // sortable for cards
    var controller = this.get('controller');
    this.$('div.cards').sortable({
      items: 'div.card',
      connectWith: '.cards',
      delay: 125,
      tolerance: 'pointer',
      placeholder: 'card-placeholder',
      start: function (e, ui) {
        ui.placeholder.width(ui.item.width());
        ui.placeholder.height(ui.item.height());
      },
      update: function (event, ui) {
        // card sort data looks like this:
        // card[]=2&card[]=3&card[]=1
        var cardParams = $(this).sortable('serialize', {
          attribute: 'data-position'
        });

        var cardArray = $(this).sortable('toArray', {
          attribute: 'data-position'
        });

        if (cardParams) {
          // add list_id to sortData so that it looks like this:
          // card[]=2&card[]=3&card[]=1&list_id=8
          var listId = $(this).data('list-id');
          cardParams += '&list_id=' + listId;
          console.log('cardParams:', cardParams);
          controller.resortCards(cardParams, cardArray, listId);
        };
      }
    });
  }
});

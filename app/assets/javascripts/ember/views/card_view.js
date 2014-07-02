Kanban.CardView = Ember.View.extend({
  templateName: 'card',
  classNames: ['card'],
  attributeBindings: ['data-position'],
  'data-position': function() {
    // FIXME: do i really need to reach through controller to
    // get the card for the view? feels wrong.
    var card = this.get('controller').get('model');

    return 'card_' + card.id;
  }.property()
});

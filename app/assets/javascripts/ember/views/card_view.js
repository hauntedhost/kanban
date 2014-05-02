Kanban.CardView = Ember.View.extend({
  templateName: 'card',
  classNames: ['card'],
  attributeBindings: ['data-position'],
  'data-position': function() {
    return 'card_' + this.card.id;
  }.property()
});

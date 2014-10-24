Kanban.ListView = Ember.View.extend({
  templateName: 'list',
  classNames: ['list'],
  attributeBindings: ['data-position'],
  'data-position': function() {
    return 'list_' + this.id;
  }.property(),
});

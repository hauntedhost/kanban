Kanban.CardComment = DS.Model.extend({
  content: DS.attr('string'),
  card: DS.belongsTo('card', { embedded: 'always' }),
  user: DS.belongsTo('user', { embedded: 'always' })
});

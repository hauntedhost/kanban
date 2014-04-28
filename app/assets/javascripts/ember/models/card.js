Kanban.Card = DS.Model.extend({
  title: DS.attr('string'),
  open: DS.attr('boolean'),
  position: DS.attr('number'),
  comments_count: DS.attr('number'),
  list: DS.belongsTo('list', { embedded: 'always' }),
  user: DS.belongsTo('user', { embedded: 'always' })
});

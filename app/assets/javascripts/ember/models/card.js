Kanban.Card = DS.Model.extend({
  title: DS.attr('string'),
  open: DS.attr('boolean'),
  position: DS.attr('number'),
  list: DS.belongsTo('list', { embedded: 'always' }),
  card_comments: DS.hasMany('card_comment', { embedded: 'always' })
  // comments_count: DS.attr('number'),
  // user: DS.belongsTo('user', { embedded: 'always' })
});

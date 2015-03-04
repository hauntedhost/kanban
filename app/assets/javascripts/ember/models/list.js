Kanban.List = DS.Model.extend({
  title: DS.attr('string'),
  open: DS.attr('boolean'),
  position: DS.attr('number'),
  board: DS.belongsTo('board', { embedded: 'always' }),
  cards: DS.hasMany('card', { embedded: 'always' })
});

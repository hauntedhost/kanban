Kanban.Board = DS.Model.extend({
  name: DS.attr('string'),
  description: DS.attr('string'),
  open: DS.attr('boolean'),
  users: DS.hasMany('user', { embedded: 'always' }),
  lists: DS.hasMany('list', { embedded: 'always' })
});

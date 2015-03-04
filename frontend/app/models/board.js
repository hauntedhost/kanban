import DS from 'ember-data';

export default DS.Model.extend({
  description: DS.attr('string'),
  name: DS.attr('string'),
  lists: DS.hasMany('list', { async: true }),
  open: DS.attr('boolean'),
  // users: DS.hasMany('user', { embedded: 'always' }),
});

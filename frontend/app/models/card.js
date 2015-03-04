import DS from 'ember-data';

export default DS.Model.extend({
  comments: DS.hasMany('cardComment'),
  list: DS.belongsTo('list'),
  open: DS.attr('boolean'),
  position: DS.attr('number'),
  title: DS.attr('string'),
});

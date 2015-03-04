import DS from 'ember-data';

export default DS.Model.extend({
  board: DS.belongsTo('board'),
  cards: DS.hasMany('card'),
  open: DS.attr('boolean'),
  position: DS.attr('number'),
  title: DS.attr('string'),
});

import DS from 'ember-data';

export default DS.Model.extend({
  card: DS.belongsTo('card'),
  content: DS.attr('string'),
  // user: DS.belongsTo('user', { embedded: 'always' })
});

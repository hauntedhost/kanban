Kanban.Board = DS.Model.extend({
  name: DS.attr('string'),
  description: DS.attr('string'),
  open: DS.attr('boolean')
});

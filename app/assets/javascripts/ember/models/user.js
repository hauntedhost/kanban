Kanban.User = DS.Model.extend({
  email: DS.attr('string'),
  full_name: DS.attr('string'),
  bio: DS.attr('string'),
  gravatar_url: DS.attr('string')
});

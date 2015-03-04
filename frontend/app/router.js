import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('boards');
  this.resource('board', { path: '/boards/:id' });
});

export default Router;

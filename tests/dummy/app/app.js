import Ember from 'ember';
import Resolver from './resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';

import Strophe from 'ember-cli-strophe';
import Connection from 'ember-cli-strophe/connection';
import { $iq } from 'ember-cli-strophe/builder';
import { typeOf } from 'ember-utils';


Ember.assert('Strophe class should exist', Strophe);
Ember.assert('Connection class should exist', typeOf(Connection) === 'function');
let connection = new Connection("/http-bind/");
Ember.assert('connection object should exist', typeOf(connection) === 'object');
let stanza = $iq('hello').tree();
Ember.assert('iq stanza should exist', typeOf(stanza) === 'object');

let App;

Ember.MODEL_FACTORY_INJECTIONS = true;

App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver
});

loadInitializers(App, config.modulePrefix);

export default App;

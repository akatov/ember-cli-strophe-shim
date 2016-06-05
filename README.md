# ember-cli-strophe-shim

[![Build Status](https://travis-ci.org/akatov/ember-cli-strophe-shim.svg?branch=master)](https://travis-ci.org/akatov/ember-cli-strophe-shim)
[![npm Version](https://img.shields.io/npm/v/ember-cli-strophe-shim.svg?style=flat-square)](https://www.npmjs.org/package/ember-cli-strophe-shim)
[![Ember Observer Score](http://emberobserver.com/badges/ember-cli-strophe-shim.svg)](http://emberobserver.com/addons/ember-cli-strophe-shim)
[![Ember badge](http://embadge.io/v1/badge.svg?start=1.0.0)](http://embadge.io/)

ES6 accessible modules for [Strophe](http://strophe.im/) within your Ember applications.

## Installation

```bash
ember install ember-cli-strophe-shim
```

## Usage

```js
import Strophe from 'ember-cli-strophe-shim';
import Connection from 'ember-cli-strophe-shim/connection';
import Builder, { $pres } from 'ember-cli-strophe-shim/builder';

Ember.debug(`Strophe version ${ Strophe.VERSION }`);
Ember.assert('Builder is a constructor', Ember.typeOf(new Builder('iq')) === 'object');

let c = new Connection('http://localhost:5280/http-bind/');
c.connect('me@my-server.com', 'my-password');

// ... then later

c.send($pres());
```

## Strophe Plugins

To enable a Strophe [plugin](https://github.com/strophe/strophejs-plugins) include it
in your config like so:

* config/environment.js
```js
module.exports = function(environment) {
  return {
     strophe: {
       plugins: [
         'ping',
         'roster'
       ]
     }
  };
};
```

## Running Tests

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

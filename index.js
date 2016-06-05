/* jshint node: true */
'use strict';

var Funnel = require('broccoli-funnel');
var mergeTrees = require('broccoli-merge-trees');
var path = require('path');

// we only need to mention the ones that aren't `strophe.plugin.js`
var PLUGIN_FILES = {
  caps: ['strophe.CAPS.js'],
  cmds: ['src/strophe.cmds.js'],
  dataforms: ['src/strophe.x.js'],
  // disco has strophe.disco.js, but need to check the alternatives
  'iot-control': ['strophe.control.js'],
  'iot-sensordata': ['strophe.sensordata.js'],
  mam: ['strophe.mam.v0.3.js'], // also has v0.2
  // roster has strophe.roster.js, but need to check the alternatives
  // rpc has strophe.rpc.js, but need to check the alternatives
  // test-helpers contains strophe.sentinel.js which isn't even a plugin
}

module.exports = {
  name: 'ember-cli-strophe-shim',

  included: function(app) {
    this._super.included.apply(this, arguments);
    var vendor = this.treePaths.vendor;
    app.import(vendor + '/strophe/strophe.js', { prepend: true });
    var config = this.getConfig();
    var plugins = config.plugins || [];
    plugins.forEach(function(plugin) {
      app.import(vendor + '/strophe/strophe.' + plugin + '.js');
    });
  },

  getConfig: function() {
    return (this.project.config(process.env.EMBER_ENV) || {}).strophe || {};
  },

  treeForVendor: function(vendorTree) {
    var trees = [];
    if (vendorTree) {
      trees.push(vendorTree);
    }
    var nmp = path.join(__dirname, 'node_modules');
    var strophePath = path.dirname(require.resolve('strophe.js'));
    console.log(strophePath);
    var strophePluginsPath = path.join(nmp, 'strophejs-plugins');
    console.log(strophePluginsPath);
    var config = this.getConfig();
    var plugins = config.plugins || [];
    trees.push(new Funnel(strophePath, {
      destDir: 'strophe',
      include: ['strophe.js'],
    }));
    plugins.forEach(function(plugin) {
      var p = path.join(strophePluginsPath, plugin);
      var includeFiles = PLUGIN_FILES[plugin] || ['strophe.' + plugin + '.js'];
      console.log(plugin, p, includeFiles);
      trees.push(new Funnel(p, {
        destDir: 'strophe',
        include: includeFiles,
      }));
    });
    return mergeTrees(trees);
  },
};

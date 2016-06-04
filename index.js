/* jshint node: true */
'use strict';

var Funnel = require('broccoli-funnel');
var mergeTrees = require('broccoli-merge-trees');
var path = require('path');

module.exports = {
  name: 'ember-cli-strophe',

  included: function(app) {
    this._super.included.apply(this, arguments);
    var vendor = this.treePaths.vendor;
    app.import(vendor + '/strophe/strophe.js', { prepend: true });
  },

  treeForVendor: function(vendorTree) {
    var trees = [];
    if (vendorTree) {
      trees.push(vendorTree);
    }
    var strophePath = path.dirname(require.resolve('strophe.js'));
    trees.push(new Funnel(strophePath, {
      destDir: 'strophe',
      include: [new RegExp(/\.js$/)],
    }));
    return mergeTrees(trees);
  },
};

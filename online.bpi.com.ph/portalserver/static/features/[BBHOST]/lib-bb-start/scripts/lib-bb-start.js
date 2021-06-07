/* global window,System,define,require */
/**
 * @module lib-bb-start
 *
 * @description
 * Provides a consistent interface for bootstrapping a Widget's JavaScript.
 *
 * The purpose of this module is to handle the loading of bootstrap helpers, so on-page `script`
 * tags can be consistent and independent of the bootstrap process.
 */

window.BB = window.BB || {};
window.BB.Widget = window.BB.Widget || {};

/**
 * A helper function that lazy loads the angular start library and
 * uses it to start the given module.
 *
 * It is attached to the global (window) scope to allow access from non-modular JavaScript code,
 * such as the widget's main template (index.html)
 *
 * @example
 * <body g:onload="BB.Widget.ngStart(__WIDGET__);">
 *
 * @name BB.Widget.ngStart
 * @global
 * @type {function}
 * @param {WidgetInstance} widgetInstance WidgetInstance to start
 * @return {void}
 */
window.BB.Widget.ngStart = function ngStart(widgetInstance) {
  function startAngularWidget(startModule) {
    var start = startModule.default; // eslint-disable-line no-var
    start(System.amdRequire, widgetInstance);
  }

  function run() {
    System.import('lib-bb-start-ng').then(startAngularWidget);
  }

  // If require JS is on the page, config-bb-module-loader won't have run yet.
  if (typeof define === 'function' && define.amd) {
    require(['config-bb-module-loader'], run); // eslint-disable-line global-require
  } else {
    run();
  }
};

/**
 * @typedef WidgetInstance
 * @type {object}
 * @property {string} id Unique ID of the widget instance
 * @property {string} name The name of the widget
 * @property {HTMLElement} body The DOM Node where the widget can be rendered
 * @property {WidgetInstance#getPreference} getPreference Get a preference from the widget model
 */

/**
 * @typedef WidgetInstance#getPreference
 * @type {function}
 * @param {string} preferenceName Name of the preference to fetch from the model
 * @returns {?string} The value of the preference in the model, or undefined if it isn't available
 */

// This file was automatically generated from panel-web.soy.
// Please don't edit this file by hand.

if (typeof templates_PanelContainer == 'undefined') { var templates_PanelContainer = {}; }


templates_PanelContainer.PanelContainer = function(opt_data, opt_ignored) {
  var output = '\t<div data-pid="' + soy.$$escapeHtml(opt_data.item.name) + '" id="' + soy.$$escapeHtml(opt_data.item.name) + '" class="bp-container bp-ui-dragRoot tab-pane clearfix"><div class="bp-area --area lp-panel-mainarea">';
  if (! (opt_data.item.preferences.loadChildren && opt_data.item.preferences.loadChildren.value == 'false') && opt_data.item.children) {
    var childList10 = opt_data.item.children;
    var childListLen10 = childList10.length;
    for (var childIndex10 = 0; childIndex10 < childListLen10; childIndex10++) {
      var childData10 = childList10[childIndex10];
      output += soy.$$filterNoAutoescape("");
    }
  }
  output += '</div></div>';
  return output;
};

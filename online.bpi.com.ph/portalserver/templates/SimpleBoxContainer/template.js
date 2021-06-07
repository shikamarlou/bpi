// This file was automatically generated from box-layout-web.soy.
// Please don't edit this file by hand.

if (typeof templates_SimpleBoxContainer == 'undefined') { var templates_SimpleBoxContainer = {}; }


templates_SimpleBoxContainer.SimpleBoxContainer = function(opt_data, opt_ignored) {
  var output = '<div class="simple-box-layout ' + soy.$$escapeHtml(opt_data.item.preferences.layoutClasses.value) + ' bp-container bp-ui-dragRoot bp-area --area" data-pid="' + soy.$$escapeHtml(opt_data.item.name) + '">';
  var childList8 = opt_data.item.children;
  var childListLen8 = childList8.length;
  for (var childIndex8 = 0; childIndex8 < childListLen8; childIndex8++) {
    var childData8 = childList8[childIndex8];
    output += (parseInt(childData8.preferences.area.value,10) == 0) ? soy.$$filterNoAutoescape("") : '';
  }
  output += '</div>';
  return output;
};

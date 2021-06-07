// This file was automatically generated from ManageableArea_Web.soy.
// Please don't edit this file by hand.

if (typeof backbase_com_2013_aurora == 'undefined') { var backbase_com_2013_aurora = {}; }


backbase_com_2013_aurora.ManageableArea = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<div class="bp-container bp-ui-dragRoot bp-manageableArea --area bp-area" data-pid="' + soy.$$escapeHtml(opt_data.item.name) + '">' + ((opt_ijData.designmode == true) ? '<div class="bp-manageableArea--message"><div class="bp-manageableArea--body"><span class="bp-manageableArea--icon"></span><div class="bp-manageableArea--title">Manageable Area</div><div class="bp-manageableArea--text">Only via Manageable areas, content can be added to regular pages.</div></div></div>' : '');
  var childList9 = opt_data.item.children;
  var childListLen9 = childList9.length;
  for (var childIndex9 = 0; childIndex9 < childListLen9; childIndex9++) {
    var childData9 = childList9[childIndex9];
    output += soy.$$filterNoAutoescape("");
  }
  output += '</div>';
  return output;
};

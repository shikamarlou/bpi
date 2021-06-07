/*global b$, window */
(function () {
    'use strict';

    var Container = b$.bdom.getNamespace('http://backbase.com/2013/portalView').getClass('container');

    Container.extend(function (bdomDocument, node) {
        Container.apply(this, arguments);
        this.isPossibleDragTarget = true;
    }, {
        localName: 'SimpleBoxContainer',
        namespaceURI: 'universal'
    }, {
        template: function(json) {
            var data = {item: json.model.originalItem};
            return window['templates_' + this.localName][this.localName](data);
        },
        handlers: {
            'preferences-form': function () { },
            preferencesSaved: function () {
                this.refreshHTML();
            }
        }
    });
})();

/**
 *  ----------------------------------------------------------------
 *  Author : Backbase R&D - Amsterdam - New York
 *  Filename : content.js
 *  Description:
 *
 *  Source code for CXP Universal Content Widget
 *  ----------------------------------------------------------------
 */

/* global be:false b$:true */
window.b$ = window.b$ || {};
b$.universal = b$.universal || {};
b$.universal.widgets = b$.universal.widgets || {};
b$.universal.widgets.backgroundWidget = (function($, bd) {
    'use strict';

    return {
        /**
         * Initialize content widget
         * @param  {Object} oWidget Backbase widget object
         */
        start: function(oWidget) {
            var delayed = false;
            const body = document.body;

            const getPosition = function(width) {
                if (width <= 480) {
                    return oWidget.getPreference('mobile');
                } else if (width <= 1024) {
                    return oWidget.getPreference('tablet');
                } else {
                    return oWidget.getPreference('web');
                }
            };

            const setBackgroundPosition = function() {
                body.style.backgroundPosition = getPosition(window.innerWidth);
            };

            const setBackgroundClass = function(className) {
                body.classList.add(className);
            };

            const setBackgroundOverlay = function() {
                const rbgValue = oWidget.getPreference('overlayRgba');
                const overlayElement = document.createElement('div');
                overlayElement.classList.add('body-background__overlay');
                overlayElement.style.backgroundColor = 'rgba(' + rbgValue + ')';
                document.body.appendChild(overlayElement);
            };

            const setBackground = function(imageUrl) {
                body.style.backgroundImage = 'url(' + imageUrl + ')';

                const image = new Image();
                image.onload = function() {
                    setBackgroundPosition();
                    setBackgroundClass('body-background');
                    if (oWidget.getPreference('overlayRgba')) {
                        setBackgroundOverlay();
                    }
                };
                image.src = imageUrl;

                oWidget.body.remove();
            };

            window.addEventListener('resize', setBackgroundPosition);

            var renderICEWidget = function() {
                if (!be.ice) {
                    const imageUrl = oWidget.body
                        .getElementsByClassName('image-bpi-background-hide')[0]
                        .getAttribute('src');
                    if (imageUrl) {
                        setBackground(imageUrl);
                    }
                    return;
                }
                oWidget.iceConfig = be.ice.config;

                var isMasterpage = be.utils.module('top.bd.PageMgmtTree.selectedLink').isMasterPage,
                    isManageable =
                        isMasterpage ||
                        // .model.manageable === true means widget belongs to master page
                        // and is made manageable. In this case content still shouldn't be editable
                        (oWidget.model.manageable === '' || oWidget.model.manageable === undefined);

                if (
                    isManageable &&
                    be.ice.controller &&
                    /(?:ADMIN|CREATOR)/.test(oWidget.model.securityProfile)
                ) {
                    var templateUrl = String(oWidget.getPreference('templateUrl')),
                        enableEditing = function() {
                            // it is possible to swap template for editorial
                            // here is an example for image template
                            if (templateUrl.match(/\/image\.html$/)) {
                                templateUrl = templateUrl.replace(
                                    /\/image\.html$/,
                                    '/image-editorial.html'
                                );
                            }

                            return be.ice.controller.edit(oWidget, templateUrl).then(function(dom) {
                                $(oWidget.body)
                                    .find('.bp-g-include')
                                    .html(dom);

                                return dom;
                            });
                        };

                    // this widget has property rendering example (template: simple.html)
                    // so we need to refresh widget after property 'title' modified
                    oWidget.model.addEventListener(
                        'PrefModified',
                        function(oEvent) {
                            if (oEvent.attrName === 'title') {
                                enableEditing();
                            }
                        },
                        false,
                        oWidget
                    );

                    return enableEditing();
                }
            };

            // Extend widget in design mode
            if (be.ice && bd && bd.designMode == 'true') {
                renderICEWidget();
            } else if (!delayed) {
                // ICE library not loaded yet, delay rendering
                delayed = true;
                setTimeout(renderICEWidget, 500);
            }
        },
    };
})(window.jQuery, window.bd);

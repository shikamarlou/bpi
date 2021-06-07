/**
 *  ----------------------------------------------------------------
 *  Author : Backbase R&D - Amsterdam - New York
 *  Filename : structuredcontent.js
 *  Description:
 *
 * Source code for CXP Universal Structured content widget
 *  ----------------------------------------------------------------
 *
 *  MODIFIED for use with all widgets (AngularJS for example)
 */
/* global b$:true be:false BB:false */
window.b$ = window.b$ || {};
b$.universal = b$.universal || {};
b$.universal.widgets = b$.universal.widgets || {};
b$.universal.widgets.AnyStructuredContentWidget = (function($) {
    'use strict';

    var CONTENT_SERVICES_PROTOCOL = 'cs';
    var STRUCTURED_CONTENT_CLASS = 'bd-structured-content-ng';

    function startNgWidget(oWidget) {
        BB.Widget.ngStart(oWidget);
    }

    var StructuredContent = {
        /**
         * prefModified callback
         * @param  {Object} oWidget Backbase widget object
         */
        prefModified: function(oWidget) {
            oWidget.refreshIncludes();

            var $widget = $(oWidget.htmlNode);
            $('.' + STRUCTURED_CONTENT_CLASS, $widget).attr(
                'data-type',
                oWidget.getPreference('contentType') || 'Content'
            );
        },
        /**
         * Initialize structured content widget
         * @param  {Object} oWidget Backbase widget object
         */
        start: function(oWidget) {
            var contentRef = oWidget.getPreference('contentRef'),
                dragItem,
                isMasterpage =
                    window.be && be.utils
                        ? be.utils.module('top.bd.PageMgmtTree.selectedLink')['isMasterPage']
                        : false,
                isInCxpMode = !!window.be.cmis,
                isManageable =
                    isInCxpMode &&
                    (isMasterpage ||
                        (oWidget.model.manageable === 'true' ||
                            oWidget.model.manageable === '' ||
                            oWidget.model.manageable === undefined));

            if (!isManageable) {
                startNgWidget(oWidget);
                return;
            }

            var $widget = $(oWidget.htmlNode);

            if (!contentRef) {
                $widget.addClass('bd-empty-structured-content');
            } else {
                $widget.addClass('bd-filled-structured-content');
            }

            $widget.append('<div class="' + STRUCTURED_CONTENT_CLASS + '"></div>');

            $('.' + STRUCTURED_CONTENT_CLASS, $widget).attr(
                'data-type',
                oWidget.getPreference('contentType') || 'Content'
            );

            oWidget.addEventListener('bdDrop.enter', function(e) {
                var item = e.detail.info.helper.bdDragData.fileDataArray[0]; // e.detail.info.helper is a HTMLElement!@$#%

                if (
                    item.metaData &&
                    item.metaData['cmis:objectTypeId'] &&
                    item.metaData['cmis:objectTypeId'].property === 'bb:structuredcontent'
                ) {
                    dragItem = item;
                    $widget.addClass('bd-over-structured-content');
                } else {
                    dragItem = undefined;
                }
            });
            oWidget.addEventListener('bdDrop.leave', function() {
                $widget.removeClass('bd-over-structured-content');
            });
            oWidget.addEventListener('bdDrop.drop', function() {
                if (dragItem) {
                    if (!oWidget.model.preferences.getByName('contentRef')) {
                        var contentRefPref = b$.portal.portalModel.createPreference(
                            'contentRef',
                            'contentRef',
                            undefined,
                            ''
                        );
                        oWidget.model.preferences.add(contentRefPref);
                    }
                    oWidget.setPreference(
                        'contentRef',
                        [
                            CONTENT_SERVICES_PROTOCOL,
                            dragItem.repository === 'contentRepository'
                                ? dragItem.repository
                                : '@portalRepository',
                            dragItem.contentUId,
                        ].join(':')
                    );
                    oWidget.model.save(function() {
                        oWidget.refreshHTML();
                        $widget.removeClass('bd-empty-structured-content');
                    });
                    $widget.removeClass('bd-over-structured-content');
                }
                dragItem = undefined;
            });

            if (window.bd && window.bd.bindDropEvents) {
                window.bd.bindDropEvents(oWidget.htmlNode);
            }

            startNgWidget(oWidget);
        },
    };

    return StructuredContent;
})(window.jQuery);

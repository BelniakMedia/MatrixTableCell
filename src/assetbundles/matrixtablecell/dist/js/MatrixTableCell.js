/**
 * Matrix Table Cell plugin for Craft CMS
 *
 * MatrixTableCell Field JS
 *
 * @author    Belniak Media, Inc.
 * @copyright Copyright (c) 2017 Belniak Media, Inc.
 * @link      http://www.belniakmedia.com
 * @package   MatrixTableCell
 * @since     1.0.0MatrixTableCellMatrixTableCell
 */

 ;(function ( $, window, document, undefined ) {

    var pluginName = "MatrixTableCellMatrixTableCell",
        defaults = {
        };

    // Plugin constructor
    function Plugin( element, options ) {
        this.element = element;

        this.options = $.extend( {}, defaults, options) ;

        this._defaults = defaults;
        this._name = pluginName;

        this.init(element.id);
    }


    Plugin.prototype = {


        updateAttributes: function(newRow) {

            $(newRow).find('input').each(function() {
                $(this).attr('value', $(this).val());
            });

            var selectValue = $(newRow).find('select').val();
            $(newRow).find('select option').each(function() {
                if($(this).attr('value') == selectValue) {
                    $(this).attr('selected', 'selected');
                } else {
                    $(this).removeAttr('selected');
                }
            });

            return newRow;

        },

        changeRowIndex: function(newRow, newIndex) {

            newRow = this.updateAttributes(newRow);

            var lastIndex = $(newRow).data('index');
            $(newRow).data('index', newIndex).attr('data-index', newIndex);

            var pattern = new RegExp('\\[cells\\]\\[' + lastIndex + '\\]', 'g');
            $(newRow).html($(newRow).html()
                .replace(pattern, '[cells][' + newIndex + ']'));

            return newRow;
        },

        resetRowHtml: function(newRow) {

            $(newRow).find('textarea').val('').text('').html('');
            $(newRow).find('select').val('left').prop('selectedIndex', 1);
            $(newRow).find('select option')
                .prop('selected', false)
                .removeAttr('selected');
            $(newRow).find('textarea.colspan').val('0').html('0');

            return newRow;
        },

        addRow: function() {
            var lastRow = $('#' + this.element.id).find('table.matrixTableCellRow tbody.data-rows tr.data-row:last');
            var lastIndex = $(lastRow).data('index');
            var newIndex = lastIndex + 1;

            var newRow = this.resetRowHtml(
                this.changeRowIndex($(lastRow).clone(), newIndex)
            );

            var _this = this;
            $(newRow).find('a.remrow').click({_this: _this}, function(event) {
                _this.removeRow($(this));
            });

            $('#' + this.element.id + ' tbody.data-rows').append($(newRow));

            /*
            var $rows = $('#' + this.id + ' tbody.data-rows tr.data-row');
            this.cellSort = new DataTableSorter($rows, {
                handle: '> .action > .move',
                axis: 'y',
                collapseDraggees: false,
                magnetStrength: 4,
                helperLagBase: 1.5,
                helperOpacity: 0.9,
                onSortChange: $.proxy(function() {
                    this.resetOrder();
                }, this)
            });
            */

            this.sorter = new Craft.DataTableSorter(this.$table, {
                helperClass: 'editabletablesorthelper',
                copyDraggeeInputValuesToHelper: true
            });

        },

        removeRow: function(obj) {

            var remRow = $(obj).closest('tr');
            var index = $(remRow).data('index');

            if(index === undefined) { return; }

            if($(remRow).siblings().length < 1) {

                console.log("not enough rows to delete one!");
                return;
            }

            var tbody = $(remRow).closest('tbody.data-rows');
            $(remRow).remove();

            var _this = this;

            $(tbody).find('tr.data-row').each(function() {
                if($(this).data('index') > index) {

                    var curIndex = $(this).data('index');
                    var newIndex = curIndex - 1;

                    var newRow = _this.changeRowIndex($(this), newIndex);
                    //var newRow = $(this);

                    $(newRow).find('a.remrow').click({_this: _this}, function(event) {
                        _this.removeRow($(this));
                    });

                    $(this).replaceWith($(newRow));
                }
            });
        },

        resetOrder: function() {
            var count = 0;
            var _this = this;
            $('#' + this.id + ' tbody.data-rows').find('tr.data-row').each(function() {
                $(this).replaceWith(_this.changeRowIndex($(this), count));
                count++;
            });
        },

        init: function(id) {
            var _this = this;

            this.id = id;
            this.container = $('#' + this.id);
            this.$table = this.container.find('table')[0];
            this.buttonContainer = this.container.find('td.buttons');
            this.remRowButtons = this.buttonContainer.find('a.remrow');

            $(this.remRowButtons).click({_this: _this}, function(event) {
                _this.removeRow($(this));
            });

            $('#' + id + '-addbutton').click({_this: _this}, function(event) {
                _this.addRow();
            });


            /*
            var $rows = $('#' + this.id + ' tbody.data-rows tr.data-row');
            this.cellSort = new DataTableSorter($rows, {
                handle: '> .action > .move',
                axis: 'y',
                collapseDraggees: false,
                magnetStrength: 4,
                helperLagBase: 1.5,
                helperOpacity: 0.9,
                onSortChange: $.proxy(function() {
                    this.resetOrder();
                }, this)
            });
            */

            this.sorter = new Craft.DataTableSorter(this.$table, {
                helperClass: 'editabletablesorthelper',
                copyDraggeeInputValuesToHelper: true
            });

            $(function () {

/* -- _this.options gives us access to the $jsonVars that our FieldType passed down to us */

            });


        }
    };

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName,
                new Plugin( this, options ));
            }
        });
    };

})( jQuery, window, document );



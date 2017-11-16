<?php
/**
 * Matrix Table Cell plugin for Craft CMS 3.x
 *
 * Adds a field type that functions as a table cell to be used inside a matrix.
 *
 * @link      http://www.belniakmedia.com
 * @copyright Copyright (c) 2017 Belniak Media, Inc.
 */

namespace BelniakMedia\MatrixTableCell\assetbundles\matrixtablecell;

use Craft;
use craft\web\AssetBundle;
use craft\web\assets\cp\CpAsset;

/**
 * MatrixTableCellFieldAsset AssetBundle
 *
 * AssetBundle represents a collection of asset files, such as CSS, JS, images.
 *
 * Each asset bundle has a unique name that globally identifies it among all asset bundles used in an application.
 * The name is the [fully qualified class name](http://php.net/manual/en/language.namespaces.rules.php)
 * of the class representing it.
 *
 * An asset bundle can depend on other asset bundles. When registering an asset bundle
 * with a view, all its dependent asset bundles will be automatically registered.
 *
 * http://www.yiiframework.com/doc-2.0/guide-structure-assets.html
 *
 * @author    Belniak Media, Inc.
 * @package   MatrixTableCell
 * @since     1.0.0
 */
class MatrixTableCellAsset extends AssetBundle
{
    // Public Methods
    // =========================================================================

    /**
     * Initializes the bundle.
     */
    public function init()
    {
        // define the path that your publishable resources live
        $this->sourcePath = "@BelniakMedia/MatrixTableCell/assetbundles/matrixtablecell/dist";

        // define the dependencies
        $this->depends = [
            CpAsset::class,
        ];

        // define the relative path to CSS/JS files that should be registered with the page
        // when this asset bundle is registered
        $this->js = [
            'js/MatrixTableCell.js',
        ];

        $this->css = [
            'css/MatrixTableCell.css',
        ];

        parent::init();
    }
}

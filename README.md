# Matrix Table Cell plugin for Craft CMS 3.x

Adds a field type that functions as a table cells to be used inside a matrix. Each matrix 'block' represents a table row. This field placed inside can add as many cells as needed and supports the following features:

- Cell alignment (left, right, center)
- TD Class String
- Rowspan #
- Colspan #

Each row will delivered an array via your field handle with all values specified in the admin. You will need to loop these arrays to generate your table code.


## Requirements

This plugin requires Craft CMS 3.0.0-beta.23 or later.

## Installation

To install the plugin, follow these instructions.

1. Open your terminal and go to your Craft project:

        cd /path/to/project

2. Then tell Composer to load the plugin:

        composer require BelniakMedia/MatrixTableCell

3. In the Control Panel, go to Settings → Plugins and click the “Install” button for Matrix Table Cell.

## Templating Samples

Sample code coming soon

## Configuring Matrix Table Cell

There are currently no settings / configuration options however there are plans to add the ability to hide developer fields, such as colspan, rowspan, field class and event the ability to add or delete cells from non-admin users.


Brought to you by [Belniak Media, Inc.](http://www.belniakmedia.com)

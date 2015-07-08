/**
 * Created by shusa_000 on 7/7/2015.
 */
"use strict";

goog.provide('DVT.fiber');

goog.require('DVT.loaded');

/**
 * Class representing dMRI-generated tractography data
 * @param copyFrom Object to copy properties from
 * @extends DVT.loaded
 * @constructor
 */

DVT.fiber = function(copyFrom)
{
    goog.base(this, 'constructor', copyFrom);


};
goog.inherits(DVT.fiber, DVT.loaded);

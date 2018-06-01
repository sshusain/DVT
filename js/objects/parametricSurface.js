/**
 * Created by shusa_000 on 9/18/2015.
 */

goog.provide('DVT.parametricSurface');

goog.require('DVT.primitives');

goog.require('THREE.slice');

/**
 * Class representing cube/parametricSurface surfaces
 * @constructor
 * @param copyFrom
 * @extends DVT.primitives
 */

DVT.parametricSurface = function(copyFrom) {
    goog.base(this, 'constructor', copyFrom);

    /**
     * stacks of parametricSurface in the y-direction
     * @type {number}
     * @private
     */
    this._stacks = 25;

    /**
     * stacks of parametricSurface in the x-direction
     * @type {number}
     * @private
     */
    this._slices = 25;

    this._color=Math.random()*0xffffff


    this._parametricEquation = [function(u,v){return 100*u;},function(u,v){return 100*v;},function(u,v){return 100*(u*u+v*v);}];

    /**
     * center of the cube. Default is [0,0,0]
     * @type {number[]}
     * @public
     */
    this.center = [0, 0, 0];

    //copies properties from target
    if (copyFrom) {
        this._stacks = copyFrom._stacks;
        this._slices = copyFrom._slices;
        this._parametricEquation = copyFrom._parametricEquation;
    }



    this._voronoiSystem = null;

    this._voronoiIndex = 0;
};

goog.inherits(DVT.parametricSurface, DVT.primitives);

/**
 * Alternate getter for the parametricSurface stacks.
 *
 * @return {number} stacks of the parametricSurface
 * @public
 */
DVT.parametricSurface.prototype.__defineGetter__('stacksY', function() {

    return this._stacks;

});

/**
 * Alternate setter for the parametricSurface stacks
 *
 * @param {number} integer-valued stacks
 * @public
 */
DVT.parametricSurface.prototype.__defineSetter__('stacksY', function(stacks) {

    this._stacks = stacks;
    return this._stacks;
});

DVT.parametricSurface.prototype.init = function (renderer) {
    var calculatedParametricEquation = function(u,v, vec3)
    {
        vec3.set(this._parametricEquation[0](u,v),this._parametricEquation[1](u,v),this._parametricEquation[2](u,v));
    };
    var geometry = new THREE.ParametricGeometry(calculatedParametricEquation.bind(this), this._slices, this._stacks);
    for(var j=0;j<geometry.vertices.stacks;j++)
    {
        geometry.vertices[j].add(new THREE.Vector3(this.center[0],this.center[1],this.center[2]))
    }
    geometry.computeFaceNormals();
    console.log(geometry);
    //create material
    var material = new THREE.MeshPhongMaterial({color:this._color});

    this.THREEContainer = new THREE.Mesh(geometry, material);
    if(this._voronoiSystem)
    {
        this.calcVoronoi();
    }
    this._voxelize();
}

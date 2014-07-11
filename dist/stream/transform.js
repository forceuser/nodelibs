// Copyright Joyent, Inc. and other Node contributors.
function TransformState(e,t){this.afterTransform=function(e,r){return afterTransform(t,e,r)},this.needTransform=!1,this.transforming=!1,this.writecb=null,this.writechunk=null}function afterTransform(e,t,r){var n=e._transformState;n.transforming=!1;var i=n.writecb;if(!i)return e.emit("error",new Error("no writecb in Transform class"));n.writechunk=null,n.writecb=null,null!==r&&void 0!==r&&e.push(r),i&&i(t);var o=e._readableState;o.reading=!1,(o.needReadable||o.length<o.highWaterMark)&&e._read(o.highWaterMark)}function Transform(e){if(!(this instanceof Transform))return new Transform(e);Duplex.call(this,e);var t=(this._transformState=new TransformState(e,this),this);this._readableState.needReadable=!0,this._readableState.sync=!1,this.once("finish",function(){"function"==typeof this._flush?this._flush(function(e){done(t,e)}):done(t)})}function done(e,t){if(t)return e.emit("error",t);var r=e._writableState,n=(e._readableState,e._transformState);if(r.length)throw new Error("calling transform done when ws.length != 0");if(n.transforming)throw new Error("calling transform done when still transforming");return e.push(null)}module.exports=Transform;var Duplex=require("./duplex.js"),inherits=require("npm:inherits@^2.0.1");inherits(Transform,Duplex),Transform.prototype.push=function(e,t){return this._transformState.needTransform=!1,Duplex.prototype.push.call(this,e,t)},Transform.prototype._transform=function(){throw new Error("not implemented")},Transform.prototype._write=function(e,t,r){var n=this._transformState;if(n.writecb=r,n.writechunk=e,n.writeencoding=t,!n.transforming){var i=this._readableState;(n.needTransform||i.needReadable||i.length<i.highWaterMark)&&this._read(i.highWaterMark)}},Transform.prototype._read=function(){var e=this._transformState;e.writechunk&&e.writecb&&!e.transforming?(e.transforming=!0,this._transform(e.writechunk,e.writeencoding,e.afterTransform)):e.needTransform=!0};
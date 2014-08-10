"format cjs";function ReadableState(e){e=e||{};var t=e.highWaterMark;this.highWaterMark=t||0===t?t:16384,this.highWaterMark=~~this.highWaterMark,this.buffer=[],this.length=0,this.pipes=null,this.pipesCount=0,this.flowing=!1,this.ended=!1,this.endEmitted=!1,this.reading=!1,this.calledRead=!1,this.sync=!0,this.needReadable=!1,this.emittedReadable=!1,this.readableListening=!1,this.objectMode=!!e.objectMode,this.defaultEncoding=e.defaultEncoding||"utf8",this.ranOut=!1,this.awaitDrain=0,this.readingMore=!1,this.decoder=null,this.encoding=null,e.encoding&&(StringDecoder||(StringDecoder=require("../string_decoder").StringDecoder),this.decoder=new StringDecoder(e.encoding),this.encoding=e.encoding)}function Readable(e){return this instanceof Readable?(this._readableState=new ReadableState(e,this),this.readable=!0,void Stream.call(this)):new Readable(e)}function readableAddChunk(e,t,r,n,i){var o=chunkInvalid(t,r);if(o)e.emit("error",o);else if(null===r||void 0===r)t.reading=!1,t.ended||onEofChunk(e,t);else if(t.objectMode||r&&r.length>0)if(t.ended&&!i){var s=new Error("stream.push() after EOF");e.emit("error",s)}else if(t.endEmitted&&i){var s=new Error("stream.unshift() after end event");e.emit("error",s)}else!t.decoder||i||n||(r=t.decoder.write(r)),t.length+=t.objectMode?1:r.length,i?t.buffer.unshift(r):(t.reading=!1,t.buffer.push(r)),t.needReadable&&emitReadable(e),maybeReadMore(e,t);else i||(t.reading=!1);return needMoreData(t)}function needMoreData(e){return!e.ended&&(e.needReadable||e.length<e.highWaterMark||0===e.length)}function roundUpToNextPowerOf2(e){if(e>=MAX_HWM)e=MAX_HWM;else{e--;for(var t=1;32>t;t<<=1)e|=e>>t;e++}return e}function howMuchToRead(e,t){return 0===t.length&&t.ended?0:t.objectMode?0===e?0:1:isNaN(e)||null===e?t.flowing&&t.buffer.length?t.buffer[0].length:t.length:0>=e?0:(e>t.highWaterMark&&(t.highWaterMark=roundUpToNextPowerOf2(e)),e>t.length?t.ended?t.length:(t.needReadable=!0,0):e)}function chunkInvalid(e,t){var r=null;return Buffer.isBuffer(t)||"string"==typeof t||null===t||void 0===t||e.objectMode||r||(r=new TypeError("Invalid non-string/buffer chunk")),r}function onEofChunk(e,t){if(t.decoder&&!t.ended){var r=t.decoder.end();r&&r.length&&(t.buffer.push(r),t.length+=t.objectMode?1:r.length)}t.ended=!0,t.length>0?emitReadable(e):endReadable(e)}function emitReadable(e){var t=e._readableState;t.needReadable=!1,t.emittedReadable||(t.emittedReadable=!0,t.sync?setImmediate(function(){emitReadable_(e)}):emitReadable_(e))}function emitReadable_(e){e.emit("readable")}function maybeReadMore(e,t){t.readingMore||(t.readingMore=!0,setImmediate(function(){maybeReadMore_(e,t)}))}function maybeReadMore_(e,t){for(var r=t.length;!t.reading&&!t.flowing&&!t.ended&&t.length<t.highWaterMark&&(e.read(0),r!==t.length);)r=t.length;t.readingMore=!1}function pipeOnDrain(e){return function(){var t=e._readableState;t.awaitDrain--,0===t.awaitDrain&&flow(e)}}function flow(e){function t(e){var t=e.write(r);!1===t&&n.awaitDrain++}var r,n=e._readableState;for(n.awaitDrain=0;n.pipesCount&&null!==(r=e.read());)if(1===n.pipesCount?t(n.pipes,0,null):forEach(n.pipes,t),e.emit("data",r),n.awaitDrain>0)return;return 0===n.pipesCount?(n.flowing=!1,void(EE.listenerCount(e,"data")>0&&emitDataEvents(e))):void(n.ranOut=!0)}function pipeOnReadable(){this._readableState.ranOut&&(this._readableState.ranOut=!1,flow(this))}function emitDataEvents(e,t){var r=e._readableState;if(r.flowing)throw new Error("Cannot switch to old mode now.");var n=t||!1,i=!1;e.readable=!0,e.pipe=Stream.prototype.pipe,e.on=e.addListener=Stream.prototype.on,e.on("readable",function(){i=!0;for(var t;!n&&null!==(t=e.read());)e.emit("data",t);null===t&&(i=!1,e._readableState.needReadable=!0)}),e.pause=function(){n=!0,this.emit("pause")},e.resume=function(){n=!1,i?setImmediate(function(){e.emit("readable")}):this.read(0),this.emit("resume")},e.emit("readable")}function fromList(e,t){var r,n=t.buffer,i=t.length,o=!!t.decoder,s=!!t.objectMode;if(0===n.length)return null;if(0===i)r=null;else if(s)r=n.shift();else if(!e||e>=i)r=o?n.join(""):Buffer.concat(n,i),n.length=0;else if(e<n[0].length){var a=n[0];r=a.slice(0,e),n[0]=a.slice(e)}else if(e===n[0].length)r=n.shift();else{r=o?"":new Buffer(e);for(var u=0,f=0,l=n.length;l>f&&e>u;f++){var a=n[0],h=Math.min(e-u,a.length);o?r+=a.slice(0,h):a.copy(r,u,0,h),h<a.length?n[0]=a.slice(h):n.shift(),u+=h}}return r}function endReadable(e){var t=e._readableState;if(t.length>0)throw new Error("endReadable called on non-empty stream");!t.endEmitted&&t.calledRead&&(t.ended=!0,setImmediate(function(){t.endEmitted||0!==t.length||(t.endEmitted=!0,e.readable=!1,e.emit("end"))}))}function forEach(e,t){for(var r=0,n=e.length;n>r;r++)t(e[r],r)}function indexOf(e,t){for(var r=0,n=e.length;n>r;r++)if(e[r]===t)return r;return-1}module.exports=Readable,Readable.ReadableState=ReadableState;var EE=require("../events").EventEmitter,Stream=require("./index.js"),Buffer=require("../buffer").Buffer,setImmediate=require("../process/browser.js").nextTick,StringDecoder,inherits=require("inherits");inherits(Readable,Stream),Readable.prototype.push=function(e,t){var r=this._readableState;return"string"!=typeof e||r.objectMode||(t=t||r.defaultEncoding,t!==r.encoding&&(e=new Buffer(e,t),t="")),readableAddChunk(this,r,e,t,!1)},Readable.prototype.unshift=function(e){var t=this._readableState;return readableAddChunk(this,t,e,"",!0)},Readable.prototype.setEncoding=function(e){StringDecoder||(StringDecoder=require("../string_decoder").StringDecoder),this._readableState.decoder=new StringDecoder(e),this._readableState.encoding=e};var MAX_HWM=8388608;Readable.prototype.read=function(e){var t=this._readableState;t.calledRead=!0;var r=e;if(("number"!=typeof e||e>0)&&(t.emittedReadable=!1),0===e&&t.needReadable&&(t.length>=t.highWaterMark||t.ended))return emitReadable(this),null;if(e=howMuchToRead(e,t),0===e&&t.ended)return 0===t.length&&endReadable(this),null;var n=t.needReadable;t.length-e<=t.highWaterMark&&(n=!0),(t.ended||t.reading)&&(n=!1),n&&(t.reading=!0,t.sync=!0,0===t.length&&(t.needReadable=!0),this._read(t.highWaterMark),t.sync=!1),n&&!t.reading&&(e=howMuchToRead(r,t));var i;return i=e>0?fromList(e,t):null,null===i&&(t.needReadable=!0,e=0),t.length-=e,0!==t.length||t.ended||(t.needReadable=!0),t.ended&&!t.endEmitted&&0===t.length&&endReadable(this),i},Readable.prototype._read=function(){this.emit("error",new Error("not implemented"))},Readable.prototype.pipe=function(e,t){function r(e){e===f&&i()}function n(){e.end()}function i(){e.removeListener("close",s),e.removeListener("finish",a),e.removeListener("drain",d),e.removeListener("error",o),e.removeListener("unpipe",r),f.removeListener("end",n),f.removeListener("end",i),(!e._writableState||e._writableState.needDrain)&&d()}function o(t){u(),0===p&&0===EE.listenerCount(e,"error")&&e.emit("error",t)}function s(){e.removeListener("finish",a),u()}function a(){e.removeListener("close",s),u()}function u(){f.unpipe(e)}var f=this,l=this._readableState;switch(l.pipesCount){case 0:l.pipes=e;break;case 1:l.pipes=[l.pipes,e];break;default:l.pipes.push(e)}l.pipesCount+=1;var h=(!t||t.end!==!1)&&e!==process.stdout&&e!==process.stderr,c=h?n:i;l.endEmitted?setImmediate(c):f.once("end",c),e.on("unpipe",r);var d=pipeOnDrain(f);e.on("drain",d);var p=EE.listenerCount(e,"error");return e.once("error",o),e.once("close",s),e.once("finish",a),e.emit("pipe",f),l.flowing||(this.on("readable",pipeOnReadable),l.flowing=!0,setImmediate(function(){flow(f)})),e},Readable.prototype.unpipe=function(e){var t=this._readableState;if(0===t.pipesCount)return this;if(1===t.pipesCount)return e&&e!==t.pipes?this:(e||(e=t.pipes),t.pipes=null,t.pipesCount=0,this.removeListener("readable",pipeOnReadable),t.flowing=!1,e&&e.emit("unpipe",this),this);if(!e){var r=t.pipes,n=t.pipesCount;t.pipes=null,t.pipesCount=0,this.removeListener("readable",pipeOnReadable),t.flowing=!1;for(var i=0;n>i;i++)r[i].emit("unpipe",this);return this}var i=indexOf(t.pipes,e);return-1===i?this:(t.pipes.splice(i,1),t.pipesCount-=1,1===t.pipesCount&&(t.pipes=t.pipes[0]),e.emit("unpipe",this),this)},Readable.prototype.on=function(e,t){var r=Stream.prototype.on.call(this,e,t);if("data"!==e||this._readableState.flowing||emitDataEvents(this),"readable"===e&&this.readable){var n=this._readableState;n.readableListening||(n.readableListening=!0,n.emittedReadable=!1,n.needReadable=!0,n.reading?n.length&&emitReadable(this,n):this.read(0))}return r},Readable.prototype.addListener=Readable.prototype.on,Readable.prototype.resume=function(){emitDataEvents(this),this.read(0),this.emit("resume")},Readable.prototype.pause=function(){emitDataEvents(this,!0),this.emit("pause")},Readable.prototype.wrap=function(e){var t=this._readableState,r=!1,n=this;e.on("end",function(){if(t.decoder&&!t.ended){var e=t.decoder.end();e&&e.length&&n.push(e)}n.push(null)}),e.on("data",function(i){if(t.decoder&&(i=t.decoder.write(i)),i&&(t.objectMode||i.length)){var o=n.push(i);o||(r=!0,e.pause())}});for(var i in e)"function"==typeof e[i]&&"undefined"==typeof this[i]&&(this[i]=function(t){return function(){return e[t].apply(e,arguments)}}(i));var o=["error","close","destroy","pause","resume"];return forEach(o,function(t){e.on(t,function(e){return n.emit.apply(n,t,e)})}),n._read=function(){r&&(r=!1,e.resume())},n},Readable._fromList=fromList;
//# sourceMappingURL=readable.js.map
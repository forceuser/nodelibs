"format cjs";function Stream(){EE.call(this)}module.exports=Stream;var EE=require("../events").EventEmitter,inherits=require("inherits");inherits(Stream,EE),Stream.Readable=require("./readable.js"),Stream.Writable=require("./writable.js"),Stream.Duplex=require("./duplex.js"),Stream.Transform=require("./transform.js"),Stream.PassThrough=require("./passthrough.js"),Stream.Stream=Stream,Stream.prototype.pipe=function(e,t){function r(t){e.writable&&!1===e.write(t)&&u.pause&&u.pause()}function n(){u.readable&&u.resume&&u.resume()}function i(){f||(f=!0,e.end())}function o(){f||(f=!0,"function"==typeof e.destroy&&e.destroy())}function s(e){if(a(),0===EE.listenerCount(this,"error"))throw e}function a(){u.removeListener("data",r),e.removeListener("drain",n),u.removeListener("end",i),u.removeListener("close",o),u.removeListener("error",s),e.removeListener("error",s),u.removeListener("end",a),u.removeListener("close",a),e.removeListener("close",a)}var u=this;u.on("data",r),e.on("drain",n),e._isStdio||t&&t.end===!1||(u.on("end",i),u.on("close",o));var f=!1;return u.on("error",s),e.on("error",s),u.on("end",a),u.on("close",a),e.on("close",a),e.emit("pipe",u),e};
//# sourceMappingURL=index.js.map
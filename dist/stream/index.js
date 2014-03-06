// Copyright Joyent, Inc. and other Node contributors.
var Stream=require("./stream");module.exports=Stream,Stream.Readable=require("./readable.js"),Stream.Writable=require("./writable.js"),Stream.Duplex=require("./duplex.js"),Stream.Transform=require("./transform.js"),Stream.PassThrough=require("./passthrough.js"),Stream.Stream=Stream,Stream.prototype.pipe=function(e,t){function r(t){e.writable&&!1===e.write(t)&&u.pause&&u.pause()}function o(){u.readable&&u.resume&&u.resume()}function n(){f||(f=!0,e.end())}function s(){f||(f=!0,"function"==typeof e.destroy&&e.destroy())}function i(e){if(a(),0===EE.listenerCount(this,"error"))throw e}function a(){u.removeListener("data",r),e.removeListener("drain",o),u.removeListener("end",n),u.removeListener("close",s),u.removeListener("error",i),e.removeListener("error",i),u.removeListener("end",a),u.removeListener("close",a),e.removeListener("close",a)}var u=this;u.on("data",r),e.on("drain",o),e._isStdio||t&&t.end===!1||(u.on("end",n),u.on("close",s));var f=!1;return u.on("error",i),e.on("error",i),u.on("end",a),u.on("close",a),e.on("close",a),e.emit("pipe",u),e};
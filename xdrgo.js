// Filename: xdrgo.js  
// Timestamp: 2016.01.11-11:51:10 (last modified)
// Author(s): Bumblehead (www.bumblehead.com)  
// Requires: xhrgo.js
//
// https://developer.mozilla.org/en-US/docs/HTTP/Access_control_CORS?redirectlocale=en-US&redirectslug=HTTP_access_control
// http://msdn.microsoft.com/en-us/library/ie/cc288060%28v=vs.85%29.aspx

var xhrgo = require('xhrgo');

var xdrgo = module.exports = (function (xdrgo) {
  
  xdrgo = Object.create(xhrgo);

  xdrgo.newRequest = function () {
    var xdr = xhrgo.newRequest();
    
    if ("withCredentials" in xdr) {
      xdr = xdr;
    } else if (typeof XDomainRequest === "function") {
      xdr = new XDomainRequest();
    } else {
      xdr = null;
    }

    return xdr;
  };

  xdrgo.quickJSON = function (type, uri, data, token, fn, resWaitTime) {
    var xhr = xdrgo.newRequest(), 
        timeout = resWaitTime || 30000, 
        finData, timer,
        doneFn = function (err, res) { if (typeof fn === 'function') fn(err, res); };

    if (xhr) {
      xhr.open(type, uri, true);
    } else {
      return fn(new Error('[!!!] CORS is not supported'));
    }

    if (token) {
      xhr.withCredentials = true;
    }
    
    xhr.setRequestHeader("Accept", "application/json, text/javascript");
    if (type.match(/PUT|POST/) && typeof data === 'object' && data) {
      finData = JSON.stringify(data);
    }

    if (token) {
      xhr.setRequestHeader("Authorization", token);
    }

    xhr.onreadystatechange = xdrgo.constructReadyState(xhr, function (xhr) {
      var res = 'success';

      clearTimeout(timer);
      if (xhr.status === 500) return doneFn('Internal Server Error');
      
      if (xhr.responseText) {
        try {
          res = JSON.parse(xhr.responseText);
        } catch(e) {
          res = xhr.responseText;
        }
      }
      
      doneFn((xhrgo.is2xxRe.test(xhr.status)) ? null : xhr, res); 
    });

    xhr.send(finData);
    timer = setTimeout(function () { xhr.abort(); doneFn(xhr); }, timeout);
  };  

  return xdrgo;

}());


// Filename: xdrgo.js  
// Timestamp: 2013.10.16-09:14:33 (last modified)  
// Author(s): Bumblehead (www.bumblehead.com)  
// Requires: xhrgo.js


// https://developer.mozilla.org/en-US/docs/HTTP/Access_control_CORS?redirectlocale=en-US&redirectslug=HTTP_access_control
// http://msdn.microsoft.com/en-us/library/ie/cc288060%28v=vs.85%29.aspx

var xhrgo = require('xhrgo');

var xdrgo = ((typeof module === 'object') ? module : {}).exports = (function (xdrgo) {
  
  xdrgo = Object.create(xhrgo);

  xdrgo.quickJSON = function (type, uri, data, token, fn, resWaitTime) {
    var xhr = xdrgo.newRequest(), 
        timeout = resWaitTime || 30000, 
        fullUri = uri.valueOf(),
        finData, timer,
        doneFn = function (err, res) { if (typeof fn === 'function') fn(err, res); };

    if ("withCredentials" in xhr) {
      xhr.open(type, fullUri, true);
    } else if (typeof XDomainRequest === "function") {
      xhr = new XDomainRequest();
      xhr.open(type, fullUri);
    } else {
      // Otherwise, CORS is not supported by the browser.
      return fn(new Error('[!!!] CORS is not supported'));
    }


    // -------------------------------------
    // send cookie data
    xhr.withCredentials = true;
    // -------------------------------------

    xhr.setRequestHeader("Accept", "application/json, text/javascript");
    if (type.match(/PUT|POST/) && typeof data === 'object' && data) {
      finData = JSON.stringify(data);
    }

    if (token) {
      xhr.setRequestHeader("Authorization", token);
    }

    xhr.onreadystatechange = xdrgo.constructReadyState(xhr, function (xhr) {
      var err, res = 'success';

      clearTimeout(timer);

      if (xhr.responseText) {
        try {
          res = JSON.parse(xhr.responseText);
        } catch(e) {
          res = xhr.responseText;
        }
      }

      if (xhr.status === 200) {
        doneFn(null, res);
      } else {
        doneFn(xhr, res);
      }

      doneFn((xhr.status === 200 ? null : xhr), res);
    });

    xhr.send(finData);
    timer = setTimeout(function () { xhr.abort(); doneFn(xhr); }, timeout);
  };  

  return xdrgo;

}());


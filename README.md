xdrgo
=====
**(c)[Bumblehead][0], 2013** [MIT-license](#license)  

### OVERVIEW:

_CORS is not supported by IE < 8._

__xdrgo is beta and is not for production use__

https://stripe.com/blog/stripejs-and-jsonp 
no need for iframes as well as jsonp


http://blogs.msdn.com/b/ieinternals/archive/2010/05/13/xdomainrequest-restrictions-limitations-and-workarounds.aspx
xdr limitations:
 - only GET and POST may be used
 - no header customisation
 - *only* text/plain is supported as a Content-Type
 - no authentication or cookies may be sent with request


Simple/dumb `xhr` (`xdr` for IE) object for performing cross-domain requests, using [CORS][5] when available or [xdr][8] as a fallback.

Another way to make cross-domain requests is [JSONP][6]. JSONP exploits unintended browser functionality. You may want to use JSONP rather than CORS if you need to support older browsers (lt IE8).

CORS and xdr supports the full range of REST methods (GET, POST, DELETE, etc.). CORS provides complete error handling. It limits access a malicious page would have to remote server data. It does not expose clients to remote server vulnerabilities.

xdrgo is not a comprehensive solution for xhr/xdr usage. It's perfect for the most common type of request using non-chunked json, html and [form-urlencoded][3] data formats. It assumes there is one 'success' response, `200`.

xdrgo uses the node.js callback convention.


[5]: http://en.wikipedia.org/wiki/Cross-origin_resource_sharing "cors"
[6]: http://en.wikipedia.org/wiki/JSONP                        "jsonp"
[7]: http://en.wikipedia.org/wiki/Cross-site_request_forgery    "xsrf"
[0]: http://www.bumblehead.com                            "bumblehead"
[3]: https://npmjs.org/package/form-urlencoded    "www-urlformencoded"
[8]: http://msdn.microsoft.com/en-us/library/ie/cc288060%28v=vs.85%29.aspx "xdr"

------------------------------------------------------------------------------
#### <a id="install"></a>INSTALL:

xdrgo may be downloaded directly or installed through `npm`.

 * **npm**   

 ```bash
 $ npm install xdrgo
 ```

 * **Direct Download**
 
 ```bash  
 $ git clone https://github.com/iambumblehead/xdrgo.git
 $ cd xdrgo && npm install
 ```


------------------------------------------------------------------------------
#### <a id="test"></a>TEST:

 to run tests, use `npm test` from a shell.

 ```bash
 $ npm test
 ```
 
---------------------------------------------------------
#### <a id="usage">USAGE:

 There are [several methods](#methods) defined on `xdrgo`. One method would return 
 compare two objects to see if they have definition for the same members

---------------------------------------------------------
#### <a id="methods">METHODS:

The same parameters are used for each method:

 - **_type_**, REST type such as 'PUT', 'POST', 'DELETE', 'GET'.
 - **_url_**
 - **_data_**, object to be stringified and sent with PUT and POST requests.
 - **_token_** authorization token.
 - **_fn_** callback function used in the node.js convention -error is passed as the first parameter.
 - **_time_** number value in milliseconds -it is used with `setTimeout` to cancel a request that has not received a response during that timespan.



 - **xdrgo.JSON( _type_, _url_, _data_, _token_, _fn_, _time_ )**
 
   The first two parameters are required. Data is sent and received in the JSON format. Data is passed to and returned from the method in the form of an object.
 
   ```javascript
   xdrgo.JSON('POST', '/hi', {hi:'b'}, null, function (err, res) {
     if (err) return fn(new Error(err));     
     fn(null, res);
   }, 1000);
   ```

 - **xdrgo.JSONU( _type_, _url_, _data_, _token_, _fn_, _time_ )**

   Calls `xdrgo.JSON` after adding a unique parameter to the url. Used to avoid cached responses.

 - **xdrgo.getTextHTML( _url_, _fn_, _time_ )**
 
   This method makes 'GET' requests with "Content-Type" "text/html". Useful for requesting static template and text files.

   ```javascript
   xdrgo.getTextHTML(htmlUrl, function (err, template) {
     if (err) return fn(new Error('failed load html: ' + htmlUrl));        
     fn(null, template);
   });
   ```
   
 - **xdrgo.getTextHTMLU( _url_, _fn_, _time_ )**

   Calls `xdrgo.getTextHTML` after adding a unique parameter to the url. Used to avoid cached responses.

 - **xdrgo.newRequest( )**
 
   Returns a browser-supported xhr object. For most browser's the value returned by this method is `new XMLHttpRequest()`

 - **xdrgo.getUriAsUnique( _url_ )**
 
   Returns a new url with a unique parameter added.

   ```javascript
   xdrgo.getUriAsUnique('/a.html'); // "/a.html?uid=1377988402490"
   ```

 - **xdrgo.addKeyVal( _url_, _k_, _v_ )**
 
   Returns a new url with key/val parameters added.
   
   ```javascript
   var url = '/resource';
   url = xdrgo.addKeyVal(url, 'a', '1'); // "/resource?a=1"
   url = xdrgo.addKeyVal(url, 'b', '2'); // "/resource?a=1&b=2"
   ```

 - **xdrgo.getArgsObjAsUriStr( _argsObj_ )**
 
   Top-level properties of the object are returned as a key/value string. Each value is encoded. The keys are joined in alphabetical order. 

   For more comprehensive object serialization use [url-formencoded][2].

   ```javascript
   xdrgo.getArgsObjAsUriStr({
     modified : 137798840249,
     currency : 'usd'
   }); 
   // "currency=usd&modifed=137798840249"
   ```

 - **xdrgo.getUriStrAsArgsObj( _uriStr_ )**
 
   Retuns an object with properties named and defined with values from the url. `vanillaUri` and `hash` are always named properties on the object returned.

   ```javascript
   xdrgo.getUriStrAsArgsObj(
     "/resource/currency=usd&time=137798840249#hashvalue"
   }); 
   // {
   //   vanillaUri : '/resource/currency=usd&time=137798840249#val',
   //   hash : 'val',
   //   lastmodified : 137798840249,
   //   currency : 'usd'
   // }
   ```

[2]: http://github.com/iambumblehead/url-formencoded     "formencoded"

------------------------------------------------------------------------------
#### <a id="license">License:

 ![scrounge](https://github.com/iambumblehead/scroungejs/raw/master/img/hand.png) 

(The MIT License)

Copyright (c) 2012 [Bumblehead][0] <chris@bumblehead.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

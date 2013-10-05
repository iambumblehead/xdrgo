// https://developer.mozilla.org/en-US/docs/HTTP/Access_control_CORS?redirectlocale=en-US&redirectslug=HTTP_access_control
// http://msdn.microsoft.com/en-us/library/ie/cc288060%28v=vs.85%29.aspx

var xhrgo = require('xhrgo');

var xdrgo = ((typeof module === 'object') ? module : {}).exports = (function (xdrgo) {
  
  xdrgo = Object.create(xhrgo);

  

  return xdrgo;

}());


/*
// 1. Create XDR object: 
var xdr = new XDomainRequest(); 

// 2. Open connection with server using GET method:
xdr.open("get", "http://www.contoso.com/xdr.aspx");

// 3. Send string data to server:
xdr.send();


      if (window.XDomainRequest)
      {
        xdr = new XDomainRequest();
        if (xdr)
        {
          xdr.onerror = err;
          xdr.ontimeout = timeo;
          xdr.onprogress = progres;
          xdr.onload = loadd;
          xdr.timeout = tbTO.value;
          xdr.open("get", tbURL.value);
          xdr.send();
        }
*/
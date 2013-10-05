var xdrgo = require('../xdrgo.js');

describe("xdrgo.addKeyVal", function () {
  it("should return http://google.com?n=f for `http://google.com`, `n`, `f`", function () {
    var result = xdrgo.addKeyVal('http://google.com', 'n', 'f');
    var resultExpected = 'http://google.com?n=f';

    expect( result ).toBe( resultExpected );
  });

  it("should return http://google.com?b=5&n=f for `http://google.com?b=5`, `n`, `f`", function () {
    var result = xdrgo.addKeyVal('http://google.com?b=5', 'n', 'f');
    var resultExpected = 'http://google.com?b=5&n=f';

    expect( result ).toBe( resultExpected );
  });

});

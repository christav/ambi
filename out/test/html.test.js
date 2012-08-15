// Generated by CoffeeScript 1.3.3
(function() {
  var assert, balUtil, joe, wait;

  assert = (typeof require === "function" ? require('assert') : void 0) || this.assert;

  joe = (typeof require === "function" ? require('joe') : void 0) || this.joe;

  balUtil = (typeof require === "function" ? require(__dirname + '/../lib/balutil') : void 0) || this.balUtil;

  wait = function(delay, fn) {
    return setTimeout(fn, delay);
  };

  joe.suite('html', function(suite, test) {
    test('replaceElement', function() {
      var actual, expected, replaceElementCallback, source;
      source = "breakfast\n<title>blah</title>\nbrunch\n<t>\n	a\n		b\n	c\n</t>\nlunch\n<text>\n	one\n		two\n	three\n</text>\ndinner";
      expected = "breakfast\n<title>blah</title>\nbrunch\nA\n	B\nC\nlunch\nONE\n	TWO\nTHREE\ndinner";
      replaceElementCallback = function(outerHTML, elementNameMatched, attributes, innerHTML) {
        return innerHTML.toUpperCase();
      };
      actual = balUtil.replaceElement(source, "t(?:ext)?", replaceElementCallback);
      return assert.equal(expected, actual);
    });
    return test('replaceElementAsync', function(done) {
      var expected, replaceElementCallback, source;
      source = "breakfast\n<title>blah</title>\nbrunch\n<t>\n	a\n		b\n	c\n</t>\nlunch\n<text>\n	one\n		two\n	three\n</text>\ndinner";
      expected = "breakfast\n<title>blah</title>\nbrunch\nA\n	B\nC\nlunch\nONE\n	TWO\nTHREE\ndinner";
      replaceElementCallback = function(outerHTML, elementNameMatched, attributes, innerHTML, callback) {
        return balUtil.wait(1000, function() {
          return callback(null, innerHTML.toUpperCase());
        });
      };
      return balUtil.replaceElementAsync(source, "t(?:ext)?", replaceElementCallback, function(err, actual) {
        if (err) {
          return done(err);
        }
        assert.equal(expected, actual);
        return done();
      });
    });
  });

}).call(this);

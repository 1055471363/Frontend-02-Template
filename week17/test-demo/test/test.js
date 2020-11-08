var assert = require("assert");
// var add = require("../add.js").add;
// var mul = require("../add.js").mul;
import { add,mul } from "../add.js";
describe("add test", function () {
  it("1+2 should be 3", function () {
    assert.equal(add(1, 2), 3);
  });

  it("-5+2 should be -3", function () {
    assert.equal(add(-5, 2), -3);
  });

  it("3+2 should be 6", function () {
    assert.equal(mul(3, 2), 6);
  });
});

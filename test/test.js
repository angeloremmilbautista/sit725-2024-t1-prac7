const expect = require("chai").expect;
const request = require("request");

describe("POST /api/cards", function () {
  it("should add a new card", function (done) {
    request.post(
      {
        url: "http://localhost:3000/api/cards",
        json: {
          title: "Test Card",
          subTitle: "Test Subtitle",
          path: "test.jpg",
          description: "Test Description",
        },
      },
      function (err, res) {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an("array");
        done();
      }
    );
  });
});

describe("GET /api/cards", function () {
  it("should get all cards", function (done) {
    request.get("http://localhost:3000/api/cards", function (err, res) {
      expect(res.statusCode).to.equal(200);
      const cards = JSON.parse(res.body);
      expect(cards).to.be.an("array");
      done();
    });
  });
});

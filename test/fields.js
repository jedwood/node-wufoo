var should = require('chai').should();
var wu = require('../index.js');

describe('GET /fields', function() {
  wu.config('R74O-RZPC-BZW0-W0TM', 'wufooapi');

  it('errors if form id not included', function(done) {
    wu.fields(function(err, res) {
      err.should.be.an('object').and.have.property('message');
      err.message.should.equal('form identifier not defined');
      done();
    });
  });

  it('returns field details', function(done) {
    wu.fields('z7x4a9', function(err, res) {
      should.not.exist(err);
      res.should.have.property('Fields').that.is.an('array');
      done();
    });
  });

});

var should = require('chai').should();
var wu = require('../index.js');

describe('GET /forms', function() {

  it('errors if no apiKey provided', function(done) {
    wu.config(null,  null);
    wu.forms(function(err, res) {
      err.should.be.an('object').and.have.property('message');
      err.message.should.equal("apiKey or subdomain not defined");
      done();
    });
  });

  it('errors if incorrect apiKey', function(done) {
    wu.config('123456', 'wufooapi');
    wu.forms(function(err, res) {
      err.should.be.an('object').and.have.property('message');
      err.message.should.equal("You must authenticate to get at the goodies.");
      done();
    });
  });

  it('returns forms if correct apiKey', function(done) {
    wu.config('R74O-RZPC-BZW0-W0TM', 'wufooapi');
    wu.forms(function(err, res) {
      should.not.exist(err);
      res.should.have.property('Forms').that.is.an('array');
      done();
    });
  });

});

describe('GET /form', function() {

  it('errors if form id not included', function(done) {
    wu.config('R74O-RZPC-BZW0-W0TM', 'wufooapi');
    wu.form(function(err, res) {
      err.should.be.an('object').and.have.property('message');
      err.message.should.equal('form identifier not defined');
      done();
    });
  });

  it('errors if form id wrong', function(done) {
    wu.config('R74O-RZPC-BZW0-W0TM', 'wufooapi');
    wu.form('123', function(err, res) {
      err.should.be.an('object').and.have.property('message');
      err.message.should.equal('Invalid identifier.');
      done();
    });
  });

  it('returns form details', function(done) {
    wu.config('R74O-RZPC-BZW0-W0TM', 'wufooapi');
    wu.form('z7x4a9', function(err, res) {
      should.not.exist(err);
      res.should.have.property('Forms').that.is.an('array');
      done();
    });
  });

});

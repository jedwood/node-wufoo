var should = require('chai').should();
var wu = require('../index.js');
var config = require('./config');

describe('PUT /webhook', function() {
  wu.config(config.myOwnWorkingAPIKey, config.myOwnWorkingSubdomain);

  it('errors if form id not included', function(done) {
    wu.webhook(function(err, res) {
      err.should.be.an('object').and.have.property('message');
      err.message.should.equal('form identifier not defined');
      done();
    });
  });

  it('errors if hookObj not included', function(done) {
    wu.webhook(config.myOwnWorkingFormHash, function(err, res) {
      err.should.be.an('object').and.have.property('message');
      err.message.should.equal('hookObj not defined');
      done();
    });
  });

  it('returns webhook id', function(done) {
    wu.webhook(config.myOwnWorkingFormHash, {url:'http://google.com', metatdata:true, handshakeKey:'123456'}, function(err, res) {
      should.not.exist(err);
      res.should.have.property('WebHookPutResult');
      res.WebHookPutResult.should.have.property('Hash').that.is.a('string');
      done();
    });
  });

});

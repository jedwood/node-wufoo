var should = require('chai').should();
var wu = require('../index.js');
var config = require('./config');

describe('POST /entries', function() {
  wu.config('R74O-RZPC-BZW0-W0TM', 'wufooapi');

  // it('errors if form id not included', function(done) {
  //   wu.submit(function(err, res) {
  //     err.should.be.an('object').and.have.property('message');
  //     err.message.should.equal('form identifier not defined');
  //     done();
  //   });
  // });

  // it('errors if formData not included', function(done) {
  //   wu.submit(myOwnWorkingSubdomain, function(err, res) {
  //     err.should.be.an('object').and.have.property('message');
  //     err.message.should.equal('formData not defined');
  //     done();
  //   });
  // });

  it('succeeds when posting with legit data', function(done) {
    wu.config(config.myOwnWorkingAPIKey, config.myOwnWorkingSubdomain);
    var entryData = {Field1:"test"};
    wu.submit(config.myOwnWorkingFormHash, entryData, function(err, res) {
      should.not.exist(err);
      res.should.have.property('Success').that.is.a('number');
      res.should.have.property('EntryId').that.is.a('number');
      res.should.have.property('EntryLink').that.is.a('string');
      done();
    });
  });

});

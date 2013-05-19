var request = require('request');

var apiKey, subdomain, baseURI;
var wuAgent = new require('http').Agent;
wuAgent.maxSockets = 25;

var logging = false;

var config = function(key, sd) {
  apiKey = key;
  subdomain = sd;
};

var forms = function(cb) {
  wuGet('forms', cb);
};

var form = function(id, cb) {
  if (typeof id !== "string") return id(new Error("form identifier not defined"));
  wuGet('forms/'+id, cb);
};

var fields = function(formId, cb) {
  if (typeof formId !== "string") return formId(new Error("form identifier not defined"));
  wuGet('forms/'+formId+'/fields', cb);
};

var submit = function(formId, formData, cb) {
  if (arguments.length < 3) {
    if (typeof formId === "function") return formId(new Error("form identifier not defined"));
    if (typeof formData === "function" ) return formData(new Error("formData not defined"));
  }

  wuPost('forms/'+formId+'/entries', formData, cb);
};

function wURL(method) {
  return 'https://' + subdomain + '.wufoo.com/api/v3/' +  method + '.json';
}

function wOpts() {
  var opts = {};
  opts.auth = { 'user': apiKey,
                'pass': 'foo',
                'sendImmediately': false
              };

  opts.pool = wuAgent;
  opts.json = true;

  return opts;
}

function wuGet(method, cb) {
  if (checkCreds()) {
    if (logging) console.log("Calling: " + wURL(method));
    request.get(wURL(method), wOpts(), function (error, response, body) {
      if (logging) console.log(body);
      wuResponse(error, response, body, cb);
    });
  } else {
    cb(new Error("apiKey or subdomain not defined"), null);
  }
}

function wuPost(method, fieldData, cb) {
  if (checkCreds()) {
    if (logging) console.log("Calling: " + wURL(method));
    var opts = wOpts();
    opts.form = fieldData;
    request.post(wURL(method), opts, function (error, response, body) {
      if (logging) console.log(body);
      wuResponse(error, response, body, cb);
    });
  } else {
    cb(new Error("apiKey or subdomain not defined"), null);
  }
}

function wuResponse(error, response, body, cb) {
  if (error) {
    console.log("THERE IS AN ERROR! ", error);
    return cb(error);
  }
  if (response.statusCode !== 200) {
    if (response.statusCode === 404) return cb(new Error(response.body.Text));
    if (response.statusCode === 401) return cb(new Error(response.body));
  }

  cb(null, body);
}

function checkCreds() {
  return (apiKey && subdomain);
}

module.exports.config = config;
module.exports.forms = forms;
module.exports.form = form;
module.exports.fields = fields;
module.exports.submit = submit;
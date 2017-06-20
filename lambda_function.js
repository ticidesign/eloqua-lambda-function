'use strict';

exports.handler = (event, context, callback) => {
    
    var request = require('request');

    var siteName = ''; // fill with the Eloqua Site Name
    var username = ''; // fill with your Eloqua username
    var password = ''; // fill with your Eloqua password
    
    var auth = siteName + '\\' + username + ':' + password;
    var encodedData = new Buffer(auth).toString('base64');
    var url = 'https://secure.p01.eloqua.com';
    
    request({
      method: 'GET',
      json: true,
      uri: url + '/api/REST/1.0/data/form/' + event.formID,
      'headers': {
        'Authorization': 'Basic ' + encodedData
      }
    }, function(error, response, body){
      var counter = body.elements.map(function(formSubmission){
        console.log(formSubmission.fieldValues);
        return formSubmission.fieldValues.find(function(fields){
          return fields.id == event.fieldID; // field that need to be counted in the form
        });
      }).filter(function(content){
        return content.value == event.offername; // value from the field that need to be counted in the form
      }).length;
      callback(null, { counter: counter });
    });    
    
};
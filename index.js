var wrapper = require('./lambda_function.js');

console.log(wrapper.handler({offername : 'offer01', fieldID: '2133', formID : '211'} , null, (e, res) => {
 console.log(e, res);
}));
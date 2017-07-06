'use strict';

const AWS = require('aws-sdk');

const SNS = new AWS.SNS({ apiVersion: '2010-03-31' });
const PHONE_NUMBER = '+1111111111111'; // change it to your number

exports.handler = (event, context, callback) => {
    
    const one = ['Help'];
    const two = ['Emergency'];
    const three = ['Safe'];
    
    console.log('Received event:', event);

    console.log(`Sending SMS to ${PHONE_NUMBER}`);
    
    //uses randomizer to select one of the predefined message
    var singleClick = one[Math.floor(Math.random()*one.length)];
    var doubleClick = two[Math.floor(Math.random()*two.length)];
    var longClick = three[Math.floor(Math.random()*three.length)];
    var randomMessage = singleClick;
    
    if(event.clickType == "DOUBLE"){
        randomMessage = doubleClick;
    }
    if(event.clickType == "LONG"){
        randomMessage = longClick;
    }
    
    const params = {
        PhoneNumber: PHONE_NUMBER,
        Message: randomMessage,
    };
    // result will go to the function callback
    SNS.publish(params, callback);
};

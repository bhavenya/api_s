'use strict';

const debuglog = require('util').debuglog('example');
debuglog('You can only see these messages by setting NODE_DEBUG=example!');
var express = require('express');
var router = express.Router();
var firstRun = require('../models/firstRun')
var fs = require('fs');
var jsonexport = require('jsonexport');
var path = require ('path');
var resolve = require('path').resolve

var config = require('config.json')('./api-data.json');


router.get('/:run', function(req, res, next) {
  var run = parseInt(req.params.run,10);
  console.log(run);

  if(run ==1)
  {
    firstRun.trainrun(function(err,result){
      if (err)
      {
        res.json(err);
      }
      else
      {
        var train = JSON.parse(JSON.stringify(result));
        findyear();

    function findyear(){
        var array_band = [];
        var compare = [2,4,6,8,10];

        var array_year =[];
        for(var i=0; i<train.length;i++)
        {
          if(array_year.indexOf(train[i].year) == -1) // if isn't already in the array
          {
            array_year.push(train[i].year);
          }
        }
        console.log(array_year);

        for (var i=0; i<array_year.length;i++){
          for(var j=0 ; j< train.length;j++){
            if(train[j].year === array_year[i]){
              if ((array_band.indexOf(train[j].KNN_bucket) == -1)){
              array_band.push(train[j].KNN_bucket);
              for (var k=0; k<compare.length; k++){
              if(array_band.includes(compare[k])){
                break;
              }

              }
          }
        }

      }
      var queryYear = array_year[i];
    }
    }

        console.log(queryYear);
        res.send(result)
      }
    });
  }
});

module.exports = router;

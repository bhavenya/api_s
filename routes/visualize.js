'use strict';
const debuglog = require('util').debuglog('example');
debuglog('You can only see these messages by setting NODE_DEBUG=example!');
var express = require('express');
var router = express.Router();
var visualize = require('../models/visualize')
var fs = require('fs');
var jsonexport = require('jsonexport');
var path = require ('path');




var config = require('config.json')('./api-data.json');

router.get('/:year', function(req, res, next) {
  console.log('am in router');

  var visualYear = parseInt(req.params.year,10);


  if(visualYear)
  {
    visualize.visualByYear(visualYear, function(err,result){
      if (err)
      {
        res.json(err);
      }
      else
      {
        var file = JSON.stringify(result,null,'\t');
        fs.writeFile('/tableau/tableau.json',file, (error) =>{
          console.log(error);
          if (err)
          {
            throw err;
          }
          else
          {
            res.send(' File is ready!')
            console.log('Json File saved');

          }

          //var data=JSON.parse(JSON.stringify(result));
        });
      }
    });
  }
});

  module.exports = router;

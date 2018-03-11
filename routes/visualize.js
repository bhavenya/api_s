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



  router.get('/', function(req, res, next) {
    if(req){
      visualize.visualByYear(function(err,result) {
        if (err){
          res.json(err);
        }
        else{


          var train = JSON.parse(JSON.stringify(result));

          var array_years = [];
          for(var i=0; i<train.length;i++)
          {
            if(array_years.indexOf(train[i].year) == -1) // if isn't already in the array
            {
              array_years.push(train[i].year);
            }
          }


          var country_array = new Array(); // empty array
           for ( var i=0; i<train.length;i++ )
          {
              if (country_array.indexOf(train[i].name) == -1)  // if year is not in array yet
              {
                  country_array[train[i].name] = new Array(); // create an empty array for it
              }
              for ( var j=0; j<array_years.length;j++ )
             {
                 country_array[train[i].name].push({
                    "Year": train[j].year,
                    "Stability": train[j].TJ_lables,
              });
            }
          }

          var file = JSON.parse(JSON.stringify(country_array));


          fs.writeFile('/tableau/tableau.json',file, (err) => {
          if (err){
            throw err;
          }
          else
          {
            res.send(' File is ready!' )
            console.log('Json File saved');
          }});


        }
      });
    }
  });

module.exports = router;

'use strict';

const debuglog = require('util').debuglog('example');
debuglog('You can only see these messages by setting NODE_DEBUG=example!');
var express = require('express');
var router = express.Router();
var cassandra = require('../models/cassandra')
var fs = require('fs');
var jsonexport = require('jsonexport');
var path = require ('path');
var resolve = require('path').resolve

var config = require('config.json')('./api-data.json');


router.get('/:year', function(req, res, next) {
  var yearPred = parseInt(req.params.year,10);
  var yearLabel = parseInt(yearPred + 5,10);
  var params = [yearPred,yearLabel];

  if(yearPred)
  {
    cassandra.getByYear(params, function(err,rows){

      if (err)
      {
        res.json(err);
      }
      else
      {

        var train=JSON.parse(JSON.stringify(rows));



        fs.unlink('./Output/train.csv', (err) => {
          if (err) {
            console.log("failed to delete file:"+err);
          } else {
            console.log('Cleared Folder for a new train');
          }
        });

        var array_features = [];
        var array_countries = [];
        var array_stability = [];
        var array_stabilityKNN = [];
         var array_stabilityLR = [];

        for(var i=0; i<train.length;i++)
        {
          if(array_features.indexOf(train[i].feature_name) == -1) // if isn't already in the array
          {
            array_features.push(train[i].feature_name);
          }
        }

        array_features.sort();

        for(var j=0; j<train.length;j++)
        {
          if(array_countries.indexOf(train[j].country_code) == -1) // if isn't already in the array
          {
            array_countries.push(train[j].country_code);
            array_stability.push(train[j].TJ_labels);
            array_stabilityKNN.push(train[j].KNN_bucket);
            array_stabilityLR.push(train[j].LR_value);
          }
        }


        var headerString = 'Country_Code,Year,';
        for(var i=0; i<array_features.length;i++)
        {
          headerString += array_features[i].toString().replace(/,/g,'');
          headerString += ',';
        }
        headerString += 'Stability,KNN_Value,LR_Value\n'



        fs.writeFile('./Output/train.csv',headerString, (error) =>
        {
          if (err)
          {
            throw err;
          }
          else
          {
            var finalresultString = '';
            for(var p=0;p<array_countries.length;p++)
            {
              finalresultString += (array_countries[p] + ',' + train[p].year + ',')
              for(var q=0;q<array_features.length;q++)
              {
                for(var r=0;r<train.length;r++)
                {
                  if((train[r].country_code === array_countries[p]) && (train[r].feature_name === array_features[q]))
                  {
                    finalresultString += train[r].value;
                    break;
                  }
                }
                finalresultString += ',';

              }

              finalresultString += (array_stability[p] +',' + array_stabilityKNN[p]+ ',' + array_stabilityLR[p]+ ',');

              finalresultString = finalresultString.replace(/'/g, '');
              finalresultString += '\n';
            }
          }

          fs.appendFile('./Output/train.csv',finalresultString, (error) =>
          {

            if (err) throw err;
            else
            {
              var filepath = path.join (appRoot + '/Output/train.csv');
              res.send(filepath);
              console.log('The file has been saved!');
            }
          });
        });
      }
    });
  }
});



module.exports = router;

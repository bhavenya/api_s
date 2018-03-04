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
  var tempyear = req.params.year;
  var year = tempyear;
  if(year){
    cassandra.getByYear(year, function(err,rows){
      if (err){
        res.json(err);
      }else {

          var train=JSON.parse(JSON.stringify(rows));


          var array_features = [];
          var array_countries = [];

        for(var i=0; i<train.length;i++)
        {
          if(array_features.indexOf(train[i].feature_name) == -1) // if isn't already in the array
          {
            array_features.push(train[i].feature_name);
          }
        }


        array_features.sort();

        //remove commas from feature names
        // for(var i=0; i<array_features.length;i++)
        // {
        //     array_features[i] = array_features[i].toString().replace(/,/g,'');
        // }



        for(var j=0; j<train.length;j++)
        {
          if(array_countries.indexOf(train[j].country_code) == -1) // if isn't already in the array
          {
            array_countries.push(train[j].country_code);
          }
        }

        var headerString = 'Year,Country_Code,';
        for(var k=0; k<array_features.length;k++)
        {
          headerString += array_features[k].toString().replace(/,/g,'');
          headerString += ',';
        }
        headerString += 'Stability,\n'

        fs.writeFile('/test/train.csv',headerString, (error) =>
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
              finalresultString += train[p].year + ',' + array_countries[p] + ','
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
              finalresultString += train[p].stability + ',';
              finalresultString = finalresultString.replace(/'/g, '');
              finalresultString += '\n';
            }

            fs.appendFile('/test/train.csv',finalresultString, (error) =>
            {
              if (err) throw err;
              else
              {
                var filepath = resolve('../../test/train.csv')
                //var filepath = path.join(__dirname,'/train.csv'); // arti chk
                res.send(filepath);
                console.log('The file has been saved!');
              }
            });
          }
        });
        }
      });
    }
});

module.exports = router;

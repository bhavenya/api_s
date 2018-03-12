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

        var array_countries =[];
        for(var i=0; i<train.length;i++)
        {
          if(array_countries.indexOf(train[i].name) == -1) // if isn't already in the array
          {
            array_countries.push(train[i].name);
          }
        }

        var root = new Object();
        root.countries = [];


        for(var i=0; i<array_countries.length;i++)
        {
          var countryArg = new Object();
          countryArg.country = array_countries[i];
          countryArg.years = [];

          for(var j=0;j<array_years.length;j++)
          {
            var yearArg = new Object();
            yearArg.year = array_years[j];
            yearArg.stabilities = [];

            for (var k=0; k<train.length;k++)
            {
                if ((train[k].name === array_countries[i]) && (train[k].year === array_years[j]))
                {
                  var stabiltyArg = new Object();
                  stabiltyArg.TJ_Val = train[k].TJ_lables;
                  stabiltyArg.KNN_Val = train[k].TJ_lables;
                  stabiltyArg.LR_Val = train[k].TJ_lables;
                  yearArg.stabilities.push(stabiltyArg);
                  break;
                }
            }
            countryArg.years.push(yearArg);
          }
          root.countries.push(countryArg);
        }

        res.send(root);

        var finalResult = JSON.stringify(root,null,'\t');


        fs.writeFile('/tableau/tableau.json',finalResult, (err) => {
          if (err){
            throw err;
          }
          else
          {

            console.log('Json File saved');
          }});
        }
      });
    }
  });

  module.exports = router;

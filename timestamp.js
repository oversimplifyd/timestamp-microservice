'use strict'

let moment = require('moment'),
	express = require('express'),
	app = express(),
	unixTimeRegex = /\d+/,
	stringTimeRegex = /^([a-zA-Z]{3,9})\s?\d{1,2},?\s?\d{4}$/g,
	timeFormat = 'MMMM D, YYYY',
	monthsArr = [	
			'january',
			'february',
			'march',
			'april',
			'may',
			'june',
			'july',
			'august',
			'september',
			'october',
			'november',
			'december' ],
	port = process.env.PORT || 3080,
	input,
	jsonOutput; 

app.get('/', function(req, res){
	res.send('Welcome to Timestamp Microservice'); 
})

app.get('/:time_param', function(req, res){
	
	input = req.params.time_param;

	if (stringTimeRegex.test(input)) {

        let stringArray = input.split(' '),
                month = monthsArr.indexOf(stringArray[0].toLowerCase()),
                day = parseInt(stringArray[1]),
                year = stringArray[2],
                momentFromInput = moment([year, month, day]);

                jsonOutput = {
                    unix: momentFromInput.unix(),
                    natural: input 
                }    
                
    } else 
    
        if (unixTimeRegex.test(input))
                jsonOutput = {
                    unix: input,
                    natural: moment.unix(Number(input)).format(timeFormat) 
                }
                
        else 
                jsonOutput = {
				    unix: null,
				    natural: null
				}
    
    res.json(jsonOutput);	
})

app.listen(port);

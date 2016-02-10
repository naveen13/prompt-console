# prompt-console
Take input from command prompt in nodeJS applications.

# Example Usage
``` javascript

var prompt = require('prompt-console');

//syntax: prompt.ask(array of objects(with question details), success callback function);

prompt.ask(
    [{   
    question: 'What is your name: ',
        validator: 'notNULL',
        color: 'green',
        name: 'name'
    },{   
        question: 'What is your age? ',
        validator: /\d/,
        color: 'yellow',
        name: 'age'
    },{   
        question: 'Please year were you born in: ',
        type: 'password',
        validator: function(year, answers){
			try{
				var date1 = new Date();
				date1.setYear(year);
				var date2 = new Date();
				var timeDiff = Math.abs(date2.getTime() - date1.getTime());
				var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
				var ret = Math.floor(diffDays / 365) == answers.age;
				if(!ret) console.log("Wrong birth year, you would be of " + Math.floor(diffDays / 365) + " years if born in " + year);
				return ret;
			}catch(e){
				return false;
			}

		},
        color: 'cyan',
        name: 'city'
    }], function(response){
        console.log('That is the right year of birth ' + response.name + ', have a good day!');
    }
);

// the validator can be a pattern or a function(returning true/false)

```

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
        question: 'Is it your real name? ',
        validator: function(k){ return k == 'yes'; },
        color: 'yellow',
        name: 'age'
    },{   
        question: 'Please enter your home city: ',
        validator: /\w/,
        color: 'blue',
        name: 'city'
    }], function(response){
        console.log('Hello ' + response.name + ', ' + response.city + ' is a great city. :)');
    }
);

// the validator can be a pattern or a function(returning true/false)

```
# prompt-console
Take input from command prompt in nodeJS applications.

# Example Usage
``` javascript

var prompt = require('prompt-console');

//syntax: prompt.ask(array of objects(with question details), success callback function);

prompt.ask(
    [{   
    question: 'Please enter server url: ',
        validator: 'notNULL',
        color: 'green',
        name: 'url'
    },{   
        question: 'Please enter secret number: ',
        validator: function(k){ return k < 50; },
        color: 'yellow',
        name: 'secret'
    },{   
        question: 'Please enter secret location: ',
        validator: /\d/,
        color: 'blue',
        name: 'secret'
    }], function(input){
        console.log(input);
    }
);

// the validator can be a pattern or a function(returning true/false)

```
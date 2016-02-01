# prompt-console
Take input from command prompt in nodeJS applications.

# Example Usage
``` javascript

var prompt = require('prompt-console');

//syntax: prompt.ask(array of objects(with question details), success callback function);

prompt.ask(
    [{   
    question: 'Please enter server url: ',
        required: true,
        color: 'green',
        name: 'url'
    },{   
        question: 'Please enter secret key: ',
        required: true,
        color: 'yellow',
        name: 'secret'
    }], function(input){
        console.log(input);
    }
);

```
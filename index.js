var readline, rl, i, answers, patterns;

var init = function(){
    readline = require('readline');
    i = 0;
    answers = {};
    rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    patterns = {
        'notNULL': /^(?!\s*$)/,
        'isRequired': /^(?!\s*$)/,
        'notEmpty': /^(?!\s*$)/,
        'string': /\w/,
        'number': /\d/,
    };
};

init();

var ask = function(questions, scb){
    var current = questions[i];
    if(current){
        var ques = current.color && current.question[current.color] ? current.question[current.color] : current.question;

        rl.question(ques + "\n", function(answer) {
            var test = false;
            answer = answer.trim();

            if(typeof(current.validator) == 'function'){
                test = current.validator(answer);
            }
            else if(typeof(current.validator) == 'object'){
                var regex = new RegExp(current.validator);
                test = regex.test(answer);
            }
            else{
                var regex = patterns[current.validator];
                if(regex) test = regex.test(answer);

            }

            if(!test){
                ask(questions, scb);
            }else{
                i++;
                answers[current.name || i] = answer;
                ask(questions, scb);
            }
        });        
    }else{
        if(typeof(scb) != 'undefined') scb(answers);
        rl.close();
    }
}

exports.ask = ask;
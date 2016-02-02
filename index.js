var readline, rl, i, answers, patterns;

var initReadline = function(){
    if(!readline){
        readline = require('readline');
        rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }
}
var init = function(){
    i = 0;
    answers = {};

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
    initReadline();

    var current = questions[i];
    if(current){
        var ques = current.color && current.question[current.color] ? current.question[current.color] : current.question;
		if(current.default) ques += '( ' + current.default + ' ): ';
        rl.question(ques + "\n", function(answer) {
            var test = false;
            answer = answer.trim() || current.default;

            if(typeof(current.validator) == 'function'){
                test = current.validator(answer, answers);
            }
            else if(typeof(current.validator) == 'object'){
                var regex = new RegExp(current.validator);
                test = regex.test(answer);
            }
            else if(current.validator){
                var regex = patterns[current.validator];
                if(regex) test = regex.test(answer);

            }else{
				test = true;
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
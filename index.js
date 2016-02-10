var readline, rl, i, answers, patterns, isOpen;

var initReadline = function(){
    if(!isOpen){
		isOpen = true;
		i = 0;
        rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }
}
var onDataHandler = function(char) {
    char = char + "";
    process.stdout.write("\033[2K\033[200D" + Array(rl.line.length+1).join("*"));
}
var init = function(){
    i = 0;
    answers = {};
	isOpen = false;
    patterns = {
        'notNULL': /^(?!\s*$)/,
        'isRequired': /^(?!\s*$)/,
        'notEmpty': /^(?!\s*$)/,
        'string': /\w/,
        'number': /\d/,
    };
	readline = require('readline');
};

init();

var ask = function(questions, scb){
    initReadline();
    var current = questions[i];
    if(current){
        if(current.type == 'password' || current.type == 'hidden'){
            process.stdin.on("data", onDataHandler);
        }else{
            process.stdin.removeListener("data",onDataHandler);
        }

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
        rl.close();
		isOpen = false;
		if(typeof(scb) != 'undefined') scb(answers);
    }
}

exports.ask = ask;

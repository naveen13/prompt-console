var readline, rl, i, answers;

var init = function(){
    readline = require('readline');
    i = 0;
    answers = {};
    rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

};

init();

var ask = function(questions, scb){
    var current = questions[i];
    if(current){
        var ques = current.color && current.question[current.color] ? current.question[current.color] : current.question;
        rl.question(ques + "\n", function(answer) {
            if(current.required && !answer.trim()){
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
function confirmWindowObj() {
    class ConfirmWindowObj {
        constructor(title, question, answer = {}) {
            this.title = title;
            this.question = question;
            this.answer = answer;
        }

    }

    this.init = function(title, question, answer){
        return new ConfirmWindowObj(title,question,answer);
    };

}
module.exports = confirmWindowObj;
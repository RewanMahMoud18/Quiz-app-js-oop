import Final from "./final.js";
import Question from "./questions.js";


class Quiz {
  constructor(quizElement, amount, questions) {
    this.quizElement = quizElement;
    this.currentElement = document.querySelector(".current");
    this.totalElement = document.querySelector(".total");
    this.finalElement = document.querySelector(".final");
    this.nextBtn = document.querySelector("#next");

    this.totalAmount = amount;
    this.answeredAmount = 0;
    this.questions = this.setQuestions(questions);
    this.nextBtn.addEventListener("click", this.nextQuestions);
    this.renderQuestions();
  }
  setQuestions(questions) {
    return questions.map((question) => new Question(question));
  }
  renderQuestions() {
    this.questions[this.answeredAmount].render();
    this.currentElement.innerHTML = this.answeredAmount;
    this.totalElement.innerHTML = this.totalAmount;
  }
  nextQuestions = () => {
    const checkElement = this.questions[
      this.answeredAmount
    ].answerElements.filter((el) => el.firstChild.checked);
    if (checkElement.length == 0) {
      alert("check element");
    } else {
      this.questions[this.answeredAmount].answer(checkElement);
      this.answeredAmount++;
      this.answeredAmount < this.totalAmount
        ? this.renderQuestions()
        : this.endQuizApp();
    }
  };
  endQuizApp() {
    this.quizElement.style.display = "none";
    this.finalElement.style.display = "block";
    const correct = this.countCorrectAnswer();
    new Final(correct, this.totalAmount);
  }
  countCorrectAnswer() {
    let count = 0;
    this.questions.forEach((ele) => {
      if (ele.isCorrect) {
        count++;
      }
    });
    return count;
  }
}
export default Quiz;

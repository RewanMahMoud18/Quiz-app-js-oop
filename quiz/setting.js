import Quiz from'./quiz.js';
class Setting {
  constructor() {
    this.settingDom = document.querySelector(".settings");
    this.quizDom = document.querySelector(".quiz");
    this.categoryDom = document.querySelector("#category");
    this.nQuestionsDom = document.querySelector("#nQuestions");
    this.startBtn = document.querySelector("#start");

    this.diffculty = [
      document.querySelector("#easy"),
      document.querySelector("#medium"), // Corrected spelling
      document.querySelector("#hard"),
    ];
    this.quiz={};
    this.startBtn.addEventListener("click", this.startQuizApp); // Corrected event listener
  }
  startQuizApp = async () => {
    try {
      const amount = this.getAmount();
      const categoryID = this.categoryDom.value;
      const diffculty = this.getDiffculty();
      const url = `https://opentdb.com/api.php?amount=${amount}&category=${categoryID}&difficulty=${diffculty}`;

      let  {results} = await this.featchData(url);
      console.log(results);
      this.quiz=new Quiz(this.quizDom,amount,results);
      
      this.toggelElement();
    } catch (err) {
      alert(err);
    }
  };
  toggelElement = () => {
    this.quizDom.style.display = "block";
    this.settingDom.style.display = "none";
  };
  featchData = async(url) => {
    const respone=await fetch(url);
    const result=await respone.json();
    return result;

    // return fetch(url)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     return data.result;
    //   });
  };
  getAmount = () => {
    const amount = this.nQuestionsDom.value;
    if (amount > 0 && amount < 20) {
      return amount;
    } else {
      alert("please Enter Questions");
      return null;
    }
  };
  getDiffculty = () => {
    const diffculty = this.diffculty.filter((el) => el.checked);
    if (diffculty.length === 1) {
      return diffculty[0].id;
    } else {
      alert("please select diffuclty");
      return null;
    }
  };
}
export default Setting;

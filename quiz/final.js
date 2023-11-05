class Final {
  constructor(correctAnswer, totalAmount) {
    this.scoreElement = document.querySelector(".score");
    this.aginBtn = document.querySelector("#again");

    this.render(correctAnswer, totalAmount);
    this.aginBtn.addEventListener("click",this.startAgain);
  }
  render(correctAnswer, totalAmount) {
    this.scoreElement.innerHTML = `You Answered${correctAnswer}out of${totalAmount} correct`;
  }
  startAgain=()=>{
    location.reload();
  }
}
export default Final;

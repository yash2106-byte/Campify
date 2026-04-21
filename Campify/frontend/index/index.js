function toggleFAQ(clickedQuestion) {
  var answer = clickedQuestion.nextElementSibling;
  var sign = clickedQuestion.querySelector("span");

  if (answer.style.display === "block") {
    answer.style.display = "none";
    sign.textContent = "+";
  } else {
    var allAnswers = document.querySelectorAll(".faq-answer");
    var allSigns = document.querySelectorAll(".faq-question span");

    for (var i = 0; i < allAnswers.length; i++) {
      allAnswers[i].style.display = "none";
      allSigns[i].textContent = "+";
    }

    answer.style.display = "block";
    sign.textContent = "−";
  }
}

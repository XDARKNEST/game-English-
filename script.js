let currentQuestionIndex = 0;
let score = 0;
let usedQuestions = [];
const totalQuestions = questionsBank.length;

function loadQuestion() {
  if (usedQuestions.length === totalQuestions) {
    document.getElementById("question").innerText = "🎉 Semua soal sudah selesai!";
    document.getElementById("options").innerHTML = "";
    return;
  }

  let question;
  do {
    question = questionsBank[Math.floor(Math.random() * questionsBank.length)];
  } while (usedQuestions.includes(question));

  usedQuestions.push(question);

  document.getElementById("question").innerText = 
    `Apa bahasa Inggris dari "${question.indo}"?`;

  let options = [question.eng];
  while (options.length < 4) {
    let random = questionsBank[Math.floor(Math.random() * questionsBank.length)].eng;
    if (!options.includes(random)) options.push(random);
  }

  options = options.sort(() => Math.random() - 0.5);

  let buttonsHTML = "";
  options.forEach(opt => {
    buttonsHTML += `<button onclick="checkAnswer('${opt}','${question.eng}')">${opt}</button>`;
  });
  document.getElementById("options").innerHTML = buttonsHTML;

  updateProgress();
}

function checkAnswer(answer, correct) {
  if (answer === correct) {
    score++;
    document.getElementById("feedback").innerText = "✅ Benar!";
  } else {
    document.getElementById("feedback").innerText = `❌ Salah! Jawaban: ${correct}`;
  }
  document.getElementById("score").innerText = `Skor: ${score}`;
  setTimeout(loadQuestion, 1000);
}

function updateProgress() {
  let progress = (usedQuestions.length / totalQuestions) * 100;
  document.getElementById("progress-bar").style.width = progress + "%";
  document.getElementById("progress-text").innerText =
    `Soal ke ${usedQuestions.length} dari ${totalQuestions}`;
}

loadQuestion();

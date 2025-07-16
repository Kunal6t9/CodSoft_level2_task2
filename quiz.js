let all_quiz = JSON.parse(localStorage.getItem("allQuizzes")) || {};
let cur_quiz = [];
let cur_ques = 0;
let score = 0;
let ans = [];

const default_quiz = [
  {ques: "What is full form of BMW", op: ["Bavarian Motor Works","British Motor Works","Berlin Motor World","Bayerische Motor Werke"], correct: 3},
  {ques: "What does HTTP stand for?", op: ["HyperText Transfer Protocol","HighText Transfer Protocol","Hyperlink Transmission Protocol","HyperText Transmission Program"], correct:0},
  {ques: "Which country has no rivers?", op: ["Vatican City","Saudi Arabia","Malta","Monaco"], correct: 1},
  {ques: "HTML stands for?", op: ["Markup", "Text", "HomePage", "None"], correct: 0},
  {ques: "Which planet in our solar system has the most moons?", op: ["Saturn","Jupiter","Mars","Neptune"], correct: 0},
  {ques: "Sun rises in?", op: ["West", "East", "North", "South"], correct: 1},
  {ques: "CSS is used for?", op: ["Styling", "Backend", "Database", "Logic"], correct: 0},
  {ques: "JS is?", op: ["Markup", "Scripting", "Styling", "Database"], correct: 1},
  {ques: "React is a?", op: ["Library", "Framework", "Language", "None"], correct: 0},
  {ques: "Which company originally developed the Java programming language?", op: ["Microsoft","IBM","Sun Microsystems","Oracle"], correct: 2}
];

function saved() {
  const select = document.getElementById("quiz-select");
  Object.keys(all_quiz).forEach(name => {
    const opt = document.createElement("option");
    opt.value = name;
    opt.textContent = name;
    select.appendChild(opt);
  });
}
saved();

function random() {
  cur_quiz = shuffle([...default_quiz]).slice(0, 5);
  ans = new Array(cur_quiz.length).fill(null);
  startQuiz();
}

function load_quiz() {
  const name = document.getElementById("quiz-select").value;
  if (!name) return alert("Select a quiz");
  cur_quiz = shuffle([...all_quiz[name]]);
  ans = new Array(cur_quiz.length).fill(null);
  startQuiz();
}

function startQuiz() {
  cur_ques = 0;
  score = 0;
  document.getElementById("quiz-box").style.display = "block";
  document.getElementById("result-box").style.display = "none";
  show_ques();
}

function show_ques() {
  const x = cur_quiz[cur_ques];
  document.getElementById("question-text").textContent = `Q${cur_ques + 1}: ${x.ques}`;
  const ul = document.getElementById("options-list");
  ul.innerHTML = "";

  x.op.forEach((option, i) => {
    const li = document.createElement("li");

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "answer";
    radio.value = i;
    radio.id = `opt${i}`;
    if (ans[cur_ques] === i) radio.checked = true;

    const label = document.createElement("label");
    label.textContent = option;
    label.setAttribute("for", `opt${i}`);

    li.appendChild(radio);
    li.appendChild(label);
    ul.appendChild(li);
  });
}

function next_ques() {
  storeAnswer();

  if (cur_ques < cur_quiz.length - 1) {
    cur_ques++;
    show_ques();
  } else {
    calc();
    result();
  }
}

function prev_ques() {
  storeAnswer();

  if (cur_ques > 0) {
    cur_ques--;
    show_ques();
  }
}

function storeAnswer() {
  const selected = document.querySelector("input[name='answer']:checked");
  if (!selected) return;
  ans[cur_ques] = parseInt(selected.value);
}

function calc() {
  score = 0;
  cur_quiz.forEach((x, i) => {
    if (
      ans[i] !== null &&
      ans[i] === x.correct
    ) {
      score++;
    }
  });
}

function result() {
  document.getElementById("quiz-box").style.display = "none";
  document.getElementById("result-box").style.display = "block";
  document.getElementById("score-text").textContent = `You scored ${score} out of ${cur_quiz.length}`;
}

function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

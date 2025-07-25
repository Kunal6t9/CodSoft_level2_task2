let arr = [];
let e_index = -1;

function counter() {
  document.getElementById("counter").textContent = arr.length;
}

function show_list() {
  let list = document.getElementById("ques-list");
  list.innerHTML = "";

  arr.forEach((item, index) => {
    let li = document.createElement("li");
    li.textContent = `${item.ques} (Correct: ${item.op[item.correct]}) `;

    // Edit Button
    let btn = document.createElement("button");
    btn.textContent = "Edit";
    btn.onclick = () => {
      document.getElementById("question").value = item.ques;
      document.getElementById("opt1").value = item.op[0];
      document.getElementById("opt2").value = item.op[1];
      document.getElementById("opt3").value = item.op[2];
      document.getElementById("opt4").value = item.op[3];
      document.getElementById("correct").value = item.correct + 1;
      e_index = index;
    };

    // Delete Button
    let del_btn = document.createElement("button");
    del_btn.textContent = "Delete";
    del_btn.onclick = () => {
      arr.splice(index, 1);
      show_list();
      counter();
    };

    li.appendChild(btn);
    li.appendChild(del_btn);
    list.appendChild(li);
  });
}

document.getElementById("quiz").addEventListener("submit", function(e){
  e.preventDefault();

  if (arr.length >= 10 && e_index === -1) {
    alert("Maximum of 10 questions allowed.");
    return;
  }

  let ques = document.getElementById("question").value;
  let op = [
    document.getElementById("opt1").value,
    document.getElementById("opt2").value,
    document.getElementById("opt3").value,
    document.getElementById("opt4").value
  ];
  let correct = parseInt(document.getElementById("correct").value) - 1;

  if (e_index === -1) {
    arr.push({ques, op, correct});
  } else {
    arr[e_index] = {ques, op, correct};
    e_index = -1;
  }

  this.reset();
  show_list();
  counter();
});

// Save to localStorage
function save_quiz() {
  let quizName = document.getElementById("quizName").value.trim();
  if (!quizName) {
    alert("Please enter a quiz name.");
    return;
  }

  let allQuizzes = JSON.parse(localStorage.getItem("allQuizzes")) || {};
  allQuizzes[quizName] = arr;

  localStorage.setItem("allQuizzes", JSON.stringify(allQuizzes));
  alert(`Quiz "${quizName}" saved successfully!`);

  // Clear
  arr = [];
  e_index = -1;
  show_list();
  counter();
  document.getElementById("quiz").reset();
  document.getElementById("quizName").value = "";
}

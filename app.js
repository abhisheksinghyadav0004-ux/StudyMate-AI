const navLinks = document.querySelectorAll(".nav-link");
const pages = document.querySelectorAll(".page");

function openPage(pageId) {
  pages.forEach((page) => page.classList.remove("active-page"));
  navLinks.forEach((nav) => nav.classList.remove("active"));

  document.getElementById(pageId).classList.add("active-page");
  document.querySelector('[data-page="' + pageId + '"]').classList.add("active");

  if (pageId === "quiz") showQuizQuestion();
}

navLinks.forEach((link) => {
  link.addEventListener("click", function (event) {
    event.preventDefault();
    openPage(link.dataset.page);
  });
});

// Notes summary + notes quiz
const notesInput = document.getElementById("notesInput");
const summaryBtn = document.getElementById("summaryBtn");
const summaryOutput = document.getElementById("summaryOutput");

let notesQuizQuestions = [];

summaryBtn.addEventListener("click", function () {
  const notes = notesInput.value.trim();

  if (notes === "") {
    summaryOutput.textContent = "Pehle notes paste karo.";
    return;
  }

  const words = notes.split(/\s+/);
  const shortSummary = words.slice(0, 45).join(" ");

  summaryOutput.textContent =
    shortSummary + "... Important points ko revise karo aur quiz me test karo.";

  const importantWords = words
    .map((word) => word.replace(/[^a-zA-Z0-9]/g, ""))
    .filter((word) => word.length > 5)
    .slice(0, 3);

  notesQuizQuestions = importantWords.map(function (word, index) {
    return {
      subject: "From Notes",
      question: "Notes ke according important keyword " + (index + 1) + " kya hai?",
      options: [word, "Random topic", "Not related"],
      answer: word,
    };
  });

  if (notesQuizQuestions.length === 0) {
    notesQuizQuestions = [
      {
        subject: "From Notes",
        question: "Notes ka main purpose kya hai?",
        options: ["Revision help karna", "Subject delete karna", "Random guessing karna"],
        answer: "Revision help karna",
      },
    ];
  }

  currentQuestionIndex = 0;
  alert("Notes se quiz ban gaya. Quiz page par jao.");
});

// Course
const courseInput = document.getElementById("courseInput");
const saveCourseBtn = document.getElementById("saveCourseBtn");
const courseName = document.getElementById("courseName");

const savedCourse = localStorage.getItem("courseName");
if (savedCourse) courseName.textContent = savedCourse;

saveCourseBtn.addEventListener("click", function () {
  const course = courseInput.value.trim();

  if (course === "") {
    alert("Pehle apna class ya course likho.");
    return;
  }

  localStorage.setItem("courseName", course);
  courseName.textContent = course;
  courseInput.value = "";
});

// Subjects
const subjectInput = document.getElementById("subjectInput");
const addSubjectBtn = document.getElementById("addSubjectBtn");
const subjectList = document.getElementById("subjectList");

let subjects = JSON.parse(localStorage.getItem("subjects")) || [];

function saveSubjects() {
  localStorage.setItem("subjects", JSON.stringify(subjects));
}

function updateDashboardStats() {
  const totalSubjects = document.getElementById("totalSubjects");
  const studyStatus = document.getElementById("studyStatus");

  if (!totalSubjects || !studyStatus) return;

  totalSubjects.textContent = subjects.length;

  if (subjects.length === 0) {
    studyStatus.textContent = "Getting Started";
  } else if (subjects.length <= 2) {
    studyStatus.textContent = "Building Routine";
  } else {
    studyStatus.textContent = "Ready for Practice";
  }
}

function showSubjects() {
  subjectList.innerHTML = "";

  subjects.forEach(function (subject, index) {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = subject;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";

    deleteBtn.addEventListener("click", function () {
      subjects.splice(index, 1);
      saveSubjects();
      showSubjects();
      updateDashboardStats();
      currentQuestionIndex = 0;
      showQuizQuestion();
    });

    li.appendChild(span);
    li.appendChild(deleteBtn);
    subjectList.appendChild(li);
  });
}

addSubjectBtn.addEventListener("click", function () {
  const subjectName = subjectInput.value.trim();

  if (subjectName === "") {
    alert("Pehle subject name likho.");
    return;
  }

  subjects.push(subjectName);
  saveSubjects();
  showSubjects();
  updateDashboardStats();

  subjectInput.value = "";
  currentQuestionIndex = 0;
  showQuizQuestion();
});

showSubjects();
updateDashboardStats();

// Quick dashboard buttons
const quickBtns = document.querySelectorAll(".quick-btn");

quickBtns.forEach(function (btn) {
  btn.addEventListener("click", function () {
    openPage(btn.dataset.open);
  });
});

// Quiz
const levelBtns = document.querySelectorAll(".level-btn");
const quizInfo = document.getElementById("quizInfo");
const quizQuestion = document.getElementById("quizQuestion");
const quizOptions = document.getElementById("quizOptions");
const quizFeedback = document.getElementById("quizFeedback");
const nextQuestionBtn = document.getElementById("nextQuestionBtn");
const correctScore = document.getElementById("correctScore");
const wrongScore = document.getElementById("wrongScore");
const attemptedScore = document.getElementById("attemptedScore");
const resetScoreBtn = document.getElementById("resetScoreBtn");

let currentLevel = "easy";
let currentQuestionIndex = 0;
let correctCount = 0;
let wrongCount = 0;
let attemptedCount = 0;
function updateScore() {
  correctScore.textContent = correctCount;
  wrongScore.textContent = wrongCount;
  attemptedScore.textContent = attemptedCount;
}

const questionBank = {
  python: {
    easy: [
      ["Python me output print karne ke liye kya use hota hai?", ["print()", "echo()", "show()"], "print()"],
      ["Python file extension kya hota hai?", [".py", ".java", ".html"], ".py"],
    ],
    medium: [
      ["Python list kaisi hoti hai?", ["Ordered and mutable", "Unordered", "Only numeric"], "Ordered and mutable"],
      ["Dictionary me data kaise store hota hai?", ["Key-value pair", "Only index", "Only value"], "Key-value pair"],
    ],
    hard: [
      ["Lambda function ka use kya hai?", ["Anonymous function", "Loop stop", "Class delete"], "Anonymous function"],
      ["List comprehension ka benefit kya hai?", ["Short list creation", "HTML styling", "Database"], "Short list creation"],
    ],
  },

  maths: {
    easy: [
      ["Circle area formula kya hai?", ["pi r square", "2 pi r", "l x b"], "pi r square"],
      ["Pythagoras theorem kis triangle par lagta hai?", ["Right angled triangle", "Circle", "Square"], "Right angled triangle"],
    ],
    medium: [
      ["Derivative ka basic meaning kya hai?", ["Rate of change", "Total area", "Average"], "Rate of change"],
      ["Mean ka formula kya hai?", ["Sum / number of values", "Multiply all", "Largest value"], "Sum / number of values"],
    ],
    hard: [
      ["Integration ka geometric meaning kya hai?", ["Area under curve", "Slope", "Percentage"], "Area under curve"],
      ["Matrix multiplication kab possible hoti hai?", ["First columns = second rows", "Rows same", "Only square"], "First columns = second rows"],
    ],
  },

  physics: {
    easy: [
      ["Force ka SI unit kya hai?", ["Newton", "Joule", "Watt"], "Newton"],
      ["Speed formula kya hai?", ["Distance / Time", "Mass x Acceleration", "Work / Time"], "Distance / Time"],
    ],
    medium: [
      ["Newton second law kya hai?", ["F = ma", "V = IR", "E = mc2"], "F = ma"],
      ["Power formula kya hai?", ["Work / Time", "Force / Area", "Mass / Volume"], "Work / Time"],
    ],
    hard: [
      ["Ohm law kya hai?", ["V = IR", "F = ma", "P = VI only"], "V = IR"],
      ["Momentum formula kya hai?", ["Mass x Velocity", "Force x Distance", "Charge x Time"], "Mass x Velocity"],
    ],
  },

  history: {
    easy: [
      ["Indian Constitution kab lagu hua?", ["26 January 1950", "15 August 1947", "2 October 1869"], "26 January 1950"],
      ["Gandhi ji kis movement se jude the?", ["Non-cooperation", "Green revolution", "Chipko only"], "Non-cooperation"],
    ],
    medium: [
      ["1857 revolt ko kya kaha jata hai?", ["First War of Independence", "Quit India", "Civil Disobedience"], "First War of Independence"],
      ["Quit India Movement kab start hua?", ["1942", "1920", "1930"], "1942"],
    ],
    hard: [
      ["Permanent Settlement kisne introduce kiya?", ["Lord Cornwallis", "Lord Curzon", "Mountbatten"], "Lord Cornwallis"],
      ["Ilbert Bill controversy kis se related thi?", ["Lord Ripon", "Dalhousie", "Hastings"], "Lord Ripon"],
    ],
  },

  dbms: {
    easy: [
      ["DBMS full form kya hai?", ["Database Management System", "Data Machine Software", "Digital Backup System"], "Database Management System"],
      ["SQL me data fetch command kaunsa hai?", ["SELECT", "FETCHALL", "SHOWDATA"], "SELECT"],
    ],
    medium: [
      ["Partial dependency kaunsi normal form remove karti hai?", ["2NF", "1NF", "3NF"], "2NF"],
      ["Primary key ka purpose kya hai?", ["Row uniquely identify karna", "Table delete karna", "Duplicate banana"], "Row uniquely identify karna"],
    ],
    hard: [
      ["Atomicity ka meaning kya hai?", ["All or nothing transaction", "Fast query", "Only backup"], "All or nothing transaction"],
      ["BCNF me determinant kya hona chahiye?", ["Candidate key", "Foreign key only", "Normal attribute"], "Candidate key"],
    ],
  },

  java: {
    easy: [
      ["Java me object banane ke liye keyword?", ["new", "make", "create"], "new"],
      ["Java program entry point method?", ["main()", "start()", "run()"], "main()"],
    ],
    medium: [
      ["Inheritance ke liye keyword?", ["extends", "inherits", "parent"], "extends"],
      ["Method overloading kis par depend karta hai?", ["Different parameters", "Only return type", "Class name"], "Different parameters"],
    ],
    hard: [
      ["HashMap average search complexity?", ["O(1)", "O(n)", "O(n log n)"], "O(1)"],
      ["volatile keyword ka use?", ["Thread visibility", "Inheritance", "Exception handling"], "Thread visibility"],
    ],
  },
};

function getSubjectKey(subject) {
  const name = subject.toLowerCase();

  if (name.includes("python")) return "python";
  if (name.includes("math")) return "maths";
  if (name.includes("physics")) return "physics";
  if (name.includes("history")) return "history";
  if (name.includes("dbms") || name.includes("database")) return "dbms";
  if (name.includes("java")) return "java";

  return null;
}

function createQuizQuestions() {
  const questions = [];

  notesQuizQuestions.forEach(function (question) {
    questions.push(question);
  });

  subjects.forEach(function (subject) {
    const key = getSubjectKey(subject);

    if (key && questionBank[key]) {
      questionBank[key][currentLevel].forEach(function (item) {
        questions.push({
          subject: subject,
          question: item[0],
          options: item[1],
          answer: item[2],
        });
      });
    }
  });

  return questions;
}

function showQuizQuestion() {
  const questions = createQuizQuestions();

  quizFeedback.textContent = "";
  quizOptions.innerHTML = "";

  if (subjects.length === 0 && notesQuizQuestions.length === 0) {
    quizInfo.textContent = "Pehle subjects add karo ya notes paste karo.";
    quizQuestion.textContent = "Add subjects or notes first to generate quiz.";
    return;
  }

  if (questions.length === 0) {
    quizInfo.textContent = "Is subject ke liye built-in quiz nahi hai.";
    quizQuestion.textContent = "Notes page me is subject ke notes paste karo.";
    return;
  }

  if (currentQuestionIndex >= questions.length) {
    currentQuestionIndex = 0;
  }

  const currentQuestion = questions[currentQuestionIndex];

  quizInfo.textContent =
    "Level: " + currentLevel.toUpperCase() + " | Subject: " + currentQuestion.subject;

  quizQuestion.textContent = currentQuestion.question;

  currentQuestion.options.forEach(function (option) {
    const button = document.createElement("button");
    button.textContent = option;

    button.addEventListener("click", function () {
      const optionButtons = quizOptions.querySelectorAll("button");
      optionButtons.forEach((btn) => (btn.disabled = true));

      attemptedCount++;

      if (option === currentQuestion.answer) {
        correctCount++;
        button.classList.add("correct");
        quizFeedback.textContent = "Correct answer.";
      } else {
        wrongCount++;
        button.classList.add("wrong");
        quizFeedback.textContent = "Wrong answer. Correct: " + currentQuestion.answer;
      }

      updateScore();
    });

    quizOptions.appendChild(button);
  });
}

levelBtns.forEach(function (btn) {
  btn.addEventListener("click", function () {
    currentLevel = btn.dataset.level;
    currentQuestionIndex = 0;

    levelBtns.forEach((item) => item.classList.remove("active-level"));

    btn.classList.add("active-level");
    showQuizQuestion();
  });
});

nextQuestionBtn.addEventListener("click", function () {
  currentQuestionIndex++;
  showQuizQuestion();
});

showQuizQuestion();

// Roadmap
const generateRoadmapBtn = document.getElementById("generateRoadmapBtn");
const roadmapList = document.getElementById("roadmapList");
const roadmapInfo = document.getElementById("roadmapInfo");

if (generateRoadmapBtn) {
  generateRoadmapBtn.addEventListener("click", function () {
    roadmapList.innerHTML = "";

    if (subjects.length === 0) {
      roadmapInfo.textContent = "Pehle Subjects page me subjects add karo.";
      return;
    }

    const course = localStorage.getItem("courseName") || "your course";
    roadmapInfo.textContent = "Roadmap for " + course;

    const tasks = [
      "Basic concepts revise karo",
      "Short notes banao",
      "Important questions solve karo",
      "Quiz practice karo",
      "Weak topics identify karo",
      "Revision test do",
      "Full weekly review karo",
    ];

    for (let i = 0; i < 7; i++) {
      const subject = subjects[i % subjects.length];

      const li = document.createElement("li");
      li.textContent = "Day " + (i + 1) + ": " + subject + " - " + tasks[i];

      roadmapList.appendChild(li);
    }
  });
}
resetScoreBtn.addEventListener("click", function () {
  correctCount = 0;
  wrongCount = 0;
  attemptedCount = 0;
  updateScore();
});

updateScore();
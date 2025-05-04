document.addEventListener('DOMContentLoaded', () => {
    // Daily Tips
    const tips = [
        "Turn off lights when not in use.",
        "Use a reusable water bottle.",
        "Bike or walk instead of driving.",
        "Avoid single-use plastics.",
        "Plant a tree in your community."
    ];
    const tipsList = document.getElementById('tips-list');
    tips.forEach(tip => {
        tipsList.innerHTML += `<li class="list-group-item">${tip}</li>`;
    });

    // Carbon Footprint Estimator
    document.getElementById('footprint-form').addEventListener('submit', e => {
        e.preventDefault();
        const km = parseFloat(document.getElementById('km').value) || 0;
        const flights = parseInt(document.getElementById('flights').value) || 0;
        const carbon = (km * 0.21 + flights * 250).toFixed(2);
        document.getElementById('result').innerHTML = `
            <div class="alert alert-success mt-2">
                Estimated yearly carbon footprint: <strong>${carbon}</strong> kg CO₂
            </div>`;
    });

    // Load tree count
    const treeCountDisplay = document.getElementById("treeCount");
    const plantTreeBtn = document.getElementById("plantTreeBtn");
    const loadTreeCount = () => {
        treeCountDisplay.textContent = localStorage.getItem("treeCount") || 0;
    };
    const incrementTreeCount = () => {
        let count = parseInt(localStorage.getItem("treeCount") || "0");
        count++;
        localStorage.setItem("treeCount", count);
        treeCountDisplay.textContent = count;
    };
    plantTreeBtn.addEventListener("click", incrementTreeCount);
    loadTreeCount();

    // News ticker
    const newsItems = [
        "🌱 Climate change is accelerating.",
        "♻️ Recycling rates hit a new high.",
        "🌍 World Environment Day is June 5th.",
        "🚰 Global water usage up 20% in the last decade."
    ];
    document.getElementById("news-text").textContent = newsItems.join(" | ");
});

// Challenge Tracker
document.querySelectorAll('.challenge-item').forEach((checkbox, index) => {
    checkbox.checked = localStorage.getItem(`challenge-${index}`) === "true";
    checkbox.addEventListener('change', () => {
        localStorage.setItem(`challenge-${index}`, checkbox.checked);
    });
});
document.getElementById('resetChallenges').addEventListener('click', () => {
    document.querySelectorAll('.challenge-item').forEach((checkbox, index) => {
        checkbox.checked = false;
        localStorage.removeItem(`challenge-${index}`);
    });
});

// Eco Quiz
const quizData = [
    { question: "তুমি কি প্লাস্টিক ব্যবহার কমাও?", options: ["হ্যাঁ", "না"], score: [2, 0] },
    { question: "তুমি কি রিসাইকেল করো নিয়মিত?", options: ["হ্যাঁ", "না"], score: [2, 0] },
    { question: "তুমি কি হাঁটা বা সাইকেল বেশি ব্যবহার করো?", options: ["হ্যাঁ", "না"], score: [2, 0] },
    { question: "তুমি কি পানির অপচয় রোধ করো?", options: ["হ্যাঁ", "না"], score: [2, 0] },
    { question: "তুমি কি স্থানীয় প্রোডাক্ট কিনো?", options: ["হ্যাঁ", "না"], score: [2, 0] }
];
let currentQuestion = 0, totalScore = 0;
const questionDiv = document.getElementById("quiz-question");
const optionsDiv = document.getElementById("quiz-options");
const nextButton = document.getElementById("next-question");
const resultDiv = document.getElementById("quiz-result");

function loadQuestion(index) {
    const q = quizData[index];
    questionDiv.innerHTML = `<p>${q.question}</p>`;
    optionsDiv.innerHTML = "";
    nextButton.disabled = true;
    q.options.forEach((opt, i) => {
        const btn = document.createElement("button");
        btn.className = "btn btn-outline-success btn-sm d-block mb-2";
        btn.innerText = opt;
        btn.onclick = () => {
            totalScore += q.score[i];
            nextButton.disabled = false;
            optionsDiv.querySelectorAll("button").forEach(b => b.disabled = true);
            btn.classList.replace("btn-outline-success", "btn-success");
        };
        optionsDiv.appendChild(btn);
    });
}
nextButton.onclick = () => {
    currentQuestion++;
    if (currentQuestion < quizData.length) loadQuestion(currentQuestion);
    else showResult();
};
function showResult() {
    questionDiv.style.display = "none";
    optionsDiv.style.display = "none";
    nextButton.style.display = "none";
    const grade = totalScore >= 8 ? "Eco Hero" : totalScore >= 5 ? "Eco Learner" : "Eco Beginner";
    resultDiv.className = "alert alert-info mt-3";
    resultDiv.style.display = "block";
    resultDiv.innerHTML = `তোমার গ্রেড: <strong>${grade}</strong>`;
}
loadQuestion(currentQuestion);

// Eco Goal Tracker
const goalForm = document.getElementById("goalForm");
const goalInput = document.getElementById("goalInput");
const goalList = document.getElementById("goalList");

const loadGoals = () => {
    const savedGoals = JSON.parse(localStorage.getItem("ecoGoals")) || [];
    goalList.innerHTML = "";
    savedGoals.forEach(addGoalToList);
};
goalForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = goalInput.value.trim();
    if (!text) return;
    addGoalToList(text);
    saveGoal(text);
    goalInput.value = "";
});
function addGoalToList(text) {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    li.innerHTML = `
        ${text}
        <div>
            <button class="btn btn-sm btn-outline-success me-2">✅</button>
            <button class="btn btn-sm btn-outline-danger">❌</button>
        </div>`;
    li.querySelector(".btn-outline-success").onclick = () => li.classList.toggle("text-decoration-line-through");
    li.querySelector(".btn-outline-danger").onclick = () => {
        li.remove();
        deleteGoal(text);
    };
    goalList.appendChild(li);
}
function saveGoal(text) {
    const goals = JSON.parse(localStorage.getItem("ecoGoals")) || [];
    goals.push(text);
    localStorage.setItem("ecoGoals", JSON.stringify(goals));
}
function deleteGoal(text) {
    let goals = JSON.parse(localStorage.getItem("ecoGoals")) || [];
    goals = goals.filter(goal => goal !== text);
    localStorage.setItem("ecoGoals", JSON.stringify(goals));
}
window.addEventListener("DOMContentLoaded", loadGoals);

// Product Filter
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.btn-group button').forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            document.querySelectorAll('.product-card').forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
});


// Water Usage Calculator
document.getElementById("waterForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const shower = parseInt(document.getElementById("shower").value) || 0;
    const flush = parseInt(document.getElementById("flush").value) || 0;
    const handwash = parseInt(document.getElementById("handwash").value) || 0;
    const total = shower * 50 + flush * 6 + handwash * 2;
    document.getElementById("waterResult").innerHTML =
        `<div class="alert alert-primary mt-2">আপনার আনুমানিক দৈনিক পানি ব্যবহারের পরিমাণ: ${total} লিটার।</div>`;
});

// Theme Toggle
document.addEventListener("DOMContentLoaded", function () {
    const toggleBtn = document.getElementById("themeToggle");
    const icon = toggleBtn.querySelector("i");

    toggleBtn.addEventListener("click", function () {
        document.body.classList.toggle("dark-theme");
        if (document.body.classList.contains("dark-theme")) {
            icon.classList.remove("fa-moon");
            icon.classList.add("fa-sun");
        } else {
            icon.classList.remove("fa-sun");
            icon.classList.add("fa-moon");
        }
    });
});


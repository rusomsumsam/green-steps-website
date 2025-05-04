// Toggle hamburger menu
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const closeMenu = document.getElementById('closeMenu');

hamburger.addEventListener('click', () => {
    mobileMenu.style.transform = 'translateX(0)';
});

closeMenu.addEventListener('click', () => {
    mobileMenu.style.transform = 'translateX(100%)';
});


document.addEventListener("DOMContentLoaded", () => {
    // ✅ Populate tips with card design
    const tips = [
        "Turn off lights when not in use.",
        "Use a reusable water bottle.",
        "Carry a cloth bag while shopping.",
        "Compost food scraps.",
        "Use public transport more often."
    ];

    const tipsList = document.getElementById("tips-list");
    tips.forEach(tip => {
        const card = document.createElement("div");
        card.className = "bg-green-50 border border-green-200 rounded-lg p-4 shadow hover:shadow-md transition";

        card.innerHTML = `
            <div class="flex items-start gap-3">
            <i class="fas fa-leaf text-green-500 text-xl mt-1"></i>
            <p class="text-gray-800">${tip}</p>
            </div>
        `;
        tipsList.appendChild(card);
    });

    // Carbon footprint calculation
    document.getElementById("footprint-form").addEventListener("submit", function (e) {
        e.preventDefault();
        const km = parseFloat(document.getElementById("km").value);
        const flights = parseInt(document.getElementById("flights").value);

        const footprint = (km * 0.12) + (flights * 250);
        document.getElementById("result").textContent = `🌍 Estimated Annual Carbon Footprint: ${footprint.toFixed(2)} kg CO₂`;
    });


    // Theme toggle
    const themeToggle = document.getElementById("themeToggle");
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("bg-gray-900");
        document.body.classList.toggle("text-black");
        themeToggle.innerHTML = document.body.classList.contains("bg-gray-900")
            ? '<i class="fas fa-sun"></i>'
            : '<i class="fas fa-moon"></i>';
    });
});

// Quiz logic
function checkAnswer() {
    const answer = document.getElementById("quiz-answer").value;
    const result = document.getElementById("quiz-result");

    if (answer === "bike") {
        result.textContent = "🎉 Correct! Bicycle is the most eco-friendly.";
        result.className = "mt-4 text-green-700 font-semibold";
    } else if (answer === "") {
        result.textContent = "⚠️ Please select an answer first.";
        result.className = "mt-4 text-yellow-600 font-semibold";
    } else {
        result.textContent = "❌ Not quite. Try again!";
        result.className = "mt-4 text-red-600 font-semibold";
    }
}


// Goal Tracker logic
document.getElementById('goal-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const input = document.getElementById('goal-input');
    const goalText = input.value.trim();

    if (goalText) {
        const list = document.getElementById('goal-list');

        const li = document.createElement('li');
        li.className = "bg-white border border-green-200 p-3 rounded-lg shadow flex items-start gap-2";
        li.innerHTML = `<i class="fas fa-leaf text-green-500 mt-1"></i><span class="text-gray-800">${goalText}</span>`;

        list.appendChild(li);
        input.value = '';
    }
});


// Products and filter
    const products = [
    {
        name: "Reusable Bamboo Cutlery",
    type: "reusable",
    description: "Eco-friendly alternative to plastic cutlery.",
    image: "img/bamboo.png"
    },
    {
        name: "Organic Cotton Tote Bag",
    type: "organic",
    description: "Stylish and sustainable shopping solution.",
    image: "img/tote.png"
    },
    ];

    function renderProducts(filter = 'all') {
    const container = document.getElementById('product-list');
    container.innerHTML = '';
    const filtered = filter === 'all' ? products : products.filter(p => p.type === filter);

    filtered.forEach((product, index) => {
      const card = document.createElement('div');
    card.className = "bg-white border border-green-200 rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col justify-between";

    card.innerHTML = `
    <img src="${product.image}" alt="${product.name}" onclick="openModal(${index})" class="cursor-pointer w-full h-40 object-cover rounded-md mb-3 hover:scale-105 transition">
        <h3 class="text-lg font-semibold text-green-800 mb-1">${product.name}</h3>
        <p class="text-sm text-gray-600 mb-2">${product.description}</p>
        <span class="inline-block bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full capitalize mb-3">${product.type}</span>
        <button onclick="addToCart('${product.name}')" class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Add to Cart</button>
        `;
        container.appendChild(card);
    });
  }

        function addToCart(productName) {
            alert(`✅ "${productName}" added to cart!`);
  }

        function openModal(index) {
    const product = products[index];
        document.getElementById('modal-img').src = product.image;
        document.getElementById('modal-name').textContent = product.name;
        document.getElementById('modal-desc').textContent = product.description;
        document.getElementById('product-modal').classList.remove('hidden');
  }

        function closeModal() {
            document.getElementById('product-modal').classList.add('hidden');
  }

  document.getElementById('filter').addEventListener('change', (e) => {
            renderProducts(e.target.value);
  });

  window.onload = () => renderProducts();



// গাছ লাগানোর কাউন্টার লজিক
// JavaScript for updating total trees planted
document.getElementById('tree-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form from refreshing the page

    // Get the number of trees planted from the input
    const treesPlanted = document.getElementById('trees-planted').value;

    // Get the current total number of trees
    const currentTotal = parseInt(document.getElementById('total-trees').innerText.replace('মোট গাছ লাগানো: ', ''));

    // Update the total trees planted
    const newTotal = currentTotal + parseInt(treesPlanted);

    // Update the displayed text
    document.getElementById('total-trees').innerText = `মোট গাছ লাগানো: ${newTotal}`;

    // Clear the input field after submission
    document.getElementById('trees-planted').value = '';
});


// পানি ব্যবহারের ক্যালকুলেটর লজিক
document.getElementById('water-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form from submitting and refreshing the page

    // Get the values from the form inputs
    const showerTime = parseInt(document.getElementById('shower-time').value);
    const toiletFlushes = parseInt(document.getElementById('toilet-flushes').value);

    // Water usage calculations (using rough estimates)
    // 1 minute of shower uses approx. 5 liters of water
    // 1 toilet flush uses approx. 6 liters of water
    const waterUsage = (showerTime * 5) + (toiletFlushes * 6);

    // Display the result to the user
    document.getElementById('water-result').innerText = `আপনি প্রতিদিন মোট ${waterUsage} লিটার পানি ব্যবহার করছেন।`;

    // Clear the input fields after submission
    document.getElementById('shower-time').value = '';
    document.getElementById('toilet-flushes').value = '';
});


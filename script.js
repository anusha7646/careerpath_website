
// Career information
const careers = {
    frontend: {
        title: "Frontend Developer",
        description: "Build the parts of websites that users see and interact with.",
        skills: "HTML, CSS, JavaScript, responsive design, React.js, Git"
    },
    python: {
        title: "Python Developer",
        description: "Develop applications, automate tasks, and work with data.",
        skills: "Python, SQL, APIs, problem-solving, debugging"
    },
    java: {
        title: "Java Developer",
        description: "Create software applications using Java.",
        skills: "Java, object-oriented programming, SQL, data structures"
    },
    data: {
        title: "Data Analyst",
        description: "Analyze information and identify useful patterns.",
        skills: "SQL, Excel, data visualization, statistics"
    },
    design: {
        title: "UI/UX Designer",
        description: "Design useful, attractive, and user-friendly interfaces.",
        skills: "Figma, wireframes, prototyping, design principles"
    },
    security: {
        title: "Cybersecurity Analyst",
        description: "Help protect systems, networks, and information.",
        skills: "Networking, security fundamentals, Linux, risk awareness"
    }
};

// Footer year
document.getElementById("year").textContent =
    new Date().getFullYear();

// Mobile navigation
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

menuToggle.addEventListener("click", function () {
    const isOpen = navMenu.classList.toggle("show");

    menuToggle.setAttribute("aria-expanded", isOpen);
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );

    menuToggle.textContent = isOpen ? "✕" : "☰";
});

// Close menu when a navigation link is clicked
navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
        navMenu.classList.remove("show");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
        menuToggle.textContent = "☰";
    });
});

// Highlight the currently viewed section
const sections = document.querySelectorAll("main section[id]");

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            navLinks.forEach(function (link) {
                const isActive =
                    link.getAttribute("href") === "#" + entry.target.id;

                link.classList.toggle("active", isActive);
            });
        }
    });
}, {
    rootMargin: "-20% 0px -60% 0px"
});

sections.forEach(function (section) {
    observer.observe(section);
});

// Career card details
const careerButtons = document.querySelectorAll(".learn-btn");
const detailsBox = document.getElementById("career-details");

careerButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const career = careers[button.dataset.career];

        if (!career) return;

        document.getElementById("detail-title").textContent =
            career.title;

        document.getElementById("detail-description").textContent =
            career.description;

        document.getElementById("detail-skills").textContent =
            "Skills to learn: " + career.skills;

        detailsBox.classList.remove("hidden");

        detailsBox.scrollIntoView({
            behavior: "smooth",
            block: "nearest"
        });
    });
});

// Close career details
document.getElementById("close-details").addEventListener(
    "click",
    function () {
        detailsBox.classList.add("hidden");
    }
);

// Career quiz
const careerForm = document.getElementById("career-form");
const resultBox = document.getElementById("quiz-result");

careerForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(careerForm);

    const answers = [
        formData.get("interest"),
        formData.get("activity"),
        formData.get("learning")
    ];

    if (answers.some(function (answer) {
        return !answer;
    })) {
        alert("Please answer all three questions.");
        return;
    }

    // Calculate each career's score
    const scores = {};

    answers.forEach(function (answer) {
        scores[answer] = (scores[answer] || 0) + 1;
    });

    const highestScore = Math.max(...Object.values(scores));

    const topCareers = Object.keys(scores).filter(function (key) {
        return scores[key] === highestScore;
    });

    // Choose the first highest-scoring career
    const recommendedKey = topCareers[0];
    const recommendedCareer = careers[recommendedKey];

    document.getElementById("result-title").textContent =
        "Your Suggested Career: " + recommendedCareer.title;

    document.getElementById("result-description").textContent =
        recommendedCareer.description;

    document.getElementById("result-skills").textContent =
        "Skills to focus on: " + recommendedCareer.skills;

    resultBox.classList.remove("hidden");

    resultBox.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
    });
});

// Reset quiz result when the form is reset
careerForm.addEventListener("reset", function () {
    resultBox.classList.add("hidden");
});

// Change these values to control which projects the display script renders.
// Use the exact technology spelling, or "all" to show every project.
const showOnly = "all";

// An empty query disables search. Try "js" to search titles, descriptions, and technologies.
const query = "";

const portfolio = {
    owner: {
        name: "Victor Ezike",
        title: "Frontend Development Student",
        email: "your.email@example.com",
        location: "Add your city",
        bio: "I am a frontend development student building data-driven web experiences with HTML, CSS, and JavaScript. This portfolio features class projects and the concepts I am learning."
    },

    skillCategories: {
        Frontend: ["HTML5", "CSS3", "Responsive Layouts", "JavaScript Fundamentals"],
        "JavaScript Concepts": ["Objects and Arrays", "Template Literals", "Indexed for Loops", "DOM Events"]
    },

    projects: [
        {
            title: "JS Portfolio Builder",
            description: "A data-driven portfolio that stores its content in JavaScript objects and renders the page with template literals and indexed loops.",
            technologies: ["HTML", "CSS", "JavaScript", "Vanilla JS", "Objects & Arrays"],
            completionDate: "2026-10-05",
            featured: true
        },
        {
            title: "Interactive Portfolio",
            description: "A responsive portfolio with project filtering, tag search, a saved theme, skill animations, form validation, and project details.",
            technologies: ["HTML", "CSS", "JavaScript", "DOM Events"],
            completionDate: "2026-10-04",
            featured: true
        }
    ],

    availability: {
        freelance: false,
        fullTime: false,
        partTime: false
    }
};

// Tier 2 extension: category names stay separate because this project uses indexed loops.
const categoryNames = ["Frontend", "JavaScript Concepts"];

console.log("=== PORTFOLIO DATA EXPLORER ===");
console.log("Full portfolio object:", portfolio);
console.log("Owner:", portfolio.owner.name);
console.log("First project:", portfolio.projects[0]);

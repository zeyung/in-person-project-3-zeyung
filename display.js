// Generate the header and introduction from the portfolio object.
let headerHTML = `
    <header>
        <p class="eyebrow">Portfolio</p>
        <h1>${portfolio.owner.name}</h1>
        <p class="tagline">${portfolio.owner.title}</p>
        <p class="location">📍 ${portfolio.owner.location}</p>
    </header>
`;
document.write(headerHTML);

let aboutHTML = `
    <section id="about">
        <h2>About Me</h2>
        <p>${portfolio.owner.bio}</p>
        <p class="contact-detail">Email: <a href="mailto:${portfolio.owner.email}">${portfolio.owner.email}</a></p>
    </section>
`;
document.write(aboutHTML);

// Tier 2 extension: group skills by category with indexed loops and bracket notation.
let skillsHTML = '<section id="skills"><h2>Skills &amp; Concepts</h2><div class="skill-groups">';
let skillCount = 0;

for (let i = 0; i < categoryNames.length; i++) {
    let category = categoryNames[i];
    skillsHTML = skillsHTML + `<div class="skill-group"><h3>${category}</h3><ul class="skills-list">`;

    let categorySkills = portfolio.skillCategories[category];
    for (let j = 0; j < categorySkills.length; j++) {
        skillsHTML = skillsHTML + `<li>${categorySkills[j]}</li>`;
        skillCount++;
    }

    skillsHTML = skillsHTML + '</ul></div>';
}

skillsHTML = skillsHTML + '</div></section>';
document.write(skillsHTML);

// Render project cards. showOnly and query are independent display settings.
let projectsHTML = '<section id="projects"><h2>Projects</h2><div class="projects-grid">';
let renderedProjects = 0;

for (let i = 0; i < portfolio.projects.length; i++) {
    let project = portfolio.projects[i];

    // Tier 1 extension: match every technology so a later tag can qualify a project.
    let technologyMatches = false;
    for (let t = 0; t < project.technologies.length; t++) {
        if (project.technologies[t] === showOnly) {
            technologyMatches = true;
        }
    }
    let passesTechnology = showOnly === "all" || technologyMatches;

    // Tier 3 extension: check title, description, and each technology without regex.
    let titleLower = project.title.toLowerCase();
    let descriptionLower = project.description.toLowerCase();
    let queryLower = query.toLowerCase();
    let titleMatches = query !== "" && titleLower.includes(queryLower);
    let descriptionMatches = query !== "" && descriptionLower.includes(queryLower);
    let technologyQueryMatches = false;

    if (query !== "") {
        for (let t = 0; t < project.technologies.length; t++) {
            if (project.technologies[t].toLowerCase().includes(queryLower)) {
                technologyQueryMatches = true;
            }
        }
    }

    let passesSearch = query === "" || titleMatches || descriptionMatches || technologyQueryMatches;

    if (passesTechnology && passesSearch) {
        let titleHTML = project.title;
        if (query !== "") {
            let titleIndex = titleLower.indexOf(queryLower);
            if (titleIndex !== -1) {
                let beforeMatch = project.title.slice(0, titleIndex);
                let matchingText = project.title.slice(titleIndex, titleIndex + query.length);
                let afterMatch = project.title.slice(titleIndex + query.length);
                titleHTML = `${beforeMatch}<mark>${matchingText}</mark>${afterMatch}`;
            }
        }

        // Tier 2 extension: render each technology as its own tag.
        let tagsHTML = "";
        for (let j = 0; j < project.technologies.length; j++) {
            tagsHTML = tagsHTML + `<span class="tag">${project.technologies[j]}</span>`;
        }

        let featuredLabel = project.featured ? '<span class="featured-label">Featured</span>' : '';
        projectsHTML = projectsHTML + `
            <article class="project-card">
                ${featuredLabel}
                <h3>${titleHTML}</h3>
                <p>${project.description}</p>
                <div class="project-tags">${tagsHTML}</div>
                <p class="date">Completed: ${project.completionDate}</p>
            </article>
        `;
        renderedProjects++;
    }
}

if (renderedProjects === 0) {
    projectsHTML = projectsHTML + '<p class="empty-state">No projects match these settings. Update showOnly or query in data.js.</p>';
}
projectsHTML = projectsHTML + '</div></section>';
document.write(projectsHTML);

// Tier 2 extension: count technologies across ALL projects, independent of showOnly/query.
let techNames = [];
let techCounts = [];

for (let i = 0; i < portfolio.projects.length; i++) {
    let project = portfolio.projects[i];
    for (let j = 0; j < project.technologies.length; j++) {
        let technology = project.technologies[j];
        let foundIndex = -1;

        for (let k = 0; k < techNames.length; k++) {
            if (techNames[k] === technology) {
                foundIndex = k;
            }
        }

        if (foundIndex === -1) {
            techNames.push(technology);
            techCounts.push(1);
        } else {
            techCounts[foundIndex] = techCounts[foundIndex] + 1;
        }
    }
}

let technologySummaryHTML = '<section class="technology-summary"><h2>Technology Usage</h2><ul>';
for (let i = 0; i < techNames.length; i++) {
    technologySummaryHTML = technologySummaryHTML + `<li>${techCounts[i]} projects use ${techNames[i]}</li>`;
}
technologySummaryHTML = technologySummaryHTML + '</ul></section>';
document.write(technologySummaryHTML);

// Phase 4: inspect summary data and print featured projects.
console.log("Portfolio Summary:");
console.log(`${portfolio.owner.name} has ${skillCount} skills and ${portfolio.projects.length} projects.`);

for (let i = 0; i < portfolio.projects.length; i++) {
    if (portfolio.projects[i].featured === true) {
        console.log("⭐ Featured:", portfolio.projects[i].title);
    }
}

// Tier 1 extension: find the newest project without relying on array order.
let latestTitle = portfolio.projects[0].title;
let latestDate = portfolio.projects[0].completionDate;
for (let i = 1; i < portfolio.projects.length; i++) {
    if (portfolio.projects[i].completionDate > latestDate) {
        latestTitle = portfolio.projects[i].title;
        latestDate = portfolio.projects[i].completionDate;
    }
}
console.log("Most recent project: " + latestTitle);

// Phase 4: serialize the data for inspection in DevTools.
let dataAsJSON = JSON.stringify(portfolio, null, 2);
console.log("Portfolio data as JSON:", dataAsJSON);

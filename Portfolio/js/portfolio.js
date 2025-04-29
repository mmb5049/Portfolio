document.addEventListener("DOMContentLoaded", function () {
    // Select all navbar links
    const navbarLinks = document.querySelectorAll('.navbar a');

    // Map each navbar link to its corresponding section
    const sectionMap = {};
    navbarLinks.forEach(link => {
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            sectionMap[targetId] = targetSection;
        }
    });

    // Add event listener for clicks
    navbarLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            // Prevent default behavior
            event.preventDefault();

            // Remove 'active' class from all navbar links
            navbarLinks.forEach(nav => nav.classList.remove('active'));

            // Add 'active' class to the clicked link
            this.classList.add('active');

            // Scroll to the section
            const targetId = this.getAttribute("href");
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: "smooth"
                });
            }
        });
    });

    // Function to set the active link based on scroll position
    function setActiveLink() {
        let activeLink = null;

        // Check which section is currently in the viewport
        Object.keys(sectionMap).forEach(id => {
            const section = sectionMap[id];
            const bounding = section.getBoundingClientRect();

            // Section is considered "active" when at least part of it is visible
            if (bounding.top < window.innerHeight / 2 && bounding.bottom > window.innerHeight / 2) {
                activeLink = id;
            }
        });

        // Update the navbar links
        navbarLinks.forEach(link => {
            if (link.getAttribute('href') === activeLink) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // Use IntersectionObserver for better performance
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            const targetId = `#${entry.target.id}`;
            const link = document.querySelector(`.navbar a[href="${targetId}"]`);

            if (entry.isIntersecting) {
                navbarLinks.forEach(nav => nav.classList.remove('active'));
                if (link) link.classList.add('active');
            }
        });
    }, {
        threshold: 0.8 // Trigger when 50% of the section is in view
    });

    // Observe each section
    Object.values(sectionMap).forEach(section => {
        observer.observe(section);
    });
});

document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault();
    alert("Thank you for your message! I will get back to you soon.");
    this.reset();
});
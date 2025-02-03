/*!
* Start Bootstrap - Freelancer v7.0.7 (https://startbootstrap.com/theme/freelancer)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-freelancer/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});

let cachedProjects = null

const loadModal = (category, data, elementId) => {
    const projectItem = document.querySelector(`#${elementId}`);
    projectItem.innerHTML = ""; // Clear previous content
    data.forEach(item => {
        if (!item || !item.name || !item.description) {
            console.error("Invalid data item:", item);
            return;
        }
        const listItem = document.createElement("li");
        try {
            listItem.classList.add("list-group-item", "list-group-item-action");
            listItem.innerHTML = `<strong>${item.name}</strong>: ${item.description}`;
            listItem.style.cursor = "pointer";
            listItem.onclick = () => {
                window.open(item.url, "_blank");
            };
            projectItem.appendChild(listItem);
        } catch (error) {
            console.error("Error creating list item:", error);
        }
    });
};


const fetchProjects = async () => {
    try {
        const response = await fetch("portfolio/json/projects.json");
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        cachedProjects = await response.json();
    } catch (error) {
        console.error("Error fetching projects:", error);
    }
};

const onModalShow = (event) => {
    if (!cachedProjects) return;

    const modalId = event.relatedTarget.getAttribute("data-bs-target").substring(1); // Get modal ID
    if (modalId === "javaPortfolioModal") {
        loadModal("Java", cachedProjects.java, "javaProjects");
    } else if (modalId === "goPortfolioModal") {
        loadModal("Go", cachedProjects.go, "goProjects");
    }
};

document.querySelectorAll(".portfolio-modal").forEach((modal) => {
    modal.addEventListener("show.bs.modal", onModalShow);
});


fetchProjects().then((r) => {

} )

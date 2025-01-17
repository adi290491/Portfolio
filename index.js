// script.js

document.addEventListener('DOMContentLoaded', () => {
    // Load profile picture
    const profilePic = document.querySelector('#profile-pic');
    profilePic.src = 'assets/img/profile.jpg';

    fetch('./json/aboutme.json')
        .then(response => response.json())
        .then(data => {
            const aboutMeSection = document.getElementById("summary")
            const paragraphs = data["aboutMe"].split('\n\n')
            console.log(paragraphs)
            paragraphs.forEach(paragraph => {
                const pEl = document.createElement('p');
                pEl.classList.add('lead')
                pEl.textContent = paragraph.toString();
                aboutMeSection.append(pEl)
            })
            // aboutMeSection.innerHTML = paragraphs;

            const expertiseSection = document.querySelector('#expertise');
            expertiseSection.innerHTML = data.expertise

            const skills = document.querySelector('#technicalSkills');
            let content = ""
            console.log(data.skills)
            for (const [key, value] of Object.entries(data.skills)) {
                console.log(key, ":", value)
                content += `<strong>${key.toUpperCase()}:</strong> ${value}<br/>`;
            }
            skills.innerHTML = content

            const linkedin = document.querySelector('.linkedin')
            linkedin.href = data["linkedin"]
            const github = document.querySelector('.github')
            github.href = data["github"]

        })

    // Load education and experience from JSON
    fetch('./json/education.json')
        .then(response => response.json())
        .then(data => {
            const educationSection = document.querySelector('#education');

            const eduList = document.querySelector('#eduList');
            data.forEach(item => {
                let content = `
                    <div class="row">
                        <div class="col-2"><img src="${item.logo}" alt="logo" class="education-logo"/></div>
                        <div class="col-7">
                            <div class = "row">
                                <h4>${item.institute}</h4>
                            </div>
                            <div class = "row">
                                <p>${item.degree}</p>
                            </div>
                        </div>
                        <div class="col-2 justify-content-end">
                            <p>${item.duration}</p>
                        </div>
                    </div>
                `
                const eduItem = document.createElement('div');
                eduItem.classList.add('list-group-item');
                eduItem.innerHTML = content
                eduList.appendChild(eduItem);
            });

        });
});

//! Dark/Light Mode
let elModeBtn = document.querySelector(".mode-btn");
let elModeIcon = document.querySelector(".mode-icon");

elModeBtn.addEventListener("click", function() {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
        localStorage.theme = 'light';
        elModeIcon.src = "../img/moon-dark-icon.svg";
    } else {
        document.documentElement.classList.remove('dark');
        localStorage.theme = 'dark';
        elModeIcon.src = "../img/moon-light-icon.svg";
    }
    
    
})
localStorage.removeItem('theme')


// Function to extract URL parameters
function getUrlParameter(name) {
    name = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
    let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    let results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// Function to display country details
function displayCountryDetails() {
    const flag = getUrlParameter('flag');
    const fullName = getUrlParameter('fullName');
    const currency = getUrlParameter('currency');
    const capital = getUrlParameter('capital');
    const language = getUrlParameter('language');
    const region = getUrlParameter('region');

    const countryDetailsContainer = document.getElementById('country-details');
    countryDetailsContainer.innerHTML = `
        <img class="mx-4" src="${flag}" alt="Flag">
        <p><b>Full Name:</b> ${fullName}</p>
        
        <p><b>Capital:</b> ${capital}</p>
        <p><b>Language:</b> ${language}</p>
        <p><b>Region:</b> ${region}</p>
    `;
}

// Call the function to display country details when the page loads
displayCountryDetails();
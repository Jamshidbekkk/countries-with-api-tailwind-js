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


//! Fetching countries info function
async function fetchCountryData() {
    try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching country data:', error);
    }
}

async function renderCountryData() {
    const countriesList = document.getElementById('countries-list');
    countriesList.innerHTML = ''; 
    
    const countryData = await fetchCountryData();
    if (countryData) {
        countryData.slice(0, 16).forEach(country => {
            const countryElement = createCountryElement(country);
            countriesList.insertAdjacentHTML('beforeend', countryElement);
        });
    }
}

renderCountryData();

function createCountryElement(country) {
    const { flags, name, population, region, capital } = country;
    return `
    <li class="shadow-sm rounded-[5px] overflow-hidden dark:bg-[#2B3844]" onclick="handleCountryClick('${name.common}')">
        <img class="w-full h-150 " src="${flags.png}" >
        <div class="pt-6 pb-[46px] ps-[26px]">
            <h3 class="text-[#111517] text-lg font-extrabold mb-4 cursor-pointer dark:text-white">${name.common}</h3>
            <p class="mb-2 dark:text-white"><b>Population:</b> ${population.toLocaleString()}</p>
            <p class="mb-2 dark:text-white"><b>Region:</b> ${region}</p>
            <p class="dark:text-white"><b>Capital:</b> ${capital}</p>
        </div>
    </li>
    `;
}


//! Function for searching for a country via search input

    async function fetchCountryDatas(searchQuery) {
        try {
            const response = await fetch(`https://restcountries.com/v3.1/name/${searchQuery}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching country data:', error);
        }
    }

    async function renderCountryDatas() {
        const searchInput = document.getElementById('searchInput');
        const countriesList = document.getElementById('countries-list');
        const countryInfoSection = document.getElementById('countryInfoSection');

        const searchQuery = searchInput.value.trim();
        if (searchQuery === '') {
            countriesList.innerHTML = ''; 
            return;
        }

        const countryData = await fetchCountryDatas(searchQuery);
        if (countryData) {
            countriesList.innerHTML = '';

            if (countryData.length === 0) {
                countriesList.innerHTML = '<li>No results found</li>';
                return;
            }

            countryData.forEach(country => {
                const { flags, name, population, region, capital } = country;
                const countryElement = `
                    <li class="shadow-sm rounded-[5px] overflow-hidden dark:bg-[#2B3844]" onclick="handleCountryClick('${name.common}')">
                        <img class="w-full h-150" src="${flags.png}">
                        <div class="pt-6 pb-[46px] ps-[26px]">
                            <h3 class="text-[#111517] text-lg font-extrabold mb-4 cursor-pointer dark:text-white">${name.common}</h3>
                            <p class="mb-2 dark:text-white"><b>Population:</b> ${population.toLocaleString()}</p>
                            <p class="mb-2 dark:text-white"><b>Region:</b> ${region}</p>
                            <p class="dark:text-white"><b>Capital:</b> ${capital}</p>
                        </div>
                    </li>
                `;
                countriesList.insertAdjacentHTML('beforeend', countryElement);
            });

            countryInfoSection.scrollIntoView({ behavior: 'smooth' });
        }
    }

    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', renderCountryDatas);




//! Detailed info of the selected country function

// Function to handle click on country element and fetch detailed country information
async function handleCountryClick(country) {
    try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${country}`);
        console.log(response);
        const [countryDetails] = await response.json();

        const flag = countryDetails.flags.png;
        const fullName = countryDetails.name.common;
        const capital = countryDetails.capital ? countryDetails.capital[0] : "N/A";
        const language = countryDetails.languages ? countryDetails.languages[Object.keys(countryDetails.languages)[0]] : "N/A";
        const region = countryDetails.region;

        window.location.href = `country-details.html?flag=${flag}&fullName=${fullName}&capital=${capital}&language=${language}&region=${region}`;
    } catch (error) {
        console.error('Error fetching or processing country details:', error);
    }
}




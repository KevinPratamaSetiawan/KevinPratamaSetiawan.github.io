const toggleButton = document.getElementById('mode-btn');
const toggleButtonLogo = document.getElementById('mode-icon');
const logo = document.getElementById('mode-logo');

document.addEventListener('DOMContentLoaded', () => {
    const applyMode = () => {
        const savedMode = localStorage.getItem('currentMode');
        const headerFontFamily = localStorage.getItem('currentHeaderFont');
        const textFontFamily = localStorage.getItem('currentTextFont');

        if(headerFontFamily){
            if(document.getElementById('themePopover')){
                document.getElementById('heading-display').innerHTML = 'Heading: ' + headerFontFamily;
                document.getElementById('text-display').innerHTML = 'Normal Text: ' + textFontFamily;
            }
            
            localStorage.setItem('currentHeaderFont', headerFontFamily);
            localStorage.setItem('currentTextFont', textFontFamily);
        }else{
            localStorage.setItem('currentHeaderFont', '"Lato", "Helvetica Neue", Helvetica, sans-serif');
            localStorage.setItem('currentTextFont', "JetBrains Mono, monospace");
        }

        if (savedMode){
            changeMode(savedMode);
        }else {
            localStorage.setItem('currentMode', 'light');

            // Save Default Light Mode
            localStorage.setItem('currentLightTheme', 'lightClassic');
            localStorage.setItem('currentLightBgColor', '#fdfdfd');
            localStorage.setItem('currentLightBgColorHsl', '253,253,253');
            localStorage.setItem('currentLightTextColor', '#23272d');
            localStorage.setItem('currentLightAccentColor', '#60c17d');

            // Save Default Dark Mode
            localStorage.setItem('currentDarkTheme', 'darkClassic');
            localStorage.setItem('currentDarkBgColor', '#23272d');
            localStorage.setItem('currentDarkBgColorHsl', '253,253,253');
            localStorage.setItem('currentDarkTextColor', '#fdfdfd');
            localStorage.setItem('currentDarkAccentColor', '#c16560');
        }
    };

    applyMode();
    createThemeItem();

    toggleButton.addEventListener('click', () => {
        let savedMode = localStorage.getItem('currentMode');

        if (!savedMode){
            savedMode = 'light';
        }

        let modes = ['light', 'dark'];
        let currentIndex = modes.indexOf(savedMode);

        savedMode = modes[(currentIndex + 1) % modes.length];
    
        changeMode(savedMode);

        localStorage.setItem('currentMode', savedMode);
    });
});

const accentButton = document.getElementById('accent-btn');

accentButton.addEventListener('click', () => {
    const savedMode = localStorage.getItem('currentMode');
    let currentIndex, randomIndex, newColor;
    let lightThemes = ['lightClassic', 'lightDarkYellow', 'lightSummerX'];
    let darkThemes = ['darkClassic', 'darkPurple', 'darkCoffee', 'darkSummerX', 'darkMint', 'darkOriental1', 'darkOriental2'];

    if(savedMode === 'light'){
        if(lightThemes.indexOf(localStorage.getItem('currentLightTheme')) === -1){
            currentIndex = 0;
        }else{
            currentIndex = lightThemes.indexOf(localStorage.getItem('currentLightTheme')) || 0;
        }
    }else if(savedMode === 'dark'){
        if(darkThemes.indexOf(localStorage.getItem('currentDarkTheme')) === -1){
            currentIndex = 0;
        }else{
            currentIndex = darkThemes.indexOf(localStorage.getItem('currentDarkTheme')) || 0;
        }
    }

    const lightColors = [
        [
        '#60c17d', '#e7ab2a', '#A8D672', '#ddd05b',
        '#00CED1', '#FFD700', '#7FFF00', '#FADFA1',
        '#fefb7d'
        ],[
        '#e0c12a', '#5ce653', '#91b3a3', '#6edbaa',
        '#74d196', '#7af83e'
        ]
    ];

    const darkColors = [
        [
        '#60c17d', '#336699', '#e7ab2a', '#2cb67d',
        '#A8D672', '#339988', '#ddd05b', '#00CED1',
        '#FFD700', '#7FFF00', '#FADFA1', '#7EACB5',
        '#c16560', '#7ee0b8', '#99b7cb', '#cadeeb',
        '#eb99b0', '#fcc342', '#f9f59f', '#fdbb9f',
        '#fefb7d'
        ],[
        '#3be879', '#28bed8', '#ac9e7d', '#d7dc3f',
        '#f78233'
        ],[
        '#e2d689', '#dad09e', '#f6e275', '#d5cca5'
        ]
    ];

    if(savedMode === 'light'){
        if(lightColors.length >= currentIndex + 1){
            randomIndex = Math.floor(Math.random() * lightColors[currentIndex].length);
            newColor = lightColors[currentIndex][randomIndex];
            // console.log(lightColors[currentIndex][randomIndex]);
        }else{
            newColor = localStorage.getItem('currentLightAccentColor');
        }
    }else if(savedMode === 'dark'){
        if(darkColors.length >= currentIndex + 1){
            randomIndex = Math.floor(Math.random() * darkColors[currentIndex].length);
            newColor = darkColors[currentIndex][randomIndex];
            // console.log(darkColors[currentIndex][randomIndex]);
        }else{
            newColor = localStorage.getItem('currentDarkAccentColor');
        }
    }

    document.documentElement.style.setProperty('--brand-color', newColor);

    if (savedMode === 'light'){
        localStorage.setItem('currentLightAccentColor', newColor);
    }else if (savedMode === 'dark'){
        localStorage.setItem('currentDarkAccentColor', newColor);
    }
});


function changeMode (savedMode) {
    if (savedMode === 'light') {
        if(toggleButtonLogo){
            toggleButtonLogo.classList.add('fa-sun')
            toggleButtonLogo.classList.remove('fa-moon')
        }
        logo.src = '/black-logo.png';

        const bgColor = localStorage.getItem('currentLightBgColor');
        const bgColorHsl = localStorage.getItem('currentLightBgColorHsl');
        const textColor = localStorage.getItem('currentLightTextColor');
        const accentColor = localStorage.getItem('currentLightAccentColor');

        document.documentElement.style.setProperty('--background-color', bgColor);
        document.documentElement.style.setProperty('--background-color-rgba', bgColorHsl);
        document.documentElement.style.setProperty('--text-color', textColor);
        document.documentElement.style.setProperty('--brand-color', accentColor);
    }else if (savedMode === 'dark') {
        if(toggleButtonLogo){
            toggleButtonLogo.classList.add('fa-moon')
            toggleButtonLogo.classList.remove('fa-sun')
        }
        logo.src = '/white-logo.png';
        
        const bgColor = localStorage.getItem('currentDarkBgColor');
        const bgColorHsl = localStorage.getItem('currentDarkBgColorHsl');
        const textColor = localStorage.getItem('currentDarkTextColor');
        const accentColor = localStorage.getItem('currentDarkAccentColor');
        
        document.documentElement.style.setProperty('--background-color', bgColor);
        document.documentElement.style.setProperty('--background-color-rgba', bgColorHsl);
        document.documentElement.style.setProperty('--text-color', textColor);
        document.documentElement.style.setProperty('--brand-color', accentColor);
    }
}

function changeFont(event) {
    const button = event.target;
    let headerFontFamily = button.getAttribute('data-headerFontFamily');
    let textFontFamily = button.getAttribute('data-textFontFamily');

    document.getElementById('heading-display').innerHTML = 'Heading: ' + headerFontFamily;
    document.getElementById('text-display').innerHTML = 'Normal Text: ' + textFontFamily;

    document.documentElement.style.setProperty('--head-font-family', headerFontFamily);
    document.documentElement.style.setProperty('--base-font-family', textFontFamily);

    localStorage.setItem('currentHeaderFont', headerFontFamily);
    localStorage.setItem('currentTextFont', textFontFamily);
}

function changeTheme(event) {
    const button = event.target;
    let mode = button.getAttribute('data-mode');
    let theme = button.getAttribute('data-theme');
    let bgColor = button.getAttribute('data-bgColor');
    let bgColorHsl = button.getAttribute('data-bgColorRgb');
    let textColor = button.getAttribute('data-textColor');
    let accentColor = button.getAttribute('data-accentColor');

    document.getElementById('bg-display-color').style.backgroundColor = bgColor;
    document.getElementById('text-display-color').style.backgroundColor = textColor;
    document.getElementById('accent-display-color').style.backgroundColor = accentColor;

    document.documentElement.style.setProperty('--background-color', bgColor);
    document.documentElement.style.setProperty('--background-color-rgb', bgColor);
    document.documentElement.style.setProperty('--text-color', textColor);
    document.documentElement.style.setProperty('--brand-color', accentColor);

    if (mode === 'light'){
        if(toggleButtonLogo){
            toggleButtonLogo.classList.add('fa-sun')
            toggleButtonLogo.classList.remove('fa-moon')
        }
        logo.src = '/black-logo.png';

        localStorage.setItem('currentMode', mode);
        localStorage.setItem('currentLightTheme', theme);
        localStorage.setItem('currentLightBgColor', bgColor);
        localStorage.setItem('currentLightBgColorHsl', bgColorHsl);
        localStorage.setItem('currentLightTextColor', textColor);
        localStorage.setItem('currentLightAccentColor', accentColor);
    }else if (mode === 'dark'){
        if(toggleButtonLogo){
            toggleButtonLogo.classList.add('fa-moon')
            toggleButtonLogo.classList.remove('fa-sun')
        }
        logo.src = '/white-logo.png';

        localStorage.setItem('currentMode', mode);
        localStorage.setItem('currentDarkTheme', theme);
        localStorage.setItem('currentDarkBgColor', bgColor);
        localStorage.setItem('currentDarkBgColorHsl', bgColorHsl);
        localStorage.setItem('currentDarkTextColor', textColor);
        localStorage.setItem('currentDarkAccentColor', accentColor);
    }
}

function createThemeItem (){
    const fontList =document.getElementById('fontList');
    const headerFont = ['"Lato", "Helvetica Neue", Helvetica, sans-serif', '"Barlow", sans-serif', '"Archivo", sans-serif', '"IBM Plex Sans Condensed", sans-serif', '"Roboto", sans-serif'];
    const bodyFont = ["JetBrains Mono, monospace", "JetBrains Mono, monospace", "JetBrains Mono, monospace", "JetBrains Mono, monospace", "JetBrains Mono, monospace"];
    const fontInnerText = ['Lato; Helvetica, JetBrains', 'Barlow, JetBrains', 'Archivo, JetBrains', 'IBM Plex Sans Condensed, JetBrains', 'Roboto, JetBrains'];

    for(let i=0; i<headerFont.length; i++){
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.classList.add('fontItem');
        a.setAttribute('href', '#');
        a.setAttribute('data-headerFontFamily', headerFont[i]);
        a.setAttribute('data-textFontFamily', bodyFont[i]);
        a.innerText = fontInnerText[i];
        li.appendChild(a);
        fontList.appendChild(li);
        a.addEventListener('click', changeFont);
    }

    const lightModeList =document.getElementById('lightThemeList');
    const lightTheme = ['lightClassic', 'lightDarkYellow', 'lightSummerX'];
    const lightBgColor = ['#fdfdfd', '#fdfcf4', '#fefb7d'];
    const lightTextColor = ['#23272d', '#231f05', '#000000'];
    const lightAccentColor = ['#60c17d', '#e0c12a', '#090b1d'];
    const lightInnerText = ['Light Classic', 'Light Dark Yellow', 'Light SummerX'];

    for(let i=0; i<lightTheme.length; i++){
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.classList.add('themeItem');
        a.setAttribute('href', '#');
        a.setAttribute('data-mode', 'light');
        a.setAttribute('data-theme', lightTheme[i]);
        a.setAttribute('data-bgColor', lightBgColor[i]);
        a.setAttribute('data-bgColorRgb', hexToRgba(lightBgColor[i], 0.5));
        a.setAttribute('data-textColor', lightTextColor[i]);
        a.setAttribute('data-accentColor', lightAccentColor[i]);
        a.innerText = lightInnerText[i];
        li.appendChild(a);
        lightModeList.appendChild(li);
        a.addEventListener('click', changeTheme);
    }

    const darkModeList =document.getElementById('darkThemeList');
    const darkTheme = ['darkClassic', 'darkPurple', 'darkCoffee', 'darkSummerX', 'darkMint', 'darkOriental1', 'darkOriental2'];
    const darkBgColor = ['#23272d', '#16031d', '#0d0c02', '#000000', '#00284C', '#121312', '#0d0d0f'];
    const darkTextColor = ['#fdfdfd', '#f0d6fa', '#faf6db', '#f1faee', '#EDEDED', '#a67d43', '#caa07d'];
    const darkAccentColor = ['#c16560', '#3be879', '#e2d689', '#fefb7d', '#A0E8C5', '#e8d8c9', '#f7ece6'];
    const darkInnerText = ['Dark Classic', 'Dark Purple', 'Dark Coffee', 'Dark SummerX', 'Dark Mint', 'Dark Oriental 1', 'Dark Oriental 2'];

    for(let i=0; i<darkTheme.length; i++){
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.classList.add('themeItem');
        a.setAttribute('href', '#');
        a.setAttribute('data-mode', 'dark');
        a.setAttribute('data-theme', darkTheme[i]);
        a.setAttribute('data-bgColor', darkBgColor[i]);
        a.setAttribute('data-bgColorRgb', hexToRgba(darkBgColor[i], 0.5));
        a.setAttribute('data-textColor', darkTextColor[i]);
        a.setAttribute('data-accentColor', darkAccentColor[i]);
        a.innerText = darkInnerText[i];
        li.appendChild(a);
        darkModeList.appendChild(li);
        a.addEventListener('click', changeTheme);
    }
}

function hexToRgba(hex, alpha = 1) {
    hex = hex.replace(/^#/, '');

    if (hex.length === 3) {
        hex = hex.split('').map(char => char + char).join('');
    }

    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
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
    let darkThemes = ['darkClassic', 'darkPurple', 'darkCoffee', 'darkSummerX'];

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
        document.documentElement.style.setProperty('--background-color-rgb', bgColorHsl);
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
        document.documentElement.style.setProperty('--background-color-rgb', bgColorHsl);
        document.documentElement.style.setProperty('--text-color', textColor);
        document.documentElement.style.setProperty('--brand-color', accentColor);
    }
}

document.querySelectorAll('.fontItem').forEach(function(button) {
  button.addEventListener('click', function() {
      let headerFontFamily = button.getAttribute('data-headerFontFamily');
      let textFontFamily = button.getAttribute('data-textFontFamily');

      document.getElementById('heading-display').innerHTML = 'Heading: ' + headerFontFamily;
      document.getElementById('text-display').innerHTML = 'Normal Text: ' + textFontFamily;

      document.documentElement.style.setProperty('--head-font-family', headerFontFamily);
      document.documentElement.style.setProperty('--base-font-family', textFontFamily);

      localStorage.setItem('currentHeaderFont', headerFontFamily);
      localStorage.setItem('currentTextFont', textFontFamily);
  });
});

document.querySelectorAll('.themeItem').forEach(function(button) {
    button.addEventListener('click', function() {
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
    });
  });
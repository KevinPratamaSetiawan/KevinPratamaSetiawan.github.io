const toggleButton = document.getElementById('mode-btn');
const toggleButtonLogo = document.getElementById('mode-icon');
const logo = document.getElementById('mode-logo');

document.addEventListener('DOMContentLoaded', () => {
    const applyMode = () => {
        const savedMode = localStorage.getItem('currentMode');
        const headerFontFamily = localStorage.getItem('currentHeaderFont');
        const textFontFamily = localStorage.getItem('currentTextFont');

        if(document.getElementById('themePopover')){
            document.getElementById('heading-display').innerHTML = 'Heading: ' + headerFontFamily;
            document.getElementById('text-display').innerHTML = 'Normal Text: ' + textFontFamily;
        }

        localStorage.setItem('currentHeaderFont', headerFontFamily);
        localStorage.setItem('currentTextFont', textFontFamily);

        if (savedMode){
            changeMode(savedMode);
        }else {
            localStorage.setItem('currentMode', 'light');

            // Save Default Light Mode
            localStorage.setItem('currentLightBgColor', '#fdfdfd');
            localStorage.setItem('currentLightBgColorHsl', '253,253,253');
            localStorage.setItem('currentLightTextColor', '#23272d');
            localStorage.setItem('currentLightAccentColor', '#60c17d');

            // Save Default Dark Mode
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
    const colors = [
        '#60c17d', '#c16560', '#336699', '#e7ab2a',
        '#f25f4c', '#2cb67d', '#A8D672', '#339988',
        '#ddd05b', '#FF4500', '#00CED1', '#FFD700',
        '#FF69B4', '#7FFF00', '#C96868', '#FADFA1',
        '#7EACB5', '#697565'
    ];

    const randomIndex = Math.floor(Math.random() * colors.length);

    const newColor = colors[randomIndex];

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
            localStorage.setItem('currentMode', mode);
            localStorage.setItem('currentLightBgColor', bgColor);
            localStorage.setItem('currentLightBgColorHsl', bgColorHsl);
            localStorage.setItem('currentLightTextColor', textColor);
            localStorage.setItem('currentLightAccentColor', accentColor);
        }else if (mode === 'dark'){
            localStorage.setItem('currentMode', mode);
            localStorage.setItem('currentDarkBgColor', bgColor);
            localStorage.setItem('currentDarkBgColorHsl', bgColorHsl);
            localStorage.setItem('currentDarkTextColor', textColor);
            localStorage.setItem('currentDarkAccentColor', accentColor);
        }
    });
  });
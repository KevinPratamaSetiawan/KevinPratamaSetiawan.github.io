const displaySave   = document.getElementById('save-display');
const checkAll      = document.getElementById('saveData0');
const checkTheme    = document.getElementById('saveData1');
const checkTodo     = document.getElementById('saveData2');
const checkYard     = document.getElementById('saveData3');
const checkPremium  = document.getElementById('saveData4');
const checkAdvice   = document.getElementById('saveData5');
const checkHistory  = document.getElementById('saveData6');
const checkSetting  = document.getElementById('saveData7');
let localStorageData = {};

checkAll.addEventListener('change', function() {
    if(checkAll.checked){
        checkTheme.checked = false;
        checkTodo.checked = false;
        checkYard.checked = false;
        checkPremium.checked = false;
        checkAdvice.checked = false;
        checkHistory.checked = false;
        checkSetting.checked = false;
    }

    displayGetLocalStorage();
});

const checkboxes = [checkTheme, checkTodo, checkYard, checkPremium, checkAdvice, checkHistory, checkSetting];

function handleCheckboxChange(checkbox) {
    checkbox.addEventListener('change', function() {
        if (checkbox.checked) {
            checkAll.checked = false;
        }

        displayGetLocalStorage();
    });
}

checkboxes.forEach(handleCheckboxChange);

document.getElementById('save-popover-btn').addEventListener('click', displayGetLocalStorage());
document.getElementById('save-copy').addEventListener('click', function() {
    navigator.clipboard.writeText(JSON.stringify(localStorageData, null, 2));
});

function displayGetLocalStorage (){
    if(checkAll.checked){
        Object.assign(localStorageData, {
            // Save Theme Section
            "currentMode": localStorage.getItem('currentMode'),
            "currentHeaderFont": localStorage.getItem('currentHeaderFont'),
            "currentTextFont": localStorage.getItem('currentTextFont'),
            "currentLightTheme": localStorage.getItem('currentLightTheme'),
            "currentLightBgColor": localStorage.getItem('currentLightBgColor'),
            "currentLightBgColorHsl": localStorage.getItem('currentLightBgColorHsl'),
            "currentLightTextColor": localStorage.getItem('currentLightTextColor'),
            "currentLightAccentColor": localStorage.getItem('currentLightAccentColor'),
            "currentDarkTheme": localStorage.getItem('currentDarkTheme'),
            "currentDarkBgColor": localStorage.getItem('currentDarkBgColor'),
            "currentDarkBgColorHsl": localStorage.getItem('currentDarkBgColorHsl'),
            "currentDarkTextColor": localStorage.getItem('currentDarkTextColor'),
            "currentDarkAccentColor": localStorage.getItem('currentDarkAccentColor'),

            // Save Todo Section
            'todoItems': JSON.parse(localStorage.getItem('todoItems')),

            // Save The Yard Section
            'yard-tab': JSON.parse(localStorage.getItem('yard-tab')),

            // Save The Yard Premium Section
            'premium-tab': JSON.parse(localStorage.getItem('premium-tab')),

            // Save The Yard Advice Show Section
            'advice-tab': JSON.parse(localStorage.getItem('advice-tab')),

            // Save Mp3 History Section
            'yardTabLastPlayed': JSON.parse(localStorage.getItem('yardTabLastPlayed')),
            'premiumTabLastPlayed': JSON.parse(localStorage.getItem('premiumTabLastPlayed')),
            'adviceTabLastPlayed': JSON.parse(localStorage.getItem('adviceTabLastPlayed')),
            'styleTabLastPlayed': JSON.parse(localStorage.getItem('styleTabLastPlayed')),
            'popoutTabLastPlayed': JSON.parse(localStorage.getItem('popoutTabLastPlayed')),

            // Save Mp3 Settings Section
            "currentVolume": localStorage.getItem('currentVolume'),
            "currentAudioMode": localStorage.getItem('currentAudioMode'),
            "currentAudioSpeed": localStorage.getItem('currentAudioSpeed'),
            "currentFrRate": localStorage.getItem('currentFrRate'),
            "currentCoverRate": localStorage.getItem('currentCoverRate'),
            "currentCoverFormat": localStorage.getItem('currentCoverFormat')
        });
    }else{
        if(checkTheme.checked){
            Object.assign(localStorageData, {
                // Save Theme Section
                "currentMode": localStorage.getItem('currentMode'),
                "currentHeaderFont": localStorage.getItem('currentHeaderFont'),
                "currentTextFont": localStorage.getItem('currentTextFont'),
                "currentLightTheme": localStorage.getItem('currentLightTheme'),
                "currentLightBgColor": localStorage.getItem('currentLightBgColor'),
                "currentLightBgColorHsl": localStorage.getItem('currentLightBgColorHsl'),
                "currentLightTextColor": localStorage.getItem('currentLightTextColor'),
                "currentLightAccentColor": localStorage.getItem('currentLightAccentColor'),
                "currentDarkTheme": localStorage.getItem('currentDarkTheme'),
                "currentDarkBgColor": localStorage.getItem('currentDarkBgColor'),
                "currentDarkBgColorHsl": localStorage.getItem('currentDarkBgColorHsl'),
                "currentDarkTextColor": localStorage.getItem('currentDarkTextColor'),
                "currentDarkAccentColor": localStorage.getItem('currentDarkAccentColor')
            });
        }else {
            delete localStorageData.currentMode;
            delete localStorageData.currentHeaderFont;
            delete localStorageData.currentTextFont;
            delete localStorageData.currentLightTheme;
            delete localStorageData.currentLightBgColor;
            delete localStorageData.currentLightBgColorHsl;
            delete localStorageData.currentLightTextColor;
            delete localStorageData.currentLightAccentColor;
            delete localStorageData.currentDarkTheme;
            delete localStorageData.currentDarkBgColor;
            delete localStorageData.currentDarkBgColorHsl;
            delete localStorageData.currentDarkTextColor;
            delete localStorageData.currentDarkAccentColor;
        }

        if(checkTodo.checked){
            Object.assign(localStorageData, {
                // Save Todo Section
                'todoItems': JSON.parse(localStorage.getItem('todoItems'))
            });
        }else {
            delete localStorageData.todoItems;
        }

        if(checkYard.checked){
            Object.assign(localStorageData, {
                // Save The Yard Section
                'yard-tab': JSON.parse(localStorage.getItem('yard-tab'))
            });
        }else {
            delete localStorageData['yard-tab'];
        }

        if(checkPremium.checked){
            Object.assign(localStorageData, {
                // Save The Yard Premium Section
                'premium-tab': JSON.parse(localStorage.getItem('premium-tab'))
            });
        }else {
            delete localStorageData['premium-tab'];
        }

        if(checkAdvice.checked){
            Object.assign(localStorageData, {
                // Save The Yard Advice Show Section
                'advice-tab': JSON.parse(localStorage.getItem('advice-tab'))
            });
        }else {
            delete localStorageData['advice-tab'];
        }

        if(checkHistory.checked){
            Object.assign(localStorageData, {
                // Save Mp3 History Section
                'yardTabLastPlayed': JSON.parse(localStorage.getItem('yardTabLastPlayed')),
                'premiumTabLastPlayed': JSON.parse(localStorage.getItem('premiumTabLastPlayed')),
                'adviceTabLastPlayed': JSON.parse(localStorage.getItem('adviceTabLastPlayed')),
                'styleTabLastPlayed': JSON.parse(localStorage.getItem('styleTabLastPlayed')),
                'popoutTabLastPlayed': JSON.parse(localStorage.getItem('popoutTabLastPlayed'))
            });
        }else {
            delete localStorageData.yardTabLastPlayed;
            delete localStorageData.premiumTabLastPlayed;
            delete localStorageData.adviceTabLastPlayed;
            delete localStorageData.styleTabLastPlayed;
            delete localStorageData.popoutTabLastPlayed;
        }

        if(checkSetting.checked){
            Object.assign(localStorageData, {
                // Save Mp3 Settings Section
                "currentVolume": localStorage.getItem('currentVolume'),
                "currentAudioMode": localStorage.getItem('currentAudioMode'),
                "currentAudioSpeed": localStorage.getItem('currentAudioSpeed'),
                "currentFrRate": localStorage.getItem('currentFrRate'),
                "currentCoverRate": localStorage.getItem('currentCoverRate'),
                "currentCoverFormat": localStorage.getItem('currentCoverFormat')
            });
        }else {
            delete localStorageData.currentVolume;
            delete localStorageData.currentAudioMode;
            delete localStorageData.currentAudioSpeed;
            delete localStorageData.currentFrRate;
            delete localStorageData.currentCoverRate;
            delete localStorageData.currentCoverFormat;
        }
    }

    displaySave.innerHTML = `<pre>${JSON.stringify(localStorageData, null, 2)}</pre>`;
}
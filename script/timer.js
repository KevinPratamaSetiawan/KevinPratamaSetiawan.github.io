let audio;
let interval;
let startTime;
let remainingTime;
let isPaused = false;
let lastSetTime = { hours: 0, minutes: 0, seconds: 0 };

document.getElementById('play-timer-btn').addEventListener('click', startTimer);
document.getElementById('pause-timer-btn').addEventListener('click', pauseTimer);
document.getElementById('reset-timer-btn').addEventListener('click', stopTimer);
document.getElementById('start-alarm-btn').addEventListener('click', stopSound);

document.getElementById('play-timer-btn').addEventListener('click', function() {
    if(lastSetTime.hours === 0 && lastSetTime.minutes === 0 && lastSetTime.seconds === 0){
        lastSetTime.hours = parseInt(document.getElementById('hours').value) || 0;
        lastSetTime.minutes = parseInt(document.getElementById('minutes').value) || 0;
        lastSetTime.seconds = parseInt(document.getElementById('seconds').value) || 0;
    }
});

function startTimer() {
    document.getElementById('play-timer-btn').style.display = 'none';
    document.getElementById('reset-timer-btn').style.display = 'none';
    document.getElementById('pause-timer-btn').style.display = 'inline';

    stopSound();

    // Disable input fields
    toggleInputFields(false);

    if (!isPaused) {
        const hours = parseInt(document.getElementById('hours').value) || 0;
        const minutes = parseInt(document.getElementById('minutes').value) || 0;
        const seconds = parseInt(document.getElementById('seconds').value) || 0;
        remainingTime = (hours * 3600 + minutes * 60 + seconds) * 1000;

        lastSetTime.hours = hours;
        lastSetTime.minutes = minutes;
        lastSetTime.seconds = seconds;
    }

    startTime = Date.now();
    interval = setInterval(updateTimer, 1000);
    isPaused = false;
}

function pauseTimer() {
    document.getElementById('play-timer-btn').style.display = 'inline';
    document.getElementById('reset-timer-btn').style.display = 'inline';
    document.getElementById('pause-timer-btn').style.display = 'none';

    // Re-enable input fields
    toggleInputFields(true);

    clearInterval(interval);
    remainingTime -= (Date.now() - startTime);
    isPaused = true;
}

function stopTimer() {
    document.getElementById('play-timer-btn').style.display = 'inline';
    document.getElementById('reset-timer-btn').style.display = 'none';
    document.getElementById('pause-timer-btn').style.display = 'none';

    // Re-enable input fields
    toggleInputFields(true);

    clearInterval(interval);
    interval = null;
    isPaused = false;

    // Reset to the last set time
    updateDisplay(lastSetTime.hours, lastSetTime.minutes, lastSetTime.seconds);

    lastSetTime.hours = 0;
    lastSetTime.minutes = 0;
    lastSetTime.seconds = 0;
}

function updateTimer() {
    const elapsed = Date.now() - startTime;
    const timeLeft = remainingTime - elapsed;

    if (timeLeft <= 0) {
        stopTimer();
        playSound();
    } else {
        const hours = Math.floor(timeLeft / 3600000);
        const minutes = Math.floor((timeLeft % 3600000) / 60000);
        const seconds = Math.floor((timeLeft % 60000) / 1000);
        updateDisplay(hours, minutes, seconds);
        animateHourglass();
    }
}

function updateDisplay(hours, minutes, seconds) {
    document.getElementById('hours').value = String(hours).padStart(2, '0');
    document.getElementById('minutes').value = String(minutes).padStart(2, '0');
    document.getElementById('seconds').value = String(seconds).padStart(2, '0');
}

function animateHourglass() {
    const hourglass = document.getElementById('hourglass');
    hourglass.classList.remove('fa-hourglass-start', 'fa-hourglass-half', 'fa-hourglass-end');

    if (parseInt(document.getElementById('seconds').value) % 3 === 0) {
        hourglass.classList.add('fa-hourglass-end');
    } else if (parseInt(document.getElementById('seconds').value) % 3 === 1) {
        hourglass.classList.add('fa-hourglass-half');
    } else if (parseInt(document.getElementById('seconds').value) % 3 === 2) {
        hourglass.classList.add('fa-hourglass-start');
    }
}

function toggleInputFields(enable) {
    document.getElementById('hours').disabled = !enable;
    document.getElementById('minutes').disabled = !enable;
    document.getElementById('seconds').disabled = !enable;
}

// Pause the timer when the window loses focus
$(window).blur(function(){
    if (!isPaused) {
        pauseTimer();
    }
});

// Resume the timer when the window gains focus
$(window).focus(function(){
    if (isPaused && remainingTime > 0) {
        startTimer();
    }
});

function playSound() {
    if (!audio) {
        audio = new Audio('/assets/images/XXX.mp3');
    }

    document.getElementById('hourglass').style.display = 'none';
    // document.getElementById('stop-alarm-btn').style.display = 'none';
    document.getElementById('start-alarm-btn').style.display = 'inline';
    audio.play();
}

function stopSound() {
    if (audio) {
        audio.pause();
        audio.currentTime = 0;

        document.getElementById('hourglass').style.display = 'inline';
        // document.getElementById('stop-alarm-btn').style.display = 'inline';
        document.getElementById('start-alarm-btn').style.display = 'none';
    }
}

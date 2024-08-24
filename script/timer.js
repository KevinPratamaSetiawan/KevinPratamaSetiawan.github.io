let audio;
let interval;
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

    if (!interval) {
        interval = setInterval(updateTimer, 1000);
    }
}

function pauseTimer() {
    document.getElementById('play-timer-btn').style.display = 'inline';
    document.getElementById('reset-timer-btn').style.display = 'inline';
    document.getElementById('pause-timer-btn').style.display = 'none';

    // Re-enable input fields
    toggleInputFields(true);

    clearInterval(interval);
    interval = null;
}

function stopTimer() {
    document.getElementById('play-timer-btn').style.display = 'inline';
    document.getElementById('reset-timer-btn').style.display = 'none';
    document.getElementById('pause-timer-btn').style.display = 'none';

    // Re-enable input fields
    toggleInputFields(true);

    clearInterval(interval);
    interval = null;

    // Reset to the last set time
    updateDisplay(lastSetTime.hours, lastSetTime.minutes, lastSetTime.seconds);

    lastSetTime.hours = 0;
    lastSetTime.minutes = 0;
    lastSetTime.seconds = 0;
}

function updateTimer() {
    let hours = parseInt(document.getElementById('hours').value) || 0;
    let minutes = parseInt(document.getElementById('minutes').value) || 0;
    let seconds = parseInt(document.getElementById('seconds').value) || 0;

    if (hours === 0 && minutes === 0 && seconds === 0) {
        stopTimer();
        playSound();

        lastSetTime.hours = 0;
        lastSetTime.minutes = 0;
        lastSetTime.seconds = 0;
        
        return;
    }

    if (seconds === 0) {
        seconds = 60;
        if (minutes === 0) {
            minutes = 60;
            hours--;
        }
        minutes--;
    }
    seconds--;

    updateDisplay(hours, minutes, seconds);
    animateHourglass();
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

    function playSound() {
        if (!audio) {
            audio = new Audio('/assets/images/XXX.mp3');
        }

        document.getElementById('stop-alarm-btn').style.display = 'none';
        document.getElementById('start-alarm-btn').style.display = 'inline';
        audio.play();
    }

    function stopSound() {
        if (audio) {
            audio.pause();
            audio.currentTime = 0;

            document.getElementById('stop-alarm-btn').style.display = 'inline';
            document.getElementById('start-alarm-btn').style.display = 'none';
        }
    }

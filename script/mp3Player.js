// Mp3 Player Cover Changer
const coverImage = document.getElementById('mp3-cover-img');

function changeCoverImage() {
  const totalImages = 26;
  let imageIndex = Math.floor(Math.random() * totalImages) + 1;
  let currentImageIndex = imageIndex;

  if (currentImageIndex === imageIndex) {
    if(imageIndex === 26){
        imageIndex -= 8;
    }else{
        imageIndex++;
    }
  }
  coverImage.src = `../assets/images/mp3-cover/mp3-cover-${imageIndex}.jpeg`;
}

setInterval(changeCoverImage, 20000);

let currentAudio;
let currentIndex;
let currentQueue = [];

let playButton        = document.querySelector('.fa-circle-play');
let pauseButton       = document.querySelector('.fa-circle-pause');
let forwardButton     = document.querySelector('.fa-forward');
let rewindButton      = document.querySelector('.fa-backward');
let nextButton        = document.querySelector('.fa-forward-step');
let previousButton    = document.querySelector('.fa-backward-step');
let normalQueueButton = document.querySelector('.fa-arrow-down-a-z');
let shuffleButton     = document.querySelector('.fa-shuffle');
let repeatButton      = document.querySelector('.fa-repeat');

playButton.addEventListener('click', replayAudio);
pauseButton.addEventListener('click', pauseAudio);
forwardButton.addEventListener('click', forwardAudio);
rewindButton.addEventListener('click', rewindAudio);
nextButton.addEventListener('click', nextAudio);
previousButton.addEventListener('click', previousAudio);


const playBtn = document.querySelectorAll('.play');

playBtn.forEach(function(button) {
  button.addEventListener('click', function() {
      currentQueue = []; // Reset queue on new play
      let ticketNum = button.getAttribute('data-ticketNum');
      let url = button.getAttribute('data-url');
      let tabType = button.getAttribute('data-tabType');

      console.log(ticketNum);
      console.log(url);
      console.log(tabType);

      // Call your function with the values
      initiateQueue(ticketNum, url, tabType);
  });
});

const playOnQueueBtn = document.querySelectorAll('.queue-item');

playOnQueueBtn.forEach(function(button) {
  button.addEventListener('click', function() {
    console.log('inside queue about to play')
      let ticketNum = button.getAttribute('data-ticketNum');
      let url = button.getAttribute('data-url');

      console.log(ticketNum);
      console.log(url);

      currentIndex = parseInt(ticketNum, 10); // Ensure ticketNum is an integer

      playAudio(url);
      displayQueueTab(currentQueue, currentIndex);
  });
});

function initiateQueue(ticketNum, url, tabType) {
  if (tabType === 'yard-tab' || tabType === 'premium-tab' || tabType === 'advice-tab') {
    const savedResults = localStorage.getItem(tabType);
    if (savedResults) {
      const results = JSON.parse(savedResults);
      currentQueue = results || []; // Ensure currentQueue is an array
    }

  } else if (tabType === 'style-tab' || tabType === 'pop-out-tab') {
    fetch('/script/data/mp3_metadata.json')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      tabType = (tabType === 'style-tab') ? 'playlist1' : 'thePopOut';
      let results = data[tabType] || []; // Ensure results is an array

      currentQueue = results;

      displayQueueTab(currentQueue, parseInt(ticketNum, 10)); // Ensure ticketNum is an integer
      playAudio(url);
    })
    .catch(error => {
      console.error('Error fetching the JSON file:', error);
    });
  }

  currentIndex = parseInt(ticketNum, 10); // Ensure ticketNum is an integer
}

function displayQueueTab(queueList, index) {
  const queueTab = document.getElementById('queue-tab');
  if (!queueTab) return;
  queueTab.innerHTML = '';

  queueList.forEach((queue, i) => {
    const queueElement = document.createElement('li');
    queueElement.classList.add('mp3-container');
    
    if (document.body.classList.contains('dark-mode')) {
      queueElement.classList.add('dark-mode');
    }

    if (i === index) {
      queueElement.classList.add('current-played-item');
    }

    let formattedNumber = (i + 1).toString().padStart(3, '0');

    queueElement.innerHTML = `
        <a href="" data-url="${queue.url}" data-ticketNum="${i}" class='none queue-item'><i class="fa-solid fa-play"></i></a>
        <div class='mp3-title-date'>
          <h3>${queue.title}</h3>
          <p>${queue.artist}</p>
        </div>
        <div class='mp3-number-duration'>
          <p class='mp3-numbers'>#${formattedNumber}</p>
          <p>${queue.duration}</p>
        </div>
    `;

    queueTab.appendChild(queueElement);
  });
}

function playAudio(audioLink) {
  if (currentAudio) {
    currentAudio.pause();
  }

  currentAudio = new Audio(audioLink);
  currentAudio.play();

  currentAudio.addEventListener('ended', function() {
    nextAudio(); // Play the next audio in the queue
  });

  playButton.style.display = 'none';
  pauseButton.style.display = 'block';
}

function pauseAudio() {
  if (currentAudio) {
    currentAudio.pause();
    playButton.style.display = 'block';
    pauseButton.style.display = 'none';
  }
}

function replayAudio () {
  currentAudio.play();

  playButton.style.display = 'none';
  pauseButton.style.display = 'block';
}

function forwardAudio() {
  if (currentAudio) {
    currentAudio.currentTime = Math.min(currentAudio.currentTime + 15, currentAudio.duration);
  }
}

function rewindAudio() {
  if (currentAudio) {
    currentAudio.currentTime = Math.max(currentAudio.currentTime - 15, 0);
  }
}

function nextAudio() {
  if (currentQueue.length > 0) {
    currentIndex = (currentIndex + 1) % currentQueue.length;
    playAudio(currentQueue[currentIndex].url);
  }
}

function previousAudio() {
  if (currentQueue.length > 0) {
    currentIndex = (currentIndex - 1 + currentQueue.length) % currentQueue.length;
    playAudio(currentQueue[currentIndex].url);
  }
}

// KEEP! : Function to extract the audio duration
// document.addEventListener('DOMContentLoaded', function() {
//   const audioElements = document.querySelectorAll('#audio-files span');

//   audioElements.forEach(function(element) {
//     const audioPath = element.getAttribute('data-path');
//     extractDuration(audioPath);
//   });
// });

// function extractDuration(audioName) {
//   let audio = new Audio(audioName);
//   audio.onloadedmetadata = function() {
//     console.log(audioName + " : " + audio.duration);
//   };
// }

// function repeatAudio (audio) {
//   audio.loop = true;
// }

// function setVolumeAudio (audio, setVolume) {
//   audio.volume = (setVolume/100);
// }

// // Initialize current play mode
// let currentPlayMode = 'normal'; // can be 'normal', 'shuffle', 'repeat'

// // References to the control elements
// const normalPlayIcon = document.querySelector('.fa-arrow-down-a-z');
// const shuffleIcon = document.querySelector('.fa-shuffle');
// const repeatIcon = document.querySelector('.fa-repeat');
// const playIcon = document.querySelector('.fa-circle-play');
// const pauseIcon = document.querySelector('.fa-circle-pause');
// const volumeIcons = {
//     mute: document.querySelector('.fa-volume-xmark'),
//     off: document.querySelector('.fa-volume-off'),
//     low: document.querySelector('.fa-volume-low'),
//     high: document.querySelector('.fa-volume-high')
// };

// // Initialize the audio element
// let audio;
// let currentTrackIndex = 0;
// let playlist = []; // this should be populated with the audio links

// // Function to update the play mode
// function updatePlayMode() {
//     normalPlayIcon.style.display = 'none';
//     shuffleIcon.style.display = 'none';
//     repeatIcon.style.display = 'none';

//     switch (currentPlayMode) {
//         case 'normal':
//             normalPlayIcon.style.display = 'block';
//             break;
//         case 'shuffle':
//             shuffleIcon.style.display = 'block';
//             break;
//         case 'repeat':
//             repeatIcon.style.display = 'block';
//             break;
//     }
// }

// // Event listeners to change play mode
// normalPlayIcon.addEventListener('click', () => {
//     currentPlayMode = 'shuffle';
//     updatePlayMode();
// });

// shuffleIcon.addEventListener('click', () => {
//     currentPlayMode = 'repeat';
//     updatePlayMode();
// });

// repeatIcon.addEventListener('click', () => {
//     currentPlayMode = 'normal';
//     updatePlayMode();
// });

// // Function to play audio
// export function playAudio(audioLink) {
//     if (audio) {
//         audio.pause();
//     }
//     audio = new Audio(audioLink);

//     if (currentPlayMode === 'repeat') {
//         audio.loop = true;
//     } else {
//         audio.loop = false;
//     }

//     audio.play();
//     playIcon.style.display = 'none';
//     pauseIcon.style.display = 'block';

//     audio.addEventListener('timeupdate', updateAudioDurationSlider);

//     // Make sure to set up slider change event
//     const durationSlider = document.getElementById('mp3-duration');
//     durationSlider.addEventListener('input', () => {
//         audio.currentTime = durationSlider.value;
//     });
// }


// // Function to update the duration slider and time display
// function updateAudioDurationSlider() {
//     if (audio) {
//         const durationSlider = document.getElementById('mp3-duration');
//         durationSlider.max = audio.duration;
//         durationSlider.value = audio.currentTime;

//         const startDuration = document.getElementById('startDuration');
//         const endDuration = document.getElementById('endDuration');
//         startDuration.textContent = formatTime(audio.currentTime);
//         endDuration.textContent = formatTime(audio.duration);
//     }
// }

// // Utility function to format time in "MM:SS"
// function formatTime(seconds) {
//     const minutes = Math.floor(seconds / 60);
//     const secs = Math.floor(seconds % 60);
//     return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
// }

// // Function to handle play/pause button click
// playIcon.addEventListener('click', () => {
//     if (audio && !audio.paused) {
//         pauseAudio();
//     } else if (playlist.length > 0) {
//         playAudio(playlist[currentTrackIndex]);
//     }
// });

// pauseIcon.addEventListener('click', () => {
//     pauseAudio();
// });

// // Function to handle forward/backward skip
// document.querySelector('.fa-forward').addEventListener('click', forwardAudio);
// document.querySelector('.fa-backward').addEventListener('click', rewindAudio);

// // Function to change to next track
// document.querySelector('.fa-forward-step').addEventListener('click', () => {
//     if (currentPlayMode === 'shuffle') {
//         currentTrackIndex = Math.floor(Math.random() * playlist.length);
//     } else {
//         currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
//     }
//     playAudio(playlist[currentTrackIndex]);
// });

// // Function to change to previous track
// document.querySelector('.fa-backward-step').addEventListener('click', () => {
//     if (currentTrackIndex > 0) {
//         currentTrackIndex--;
//     } else {
//         currentTrackIndex = playlist.length - 1;
//     }
//     playAudio(playlist[currentTrackIndex]);
// });

// // Initial setup
// updatePlayMode();

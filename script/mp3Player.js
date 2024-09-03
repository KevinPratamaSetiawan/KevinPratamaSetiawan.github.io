// Mp3 Player Cover Changer
const coverImage = document.getElementById('mp3-cover-img');

function changeCoverImage() {
  const totalImages = 26;
  let imageIndex = Math.floor(Math.random() * totalImages) + 1;
  let currentImageIndex = imageIndex;

  if (currentImageIndex === imageIndex) {
    if(imageIndex === 27){
        imageIndex -= 8;
    }else{
        imageIndex++;
    }
  }
  coverImage.src = `../assets/images/mp3-cover/mp3-cover-${imageIndex}.jpeg`;
}

setInterval(changeCoverImage, 20000);

// function playAudio (audioLink) {
//   let audio = new Audio(audioLink);

//   audio.play();

//   return audio;
// }

// function pauseAudio (audio) {
//   audio.pause();
// }

// function forwardAudio (audio) {
//   if (audio.currentTime + 15 <= audio.duration) {
//     audio.currentTime += 15;
//   } else {
//     audio.currentTime = audio.duration;
//   }
// }

// function rewindAudio (audio) {
//   if (audio.currentTime - 15 >= 0) {
//     audio.currentTime -= 15;
//   } else {
//     audio.currentTime = 0;
//   }
// }

// function repeatAudio (audio) {
//   audio.loop = true;
// }

// function setVolumeAudio (audio, setVolume) {
//   audio.volume = (setVolume/100);
// }

// function displayAudioMetadata () {

// }

// function updateAudioDurationSlider () {

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

// // Function to pause audio
// function pauseAudio() {
//     if (audio) {
//         audio.pause();
//         playIcon.style.display = 'block';
//         pauseIcon.style.display = 'none';
//     }
// }

// // Function to skip forward 15 seconds
// function forwardAudio() {
//     if (audio && audio.currentTime + 15 <= audio.duration) {
//         audio.currentTime += 15;
//     } else if (audio) {
//         audio.currentTime = audio.duration;
//     }
// }

// // Function to rewind 15 seconds
// function rewindAudio() {
//     if (audio && audio.currentTime - 15 >= 0) {
//         audio.currentTime -= 15;
//     } else if (audio) {
//         audio.currentTime = 0;
//     }
// }

// // Function to set volume
// function setVolumeAudio(setVolume) {
//     if (audio) {
//         audio.volume = setVolume / 100;

//         // Update volume icons based on the volume level
//         if (audio.volume === 0) {
//             volumeIcons.mute.style.display = 'block';
//             volumeIcons.off.style.display = 'none';
//             volumeIcons.low.style.display = 'none';
//             volumeIcons.high.style.display = 'none';
//         } else if (audio.volume <= 0.3) {
//             volumeIcons.mute.style.display = 'none';
//             volumeIcons.off.style.display = 'block';
//             volumeIcons.low.style.display = 'none';
//             volumeIcons.high.style.display = 'none';
//         } else if (audio.volume <= 0.6) {
//             volumeIcons.mute.style.display = 'none';
//             volumeIcons.off.style.display = 'none';
//             volumeIcons.low.style.display = 'block';
//             volumeIcons.high.style.display = 'none';
//         } else {
//             volumeIcons.mute.style.display = 'none';
//             volumeIcons.off.style.display = 'none';
//             volumeIcons.low.style.display = 'none';
//             volumeIcons.high.style.display = 'block';
//         }
//     }
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

// Mp3 Player Cover Changer
const coverImage = document.getElementById('mp3-cover-img');

function changeCoverImage() {
  const totalImages = 26;
  let imageIndex = Math.floor(Math.random() * totalImages) + 1;
  let currentImageIndex = imageIndex;

  if (currentImageIndex === imageIndex) {
    imageIndex++;
  }
  coverImage.src = `../assets/images/mp3-cover/mp3-cover-${imageIndex}.jpeg`;
}

setInterval(changeCoverImage, 20000);
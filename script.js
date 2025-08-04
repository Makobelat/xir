document.addEventListener('DOMContentLoaded', function() {
  // Welcome popup logic
  const welcomePopup = document.getElementById('welcome-popup');
  const closePopup = document.getElementById('close-popup');

  if (welcomePopup) {
    welcomePopup.style.display = 'flex';
  }

  if (closePopup) {
    closePopup.onclick = function() {
      if (welcomePopup) {
        welcomePopup.style.display = 'none';
      }
    };
  }
});
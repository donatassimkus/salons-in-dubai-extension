// Add toggle functionality for salon type and location pills
document.querySelectorAll('.pill').forEach((pill) => {
  pill.addEventListener('click', () => {
    // If the pill is already active, unselect it
    if (pill.classList.contains('active')) {
      pill.classList.remove('active');
    } else {
      // Otherwise, activate it and deactivate others in the same group
      const group = pill.parentElement;
      group.querySelectorAll('.pill').forEach((btn) => btn.classList.remove('active'));
      pill.classList.add('active');
    }
    updateSearchButtonText();
  });
});

// Update button text dynamically based on selections
function updateSearchButtonText() {
  const salonType = document.querySelector('#salon-type .pill.active')?.textContent || '';
  const location = document.querySelector('#location .pill.active')?.textContent || '';

  const searchButton = document.getElementById('search-salons');

  if (!salonType && !location) {
    searchButton.textContent = 'Search All Salons in Dubai';
  } else if (salonType && !location) {
    searchButton.textContent = `Search ${salonType} in Dubai`;
  } else if (!salonType && location) {
    searchButton.textContent = `Search Salons in ${location}`;
  } else {
    searchButton.textContent = `Search ${salonType} in ${location}`;
  }
}

// Set default button text on page load
updateSearchButtonText();

document.getElementById('search-salons').addEventListener('click', () => {
  const salonType = document.querySelector('#salon-type .pill.active')?.getAttribute('data-value') || '';
  const location = document.querySelector('#location .pill.active')?.getAttribute('data-value') || '';

  let url = 'https://salonsindubai.ae/';
  
  if (salonType && location) {
    url += `${salonType}/${location}`;
  } else if (salonType) {
    url += salonType;
  } else if (location) {
    url += location;
  } else {
    url += 'all-salons';
  }

  // Open the generated URL in a new tab
  window.open(url, '_blank');
});
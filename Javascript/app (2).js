function showTab(tabId) {
    // Hide all tab contents
    const tabContents = document.getElementsByClassName('tab-content');
    for (let i = 0; i < tabContents.length; i++) {
      tabContents[i].style.display = 'none';
    }
  
    // Remove active class from all tab buttons
    const tabButtons = document.getElementsByClassName('tab-button');
    for (let i = 0; i < tabButtons.length; i++) {
      tabButtons[i].classList.remove('active');
    }
  
    // Show the selected tab content
    const selectedTab = document.getElementById(tabId);
    if (selectedTab) {
      selectedTab.style.display = 'block';
    }
  
    // Add active class to the clicked tab button
    const clickedTabButton = document.querySelector(`[onclick="showTab('${tabId}')"]`);
    if (clickedTabButton) {
      clickedTabButton.classList.add('active');
    }
  }
  
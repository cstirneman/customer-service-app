// Load the header content dynamically
fetch('header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('header-placeholder').innerHTML = data;

        // After loading the header, load the header's JavaScript
        const script = document.createElement('script');
        script.src = '../src/header.js'; // Assuming this is the path to your header.js
        document.body.appendChild(script);
    })
    .catch(error => console.error('Error loading header:', error));

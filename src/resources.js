// Load header content
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


// Handle drag start for flyers and guides
function handleDragStart(event) {
    const fileUrl = event.target.closest('.flyer, .guide').getAttribute('data-file-url'); // Get the file URL from the flyer or guide div
    const linkText = event.target.querySelector('p').innerText; // Get the flyer or guide name

    // Set both the URL and the name as dragged data
    event.dataTransfer.setData('text/plain', linkText + ": " + fileUrl); // Set text with name and URL for dragging
    event.dataTransfer.setData('text/uri-list', fileUrl); // Set the URL for dragging
    event.dataTransfer.effectAllowed = 'copy'; // Indicate the allowed drag operation
}

// Add event listener to all flyers and guides for drag start
document.querySelectorAll('.flyer, .guide').forEach(item => {
    item.addEventListener('dragstart', handleDragStart);
});

// Handle copying link for videos
document.addEventListener('DOMContentLoaded', function () {
    // Add event listener to all buttons with class 'copy-link-btn'
    document.querySelectorAll('.copy-link-btn').forEach(button => {
        button.addEventListener('click', function () {
            const linkToCopy = button.getAttribute('data-link'); // Get the link from the data-link attribute

            // Use the Clipboard API to copy the link text
            if (navigator.clipboard) {
                navigator.clipboard.writeText(linkToCopy).then(() => {
                    alert('Link copied successfully!');
                }).catch(err => {
                    console.error('Failed to copy link: ', err);
                });
            } else {
                // Fallback for older browsers
                alert('Clipboard API not supported in this browser.');
            }
        });
    });
});

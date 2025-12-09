// Load the header content dynamically
fetch('header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('header-placeholder').innerHTML = data;

        // After loading the header, load the header's JavaScript
        const script = document.createElement('script');
        script.src = '../src/header.js'; // path to header.js
        script.defer = true;
        document.body.appendChild(script);

        // When header.js finishes loading, initialize page logic
        script.onload = () => {
            initializeResourcesPage();
        };
    })
    .catch(error => {
        console.error('Error loading header:', error);
        // Fallback: still initialize page logic (without header/showToast if missing)
        initializeResourcesPage();
    });


// -------------------------------
// Main Resources page initializer
// -------------------------------
function initializeResourcesPage() {
    // Handle drag start for flyers and guides
    function handleDragStart(event) {
        const card = event.target.closest('.flyer, .guide');
        if (!card) return;

        const fileUrl = card.getAttribute('data-file-url'); // Get the file URL from the flyer or guide div
        const titleEl = card.querySelector('p');
        const linkText = titleEl ? titleEl.innerText : 'Resource'; // Get the flyer or guide name

        // Set both the URL and the name as dragged data
        event.dataTransfer.setData('text/plain', `${linkText}: ${fileUrl}`); // text with name and URL
        event.dataTransfer.setData('text/uri-list', fileUrl);                // URL for dragging
        event.dataTransfer.effectAllowed = 'copy';                           // Indicate the allowed drag operation
    }

    // Add event listener to all flyers and guides for drag start
    document.querySelectorAll('.flyer, .guide').forEach(item => {
        item.addEventListener('dragstart', handleDragStart);
    });

    // Handle copying link for videos
    document.querySelectorAll('.copy-link-btn').forEach(button => {
        button.addEventListener('click', () => {
            const linkToCopy = button.getAttribute('data-link'); // Get the link from the data-link attribute
            if (!linkToCopy) return;

            // Use the Clipboard API to copy the link text
            if (navigator.clipboard) {
                navigator.clipboard.writeText(linkToCopy)
                    .then(() => {
                        // use global toast from header.js
                        if (typeof showToast === 'function') {
                            showToast('Link copied to clipboard');
                        } else {
                            console.log('Link copied to clipboard');
                        }
                    })
                    .catch(err => {
                        console.error('Failed to copy link: ', err);
                        if (typeof showToast === 'function') {
                            showToast('Failed to copy link');
                        }
                    });
            } else {
                // Fallback for older browsers
                if (typeof showToast === 'function') {
                    showToast('Clipboard not supported in this browser');
                } else {
                    console.warn('Clipboard API not supported in this browser.');
                }
            }
        });
    });
}

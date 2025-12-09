// Load the header content dynamically
fetch('header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('header-placeholder').innerHTML = data;

        // After loading the header, load the header's JavaScript
        const script = document.createElement('script');
        script.src = '../src/header.js'; 
        script.defer = true; 
        document.body.appendChild(script);

        // When header.js finishes loading, initialize page logic
        script.onload = () => {
            initializeFAQPage();
        };
    })
    .catch(error => console.error('Error loading header:', error));


// -------------------------------
// Main FAQ initialization function
// -------------------------------
function initializeFAQPage() {

    const buttons = document.querySelectorAll('.response-btn');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const content = button.nextElementSibling;

            // Toggle this response
            if (content.classList.contains('show')) {
                content.classList.remove('show');
            } else {
                // Close other open responses
                document.querySelectorAll('.response-content.show').forEach(openContent => {
                    openContent.classList.remove('show');
                });

                // Open this response
                content.classList.add('show');
            }
        });
    });


    // Copy buttons
    document.querySelectorAll('.copy-btn').forEach(button => {
        button.addEventListener('click', () => {

            const contentToCopy = button.parentElement.querySelector('.response-inner').innerHTML;

            // Use Clipboard API
            if (navigator.clipboard && window.ClipboardItem) {
                navigator.clipboard.write([
                    new ClipboardItem({
                        'text/html': new Blob([contentToCopy], { type: 'text/html' })
                    })
                ])
                .then(() => {
                    showToast('Response copied to clipboard');
                })
                .catch(err => {
                    console.error('Failed to copy content:', err);
                    showToast('Failed to copy content');
                });

            } else {
                showToast('Clipboard not supported in this browser');
            }
        });
    });
}

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


    const buttons = document.querySelectorAll('.response-btn');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const content = button.nextElementSibling;
    
            // Check if it's already shown or not
            if (content.classList.contains('show')) {
                content.classList.remove('show');
            } else {
                // Close all other open responses if necessary
                document.querySelectorAll('.response-content.show').forEach(openContent => {
                    openContent.classList.remove('show');
                });
    
                // Show the clicked response
                content.classList.add('show');
            }
        });
    });
    
    document.querySelectorAll('.copy-btn').forEach(button => {
        button.addEventListener('click', () => {
            // Get the content to copy (inside the 'response-inner' div)
            const contentToCopy = button.parentElement.querySelector('.response-inner').innerHTML;
    
            // Use the Clipboard API to copy HTML content
            if (navigator.clipboard) {
                navigator.clipboard.write([
                    new ClipboardItem({
                        "text/html": new Blob([contentToCopy], { type: "text/html" })
                    })
                ]).then(() => {
                    alert('Content copied successfully!');
                }).catch(err => {
                    console.error('Failed to copy content: ', err);
                });
            } else {
                // Fallback for older browsers
                alert('Clipboard API not supported in this browser.');
            }
        });
    });
    
    
    



fetch('header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('header-placeholder').innerHTML = data;

        // After loading the header, load the header's JavaScript
        const script = document.createElement('script');
        script.src = '../src/header.js'; // Assuming this is the path to your header.js
        document.body.appendChild(script);
        initializeEventListeners()
    })
    .catch(error => console.error('Error loading header:', error));


// Function to initialize event listeners after content is loaded
function initializeEventListeners() {
    // Initialize accordion behavior for both documents and policies
    document.querySelectorAll('.accordion-btn').forEach(button => {
        button.addEventListener('click', () => {
            const content = button.nextElementSibling;
            const section = button.closest('.policies, .documents');

            // Handle accordion for policies
            if (section.classList.contains('policies')) {
                if (content.style.maxHeight) {
                    content.style.maxHeight = null; // Collapse the section
                    section.classList.remove('expanded');
                } else {
                    content.style.maxHeight = content.scrollHeight + 'px'; // Expand the section
                    section.classList.add('expanded');
                }
            }
            
            // Handle accordion for documents
            else if (section.classList.contains('documents')) {
                if (content.style.maxHeight) {
                    content.style.maxHeight = null; // Collapse
                } else {
                    content.style.maxHeight = content.scrollHeight + 30 + 'px'; // Expand
                }
            }
        });
    });
}

// Store the company codes in an object
const advisorCodes = {
    "3Mark": "dcr3y",
    "Affinity Wealth Concepts": "xdnhk",
    "AIM Financials": "k5xed",
    "C&S Insurance Group": "cgeed",
    "Elite Financial Group": "qshph",
    "EXP": "qw7am",
    "Experior": "8wch",
    "Financial Advisor On Call": "qh5re",
    "FINLitCY": "wh83o",
    "Freedom Financial": "qcbwc",
    "HGI": "oyde4",
    "ICAN Financial": "hct5m",
    "Independent": "4ldnz",
    "Jay Maymi": "o8n8o",
    "Jems Of Insurance": "ztc3h",
    "MAF": "fpwrh",
    "Money Concepts": "ngwyf",
    "NFI Solutions": "rl7hq",
    "Proxy Strategic Partners": "s5hbp",
    "Rebecca Villafana": "alelw",
    "Rock Steady Financial Group": "ok9t6",
    "Synergy Financial Partners": "lgdgg",
    "TDR": "k9eem",
    "Upstandards LLC": "tlkpx",
    "Valor Financial": "lgfqe",
    "Wealth Influencers Network": "kfrbk",
    "WFG": "ny3ow",
    "Sanders Insurance Group": "h6hnk",
    "Palmetto Life Group": "x9e8m",
    "Linda Nygen": "ebhrq"
};

// Reference to the search input, advisor link, and company name elements
const searchInput = document.getElementById('search-input');
const advisorLink = document.getElementById('advisor-link');
const companyNameDisplay = document.getElementById('company-name');

// Check if the search input element exists before adding event listeners
if (searchInput) {
    // Event listener for input changes
    searchInput.addEventListener('input', function () {
        const query = searchInput.value.trim().toLowerCase(); // Get user input and convert to lowercase
        let foundCode = '';
        let foundCompany = '';

        // Search through the advisorCodes object
        for (const company in advisorCodes) {
            if (company.toLowerCase().includes(query)) { // Make the comparison case-insensitive
                foundCode = advisorCodes[company]; // Find the matching code
                foundCompany = company; // Capture the matching company name
                break;
            }
        }

        // Update the advisor link and company name display
        if (foundCode) {
            advisorLink.textContent = `i.netlaw.com/${foundCode}`;
            companyNameDisplay.textContent = `Company: ${foundCompany}`; // Show the company name
        } else {
            advisorLink.textContent = 'i.netlaw.com/'; // Default text if no match
            companyNameDisplay.textContent = ''; // Clear the company name if no match
        }
    });
} else {
    console.error('Search input not found.');
}

// Add event listeners to all buttons with the class 'copy-btn'
document.querySelectorAll('.copy-btn').forEach(button => {
    button.addEventListener('click', function () {
        copyContent(button);
    });
});

// Function to copy the HTML content inside the parent of the clicked button, excluding the button itself
function copyContent(button) {
    const parentElement = button.parentElement;

    // Clone the parent element to modify it without affecting the DOM
    const clone = parentElement.cloneNode(true);

    // Remove the button itself from the cloned content
    clone.querySelector('.copy-btn').remove();

    // Get the HTML content from the cloned parent
    const contentToCopy = clone.innerHTML;

    // Use the Clipboard API to copy HTML content
    if (navigator.clipboard) {
        navigator.clipboard.write([
            new ClipboardItem({
                "text/html": new Blob([contentToCopy], { type: "text/html" }),
                "text/plain": new Blob([clone.innerText || clone.textContent], { type: "text/plain" })
            })
        ]).then(() => {
            alert('Content copied successfully with formatting!');
        }).catch(err => {
            console.error('Failed to copy content: ', err);
        });
    } else {
        // Fallback for older browsers
        alert('Clipboard API not supported in this browser.');
    }
}

// Function to copy the advisor link when the Copy Link button is clicked
document.addEventListener('DOMContentLoaded', function () {
    const copyLinkButton = document.querySelector('.copy-link-btn');
    const advisorLink = document.getElementById('advisor-link');

    // Add event listener to the Copy Link button
    copyLinkButton.addEventListener('click', function () {
        const linkToCopy = advisorLink.textContent.trim(); // Get the content of the advisor link

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

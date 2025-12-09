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
            initializeRepositoryPage();
        };
    })
    .catch(error => {
        console.error('Error loading header:', error);
        // Fallback: still initialize page logic, even if header fails
        initializeRepositoryPage();
    });


// Store the company codes in an object
const advisorCodes = {
    "3Mark": "dcr3y",
    "Affinity Wealth Concepts": "xdnhk",
    "AIM Financials": "k5xed",
    "C&S Insurance Group": "cgeed",
    "Elite Financial Group": "qshph",
    "EXP": "qw7am",
    "Experior": "8rwch",
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


// -------------------------------
// Main Repository page initializer
// -------------------------------
function initializeRepositoryPage() {
    // Initialize accordion behavior for both documents and policies
    document.querySelectorAll('.accordion-btn').forEach(button => {
        button.addEventListener('click', () => {
            const content = button.nextElementSibling;
            const section = button.closest('.policies, .documents');
            if (!content || !section) return;

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

    // Reference to the search input, advisor link, and company name elements
    const searchInput = document.getElementById('search-input');
    const advisorLink = document.getElementById('advisor-link');
    const companyNameDisplay = document.getElementById('company-name');

    // Set up search behavior if input exists
    if (searchInput && advisorLink && companyNameDisplay) {
        searchInput.addEventListener('input', function () {
            const query = searchInput.value.trim().toLowerCase(); // Get user input
            let foundCode = '';
            let foundCompany = '';

            // Search through the advisorCodes object
            for (const company in advisorCodes) {
                if (company.toLowerCase().includes(query)) {
                    foundCode = advisorCodes[company];
                    foundCompany = company;
                    break;
                }
            }

            // Update the advisor link and company name display
            if (foundCode) {
                advisorLink.textContent = `i.netlaw.com/${foundCode}`;
                companyNameDisplay.textContent = `Company: ${foundCompany}`;
            } else {
                advisorLink.textContent = 'i.netlaw.com/';
                companyNameDisplay.textContent = '';
            }
        });
    } else {
        console.error('Search input or advisor link elements not found.');
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
        if (!parentElement) return;

        // Clone the parent element to modify it without affecting the DOM
        const clone = parentElement.cloneNode(true);

        // Remove the button itself from the cloned content
        const btnInClone = clone.querySelector('.copy-btn');
        if (btnInClone) btnInClone.remove();

        // Get the HTML content from the cloned parent
        const contentToCopy = clone.innerHTML;

        // Use the Clipboard API to copy HTML + plain text content
        if (navigator.clipboard && window.ClipboardItem) {
            navigator.clipboard.write([
                new ClipboardItem({
                    'text/html': new Blob([contentToCopy], { type: 'text/html' }),
                    'text/plain': new Blob([clone.innerText || clone.textContent], { type: 'text/plain' })
                })
            ])
            .then(() => {
                if (typeof showToast === 'function') {
                    showToast('Content copied with formatting');
                } else {
                    console.log('Content copied with formatting');
                }
            })
            .catch(err => {
                console.error('Failed to copy content: ', err);
                if (typeof showToast === 'function') {
                    showToast('Failed to copy content');
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
    }

    // Copy the advisor link when the Copy Link button is clicked
    const copyLinkButton = document.querySelector('.copy-link-btn');
    if (copyLinkButton && advisorLink) {
        copyLinkButton.addEventListener('click', function () {
            const linkToCopy = advisorLink.textContent.trim();

            if (!linkToCopy) return;

            if (navigator.clipboard) {
                navigator.clipboard.writeText(linkToCopy)
                    .then(() => {
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
                if (typeof showToast === 'function') {
                    showToast('Clipboard not supported in this browser');
                } else {
                    console.warn('Clipboard API not supported in this browser.');
                }
            }
        });
    }
}

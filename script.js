// Ensure the script runs after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const tweetInput = document.getElementById('tweet-input');
    const charCount = document.getElementById('char-count');
    const tweetButton = document.getElementById('tweet-button');
    const imageUpload = document.getElementById('image-upload');
    const imagePreview = document.getElementById('image-preview');
    const tweetsContainer = document.getElementById('tweets-container');
    const likes = document.querySelectorAll('[id^=love]'); // Select all elements with id starting with 'love'

    // Like buttons event listener
    likes.forEach(like => {
        like.addEventListener("click", function() {
            like.style.color = "#FE1D0B";
            like.style.webkitTextStroke = `2px #000`;
        });
    });

    // State
    let selectedImage = null;

    // Character Count Update
    function updateCharCount() {
        const length = tweetInput.value.length;
        charCount.textContent = `${length}/280`;
        tweetButton.disabled = length === 0 && !selectedImage;
    }

    // Image Upload Handling
    imageUpload.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                selectedImage = e.target.result;
                imagePreview.innerHTML = `
                    <div style="position: relative;">
                        <img src="${selectedImage}" alt="Preview">
                        <button class="remove-image-btn" onclick="removeImage()">✖</button>
                    </div>
                `;
                updateCharCount();
            };
            reader.readAsDataURL(file);
        }
    });

    // Remove Image
    function removeImage() {
        selectedImage = null;
        imagePreview.innerHTML = '';
        imageUpload.value = '';
        updateCharCount();
    }

    // Post Tweet
    function postTweet() {
        const tweetText = tweetInput.value.trim();
        
        if (tweetText || selectedImage) {
            // Create tweet element
            const tweetElement = document.createElement('div');
            tweetElement.classList.add('tweet-item');
            
            // Construct tweet content
            tweetElement.innerHTML = `
                ${tweetText ? `<div class="name">Pranjeet Goswami</div>` : ''}
                ${tweetText ? `<div class="username">@pranjeetgos99</div>` : ''}
                ${tweetText ? `<div class="tweet-content">${tweetText}</div>` : ''}
                ${selectedImage ? `<img src="${selectedImage}" class="tweet-image">` : ''}
                <div class="tweet-timestamp">${new Date().getDate()} December, 1999 ${new Date().toLocaleTimeString()}</div>
                <button class="delete-tweet-btn">🗑️</button>
            `;
            
            // Add to top of tweets container
            tweetsContainer.insertBefore(tweetElement, tweetsContainer.firstChild);
            
            // Reset inputs
            tweetInput.value = '';
            removeImage();
            updateCharCount();
        }
    }

    // Delete Tweet using event delegation
    tweetsContainer.addEventListener('click', function(event) {
        if (event.target.classList.contains('delete-tweet-btn')) {
            const tweetItem = event.target.closest('.tweet-item');
            tweetItem.remove();
        }
    });

    // Event Listeners
    tweetInput.addEventListener('input', updateCharCount);
    tweetButton.addEventListener('click', postTweet);

    // Initial setup
    updateCharCount();
});
// Add this to your JavaScript file (e.g., script.js)

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const container2 = document.getElementById('container2');
    const container3 = document.getElementById('container3');
    const container4 = document.getElementById('container4');
    const popup = document.getElementById('popup');
    const closeBtn = document.querySelector('.close');
    const sendBtn = document.getElementById('send-btn');
    const chatBox = document.getElementById('chat-box');
    const chatInput = document.getElementById('chat-input');

    // Open popup when container2 is clicked
    container2.addEventListener('click', function() {
        popup.style.display = 'block';
    });
    container3.addEventListener('click', function() {
        popup.style.display = 'block';
    });
    container4.addEventListener('click', function() {
        popup.style.display = 'block';
    });

    // Close popup when close button is clicked
    closeBtn.addEventListener('click', function() {
        popup.style.display = 'none';
    });

    // Close popup when clicking outside of the popup content
    window.addEventListener('click', function(event) {
        if (event.target == popup) {
            popup.style.display = 'none';
        }
    });

    // Send message and display in chat box
    sendBtn.addEventListener('click', function() {
        const message = chatInput.value.trim();
        if (message) {
            const messageElement = document.createElement('div');
            messageElement.textContent = message;
            chatBox.appendChild(messageElement);
            chatInput.value = '';
            chatBox.scrollTop = chatBox.scrollHeight; // Scroll to bottom
        }
    });

    // Send message when pressing Enter key
    chatInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            sendBtn.click();
        }
    });
});

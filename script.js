// DOM Elements
const tweetInput = document.getElementById('tweet-input');
const charCount = document.getElementById('char-count');
const tweetButton = document.getElementById('tweet-button');
const imageUpload = document.getElementById('image-upload');
const imagePreview = document.getElementById('image-preview');
const tweetsContainer = document.getElementById('tweets-container');

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
            ${tweetText ? `<div class="tweet-content">${tweetText}</div>` : ''}
            ${selectedImage ? `<img src="${selectedImage}" class="tweet-image">` : ''}
            <div class="tweet-timestamp">${new Date().toLocaleString()}</div>
            <button class="delete-tweet-btn" onclick="deleteTweet(this)">🗑️</button>
        `;
        
        // Add to top of tweets container
        tweetsContainer.insertBefore(tweetElement, tweetsContainer.firstChild);
        
        // Reset inputs
        tweetInput.value = '';
        removeImage();
        updateCharCount();
    }
}

// Delete Tweet
function deleteTweet(button) {
    const tweetItem = button.closest('.tweet-item');
    tweetItem.remove();
}

// Event Listeners
tweetInput.addEventListener('input', updateCharCount);
tweetButton.addEventListener('click', postTweet);

// Initial setup
updateCharCount();
// DOM Elements
const tweetInput = document.getElementById('tweet-input');
const charCount = document.getElementById('char-count');
const tweetButton = document.getElementById('tweet-button');
const imageUpload = document.getElementById('image-upload');
const imagePreview = document.getElementById('image-preview');
const tweetsContainer = document.getElementById('tweets-container');
const like1 = document.getElementById('love1')
const like2 = document.getElementById('love2')
const like3 = document.getElementById('love3')
const like4 = document.getElementById('love4')
const like5 = document.getElementById('love5')
const like6 = document.getElementById('love6')
const like7 = document.getElementById('love7')

like1.addEventListener("click", function(){
    like1.style.color = "#FE1D0B"
    like1.style.webkitTextStroke = `2px #000`
})
like2.addEventListener("click", function(){
    like2.style.color = "#FE1D0B"
    like2.style.webkitTextStroke = `2px #000`
})
like3.addEventListener("click", function(){
    like3.style.color = "#FE1D0B"
    like3.style.webkitTextStroke = `2px #000`
})
like4.addEventListener("click", function(){
    like4.style.color = "#FE1D0B"
    like4.style.webkitTextStroke = `2px #000`
})
like5.addEventListener("click", function(){
    like5.style.color = "#FE1D0B"
    like5.style.webkitTextStroke = `2px #000`
})
like6.addEventListener("click", function(){
    like6.style.color = "#FE1D0B"
    like6.style.webkitTextStroke = `2px #000`
})
like7.addEventListener("click", function(){
    like7.style.color = "#FE1D0B"
    like7.style.webkitTextStroke = `2px #000`
})

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
            ${tweetText ? `<div class="name">Chris Norman</div>` : ''}
            ${tweetText ? `<div class="username">@CHRIS334</div>` : ''}
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
// Variables for text formatting
let selectedText = null;

// Text functionality
document.querySelectorAll('.movable-text').forEach(text => {
    let isDragging = false;
    let startX, startY;
    let initialX, initialY;

    // Set initial position
    text.style.top = '50%';
    text.style.left = '50%';
    text.style.transform = 'translate(-50%, -50%)';

    // Show format controls and update them when text is clicked
    text.addEventListener('click', (e) => {
        e.stopPropagation();
        selectedText = text;
        
        // Update controls to match current text styles
        const styles = window.getComputedStyle(text);
        document.getElementById('fontSelect').value = styles.fontFamily.split(',')[0].replace(/['"]/g, '') || 'Arial';
        document.getElementById('sizeSelect').value = parseInt(styles.fontSize) || '24';
        document.getElementById('colorSelect').value = rgbToHex(styles.color);
    });

    // Dragging functionality
    text.addEventListener('mousedown', startDragging);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDragging);

    function startDragging(e) {
        if (text.contentEditable === 'true') return;
        isDragging = true;
        text.classList.add('dragging');
        startX = e.clientX;
        startY = e.clientY;
        const rect = text.getBoundingClientRect();
        initialX = rect.left;
        initialY = rect.top;
        text.style.transform = 'none';
    }

    function drag(e) {
        if (!isDragging) return;
        e.preventDefault();

        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        const parentRect = text.parentElement.getBoundingClientRect();
        const textRect = text.getBoundingClientRect();

        let newX = initialX - parentRect.left + dx;
        let newY = initialY - parentRect.top + dy;

        newX = Math.max(0, Math.min(newX, parentRect.width - textRect.width));
        newY = Math.max(0, Math.min(newY, parentRect.height - textRect.height));

        text.style.left = `${newX}px`;
        text.style.top = `${newY}px`;
    }

    function stopDragging() {
        isDragging = false;
        text.classList.remove('dragging');
    }

    // Double click to edit
    text.addEventListener('dblclick', () => {
        text.contentEditable = true;
        text.focus();
    });

    text.addEventListener('blur', () => {
        text.contentEditable = false;
    });
});

// Font controls with immediate updates
document.getElementById('fontSelect').addEventListener('change', function() {
    if (selectedText) {
        selectedText.style.setProperty('font-family', this.value, 'important');
    }
});

document.getElementById('sizeSelect').addEventListener('change', function() {
    if (selectedText) {
        selectedText.style.setProperty('font-size', `${this.value}px`, 'important');
    }
});

document.getElementById('colorSelect').addEventListener('change', function() {
    if (selectedText) {
        const selectedColor = this.value;
        selectedText.style.color = selectedColor;
        selectedText.style.setProperty('color', selectedColor, 'important');
        
        // Update background for better visibility
        if (selectedColor === '#FFFFFF') {
            selectedText.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        } else {
            selectedText.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
        }
    }
});

// Helper function to convert RGB to Hex
function rgbToHex(rgb) {
    if (rgb.startsWith('#')) return rgb;
    
    const rgbValues = rgb.match(/\d+/g);
    if (!rgbValues) return '#000000';
    
    const r = parseInt(rgbValues[0]);
    const g = parseInt(rgbValues[1]);
    const b = parseInt(rgbValues[2]);
    
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

// Clear selection when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.movable-text') && !e.target.closest('.format-controls')) {
        selectedText = null;
    }
});

// Slider functionality
const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let currentSlide = 0;

function updateSlider() {
    slider.style.transform = `translateX(-${currentSlide * 33.333}%)`;
}

// Previous button click handler
prevBtn.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlider();
});

// Next button click handler
nextBtn.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlider();
});

// Set initial position
updateSlider();

// Add this to your existing JavaScript
document.getElementById('addTextBtn').addEventListener('click', () => {
    // Get the active slide
    const activeSlide = document.querySelector(`.slide:nth-child(${currentSlide + 1})`);
    if (!activeSlide) return;

    // Create new text element
    const newText = document.createElement('div');
    newText.className = 'movable-text';
    newText.textContent = 'New Text';

    // Set initial position
    newText.style.top = '50%';
    newText.style.left = '50%';
    newText.style.transform = 'translate(-50%, -50%)';

    // Add the text to the active slide
    activeSlide.appendChild(newText);

    // Add event listeners for the new text
    let isDragging = false;
    let startX, startY;
    let initialX, initialY;

    // Show format controls and update them when text is clicked
    newText.addEventListener('click', (e) => {
        e.stopPropagation();
        selectedText = newText;
        
        // Update controls to match current text styles
        const styles = window.getComputedStyle(newText);
        document.getElementById('fontSelect').value = styles.fontFamily.split(',')[0].replace(/['"]/g, '') || 'Arial';
        document.getElementById('sizeSelect').value = parseInt(styles.fontSize) || '24';
        document.getElementById('colorSelect').value = rgbToHex(styles.color);
    });

    // Dragging functionality
    newText.addEventListener('mousedown', startDragging);
    
    function startDragging(e) {
        if (newText.contentEditable === 'true') return;
        isDragging = true;
        newText.classList.add('dragging');
        startX = e.clientX;
        startY = e.clientY;
        const rect = newText.getBoundingClientRect();
        initialX = rect.left;
        initialY = rect.top;
        newText.style.transform = 'none';
    }

    function drag(e) {
        if (!isDragging) return;
        e.preventDefault();

        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        const parentRect = newText.parentElement.getBoundingClientRect();
        const textRect = newText.getBoundingClientRect();

        let newX = initialX - parentRect.left + dx;
        let newY = initialY - parentRect.top + dy;

        newX = Math.max(0, Math.min(newX, parentRect.width - textRect.width));
        newY = Math.max(0, Math.min(newY, parentRect.height - textRect.height));

        newText.style.left = `${newX}px`;
        newText.style.top = `${newY}px`;
    }

    function stopDragging() {
        isDragging = false;
        newText.classList.remove('dragging');
    }

    // Double click to edit
    newText.addEventListener('dblclick', () => {
        newText.contentEditable = true;
        newText.focus();
    });

    newText.addEventListener('blur', () => {
        newText.contentEditable = false;
    });

    // Add the drag and stop dragging listeners to document
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDragging);
});


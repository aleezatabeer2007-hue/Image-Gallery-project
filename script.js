const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');

let currentIndex = 0;
let visibleItems = [];

function updateVisibleItems() {
    visibleItems = Array.from(galleryItems).filter(item => item.style.display !== 'none');
}

// Open Lightbox
function openLightbox(index) {
    updateVisibleItems();
    currentIndex = visibleItems.indexOf(galleryItems[index]);
    showLightboxImage();
    lightbox.classList.add('active');
}

// Show current image in Lightbox
function showLightboxImage() {
    if (visibleItems.length === 0) return;
    const currentItem = visibleItems[currentIndex];
    const img = currentItem.querySelector('img');
    const captionText = currentItem.querySelector('.overlay span').innerText;

    lightboxImg.src = img.src;
    lightboxCaption.innerText = captionText;
}

// Close Lightbox
function closeLightbox() {
    lightbox.classList.remove('active');
}

// Next / Previous Navigation
function changeImage(direction) {
    if (visibleItems.length === 0) return;
    currentIndex += direction;
    if (currentIndex < 0) {
        currentIndex = visibleItems.length - 1;
    } else if (currentIndex >= visibleItems.length) {
        currentIndex = 0;
    }
    showLightboxImage();
}

// Category Filter Functionality
function filterGallery(category) {
    // Update active button state
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    // Filter gallery items
    galleryItems.forEach(item => {
        if (category === 'all' || item.classList.contains(category)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });

    updateVisibleItems();
}

// Keyboard Navigation for Lightbox
document.addEventListener('keydown', function(e) {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') changeImage(-1);
    if (e.key === 'ArrowRight') changeImage(1);
});
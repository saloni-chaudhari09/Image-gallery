document.addEventListener('DOMContentLoaded', function() {
            // Filter functionality
            const filterBtns = document.querySelectorAll('.filter-btn');
            const galleryItems = document.querySelectorAll('.gallery-item');

            filterBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    // Update active button
                    filterBtns.forEach(btn => btn.classList.remove('active'));
                    this.classList.add('active');

                    const filter = this.dataset.filter;

                    // Filter items
                    galleryItems.forEach(item => {
                        if (filter === 'all' || item.dataset.category === filter) {
                            item.style.display = 'block';
                        } else {
                            item.style.display = 'none';
                        }
                    });
                });
            });

            // Lightbox functionality
            const lightbox = document.querySelector('.lightbox');
            const lightboxImg = document.querySelector('.lightbox-img');
            const lightboxCaption = document.querySelector('.lightbox-caption');
            const lightboxClose = document.querySelector('.lightbox-close');
            const lightboxPrev = document.querySelector('.lightbox-prev');
            const lightboxNext = document.querySelector('.lightbox-next');
            let currentImageIndex = 0;
            let images = [];

            // Initialize images array and click events
            galleryItems.forEach((item, index) => {
                const img = item.querySelector('.gallery-img');
                const caption = item.querySelector('.gallery-caption').textContent;
                
                images.push({
                    src: img.src,
                    alt: img.alt,
                    caption: caption
                });

                item.addEventListener('click', () => {
                    openLightbox(index);
                });
            });

            function openLightbox(index) {
                currentImageIndex = index;
                updateLightbox();
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            }

            function closeLightbox() {
                lightbox.classList.remove('active');
                document.body.style.overflow = 'auto';
            }

            function updateLightbox() {
                const currentImage = images[currentImageIndex];
                lightboxImg.src = currentImage.src;
                lightboxImg.alt = currentImage.alt;
                lightboxCaption.textContent = currentImage.caption;
            }

            function showPrevImage() {
                currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
                updateLightbox();
            }

            function showNextImage() {
                currentImageIndex = (currentImageIndex + 1) % images.length;
                updateLightbox();
            }

            // Event listeners
            lightboxClose.addEventListener('click', closeLightbox);
            lightboxPrev.addEventListener('click', showPrevImage);
            lightboxNext.addEventListener('click', showNextImage);

            // Keyboard navigation
            document.addEventListener('keydown', function(e) {
                if (!lightbox.classList.contains('active')) return;

                switch (e.key) {
                    case 'Escape':
                        closeLightbox();
                        break;
                    case 'ArrowLeft':
                        showPrevImage();
                        break;
                    case 'ArrowRight':
                        showNextImage();
                        break;
                }
            });

            // Close lightbox when clicking on the backdrop
            lightbox.addEventListener('click', function(e) {
                if (e.target === lightbox) {
                    closeLightbox();
                }
            });
        });
  
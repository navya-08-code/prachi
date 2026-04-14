document.addEventListener('DOMContentLoaded', () => {

    /* --- Loading Screen Logic --- */
    const loadingScreen = document.getElementById('loading-screen');
    const mainContent = document.getElementById('main-content');
    
    // Simulate loading time (e.g., waiting for assets)
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            mainContent.style.display = 'block';
            // Trigger scroll reveal for items visible on load
            reveal();
        }, 800);
    }, 2000); // 2 second mock load


    /* --- Generating Background Floating Hearts --- */
    const createBackgroundHearts = () => {
        const container = document.getElementById('background-hearts');
        const heartCount = 20; // Number of hearts floating
        
        for (let i = 0; i < heartCount; i++) {
            let heart = document.createElement('div');
            heart.classList.add('bg-heart');
            
            // Randomize position, size, and animation duration
            let leftPos = Math.random() * 100; // 0 to 100vw
            let delay = Math.random() * 10; // 0 to 10s delay
            let duration = 10 + Math.random() * 10; // 10s to 20s travel time
            let scale = 0.3 + Math.random() * 0.7; // size variance

            heart.style.left = `${leftPos}vw`;
            heart.style.animationDelay = `${delay}s`;
            heart.style.animationDuration = `${duration}s`;
            heart.style.transform = `scale(${scale}) rotate(45deg)`;
            // Append
            container.appendChild(heart);
        }
    };
    createBackgroundHearts();


    /* --- Theme Toggle Logic --- */
    const themeBtn = document.getElementById('theme-toggle');
    const body = document.body;

    themeBtn.addEventListener('click', () => {
        if (body.classList.contains('light-mode')) {
            body.classList.replace('light-mode', 'dark-mode');
        } else {
            body.classList.replace('dark-mode', 'light-mode');
        }
    });


    /* --- Music Player Toggle Logic --- */
    const musicBtn = document.getElementById('music-toggle');
    const bgMusic = document.getElementById('bg-music');
    let isPlaying = false;

    musicBtn.addEventListener('click', () => {
        if (isPlaying) {
            bgMusic.pause();
            musicBtn.innerHTML = '<ion-icon name="musical-notes-outline" class="music-icon"></ion-icon>';
        } else {
            // Error handling if file missing
            bgMusic.play().catch(error => {
                console.log("Audio playback failed because user hasn't added music to assets folder yet.", error);
            });
            musicBtn.innerHTML = '<ion-icon name="pause-outline" class="music-icon"></ion-icon>';
        }
        isPlaying = !isPlaying;
    });


    /* --- Intersection Observer for Scroll Animation --- */
    const revealElements = document.querySelectorAll('.reveal');

    const reveal = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100; // pixel offset to trigger active state

        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                el.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', reveal);


    /* --- Smooth Scrolling for "Click My Heart" hero button --- */
    const heroBtn = document.getElementById('hero-btn');
    heroBtn.addEventListener('click', () => {
        document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
    });


    /* --- Gallery Lightbox --- */
    const galleryItems = document.querySelectorAll('.gallery-item img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeLightbox = document.querySelector('.close-lightbox');

    galleryItems.forEach(item => {
        item.addEventListener('click', (e) => {
            lightboxImg.src = e.target.src;
            lightbox.classList.add('active');
        });
    });

    closeLightbox.addEventListener('click', () => {
        lightbox.classList.remove('active');
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target !== lightboxImg) {
            lightbox.classList.remove('active');
        }
    });


    /* --- Surprise Modal & Confetti --- */
    const surpriseBtn = document.getElementById('surprise-btn');
    const modal = document.getElementById('surprise-modal');
    const closeModal = document.querySelector('.close-modal');

    surpriseBtn.addEventListener('click', () => {
        modal.classList.add('active');
        // Trigger Canvas Confetti
        if (typeof confetti !== "undefined") {
            const end = Date.now() + 3 * 1000;
            const colors = ['#ff69b4', '#ff1493', '#fff0f5'];
            
            (function frame() {
                confetti({
                    particleCount: 5,
                    angle: 60,
                    spread: 65,
                    origin: { x: 0 },
                    colors: colors,
                    shapes: ['heart'],
                    scalar: 1.5
                });
                confetti({
                    particleCount: 5,
                    angle: 120,
                    spread: 65,
                    origin: { x: 1 },
                    colors: colors,
                    shapes: ['heart'],
                    scalar: 1.5
                });
                if (Date.now() < end) {
                    requestAnimationFrame(frame);
                }
            }());
        }
    });

    closeModal.addEventListener('click', () => {
        modal.classList.remove('active');
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });


    /* --- Heart Cursor Trail Effect --- */
    let lastTime = 0;
    document.addEventListener('mousemove', (e) => {
        const currentTime = new Date().getTime();
        // Throttle heart creation to avoid too many DOM nodes
        if (currentTime - lastTime > 50) { 
            createCursorHeart(e.clientX, e.clientY);
            lastTime = currentTime;
        }
    });

    function createCursorHeart(x, y) {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️'; // or use custom SVG
        heart.classList.add('cursor-heart');
        heart.style.left = `${x}px`;
        heart.style.top = `${y}px`;
        
        document.body.appendChild(heart);

        // Remove from DOM after animation completes (1s)
        setTimeout(() => {
            heart.remove();
        }, 1000);
    }
});

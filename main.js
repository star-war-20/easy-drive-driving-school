document.addEventListener('DOMContentLoaded', () => {
    // Initialize GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Fade Up Animation
    const fadeUpElements = document.querySelectorAll('[data-gsap="fade-up"]');
    fadeUpElements.forEach(el => {
        const delay = el.getAttribute('data-delay') || 0;
        gsap.from(el, {
            y: 50,
            opacity: 0,
            duration: 1,
            delay: Number(delay),
            ease: "power3.out",
            scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // Fade In Animation
    const fadeInElements = document.querySelectorAll('[data-gsap="fade-in"]');
    fadeInElements.forEach(el => {
        const delay = el.getAttribute('data-delay') || 0;
        gsap.from(el, {
            opacity: 0,
            duration: 1.5,
            delay: Number(delay),
            ease: "power2.out",
            scrollTrigger: {
                trigger: el,
                start: "top 90%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // Slide Animations
    const slideRightElements = document.querySelectorAll('[data-gsap="slide-right"]');
    slideRightElements.forEach(el => {
        gsap.from(el, {
            x: -50,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: el,
                start: "top 80%"
            }
        });
    });

    const slideLeftElements = document.querySelectorAll('[data-gsap="slide-left"]');
    slideLeftElements.forEach(el => {
        gsap.from(el, {
            x: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: el,
                start: "top 80%"
            }
        });
    });

    // Zoom In
    const zoomInElements = document.querySelectorAll('[data-gsap="zoom-in"]');
    zoomInElements.forEach(el => {
        gsap.from(el, {
            scale: 0.8,
            opacity: 0,
            duration: 1,
            ease: "back.out(1.7)",
            scrollTrigger: {
                trigger: el,
                start: "top 85%"
            }
        });
    });

    // Parallax Hero Background Effect
    document.addEventListener("mousemove", parallaxHero);
    function parallaxHero(e) {
        const bg = document.getElementById("hero-bg");
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        let mouseX = e.clientX;
        let mouseY = e.clientY;

        let moveX = (mouseX / windowWidth) * -15; // inverted move
        let moveY = (mouseY / windowHeight) * -15;

        gsap.to(bg, {
            x: moveX,
            y: moveY,
            duration: 1,
            ease: "power1.out"
        });
    }

    // 3D Tilt Effect on Cards
    const cards = document.querySelectorAll('.3d-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', handleTilt);
        card.addEventListener('mouseleave', handleTiltReset);
    });

    function handleTilt(e) {
        const card = this;
        const cardRect = card.getBoundingClientRect();

        // Find center of card
        const cardCenterX = cardRect.left + cardRect.width / 2;
        const cardCenterY = cardRect.top + cardRect.height / 2;

        // Mouse coordinate relative to the center
        const mouseX = e.clientX - cardCenterX;
        const mouseY = e.clientY - cardCenterY;

        // Calculate rotation limits (-10 to 10 deg)
        let rotateY = (mouseX / (cardRect.width / 2)) * 10;
        let rotateX = ((mouseY / (cardRect.height / 2)) * -10); // Inverted X

        gsap.to(card, {
            rotateY: rotateY,
            rotateX: rotateX,
            transformPerspective: 1000,
            duration: 0.5,
            ease: "power2.out",
            overwrite: "auto"
        });
    }

    function handleTiltReset() {
        gsap.to(this, {
            rotateY: 0,
            rotateX: 0,
            duration: 0.8,
            ease: "elastic.out(1, 0.3)"
        });
    }

    // 3D Isometric Element Mouse Parallax
    const isoWrapper = document.querySelector('.hero-3d-element');
    const isoElement = document.querySelector('.isometric-float');

    if (isoWrapper && isoElement) {
        isoWrapper.addEventListener('mousemove', (e) => {
            const rect = isoWrapper.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            // Base rotation: rotateX(15deg) rotateY(-15deg)
            const rx = 15 - (y / rect.height) * 20;
            const ry = -15 + (x / rect.width) * 20;

            gsap.to(isoElement, {
                rotateX: rx,
                rotateY: ry,
                duration: 0.5,
                ease: "power1.out"
            });
        });

        isoWrapper.addEventListener('mouseleave', () => {
            gsap.to(isoElement, {
                rotateX: 15,
                rotateY: -15,
                duration: 1,
                ease: "power2.out"
            });
        });
    }

    // Initialize 3D Globe
    window.onload = () => {
        setTimeout(() => {
            const globeContainer = document.getElementById('globe-viz');
            if (globeContainer && typeof Globe !== 'undefined') {
                const locations = [
                    { lat: 52.4862, lng: -1.8904, size: 0.2, color: '#ec4899', name: 'Birmingham' },
                    { lat: 50.8225, lng: -0.1372, size: 0.2, color: '#ec4899', name: 'Brighton' },
                    { lat: 51.4545, lng: -2.5879, size: 0.2, color: '#ec4899', name: 'Bristol' },
                    { lat: 52.9225, lng: -1.4746, size: 0.2, color: '#ec4899', name: 'Derby' },
                    { lat: 53.5228, lng: -1.1311, size: 0.2, color: '#ec4899', name: 'Doncaster' },
                    { lat: 55.9533, lng: -3.1883, size: 0.2, color: '#ec4899', name: 'Edinburgh' },
                    { lat: 55.8642, lng: -4.2518, size: 0.2, color: '#ec4899', name: 'Glasgow' },
                    { lat: 53.6458, lng: -1.7850, size: 0.2, color: '#ec4899', name: 'Huddersfield' },
                    { lat: 53.8008, lng: -1.5491, size: 0.2, color: '#ec4899', name: 'Leeds' },
                    { lat: 53.4084, lng: -2.9916, size: 0.2, color: '#ec4899', name: 'Liverpool' },
                    { lat: 51.5074, lng: -0.1278, size: 0.3, color: '#06b6d4', name: 'London' },
                    { lat: 53.4808, lng: -2.2426, size: 0.2, color: '#ec4899', name: 'Manchester' }
                ];

                const width = globeContainer.clientWidth;
                const height = globeContainer.clientWidth;

                const world = Globe()(globeContainer)
                    .globeImageUrl('https://unpkg.com/three-globe/example/img/earth-dark.jpg')
                    .backgroundColor('rgba(0,0,0,0)')
                    .width(width)
                    .height(height)
                    .labelsData(locations)
                    .labelLat('lat')
                    .labelLng('lng')
                    .labelText('name')
                    .labelSize(1.5)
                    .labelDotRadius('size')
                    .labelColor('color')
                    .labelResolution(2)
                    .labelAltitude(0.01);

                world.pointOfView({ lat: 54, lng: -2, altitude: 1.5 }, 0);

                world.controls().autoRotate = true;
                world.controls().autoRotateSpeed = 1.0;
                world.controls().enableZoom = false;

                window.addEventListener('resize', () => {
                    const newWidth = globeContainer.clientWidth;
                    world.width(newWidth);
                    world.height(newWidth);
                });
            }
        }, 500); // Give the CDN scripts extra time to parse
    };

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.padding = '10px 0';
            navbar.style.background = 'rgba(10, 10, 15, 0.9)';
        } else {
            navbar.style.padding = '15px 0';
            navbar.style.background = 'rgba(10, 10, 15, 0.7)';
        }
    });

    // Interactive Map Logic
    const cityTags = document.querySelectorAll('.city-tag');
    const locationMap = document.getElementById('location-map');

    if (cityTags.length > 0 && locationMap) {
        cityTags.forEach(tag => {
            tag.addEventListener('click', (e) => {
                e.preventDefault();
                const cityName = e.currentTarget.textContent.trim();

                // Remove active styling
                cityTags.forEach(t => {
                    t.style.backgroundColor = '';
                    t.style.color = '';
                    t.style.borderColor = '';
                });

                // Add active styling to clicked
                e.currentTarget.style.backgroundColor = 'var(--primary)';
                e.currentTarget.style.color = '#fff';
                e.currentTarget.style.borderColor = 'var(--primary)';

                // Update iframe src
                const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(cityName + ', UK')}&t=m&z=11&output=embed&iwloc=near`;
                // Briefly add a loading pulse effect
                locationMap.style.opacity = '0.5';
                locationMap.src = mapUrl;

                locationMap.onload = () => {
                    locationMap.style.opacity = '1';
                };
            });
        });
    }
});

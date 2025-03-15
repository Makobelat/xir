document.addEventListener('DOMContentLoaded', function() {
    // Section navigation
    const container = document.querySelector('.container');
    const sections = document.querySelectorAll('.section');
    const navItems = document.querySelectorAll('.section-nav li');
    
    // Flag to prevent scroll events during transitions
    let isScrolling = false;
    let currentSection = 0;
    let isPopupOpen = false; // Track popup state
    
    // Initialize
    updateActiveSection(currentSection);
    
    // Navigation click handler
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // Don't navigate if popup is open
            if (isPopupOpen) return;
            
            const targetSection = this.getAttribute('data-section');
            const targetIndex = Array.from(sections).findIndex(section => section.id === targetSection);
            
            if (targetIndex !== currentSection && !isScrolling) {
                scrollToSection(targetIndex);
            }
        });
    });
    
    // Mouse wheel scroll handler
    document.addEventListener('wheel', function(e) {
        // Don't scroll if popup is open or already scrolling
        if (isScrolling || isPopupOpen) return;
        
        // Determine scroll direction
        if (e.deltaY > 0 && currentSection < sections.length - 1) {
            // Scroll down
            scrollToSection(currentSection + 1);
        } else if (e.deltaY < 0 && currentSection > 0) {
            // Scroll up
            scrollToSection(currentSection - 1);
        }
    }, { passive: true });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        // Don't navigate if popup is open or already scrolling
        if (isScrolling || isPopupOpen) {
            // Allow Escape key for closing popup
            if (e.key === 'Escape' && isPopupOpen) {
                closePopup();
            }
            return;
        }
        
        if ((e.key === 'ArrowDown' || e.key === 'PageDown') && currentSection < sections.length - 1) {
            scrollToSection(currentSection + 1);
        } else if ((e.key === 'ArrowUp' || e.key === 'PageUp') && currentSection > 0) {
            scrollToSection(currentSection - 1);
        }
    });
    
    // Touch events for mobile
    let touchStartY = 0;
    let touchEndY = 0;
    
    document.addEventListener('touchstart', function(e) {
        // Don't track touch if popup is open
        if (isPopupOpen) return;
        
        touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });
    
    document.addEventListener('touchend', function(e) {
        // Don't process touch if popup is open or already scrolling
        if (isScrolling || isPopupOpen) return;
        
        touchEndY = e.changedTouches[0].screenY;
        
        // Determine swipe direction
        if (touchStartY - touchEndY > 50 && currentSection < sections.length - 1) {
            // Swipe up (scroll down)
            scrollToSection(currentSection + 1);
        } else if (touchEndY - touchStartY > 50 && currentSection > 0) {
            // Swipe down (scroll up)
            scrollToSection(currentSection - 1);
        }
    }, { passive: true });
    
    // Function to scroll to a specific section
    function scrollToSection(index) {
        if (index === currentSection || isScrolling) return;
        
        isScrolling = true;
        currentSection = index;
        
        // Update UI
        updateActiveSection(currentSection);
        
        // After transition completes, allow scrolling again
        setTimeout(() => {
            isScrolling = false;
        }, 1000); // Slightly longer than the CSS transition
    }
    
    // Update active section UI
    function updateActiveSection(index) {
        // Move container
        container.style.transform = `translateX(-${index * 20}%)`;
        
        // Update nav dots
        navItems.forEach(navItem => navItem.classList.remove('active'));
        navItems[index].classList.add('active');
        
        // Update section active class
        sections.forEach(section => section.classList.remove('active'));
        sections[index].classList.add('active');
    }
    
    // Service popup functionality
    const serviceCards = document.querySelectorAll('.service-card');
    const popupOverlay = document.querySelector('.service-popup-overlay');
    const popup = document.querySelector('.service-popup');
    const popupClose = document.querySelector('.popup-close');
    const popupTitle = document.querySelector('.popup-title');
    const popupDescription = document.querySelector('.popup-description');
    const galleryTrack = document.querySelector('.gallery-track');
    const prevButton = document.querySelector('.gallery-nav.prev');
    const nextButton = document.querySelector('.gallery-nav.next');
    
    // Service data
    const serviceData = {
        'strategic-planning': {
            title: 'Strategic Planning',
            description: `
                <p>Our Strategic Planning service helps businesses develop comprehensive roadmaps for sustainable growth and success. We work closely with your leadership team to understand your vision, analyze your current position, and chart a clear path forward.</p>
                
                <p>Our approach includes:</p>
                <ul>
                    <li>Comprehensive market and competitive analysis</li>
                    <li>Identification of core strengths and opportunities</li>
                    <li>Development of clear, actionable objectives</li>
                    <li>Creation of detailed implementation plans</li>
                    <li>Establishment of key performance indicators</li>
                    <li>Regular review and adaptation processes</li>
                </ul>
                
                <p>We don't just create plans - we partner with you to ensure they're implemented effectively and adjusted as needed to respond to changing market conditions.</p>
            `,
            images: [
                'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
                'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
                'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
            ]
        },
        'digital-transformation': {
            title: 'Digital Transformation',
            description: `
                <p>Our Digital Transformation service helps businesses modernize their operations and leverage cutting-edge technology to gain competitive advantages. We guide you through the entire process of adopting digital solutions that enhance efficiency, improve customer experiences, and drive growth.</p>
                
                <p>Our comprehensive approach includes:</p>
                <ul>
                    <li>Assessment of current technological capabilities</li>
                    <li>Identification of digital opportunities and priorities</li>
                    <li>Development of tailored digital roadmaps</li>
                    <li>Implementation of cloud solutions and automation</li>
                    <li>Integration of AI and data analytics</li>
                    <li>Training and change management support</li>
                </ul>
                
                <p>We ensure your digital transformation is aligned with your business goals and delivers measurable results, helping you stay ahead in an increasingly digital world.</p>
            `,
            images: [
                'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
                'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
                'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
            ]
        },
        'market-analysis': {
            title: 'Market Analysis',
            description: `
                <p>Our Market Analysis service provides businesses with deep insights into market trends, customer behaviors, and competitive landscapes. We help you understand the forces shaping your industry and identify opportunities for growth and differentiation.</p>
                
                <p>Our comprehensive analysis includes:</p>
                <ul>
                    <li>Industry trend identification and forecasting</li>
                    <li>Customer segmentation and behavior analysis</li>
                    <li>Competitive positioning assessment</li>
                    <li>SWOT and PESTEL analysis</li>
                    <li>Market size and growth potential evaluation</li>
                    <li>Pricing strategy optimization</li>
                </ul>
                
                <p>Armed with our data-driven insights, you can make confident decisions about product development, marketing strategies, and business expansion to maximize your market potential.</p>
            `,
            images: [
                'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
                'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
                'https://images.unsplash.com/photo-1543286386-713bdd548da4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
            ]
        },
        'process-optimization': {
            title: 'Process Optimization',
            description: `
                <p>Our Process Optimization service helps businesses streamline workflows, eliminate inefficiencies, and maximize productivity. We analyze your current operations and implement proven methodologies to enhance performance across your organization.</p>
                
                <p>Our approach includes:</p>
                <ul>
                    <li>Comprehensive process mapping and analysis</li>
                    <li>Identification of bottlenecks and inefficiencies</li>
                    <li>Implementation of lean and Six Sigma methodologies</li>
                    <li>Workflow automation and integration</li>
                    <li>Development of standard operating procedures</li>
                    <li>Continuous improvement frameworks</li>
                </ul>
                
                <p>By optimizing your processes, we help you reduce costs, improve quality, enhance customer satisfaction, and create a more agile organization capable of adapting to changing market demands.</p>
            `,
            images: [
                'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
                'https://images.unsplash.com/photo-1454789548928-9efd52dc4031?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
                'https://images.unsplash.com/photo-1512758017271-d7b84c2113f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
            ]
        }
    };
    
    let currentSlide = 0;
    let totalSlides = 0;
    
    // Open popup when service card is clicked
    serviceCards.forEach(card => {
        card.addEventListener('click', function() {
            const serviceId = this.getAttribute('data-service');
            const service = serviceData[serviceId];
            
            if (service) {
                // Set popup content
                popupTitle.textContent = service.title;
                popupDescription.innerHTML = service.description;
                
                // Create gallery slides
                galleryTrack.innerHTML = '';
                service.images.forEach(image => {
                    const slide = document.createElement('div');
                    slide.className = 'gallery-slide';
                    slide.innerHTML = `<img src="${image}" alt="${service.title}">`;
                    galleryTrack.appendChild(slide);
                });
                
                // Reset gallery position
                currentSlide = 0;
                totalSlides = service.images.length;
                updateGallery();
                
                // Show popup and lock scrolling
                openPopup();
            }
        });
    });
    
    // Function to open popup and lock scrolling
    function openPopup() {
        isPopupOpen = true;
        popupOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
    
    // Function to close popup and release scrolling
    function closePopup() {
        isPopupOpen = false;
        popupOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
    
    // Close popup
    popupClose.addEventListener('click', closePopup);
    popupOverlay.addEventListener('click', function(e) {
        if (e.target === popupOverlay) {
            closePopup();
        }
    });
    
    // Gallery navigation
    prevButton.addEventListener('click', function() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateGallery();
    });
    
    nextButton.addEventListener('click', function() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateGallery();
    });
    
    function updateGallery() {
        galleryTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
    
    // Close popup with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isPopupOpen) {
            closePopup();
        }
    });
});

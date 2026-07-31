/*

TemplateMo 595 3d coverflow

https://templatemo.com/tm-595-3d-coverflow

*/

// JavaScript Document

        // Coverflow functionality
        const items = document.querySelectorAll('.coverflow-item');
        const dotsContainer = document.getElementById('dots');
        const currentTitle = document.getElementById('current-title');
        const currentDescription = document.getElementById('current-description');
        const container = document.querySelector('.coverflow-container');
        const menuToggle = document.getElementById('menuToggle');
        const mainMenu = document.getElementById('mainMenu');
        let currentIndex = 3;
        let isAnimating = false;

        // Mobile menu toggle
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            mainMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on menu items (except external links)
        document.querySelectorAll('.menu-item:not(.external)').forEach(item => {
            item.addEventListener('click', (e) => {
                menuToggle.classList.remove('active');
                mainMenu.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!menuToggle.contains(e.target) && !mainMenu.contains(e.target)) {
                menuToggle.classList.remove('active');
                mainMenu.classList.remove('active');
            }
        });

        const imageData = [
    {
        title: "Bali",
        description: "Island of Gods • Tropical Paradise"
    },
    {
        title: "Dubai",
        description: "Luxury, Skyline & Desert Adventures"
    },
    {
        title: "Maldives",
        description: "Crystal Clear Waters & Overwater Villas"
    },
    {
        title: "Singapore",
        description: "The Perfect Blend of Nature & Modern City"
    },
    {
        title: "Thailand",
        description: "Beaches, Temples & Vibrant Nightlife"
    },
    {
        title: "Vietnam",
        description: "Culture, Landscapes & Timeless Beauty"
    },
    {
        title: "Baku",
        description: "Where Europe Meets Asia"
    }
];

        // Create dots
        items.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = 'dot';
            dot.onclick = () => goToIndex(index);
            dotsContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll('.dot');
        let autoplayInterval = null;
        let isPlaying = true;
        const playIcon = document.querySelector('.play-icon');
        const pauseIcon = document.querySelector('.pause-icon');

        function updateCoverflow() {
            if (isAnimating) return;
            isAnimating = true;

            items.forEach((item, index) => {
                let offset = index - currentIndex;
                
                if (offset > items.length / 2) {
                    offset = offset - items.length;
                }
                else if (offset < -items.length / 2) {
                    offset = offset + items.length;
                }
                
                const absOffset = Math.abs(offset);
                const sign = Math.sign(offset);
                
                let translateX = offset * 220;
                let translateZ = -absOffset * 200;
                let rotateY = -sign * Math.min(absOffset * 60, 60);
                let opacity = 1 - (absOffset * 0.2);
                let scale = 1 - (absOffset * 0.1);

                if (absOffset > 3) {
                    opacity = 0;

                    translateX = sign * 800;
                }

                item.style.transform = `
                    translateX(${translateX}px) 
                    translateZ(${translateZ}px) 
                    rotateY(${rotateY}deg)
                    scale(${scale})
                `;
                item.style.opacity = opacity;
                item.style.zIndex = 100 - absOffset;

                item.classList.toggle('active', index === currentIndex);
            });

            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });

            const currentData = imageData[currentIndex];
            currentTitle.textContent = currentData.title;
            currentDescription.textContent = currentData.description;
            
            currentTitle.style.animation = 'none';
            currentDescription.style.animation = 'none';
            setTimeout(() => {
                currentTitle.style.animation = 'fadeIn 0.6s forwards';
                currentDescription.style.animation = 'fadeIn 0.6s forwards';
            }, 10);

            setTimeout(() => {
                isAnimating = false;
            }, 600);
        }

        function navigate(direction) {
            if (isAnimating) return;
            
            currentIndex = currentIndex + direction;
            
            if (currentIndex < 0) {
                currentIndex = items.length - 1;
            } else if (currentIndex >= items.length) {
                currentIndex = 0;
            }
            
            updateCoverflow();
        }

        function goToIndex(index) {
            if (isAnimating || index === currentIndex) return;
            currentIndex = index;
            updateCoverflow();
        }

        // Keyboard navigation
        container.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') navigate(-1);
            if (e.key === 'ArrowRight') navigate(1);
        });

        // Click on items to select
        items.forEach((item, index) => {
            item.addEventListener('click', () => goToIndex(index));
        });

        // Touch/swipe support
        let touchStartX = 0;
        let touchEndX = 0;
        let touchStartY = 0;
        let touchEndY = 0;
        let isSwiping = false;

        container.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;
            isSwiping = true;
        }, { passive: true });

        container.addEventListener('touchmove', (e) => {
            if (!isSwiping) return;
            
            const currentX = e.changedTouches[0].screenX;
            const diff = currentX - touchStartX;
            
            if (Math.abs(diff) > 10) {
                e.preventDefault();
            }
        }, { passive: false });

        container.addEventListener('touchend', (e) => {
            if (!isSwiping) return;
            
            touchEndX = e.changedTouches[0].screenX;
            touchEndY = e.changedTouches[0].screenY;
            handleSwipe();
            isSwiping = false;
        }, { passive: true });

        function handleSwipe() {
            const swipeThreshold = 30;
            const diffX = touchStartX - touchEndX;
            const diffY = touchStartY - touchEndY;
            
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > swipeThreshold) {
                handleUserInteraction();
                
                if (diffX > 0) {
                    navigate(1);
                } else {
                    navigate(-1);
                }
            }
        }

        // Initialize images and reflections
        items.forEach((item, index) => {
            const img = item.querySelector('img');
            const reflection = item.querySelector('.reflection');
            
            img.onload = function() {

                this.parentElement.classList.remove('image-loading');
                reflection.style.setProperty('--bg-image', `url(${this.src})`);
                reflection.style.backgroundImage = `url(${this.src})`;
                reflection.style.backgroundSize = 'cover';
                reflection.style.backgroundPosition = 'center';
            };
            
            img.onerror = function() {
                this.parentElement.classList.add('image-loading');
            };
        });

        // Autoplay functionality
        function startAutoplay() {
            autoplayInterval = setInterval(() => {
                currentIndex = (currentIndex + 1) % items.length;
                updateCoverflow();
            }, 4000);
            isPlaying = true;
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'block';
        }

        function stopAutoplay() {
            if (autoplayInterval) {
                clearInterval(autoplayInterval);
                autoplayInterval = null;
            }
            isPlaying = false;
            playIcon.style.display = 'block';
            pauseIcon.style.display = 'none';
        }

        function toggleAutoplay() {
            if (isPlaying) {
                stopAutoplay();
            } else {
                startAutoplay();
            }
        }

        function handleUserInteraction() {
            stopAutoplay();
        }

        // Add event listeners to stop autoplay on manual navigation
        items.forEach((item) => {
            item.addEventListener('click', handleUserInteraction);
        });

        document.querySelector('.nav-button.prev').addEventListener('click', handleUserInteraction);
        document.querySelector('.nav-button.next').addEventListener('click', handleUserInteraction);
        
        dots.forEach((dot) => {
            dot.addEventListener('click', handleUserInteraction);
        });

        container.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                handleUserInteraction();
            }
        });

        // Smooth scrolling and active menu item
        const sections = document.querySelectorAll('.section');
        const menuItems = document.querySelectorAll('.menu-item');
        const header = document.getElementById('header');
        const scrollToTopBtn = document.getElementById('scrollToTop');

        // Update active menu item on scroll
        function updateActiveMenuItem() {
            const scrollPosition = window.scrollY + 100;

            sections.forEach((section, index) => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;

                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    menuItems.forEach(item => {
                        if (!item.classList.contains('external')) {
                            item.classList.remove('active');
                        }
                    });
                    if (menuItems[index] && !menuItems[index].classList.contains('external')) {
                        menuItems[index].classList.add('active');
                    }
                }
            });

            // Header background on scroll
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            // Show/hide scroll to top button
            if (window.scrollY > 500) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        }

        window.addEventListener('scroll', updateActiveMenuItem);

        // Smooth scroll to section
        menuItems.forEach(item => {
            item.addEventListener('click', (e) => {
                const targetId = item.getAttribute('href');
                
                // Check if it's an internal link (starts with #)
                if (targetId && targetId.startsWith('#')) {
                    e.preventDefault();
                    const targetSection = document.querySelector(targetId);
                    
                    if (targetSection) {
                        targetSection.scrollIntoView({ behavior: 'smooth' });
                    }
                }
                // External links will open normally in new tab
            });
        });

        // Logo click to scroll to top
        document.querySelector('.logo-container').addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        // Scroll to top button
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        // Form submission
        function handleSubmit(event) {
            event.preventDefault();
            alert('Thank you for your message! We\'ll get back to you soon.');
            event.target.reset();
        }

        // Initialize
        updateCoverflow();
        container.focus();
        startAutoplay();

        /*=========================================
      SERVICE POPUP - PART 1
=========================================*/

const popup = document.getElementById("servicePopup");
const popupTitle = document.getElementById("popupTitle");
const popupIcon = document.getElementById("popupIcon");
const dynamicFields = document.getElementById("dynamicFields");

const closePopup = document.getElementById("closePopup");
const overlay = document.querySelector(".popup-overlay");

const serviceCards = document.querySelectorAll(".service-card");

serviceCards.forEach(card => {

    card.addEventListener("click", function(){

        const service = this.dataset.service;
        const icon = this.dataset.icon;

        popup.classList.add("active");

        popupTitle.innerText = service;

        popupIcon.src = icon;

        loadForm(service);

    });

});

closePopup.addEventListener("click", ()=>{

    popup.classList.remove("active");

});

overlay.addEventListener("click", ()=>{

    popup.classList.remove("active");

});

document.addEventListener("keydown",(e)=>{

    if(e.key==="Escape"){

        popup.classList.remove("active");

    }

});
/*=========================================
      LOAD FORM
=========================================*/

function loadForm(service){

let html = "";

switch(service){

/* ==========================================================
   HOLIDAY PACKAGES
========================================================== */

case "Holiday Packages":

html = `

<input type="text" name="name" placeholder="Full Name" required>

<input type="tel"
       name="mobile"
       placeholder="Mobile Number"
       maxlength="10"
       required>

<input type="text"
       id="destinationField"
       name="destination"
       placeholder="Destination"
       readonly>

<input type="text"
       name="departure_city"
       placeholder="Departure City"
       required>

<label>Travel Date</label>

<input type="date"
       name="travel_date"
       required>

<input type="number"
       name="adults"
       placeholder="Adults"
       min="1"
       value="2"
       required>

<input type="number"
       name="children"
       placeholder="Children"
       min="0"
       value="0">

<input type="number"
       name="infants"
       placeholder="Infants"
       min="0"
       value="0">

<select name="hotel_category">

<option value="">Hotel Category</option>

<option>3 Star</option>

<option>4 Star</option>

<option>5 Star</option>

<option>Luxury Resort</option>

</select>

<select name="meal_plan">

<option value="">Meal Plan</option>

<option>EP</option>

<option>CP</option>

<option>MAP</option>

<option>AP</option>

</select>

<input type="text"
       name="budget"
       placeholder="Approx Budget">

<textarea
name="requirements"
rows="4"
placeholder="Special Requirements"></textarea>

`;

break;


/* ==========================================================
   FLIGHTS
========================================================== */

case "Flights":

html = `

<input type="text"
name="name"
placeholder="Full Name"
required>

<input type="tel"
name="mobile"
placeholder="Mobile Number"
required>

<input type="text"
name="from"
placeholder="From City"
required>

<input type="text"
name="to"
placeholder="Destination"
required>

<label>Departure Date</label>

<input type="date"
name="departure"
required>

<label>Return Date</label>

<input type="date"
name="return">

<input type="number"
name="adults"
placeholder="Adults"
min="1"
required>

<input type="number"
name="children"
placeholder="Children"
min="0">

<input type="number"
name="infants"
placeholder="Infants"
min="0">

<select name="class">

<option>Economy</option>
<option>Premium Economy</option>
<option>Business</option>
<option>First Class</option>

</select>

`;

break;


/* ==========================================================
   HOTELS
========================================================== */

case "Hotels":

html = `

<input type="text"
name="name"
placeholder="Full Name"
required>

<input type="tel"
name="mobile"
placeholder="Mobile Number"
required>

<input type="text"
name="destination"
placeholder="Destination"
required>

<label>Check In</label>

<input type="date"
name="checkin"
required>

<label>Check Out</label>

<input type="date"
name="checkout"
required>

<input type="number"
name="rooms"
placeholder="Rooms"
min="1">

<input type="number"
name="guests"
placeholder="Guests"
min="1">

`;

break;


/* ==========================================================
   TRANSFERS
========================================================== */

case "Transfers":

html = `

<input type="text"
name="name"
placeholder="Full Name">

<input type="tel"
name="mobile"
placeholder="Mobile Number">

<input type="text"
name="pickup"
placeholder="Pickup Location">

<input type="text"
name="drop"
placeholder="Drop Location">

<label>Travel Date</label>

<input type="date"
name="date">

<input type="number"
name="passengers"
placeholder="Passengers">

`;

break;


/* ==========================================================
   CRUISES
========================================================== */

case "Cruises":

html = `

<input type="text"
name="name"
placeholder="Full Name">

<input type="tel"
name="mobile"
placeholder="Mobile Number">

<input type="text"
name="destination"
placeholder="Cruise Destination">

<input type="text"
name="month"
placeholder="Travel Month">

<input type="number"
name="passengers"
placeholder="Passengers">

`;

break;


/* ==========================================================
   CORPORATE
========================================================== */

case "Corporate Travel":

html = `

<input type="text"
name="company"
placeholder="Company Name">

<input type="text"
name="contact"
placeholder="Contact Person">

<input type="tel"
name="mobile"
placeholder="Mobile Number">

<textarea
name="requirement"
rows="4"
placeholder="Travel Requirement"></textarea>

`;

break;


/* ==========================================================
   PASSPORT
========================================================== */

case "Passport & Visa":

html = `

<input type="text"
name="name"
placeholder="Full Name">

<input type="tel"
name="mobile"
placeholder="Mobile Number">

<select name="service">

<option>New Passport</option>

<option>Passport Renewal</option>

<option>Passport Re-Issue</option>

<option>Tatkal Passport</option>

<option>Visa Assistance</option>

</select>

<input type="text"
name="country"
placeholder="Country (Visa)">

`;

break;


/* ==========================================================
   WEDDING
========================================================== */

case "Destination Weddings":

html = `

<input type="text"
name="name"
placeholder="Full Name">

<input type="tel"
name="mobile"
placeholder="Mobile Number">

<input type="text"
name="destination"
placeholder="Wedding Destination">

<label>Wedding Date</label>

<input type="date"
name="date">

<input type="number"
name="guests"
placeholder="Guests">

`;

break;

}

dynamicFields.innerHTML = html;

}
/*=========================================
      WHATSAPP SUBMIT
=========================================*/

const whatsappNumber = "919173276527";

document.getElementById("serviceForm").addEventListener("submit", function(e){

    e.preventDefault();

    const formData = new FormData(this);

    let message = "🌍 *Marlin Holidays Enquiry*%0A%0A";

    message += "*Service:* " + popupTitle.innerText + "%0A%0A";

    for (let pair of formData.entries()){

        if(pair[1] !== ""){

            let label = pair[0]
                .replace(/_/g," ")
                .replace(/\b\w/g,function(l){
                    return l.toUpperCase();
                });

            message += "*" + label + ":* " + pair[1] + "%0A";

        }

    }

    message += "%0AThank you.%0APlease share the best available options.";

    window.open(
        "https://wa.me/" + whatsappNumber + "?text=" + message,
        "_blank"
    );

    popup.classList.remove("active");

    this.reset();

    dynamicFields.innerHTML = "";

});
/*=========================================
    DESTINATION POPUP
=========================================*/

document.querySelectorAll(".destination-card").forEach(card => {

    card.addEventListener("click", function(e){

        e.preventDefault();

        const destination = this.dataset.destination;

        popup.classList.add("active");

        popupTitle.innerText = destination + " Holiday Package";

        popupIcon.src = "images/icons/tour-packages.png";

        loadForm("Holiday Packages");

        setTimeout(function(){

            const destinationField = document.getElementById("destinationField");

            if(destinationField){

                destinationField.value = destination;

            }

        },100);

    });

});
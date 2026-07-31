/*==================================================
MARLIN HOLIDAYS - DOMESTIC JS
==================================================*/

/*==============================
HEADER
==============================*/

const menuToggle = document.getElementById("menuToggle");
const mainMenu = document.getElementById("mainMenu");
const header = document.getElementById("header");

if(menuToggle && mainMenu){

menuToggle.addEventListener("click",()=>{

menuToggle.classList.toggle("active");
mainMenu.classList.toggle("active");

});

document.querySelectorAll(".menu-item").forEach(item=>{

item.addEventListener("click",()=>{

menuToggle.classList.remove("active");
mainMenu.classList.remove("active");

});

});

document.addEventListener("click",(e)=>{

if(!menuToggle.contains(e.target) && !mainMenu.contains(e.target)){

menuToggle.classList.remove("active");
mainMenu.classList.remove("active");

}

});

}

window.addEventListener("scroll",()=>{

if(!header) return;

if(window.scrollY>50){

header.classList.add("scrolled");

}else{

header.classList.remove("scrolled");

}

});


/*==============================
POPUP VARIABLES
==============================*/

const popup=document.getElementById("servicePopup");

const popupTitle=document.getElementById("popupTitle");

const popupIcon=document.getElementById("popupIcon");

const dynamicFields=document.getElementById("dynamicFields");

const closePopup=document.getElementById("closePopup");

const overlay=document.querySelector(".popup-overlay");


if(closePopup){

closePopup.addEventListener("click",()=>{

popup.classList.remove("active");

});

}

if(overlay){

overlay.addEventListener("click",()=>{

popup.classList.remove("active");

});

}

document.addEventListener("keydown",(e)=>{

if(e.key==="Escape"){

popup.classList.remove("active");

}

});


/*==============================
DESTINATION CARD
==============================*/

document.querySelectorAll(".destination-card").forEach(card=>{

card.addEventListener("click",function(e){

e.preventDefault();

const destination=this.dataset.destination;

popup.classList.add("active");

popupTitle.innerText=destination+" Holiday Package";

popupIcon.src="images/icons/tour-packages.png";

loadForm("Holiday Packages");

setTimeout(()=>{

const destinationField=document.getElementById("destinationField");

if(destinationField){

destinationField.value=destination;

}

},100);

});

});


/*==============================
LOAD FORM
==============================*/

function loadForm(service){

let html="";

switch(service){

case "Holiday Packages":

html=`<input type="text"
name="name"
placeholder="Full Name"
required>

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

<label>Adults</label>

<input type="number"
name="adults"
placeholder="Adults"
min="1"
value="2"
required>

<label>Children</label>

<input type="number"
name="children"
placeholder="Children"
min="0"
value="0">

<label>Infants</label>

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

break;case "Cruises":

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
    OPTIONAL SAFETY
=========================================*/

window.addEventListener("load", () => {

    console.log("Marlin Holidays Domestic JS Loaded");

});
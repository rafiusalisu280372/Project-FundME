// Fetch the JSON data for country codes
fetch('CountryCodes.json')
.then(response => response.json())
.then(data => {
    const select = document.getElementById('dialCodeSelect');
    const country = document.getElementById('country');
    const country1 = document.getElementById('permanent-country');
    const desiredDialCode = "+234";
    const desiredCountry = "Nigeria";
    // Loop through the JSON data and create options
    for (const item of data) {
        const option = document.createElement('option');
        option.value = item.dial_code;
        option.text = `${item.name} (${item.dial_code})`;
        select.appendChild(option);
    
        const option1 = document.createElement('option');
        option1.value = option1.text = item.name;
        country.appendChild(option1);
      
        const option2 = document.createElement('option');
        option2.value = option2.text = item.name;
        country1.appendChild(option2);
        
       if (item.dial_code === desiredDialCode || item.name === desiredCountry) {
            select.value = item.dial_code;
            country.value = item.name;
            country1.value = item.name;
        }
    }
})
.catch(error => console.error('Error loading JSON:', error));
// Function to create the event listener and populate the state select element
function setupCountrySelectListener(countrySelect, stateSelect, data) {
    countrySelect.addEventListener("change", function () {
      // Get the selected country value
      const selectedCountry = countrySelect.value;
  
      // Find the corresponding states for the selected country in the fetched data
      const selectedCountryData = data.countries.find(countryData => countryData.country === selectedCountry);
  
      // Populate the state select element with the states of the selected country
      if (selectedCountryData) {
        stateSelect.innerHTML = ""; // Clear existing options
  
        selectedCountryData.states.forEach(state => {
          const option = document.createElement("option");
          option.value = state;
          option.text = state;
          stateSelect.appendChild(option);
        });
      } else {
        // If the selected country doesn't have data, clear the state select
        stateSelect.innerHTML = "";
      }
    });
}
// Fetch the JSON data once
fetch('CountryStates.json')
.then(response => response.json())
.then(data => {
    // Get references to select elements
    const countrySelect = document.getElementById("country");
    const stateSelect = document.getElementById("state");
    const permanent_countrySelect = document.getElementById("permanent-country");
    const permanent_stateSelect = document.getElementById("permanent-state");

    // Set default state value for both state selects
    const defaultState = "Abia";

    stateSelect.value = defaultState;
    permanent_stateSelect.value = defaultState;

    // Set up event listeners and populate state selects for both country fields
    setupCountrySelectListener(countrySelect, stateSelect, data);
    setupCountrySelectListener(permanent_countrySelect, permanent_stateSelect, data);

    // Trigger the change event to populate the state options for the default country on page load
    const changeEvent = new Event("change", { bubbles: true });
    countrySelect.dispatchEvent(changeEvent);
    permanent_countrySelect.dispatchEvent(changeEvent);
})
.catch(error => {
    console.error("Error fetching data:", error);
});
  
  

  






// Get the file input elements
const frontIdCardInput = document.getElementById("front-id-card");
const backIdCardInput = document.getElementById("back-id-card");
const selfieInput = document.getElementById("selfie");

// Get the image preview elements
const frontIdCardPreview = document.getElementById("front-id-card-preview");
const backIdCardPreview = document.getElementById("back-id-card-preview");
const selfiePreview = document.getElementById("selfie-preview");

// Add a change event listener to each file input element
frontIdCardInput.addEventListener("change", function() {
    // Display the preview of the selected image
    displayImagePreview(frontIdCardInput, frontIdCardPreview);
});

backIdCardInput.addEventListener("change", function() {
    // Display the preview of the selected image
    displayImagePreview(backIdCardInput, backIdCardPreview);
});

selfieInput.addEventListener("change", function() {
    // Display the preview of the selected image
    displayImagePreview(selfieInput, selfiePreview);
});

// Function to display the preview of a selected image
function displayImagePreview(fileInput, imagePreview) {
    // Check if the selected file is an image
    if (fileInput.files && fileInput.files[0] && fileInput.files[0].type.match("image.*")) {
        // Create a new FileReader object
        const reader = new FileReader();

        // Add a load event listener to the FileReader object
        reader.addEventListener("load", function() {
        // Set the src attribute of the image preview element to the data URL of the selected image
        imagePreview.src = reader.result;
        });

        // Read the selected image as a data URL
        reader.readAsDataURL(fileInput.files[0]);
    } else {
        // Clear the image preview element
        imagePreview.src = "";
    }
}

//page management
function init() {
 
    //verification btns
    const continueBtn1 = getDom('#continue1')
    const continueBtn2 = getDom('#continue2')
    const continueBtn3 = getDom('#continue3')

    // Get verification containers
    const verificationContainer1 = getDom('#verification-container1')
    const verificationContainer2 = getDom('#verification-container2')
    const verificationContainer3 = getDom('#verification-container3')
    const verificationContainer4 = getDom('#verification-container4')

    verificationContainer1.classList.remove('hidden');
    
    //get nav btns
    showVerification2(continueBtn1)
    showVerification3(continueBtn2)
    showVerification4(continueBtn3)

    function showVerification2(btn){
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const phone_number = document.getElementById("phone_number").value;
            const date_of_birth = document.getElementById("date-of-birth").value;
            const gender = document.getElementById("gender").value;

            if (name === "" || email === "" || phone_number === "" || date_of_birth === "" || gender === "") {
                const errorAlert = document.querySelector('#error1');
                errorAlert.textContent = 'Please fill in all the required fields.';

                setTimeout(function() {
                    errorAlert.textContent = ''; // Clears the text after 3 seconds
                }, 3000); // 3000 milliseconds = 3 seconds
            }else{
                // show step two of verificatioin
                verificationContainer1.classList.add('hidden')
                verificationContainer2.classList.remove('hidden')
            }
        })
    }

    function showVerification3(btn){
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const country = document.getElementById("country").value;
            const state = document.getElementById("state").value;
            const residentialAddress = document.getElementById("residential-address").value;
            const permanentCountry = document.getElementById("permanent-country").value;
            const permanentState = document.getElementById("permanent-state").value;
            const permanentAddress = document.getElementById("permanent-address").value;

            if (country === "" || state === "" || residentialAddress === "" || permanentCountry === "" || permanentState === "" || permanentAddress === "") {
                const errorAlert = document.querySelector('#error2');
                errorAlert.textContent = 'Please fill in all the required fields.';

                setTimeout(function() {
                    errorAlert.textContent = ''; // Clears the text after 3 seconds
                }, 3000); // 3000 milliseconds = 3 seconds

            }else{
                // show step three of verificatioin
                verificationContainer2.classList.add('hidden')
                verificationContainer3.classList.remove('hidden')
            }
        })
    }

    function showVerification4(btn){
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            // show success 
            verificationContainer3.classList.add('hidden')
            verificationContainer4.classList.remove('hidden')
        })
    }

}

init()


// Add Click event to switch between light and dark theme
var themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
var themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

// Change the icons inside the button based on previous settings
if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    themeToggleLightIcon.classList.remove('hidden');
} else {
    themeToggleDarkIcon.classList.remove('hidden');
}

var themeToggleBtn = document.getElementById('theme-toggle');

themeToggleBtn.addEventListener('click', function() {

    // toggle icons inside button
    themeToggleDarkIcon.classList.toggle('hidden');
    themeToggleLightIcon.classList.toggle('hidden');

    // if set via local storage previously
    if (localStorage.getItem('color-theme')) {
        if (localStorage.getItem('color-theme') === 'light') {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        }

    // if NOT set via local storage previously
    } else {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        }
    }
});



// On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark')
    }
    
    
    
 // Gets Dom from the document body
 function getDom(selector) {
   return document.querySelector(selector);
 }
 
 
 // Get inner selector from outter Selector
 function getInnerDom(outterSelector) {
    (innerSelector) => {
     return outterSelector.querySelector(innerSelector)
   }
 }

//get the copyright span element
var element = document.querySelector('.tm-current-year');

// Get the current year
var currentYear = new Date().getFullYear();

// Set the text content of the element to the current year
element.textContent = currentYear;
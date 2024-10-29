// Function to set the value of the hidden field to the current date and time
function setCurrentDateTime() {
    var currentDate = new Date();
    var formattedDateTime = currentDate.toISOString(); // Convert date to ISO string format
    document.querySelector('#currentDateTime').value = formattedDateTime;
}

// Call the function when the page loads
// window.onload = setCurrentDateTime;

window.onsubmit = setCurrentDateTime;


const organisation = document.querySelector('#organ');
const nameerror = document.querySelector('.pwderror');
var regularExpression = /^[a-zA-Z -]{7,}$/;
var numbers = /[0-9]/g;

organisation.addEventListener('focusout', () => {
    if (organisation.value.length < 7) {
        nameerror.style.backgroundColor = '#9c2c13';
        nameerror.style.display = 'block';
        nameerror.textContent = "❗Organ name needs at least 7 characters!";
        organisation.value = "";
        organisation.focus();

    } else if (!regularExpression.test(organisation.value)) {
        nameerror.style.backgroundColor = '#9c2c13';
        nameerror.textContent = "❗Accepts alpha characters, hyphens, and spaces!";
        organisation.value = "";
        organisation.focus();
    } else if (organisation.value.match(numbers)) {
        nameerror.style.backgroundColor = '#9c2c13';
        nameerror.style.display = 'block';
        nameerror.textContent = "❗Organ name should not nave numbers!";
        organisation.value = "";
        organisation.focus();
    } else {
        nameerror.textContent = "❗Organ name looks good!";
        nameerror.style.backgroundColor = 'green';

        // After 1 second, revert the background color and hide the message
        setTimeout(() => {
            nameerror.style.display = 'none';
        }, 1500);

    }



});


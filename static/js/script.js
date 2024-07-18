// static/js/script.js

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('patientForm');

    form.addEventListener('submit', function(event) {
        let isValid = true;

        // Validate name
        const name = document.getElementById('name');
        if (name.value.trim() === '') {
            isValid = false;
            alert('Please enter your name.');
        }

        // Validate age
        const age = document.getElementById('age');
        if (age.value === '' || isNaN(age.value) || age.value < 0 || age.value > 120) {
            isValid = false;
            alert('Please enter a valid age between 0 and 120.');
        }

        // Validate stage
        const stage = document.getElementById('stage');
        if (stage.value === '') {
            isValid = false;
            alert('Please select a cancer stage.');
        }

        // Validate location
        const location = document.getElementById('location');
        if (location.value.trim() === '') {
            isValid = false;
            alert('Please enter your location.');
        }

        // Validate family history
        const familyHistory = document.getElementById('family_history');
        if (familyHistory.value === '') {
            isValid = false;
            alert('Please select your family history of breast cancer.');
        }

        // Validate genetic testing
        const geneticTesting = document.getElementById('genetic_testing');
        if (geneticTesting.value === '') {
            isValid = false;
            alert('Please indicate if you have had genetic testing.');
        }

        // Validate consent
        const consent = document.querySelector('input[name="consent"]:checked');
        if (!consent) {
            isValid = false;
            alert('Please provide informed consent for telemedicine consultation.');
        }

        // Validate help today
        const helpToday = document.getElementById('help_today');
        if (consent && consent.value === 'yes' && helpToday.value === '') {
            isValid = false;
            alert('Please indicate how we can help you today.');
        }

        // Additional dynamic validation based on help_today selection
        const helpOption = document.querySelector('input[name="help_option"]:checked');
        if (helpToday && helpToday.value === 'Newly Diagnosed with Cancer' && !helpOption) {
            isValid = false;
            alert('Please select an option to help with your diagnosis.');
        }

        const secondOpinion = document.querySelector('input[name="second_opinion"]:checked');
        if (helpOption && helpOption.value === 'Help with Diagnosis' && !secondOpinion) {
            isValid = false;
            alert('Please indicate if you need help finding a second opinion.');
        }

        const startedTreatment = document.querySelector('input[name="started_treatment"]:checked');
        if (secondOpinion && secondOpinion.value === 'yes' && !startedTreatment) {
            isValid = false;
            alert('Please indicate if you have started treatment.');
        }

        const zipCode = document.getElementById('zip_code');
        const insuranceName = document.getElementById('insurance_name');
        if (startedTreatment && startedTreatment.value === 'yes') {
            if (zipCode.value.trim() === '') {
                isValid = false;
                alert('Please enter your zip code.');
            }
            if (insuranceName.value.trim() === '') {
                isValid = false;
                alert('Please enter your insurance name.');
            }
        }

        const gender = document.querySelector('input[name="gender"]:checked');
        if (startedTreatment && startedTreatment.value === 'yes' && !gender) {
            isValid = false;
            alert('Please indicate your gender.');
        }

        const confirmInfo = document.querySelector('input[name="confirm_info"]:checked');
        if (gender && gender.value === 'female' && !confirmInfo) {
            isValid = false;
            alert('Please confirm if the information is correct.');
        }

        const scheduleAppointment = document.querySelector('input[name="schedule_appointment"]:checked');
        if (!scheduleAppointment) {
            isValid = false;
            alert('Please indicate if you want to schedule an appointment.');
        }

        const scheduleTransportation = document.querySelector('input[name="schedule_transportation"]:checked');
        if (!scheduleTransportation) {
            isValid = false;
            alert('Please indicate if you want to schedule transportation.');
        }

        if (!isValid) {
            event.preventDefault(); // Prevent form submission if validation fails
        }
    });

    // Handle help today selection
    document.getElementById('help_today').addEventListener('change', handleHelpChange);
    document.querySelectorAll('input[name="help_option"]').forEach(function(elem) {
        elem.addEventListener('change', handleHelpOptionChange);
    });
    document.querySelectorAll('input[name="second_opinion"]').forEach(function(elem) {
        elem.addEventListener('change', handleSecondOpinionChange);
    });
    document.querySelectorAll('input[name="started_treatment"]').forEach(function(elem) {
        elem.addEventListener('change', handleTreatmentChange);
    });
    document.querySelectorAll('input[name="gender"]').forEach(function(elem) {
        elem.addEventListener('change', handleGenderChange);
    });
    document.querySelectorAll('input[name="consent"]').forEach(function(elem) {
        elem.addEventListener('change', handleConsentChange);
    });
    document.querySelectorAll('input[name="confirm_info"]').forEach(function(elem) {
        elem.addEventListener('change', handleConfirmInfoChange);
    });
});

function handleHelpChange() {
    const helpSelect = document.getElementById('help_today');
    const helpOptions = document.getElementById('help_options');
    const secondOpinion = document.getElementById('second_opinion');
    const startedTreatment = document.getElementById('started_treatment');
    const additionalInfo = document.getElementById('additional_info');
    const genderSelection = document.getElementById('gender_selection');
    const ehrSync = document.getElementById('ehr_sync');
    const confirmInfo = document.getElementById('confirm_info');

    helpOptions.style.display = 'none';
    secondOpinion.style.display = 'none';
    startedTreatment.style.display = 'none';
    additionalInfo.style.display = 'none';
    genderSelection.style.display = 'none';
    ehrSync.style.display = 'none';
    confirmInfo.style.display = 'none';

    if (helpSelect.value === 'Newly Diagnosed with Cancer') {
        helpOptions.style.display = 'block';
    }
}

function handleHelpOptionChange() {
    const helpOption = document.querySelector('input[name="help_option"]:checked').value;
    const secondOpinion = document.getElementById('second_opinion');

    secondOpinion.style.display = 'none';

    if (helpOption === 'Help with Diagnosis') {
        secondOpinion.style.display = 'block';
    }
}

function handleSecondOpinionChange() {
    const secondOpinion = document.querySelector('input[name="second_opinion"]:checked').value;
    const startedTreatment = document.getElementById('started_treatment');

    startedTreatment.style.display = 'none';

    if (secondOpinion === 'yes') {
        startedTreatment.style.display = 'block';
    }
}

function handleTreatmentChange() {
    const startedTreatment = document.querySelector('input[name="started_treatment"]:checked').value;
    const additionalInfo = document.getElementById('additional_info');
    const genderSelection = document.getElementById('gender_selection');
    const ehrSync = document.getElementById('ehr_sync');
    const confirmInfo = document.getElementById('confirm_info');

    additionalInfo.style.display = 'none';
    genderSelection.style.display = 'none';
    ehrSync.style.display = 'none';
    confirmInfo.style.display = 'none';

    if (startedTreatment === 'yes') {
        additionalInfo.style.display = 'block';
        genderSelection.style.display = 'block';
    }
}

function handleGenderChange() {
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const ehrSync = document.getElementById('ehr_sync');
    const confirmInfo = document.getElementById('confirm_info');

    ehrSync.style.display = 'none';
    confirmInfo.style.display = 'none';

    if (gender === 'female') {
        ehrSync.style.display = 'block';
    }
    confirmInfo.style.display = 'block';
}

function handleConsentChange() {
    const consent = document.querySelector('input[name="consent"]:checked').value;
    const consentQuestion = document.getElementById('help_today_section');
    if (consent === 'yes') {
        consentQuestion.style.display = 'block';
    } else {
        consentQuestion.style.display = 'none';
    }
}

function handleConfirmInfoChange() {
    const confirmInfo = document.querySelector('input[name="confirm_info"]:checked').value;
    const socialSupportSection = document.getElementById('social_support_section');
    if (confirmInfo === 'yes') {
        socialSupportSection.style.display = 'block';
    } else {
        socialSupportSection.style.display = 'none';
    }
}

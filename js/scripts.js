const altar_of_rites = document.getElementById('altar-of-rites-container');
const seal_buttons = document.querySelectorAll('.seal');
const overlay_button = document.getElementById('toggle-overlay');
const seal_icon = document.getElementById('seal-icon');
const seal_power = document.getElementById('seal-power');
const saved_seals = [];

// Seal Event Listener
for (var button of seal_buttons) {
    button.addEventListener('click', e => {
        var current_button = document.getElementById(e.target.id);

        if (current_button.classList.contains('active')) {
            resetOffering();
            current_button.classList.remove('active')
            localStorage.setItem(e.target.id.toString(), 'default');
            resetSealIcon();
        }
        else {
            updateOffering(e.target.id);
            current_button.classList.add('active');
            localStorage.setItem(e.target.id.toString(), 'active');
            updateSealIcon(e.target.id);
        }
    })
}

// Toggle Seal Overlay
overlay_button.addEventListener('click', () => {
    if (overlay_button.innerText == "Show Overlay") {
        document.getElementById('toggle-overlay').innerText = "Hide Overlay";
        document.getElementById('toggle-overlay').title = "Hide Overlay";
        showOverlay();
    }
    else {
        document.getElementById('toggle-overlay').innerText = "Show Overlay";
        document.getElementById('toggle-overlay').title = "Show Overlay";
        hideOverlay();
    }
})

// Hide Overlay
function hideOverlay() {
    for (var button of seal_buttons) {
        button.style.display = "none";
    }
    seal_power.style.display = "none";
}

// Show Overlay
function showOverlay() {
    for (var button of seal_buttons) {
        button.style.display = "flex";
    }
    seal_power.style.display = "block";
}

// Update Offering
function updateOffering(seal_id) {
    var current_seal = document.getElementById(seal_id);
    var next_offering = document.getElementById('next-offering-container');
    next_offering.innerHTML = current_seal.getAttribute('data-seal');
    document.getElementById('seal-power').innerText = current_seal.getAttribute('data-power');
}

// Reset Offering
function resetOffering() {
    var next_offering = document.getElementById('next-offering-container');
    next_offering.innerHTML = "<p>Click on a seal to reveal the offer requirements.</p>";
    document.getElementById('seal-power').innerText = "Waiting for Seal";
}

// Update Seal Icon
function updateSealIcon(seal_id) {
    var current_seal = seal_id.split('-')[1];
    seal_icon.src = "img/seals/" + current_seal +".png";
}

// Reset Seal Icon
function resetSealIcon() {
    seal_icon.src = "img/seals/no-seal.png";
}

// Init
function updateSeals() {
    for (var button of seal_buttons) {
        current_item = localStorage.getItem(button.id.toString());
        if (current_item === "active") {
            document.getElementById(button.id).classList.add('active');
        }
    }
}

// init
updateSeals();
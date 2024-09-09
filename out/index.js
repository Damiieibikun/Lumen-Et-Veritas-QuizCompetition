function startCountdown(endDate) {
    const countdownElement = document.getElementById('countdown');

    function updateCountdown() {
        // const now = new Date('October 1, 2024 00:00:00').getTime(); // check if countdown stopps
        const now = new Date();
        const timeRemaining = endDate - now;

        if (timeRemaining > 0) {
            const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

            countdownElement.innerHTML = `<p>Portal Closes in <span class="text-red-600 font-bold"> ${days}days : ${hours}hrs : ${minutes}mins : ${seconds}secs</span></p>`;

        } else {
            countdownElement.innerHTML = `<p>Portal Closed Late Registeration will inccur a <span class="text-red-600 font-bold">N5,000</span> fee</p>`;
            clearInterval(countdownInterval);
        }

    }

    const countdownInterval = setInterval(updateCountdown, 1000);
    updateCountdown(); // Run immediately to avoid 1-second delay

}

// Set the target date to September, 2024
const targetDate = new Date('September 30, 2024 00:00:00').getTime();

// Start the countdown
startCountdown(targetDate);
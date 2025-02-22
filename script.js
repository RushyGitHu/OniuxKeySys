function generateDailyCode() {
    // Get current date in UTC and format it as YYYY-MM-DD
    const today = new Date();
    const dateString = today.toISOString().split('T')[0];
    
    // Use the date string as a seed for the random number generator
    let seed = 0;
    for (let i = 0; i < dateString.length; i++) {
        seed += dateString.charCodeAt(i);
    }

    // Generate a deterministic 6-character code
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    
    for (let i = 0; i < 6; i++) {
        // Use a deterministic method to generate each character
        seed = (seed * 9301 + 49297) % 233280;
        const index = Math.floor((seed / 233280) * characters.length);
        code += characters[index];
    }

    return code;
}

function updateTimeToNextCode() {
    const now = new Date();
    const tomorrow = new Date();
    tomorrow.setUTCHours(24, 0, 0, 0);
    
    const timeLeft = tomorrow - now;
    const hours = Math.floor(timeLeft / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    
    document.getElementById('nextUpdate').textContent = 
        `Next code in: ${hours}h ${minutes}m`;
}

function copyCode() {
    const code = document.getElementById('dailyCode').textContent;
    navigator.clipboard.writeText(code).then(() => {
        const copyText = document.getElementById('copyText');
        copyText.textContent = 'Copied!';
        setTimeout(() => {
            copyText.textContent = 'Copy Code';
        }, 2000);
    });
}

// Initialize
document.getElementById('dailyCode').textContent = generateDailyCode();
updateTimeToNextCode();

// Update the countdown every minute
setInterval(updateTimeToNextCode, 60000); 
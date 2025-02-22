function generateDailyCode() {
    const today = new Date();
    const dateString = today.toISOString().split('T')[0];
    
    let seed = 0;
    for (let i = 0; i < dateString.length; i++) {
        seed += dateString.charCodeAt(i);
    }

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    
    for (let i = 0; i < 6; i++) {
        seed = (seed * 9301 + 49297) % 233280;
        const index = Math.floor((seed / 233280) * characters.length);
        code += characters[index];
    }

    return code;
}

document.getElementById('dailyCode').textContent = generateDailyCode(); 
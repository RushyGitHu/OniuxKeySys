const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve index.html for the root route
app.get('/', (req, res) => {
    try {
        const indexPath = path.join(__dirname, 'public', 'index.html');
        console.log('Attempting to serve:', indexPath);
        res.sendFile(indexPath, (err) => {
            if (err) {
                console.error('Error sending file:', err);
                res.status(500).send('Error loading page');
            }
        });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).send('Server error');
    }
});

// Handle 404s
app.use((req, res) => {
    res.status(404).send('Page not found');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Current directory: ${__dirname}`);
}); 
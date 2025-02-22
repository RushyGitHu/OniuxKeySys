const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

// Middleware to log all requests
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Verify public directory exists
const publicPath = path.join(__dirname, 'public');
if (!fs.existsSync(publicPath)) {
    console.error('Public directory not found, creating it...');
    fs.mkdirSync(publicPath, { recursive: true });
}

// Serve static files from the public directory
app.use(express.static(publicPath));

// Serve index.html for the root route
app.get('/', (req, res) => {
    try {
        const indexPath = path.join(publicPath, 'index.html');
        console.log('Attempting to serve:', indexPath);
        res.sendFile(indexPath);
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).send('Server error');
    }
});

// Serve simple.html for /simple route
app.get('/simple', (req, res) => {
    try {
        const simplePath = path.join(publicPath, 'simple.html');
        console.log('Attempting to serve:', simplePath);
        res.sendFile(simplePath);
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).send('Server error');
    }
});

// Serve script.js explicitly
app.get('/script.js', (req, res) => {
    const scriptPath = path.join(publicPath, 'script.js');
    console.log('Attempting to serve script.js from:', scriptPath);
    res.sendFile(scriptPath);
});

// Handle 404s
app.use((req, res) => {
    console.log('404 - Not Found:', req.url);
    res.status(404).send('Page not found');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log('=== Server Starting ===');
    console.log(`Server is running on port ${PORT}`);
    console.log(`Current directory: ${__dirname}`);
    console.log(`Public directory: ${publicPath}`);
    console.log('=== Directory Contents ===');
    try {
        const files = fs.readdirSync(__dirname);
        console.log('Root directory:', files);
        if (fs.existsSync(publicPath)) {
            console.log('Public directory:', fs.readdirSync(publicPath));
        }
    } catch (error) {
        console.error('Error listing directory:', error);
    }
    console.log('=== Server Started ===');
}); 
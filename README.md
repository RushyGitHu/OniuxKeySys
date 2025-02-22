# Daily Code Generator

A simple website that generates a new random 6-character alphanumeric code every day at midnight UTC. The code remains consistent throughout the day and changes automatically at midnight UTC.

## Features

- Daily code generation (changes at midnight UTC)
- Consistent code throughout the day
- Copy to clipboard functionality
- Countdown timer to next code
- Responsive design with beautiful gradient background
- Built with HTML, JavaScript, and Tailwind CSS

## Deployment

This project is ready to be deployed on Vercel. To deploy:

1. Push this repository to GitHub
2. Connect your GitHub repository to Vercel
3. Deploy with default settings

## Local Development

To run this project locally:

1. Clone the repository
2. Open `index.html` in your browser
3. No build step required!

## How it Works

The code generation is deterministic based on the current date, ensuring that:
- The same code is generated throughout the day
- A new code is generated each day
- The code is consistent across all users

## Technologies Used

- HTML5
- JavaScript
- Tailwind CSS (via CDN)
- CSS Animations 
# VibeReads
A website that understands your mood and recommends the perfect book to match it! Whether you're feeling happy, reflective, or even a bit anxious, our platform uses GeminiAI to analyze your emotions and suggest books and GoogleBooksAPI to show Books that resonate with how you feel. Plus, test your book knowledge with an interactive quiz.<br>
## Environment Variables Setup
1. Create a .env file in the root directory of the project.
<pre>PORT=5000
MONGO_URI=your_mongo_uri_here
JWT_SECRET=your_jwt_secret_here
CLIENT_URL=http://localhost:3000
SERVER_URL=http://localhost:5000
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here</pre>
2. Replace placeholder values (your_mongo_uri_here, your_jwt_secret_here, etc.) with your actual credentials and settings.
## Installation Instructions ##
1. Clone the Repository<br>
2. Navigate to the backend directory and install dependencies:
<pre>cd backend
npm install</pre>
3. Create a .env file in the backend directory and configure it with the necessary environment variables.<br>
4. Start the backend server:
<pre>cd backend
node server.js</pre>

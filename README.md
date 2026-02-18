# Google Reviews Generator

A mobile-friendly single-page React application that helps generate Google Maps reviews using ChatGPT API.

## Features

- **Review Preference Selection**: Choose whether you like or dislike a review
- **Stress Points Selection**: Select up to 3 key points to emphasize (predefined options + custom input)
- **AI-Powered Generation**: Uses ChatGPT API to generate authentic Google Maps reviews
- **Review Management**: Regenerate reviews (up to 3 total) and copy to clipboard
- **Mobile-Optimized**: Fully responsive design optimized for mobile devices
- **Instructions**: Step-by-step guide with screencast GIF for submitting reviews

## Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure environment variables**:
   Create a `.env` file in the root directory:
   ```env
   VITE_CHATGPT_API_KEY=your_openai_api_key_here
   VITE_GOOGLE_MAPS_REVIEW_URL=https://maps.google.com/reviews/your_location
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

## Project Structure

```
review_manager/
├── src/
│   ├── components/          # React components
│   │   ├── Header.jsx       # Logo and photo display
│   │   ├── ReviewSelector.jsx
│   │   ├── StressPointsSelector.jsx
│   │   ├── ReviewGenerator.jsx
│   │   ├── GeneratedReview.jsx
│   │   └── Instructions.jsx
│   ├── services/
│   │   └── chatgptService.js  # ChatGPT API integration
│   ├── App.jsx              # Main app component
│   └── main.jsx            # Entry point
├── index.html
├── package.json
└── vite.config.js
```

## Usage

1. Select whether you like or dislike the review
2. Choose up to 3 stress points to emphasize
3. Optionally add additional context
4. Click "Generate Review" to create a review using ChatGPT
5. Copy the generated review and follow the instructions to submit it on Google Maps

## Technologies

- React 18
- Vite
- OpenAI API (ChatGPT)
- CSS3 (Mobile-first responsive design)

## Notes

- The app uses placeholder images for logos and photos. Replace them in `src/assets/placeholders/` with actual assets.
- The ChatGPT API key is exposed in the frontend (for development). In production, consider using a backend proxy to keep the API key secure.

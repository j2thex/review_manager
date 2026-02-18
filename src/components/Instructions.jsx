import './Instructions.css'
import googleReviewsLogo from '../assets/google-reviews-logo.png'
import screenGif from '../assets/screen.gif'

function Instructions() {
  const googleMapsUrl = import.meta.env.VITE_GOOGLE_MAPS_REVIEW_URL || 'https://maps.google.com/reviews/placeholder'

  return (
    <div className="instructions">
      <div className="section-header">
        <img
          src={googleReviewsLogo}
          alt="Google Reviews"
          className="section-header-logo"
          onError={(e) => {
            e.target.style.display = 'none'
          }}
        />
        <h2 className="section-title">Next Steps</h2>
      </div>
      
      <div className="button-and-gif">
        <div className="button-and-steps">
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="google-link"
          >
            <span>Go to Google Maps Reviews</span>
            <span className="external-icon">↗</span>
          </a>

          <div className="steps-list">
            <h3>How to submit your review:</h3>
            <ol>
              <li>Click the link above to open Google Maps reviews</li>
              <li>Switch to the reviews tab</li>
              <li>Click "Post" in the bottom of the screen</li>
              <li>Click "Rate and Review"</li>
              <li>Paste the review you copied from above</li>
              <li>Click "post" to send your review</li>
            </ol>
          </div>
        </div>

        <div className="screencast-section">
          <img
            src={screenGif}
            alt="How to submit a review on Google Maps"
            className="screencast-gif"
            onError={(e) => {
              e.target.style.display = 'none'
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default Instructions

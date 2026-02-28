import './Instructions.css'
import googleReviewsLogo from '../assets/google-reviews-logo.png'
import screenGif from '../assets/screen.gif'
import { useTranslation } from '../LanguageContext'

function Instructions() {
  const { t } = useTranslation()
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
        <h2 className="section-title">{t('nextSteps')}</h2>
      </div>
      
      <div className="button-and-gif">
        <div className="button-and-steps">
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="google-link"
          >
            <span>{t('goToReviews')}</span>
            <span className="external-icon">↗</span>
          </a>

          <div className="steps-list">
            <h3>{t('howToSubmit')}</h3>
            <ol>
              <li>{t('step1')}</li>
              <li>{t('step2')}</li>
              <li>{t('step3')}</li>
              <li>{t('step4')}</li>
              <li>{t('step5')}</li>
              <li>{t('step6')}</li>
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

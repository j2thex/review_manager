import './ReviewSelector.css'
import { useTranslation } from '../LanguageContext'

function ReviewSelector({ preference, onPreferenceChange }) {
  const { t } = useTranslation()
  return (
    <div className="review-selector">
      <h2 className="experience-title">{t('experienceQuestion')}</h2>
      <div className="preference-buttons">
        <button
          className={`preference-btn preference-like ${preference === 'like' ? 'active' : ''}`}
          onClick={() => onPreferenceChange('like')}
          aria-pressed={preference === 'like'}
        >
          <span className="btn-label">{t('lovedIt')}</span>
        </button>
        <button
          className={`preference-btn preference-dislike ${preference === 'dislike' ? 'active' : ''}`}
          onClick={() => onPreferenceChange('dislike')}
          aria-pressed={preference === 'dislike'}
        >
          <span className="btn-label">{t('notSoGreat')}</span>
        </button>
      </div>
    </div>
  )
}

export default ReviewSelector

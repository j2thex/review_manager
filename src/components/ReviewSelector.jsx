import './ReviewSelector.css'

function ReviewSelector({ preference, onPreferenceChange }) {
  return (
    <div className="review-selector">
      <h2 className="experience-title">How was your visit?</h2>
      <div className="preference-buttons">
        <button
          className={`preference-btn preference-like ${preference === 'like' ? 'active' : ''}`}
          onClick={() => onPreferenceChange('like')}
          aria-pressed={preference === 'like'}
        >
          <span className="btn-label">Loved it</span>
        </button>
        <button
          className={`preference-btn preference-dislike ${preference === 'dislike' ? 'active' : ''}`}
          onClick={() => onPreferenceChange('dislike')}
          aria-pressed={preference === 'dislike'}
        >
          <span className="btn-label">Not so great</span>
        </button>
      </div>
    </div>
  )
}

export default ReviewSelector

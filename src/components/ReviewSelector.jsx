import './ReviewSelector.css'

function ReviewSelector({ preference, onPreferenceChange }) {
  return (
    <div className="review-selector">
      <h2 className="section-title">How do you feel about the service that was provided to you?</h2>
      <div className="preference-buttons">
        <button
          className={`preference-btn ${preference === 'like' ? 'active' : ''}`}
          onClick={() => onPreferenceChange('like')}
          aria-pressed={preference === 'like'}
        >
          <span className="emoji">👍</span>
          <span>I liked the service</span>
        </button>
        <button
          className={`preference-btn ${preference === 'dislike' ? 'active' : ''}`}
          onClick={() => onPreferenceChange('dislike')}
          aria-pressed={preference === 'dislike'}
        >
          <span className="emoji">👎</span>
          <span>I disliked the service</span>
        </button>
      </div>
    </div>
  )
}

export default ReviewSelector

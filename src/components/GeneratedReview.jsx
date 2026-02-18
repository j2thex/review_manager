import { useState } from 'react'
import './GeneratedReview.css'

function GeneratedReview({ reviewText, onRegenerate, regenerationCount, maxRegenerations = 3 }) {
  const [copied, setCopied] = useState(false)
  const remainingRegenerations = maxRegenerations - regenerationCount - 1
  const canRegenerate = remainingRegenerations > 0

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(reviewText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = reviewText
      textArea.style.position = 'fixed'
      textArea.style.opacity = '0'
      document.body.appendChild(textArea)
      textArea.select()
      try {
        document.execCommand('copy')
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (err) {
        alert('Failed to copy. Please select and copy manually.')
      }
      document.body.removeChild(textArea)
    }
  }

  if (!reviewText) {
    return null
  }

  return (
    <div className="generated-review">
      <h2 className="section-title">Generated Review</h2>
      
      <div className="review-text-container">
        <p className="review-text">{reviewText}</p>
      </div>

      <div className="review-actions">
        <div className="regeneration-info">
          {canRegenerate ? (
            <span className="regeneration-count">
              {remainingRegenerations} regeneration{remainingRegenerations !== 1 ? 's' : ''} left
            </span>
          ) : (
            <span className="regeneration-count no-more">No more regenerations</span>
          )}
        </div>

        <div className="action-buttons">
          <button
            className="regenerate-btn"
            onClick={onRegenerate}
            disabled={!canRegenerate}
            aria-label="Regenerate review"
          >
            Regenerate
          </button>
          
          <button
            className={`copy-btn ${copied ? 'copied' : ''}`}
            onClick={handleCopy}
            aria-label="Copy review to clipboard"
          >
            {copied ? (
              <>
                <span className="checkmark">✓</span>
                <span>Copied!</span>
              </>
            ) : (
              <>
                <span>📋</span>
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default GeneratedReview

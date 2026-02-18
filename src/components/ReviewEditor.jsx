import { useState, useEffect } from 'react'
import './ReviewEditor.css'
import chatgptLogo from '../assets/chatgpt-logo.png'

function ReviewEditor({ 
  preference, 
  reviewText, 
  onGenerate, 
  onRegenerate, 
  regenerationCount, 
  isLoading,
  maxRegenerations = 3 
}) {
  const [copied, setCopied] = useState(false)
  const [localReviewText, setLocalReviewText] = useState(reviewText || '')
  
  // Update local text when reviewText prop changes
  useEffect(() => {
    setLocalReviewText(reviewText || '')
  }, [reviewText])

  const remainingRegenerations = maxRegenerations - regenerationCount - 1
  const canRegenerate = remainingRegenerations > 0 && preference === 'like'
  const isLiked = preference === 'like'
  const hasGeneratedReview = reviewText && reviewText.length > 0

  const handleCopy = async () => {
    const textToCopy = localReviewText.trim()
    if (!textToCopy) return

    try {
      await navigator.clipboard.writeText(textToCopy)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = textToCopy
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

  return (
    <div className="review-editor">
      {isLiked && (
        <div className="chatgpt-header">
          <img 
            src={chatgptLogo} 
            alt="ChatGPT Logo" 
            className="chatgpt-logo"
            onError={(e) => {
              e.target.style.display = 'none'
              e.target.nextSibling.style.display = 'flex'
            }}
          />
          <div className="chatgpt-placeholder" style={{display: 'none'}}>
            <span>ChatGPT</span>
          </div>
          <span className="chatgpt-header-title">Review assistant</span>
        </div>
      )}

      <div className="review-text-container">
        <textarea
          className="review-textarea"
          value={localReviewText}
          onChange={(e) => setLocalReviewText(e.target.value)}
          placeholder={isLiked ? "Generated review will appear here..." : "Write your review here..."}
          rows={6}
          disabled={isLoading && isLiked}
          aria-label="Review text"
        />
      </div>

      {isLiked && (
        <>
          {!hasGeneratedReview && (
            <button
              className="generate-btn"
              onClick={onGenerate}
              disabled={isLoading}
              aria-label="Generate review"
            >
              {isLoading ? (
                <>
                  <span className="spinner"></span>
                  <span>Generating...</span>
                </>
              ) : (
                'Generate Review'
              )}
            </button>
          )}

          {hasGeneratedReview && (
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
                  disabled={!canRegenerate || isLoading}
                  aria-label="Regenerate review"
                >
                  {isLoading ? (
                    <>
                      <span className="spinner small"></span>
                      <span>Regenerating...</span>
                    </>
                  ) : (
                    'Regenerate'
                  )}
                </button>
                
                <button
                  className={`copy-btn ${copied ? 'copied' : ''}`}
                  onClick={handleCopy}
                  disabled={!localReviewText.trim()}
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
          )}
        </>
      )}

      {!isLiked && (
        <button
          className={`copy-btn ${copied ? 'copied' : ''}`}
          onClick={handleCopy}
          disabled={!localReviewText.trim()}
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
      )}
    </div>
  )
}

export default ReviewEditor

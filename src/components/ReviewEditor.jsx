import { useState, useEffect } from 'react'
import './ReviewEditor.css'
import chatgptLogo from '../assets/chatgpt-logo.png'
import { useTranslation } from '../LanguageContext'

function ReviewEditor({ 
  preference, 
  reviewText, 
  onGenerate, 
  onRegenerate, 
  regenerationCount, 
  isLoading,
  maxRegenerations = 3 
}) {
  const { t } = useTranslation()
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
          <span className="chatgpt-header-title">{t('reviewAssistant')}</span>
        </div>
      )}

      <div className="review-text-container">
        <textarea
          className="review-textarea"
          value={localReviewText}
          onChange={(e) => setLocalReviewText(e.target.value)}
          placeholder={isLiked ? t('generatedPlaceholder') : t('writePlaceholder')}
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
              aria-label={t('generateReview')}
            >
              {isLoading ? (
                <>
                  <span className="spinner"></span>
                  <span>{t('generating')}</span>
                </>
              ) : (
                t('generateReview')
              )}
            </button>
          )}

          {hasGeneratedReview && (
            <div className="review-actions">
              <div className="regeneration-info">
                {canRegenerate ? (
                  <span className="regeneration-count">
                    {t('regenerationsLeft', remainingRegenerations)}
                  </span>
                ) : (
                  <span className="regeneration-count no-more">{t('noMoreRegenerations')}</span>
                )}
              </div>

              <div className="action-buttons">
                <button
                  className="regenerate-btn"
                  onClick={onRegenerate}
                  disabled={!canRegenerate || isLoading}
                  aria-label={t('regenerate')}
                >
                  {isLoading ? (
                    <>
                      <span className="spinner small"></span>
                      <span>{t('regenerating')}</span>
                    </>
                  ) : (
                    t('regenerate')
                  )}
                </button>
                
                <button
                  className={`copy-btn ${copied ? 'copied' : ''}`}
                  onClick={handleCopy}
                  disabled={!localReviewText.trim()}
                  aria-label={t('copy')}
                >
                  {copied ? (
                    <>
                      <span className="checkmark">✓</span>
                      <span>{t('copied')}</span>
                    </>
                  ) : (
                    <>
                      <span>📋</span>
                      <span>{t('copy')}</span>
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
          aria-label={t('copy')}
        >
          {copied ? (
            <>
              <span className="checkmark">✓</span>
              <span>{t('copied')}</span>
            </>
          ) : (
            <>
              <span>📋</span>
              <span>{t('copy')}</span>
            </>
          )}
        </button>
      )}
    </div>
  )
}

export default ReviewEditor

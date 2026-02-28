import { useState } from 'react'
import './StressPointsSelector.css'
import { useTranslation } from '../LanguageContext'

const PREDEFINED_OPTION_KEYS = [
  'serviceQuality',
  'staffFriendliness',
  'priceValue',
  'speedEfficiency',
  'locationConvenience',
]

function StressPointsSelector({ selectedPoints, onSelectionChange }) {
  const { t } = useTranslation()
  const [customInput, setCustomInput] = useState('')
  const [showCustomInput, setShowCustomInput] = useState(false)
  const maxSelections = 3

  const handlePredefinedToggle = (option) => {
    if (selectedPoints.includes(option)) {
      // Remove if already selected
      onSelectionChange(selectedPoints.filter(p => p !== option))
    } else if (selectedPoints.length < maxSelections) {
      // Add if under limit
      onSelectionChange([...selectedPoints, option])
    }
  }

  const handleCustomAdd = () => {
    const trimmed = customInput.trim()
    if (trimmed && !selectedPoints.includes(trimmed) && selectedPoints.length < maxSelections) {
      onSelectionChange([...selectedPoints, trimmed])
      setCustomInput('')
      setShowCustomInput(false)
    }
  }

  const handleRemove = (point) => {
    onSelectionChange(selectedPoints.filter(p => p !== point))
  }

  const canSelectMore = selectedPoints.length < maxSelections

  const getOptionLabel = (key) => t(key)
  const getOptionValue = (key) => t(key) // value sent to API = translated label

  return (
    <div className="stress-points-selector">
      <h2 className="section-title">{t('stressPointsTitle')}</h2>
      
      <div className="predefined-options">
        {PREDEFINED_OPTION_KEYS.map(key => {
          const label = getOptionLabel(key)
          const isSelected = selectedPoints.includes(label)
          const isDisabled = !isSelected && !canSelectMore
          
          return (
            <label
              key={key}
              className={`option-label ${isSelected ? 'selected' : ''} ${isDisabled ? 'disabled' : ''}`}
            >
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => handlePredefinedToggle(label)}
                disabled={isDisabled}
                aria-label={`Select ${label}`}
              />
              <span>{label}</span>
            </label>
          )
        })}
      </div>

      {!showCustomInput && canSelectMore && (
        <button
          onClick={() => setShowCustomInput(true)}
          className="add-own-btn"
          aria-label={t('addYourOwn')}
        >
          {t('addYourOwn')}
        </button>
      )}

      {showCustomInput && (
        <div className="custom-input-section">
          <div className="input-group">
            <input
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  handleCustomAdd()
                }
              }}
              placeholder={t('enterYourOwn')}
              disabled={!canSelectMore}
              className="custom-input"
              aria-label="Custom stress point input"
              autoFocus
            />
            <button
              onClick={handleCustomAdd}
              disabled={!canSelectMore || !customInput.trim()}
              className="add-btn"
              aria-label="Add custom stress point"
            >
              {t('add')}
            </button>
            <button
              onClick={() => {
                setShowCustomInput(false)
                setCustomInput('')
              }}
              className="cancel-btn"
              aria-label={t('cancel')}
            >
              {t('cancel')}
            </button>
          </div>
        </div>
      )}

      {selectedPoints.length > 0 && (
        <div className="selected-points">
          <div className="selected-tags">
            {selectedPoints.map((point, index) => (
              <span key={index} className="tag">
                {point}
                <button
                  onClick={() => handleRemove(point)}
                  className="remove-tag"
                  aria-label={`Remove ${point}`}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default StressPointsSelector

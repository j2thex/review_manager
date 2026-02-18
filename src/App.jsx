import { useState } from 'react'
import Header from './components/Header'
import ReviewSelector from './components/ReviewSelector'
import StressPointsSelector from './components/StressPointsSelector'
import ReviewEditor from './components/ReviewEditor'
import Instructions from './components/Instructions'
import { generateReview } from './services/chatgptService'
import './App.css'

function App() {
  const [preference, setPreference] = useState(null) // 'like' or 'dislike'
  const [stressPoints, setStressPoints] = useState([])
  const [generatedReview, setGeneratedReview] = useState('')
  const [regenerationCount, setRegenerationCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const handlePreferenceChange = (newPreference) => {
    setPreference(newPreference)
    // Clear stress points and review if switching preferences
    if (newPreference === 'dislike') {
      setStressPoints([])
      setGeneratedReview('')
      setRegenerationCount(0)
    } else {
      setGeneratedReview('')
      setRegenerationCount(0)
    }
  }

  const handleGenerate = async () => {
    if (preference !== 'like') {
      setError('We only generate positive reviews. Please select \"I liked the service\" to generate a review, or write your own below.')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const review = await generateReview(stressPoints)
      setGeneratedReview(review)
      setRegenerationCount(0) // Reset count for new generation
    } catch (err) {
      setError(err.message || 'Failed to generate review. Please try again.')
      console.error('Review generation error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegenerate = async () => {
    if (preference !== 'like') {
      return
    }

    if (regenerationCount >= 2) {
      return // Max 3 total generations (initial + 2 regenerations)
    }

    setIsLoading(true)
    setError(null)

    try {
      const review = await generateReview(stressPoints)
      setGeneratedReview(review)
      setRegenerationCount(prev => prev + 1)
    } catch (err) {
      setError(err.message || 'Failed to regenerate review. Please try again.')
      console.error('Review regeneration error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="app">
      <Header />
      
      <main className="main-content">
        <ReviewSelector 
          preference={preference}
          onPreferenceChange={handlePreferenceChange}
        />

        {preference === 'like' && (
          <StressPointsSelector
            selectedPoints={stressPoints}
            onSelectionChange={setStressPoints}
          />
        )}

        {preference && (
          <ReviewEditor
            preference={preference}
            reviewText={generatedReview}
            onGenerate={handleGenerate}
            onRegenerate={handleRegenerate}
            regenerationCount={regenerationCount}
            isLoading={isLoading}
            maxRegenerations={3}
          />
        )}

        {error && (
          <div className="error-message" role="alert">
            <span className="error-icon">⚠️</span>
            <span>{error}</span>
          </div>
        )}

        <Instructions />
      </main>
    </div>
  )
}

export default App

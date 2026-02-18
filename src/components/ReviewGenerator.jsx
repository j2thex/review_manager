import './ReviewGenerator.css'

function ReviewGenerator({ onGenerate, isLoading }) {
  return (
    <div className="review-generator">
      <div className="chatgpt-header">
        <img 
          src="/chatgpt-logo.png" 
          alt="ChatGPT Logo" 
          className="chatgpt-logo"
          onError={(e) => {
            e.target.style.display = 'none'
            e.target.nextSibling.style.display = 'block'
          }}
        />
        <div className="chatgpt-placeholder" style={{display: 'none'}}>🤖 ChatGPT</div>
      </div>
      
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
    </div>
  )
}

export default ReviewGenerator

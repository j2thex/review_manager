import './Header.css'
import vodafoneLogo from '../assets/vodafone-logo.png'
import eimyPhoto from '../assets/eimy.png'

function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-container">
          <img 
            src={vodafoneLogo} 
            alt="Vodafone Logo" 
            className="logo vodafone-logo"
            onError={(e) => {
              e.target.style.display = 'none'
              e.target.nextSibling.style.display = 'block'
            }}
          />
          <div className="logo-placeholder" style={{display: 'none'}}>Vodafone</div>
        </div>
        
        <div className="photo-container">
          <img 
            src={eimyPhoto} 
            alt="Eimy" 
            className="photo"
            onError={(e) => {
              e.target.style.display = 'none'
              e.target.nextSibling.style.display = 'block'
            }}
          />
          <div className="photo-placeholder" style={{display: 'none'}}>👤</div>
        </div>
      </div>
    </header>
  )
}

export default Header

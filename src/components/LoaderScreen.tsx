import './LoaderScreen.css'

type LoaderScreenProps = {
  isVisible: boolean
}

function LoaderScreen({ isVisible }: LoaderScreenProps) {
  return (
    <div
      className={`loader-screen ${isVisible ? 'is-visible' : 'is-hidden'}`}
      aria-hidden={!isVisible}
    >
      <div className="loader-frame">
        <div className="loader-orb" />
        <div className="loader-text">
          <p className="loader-kicker">Initializing</p>
          <h1 className="loader-title">ZAFEER'S PORTFOLIO</h1>
          <p className="loader-subtitle">Loading the experience</p>
        </div>
        <div className="loader-progress" role="presentation">
          <span />
        </div>
      </div>
    </div>
  )
}

export default LoaderScreen

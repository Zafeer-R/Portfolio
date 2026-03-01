import './LoaderScreen.css'

type LoaderScreenProps = {
  isVisible: boolean
  phase: 'intro' | 'reveal' | 'done'
}

function LoaderScreen({ isVisible, phase }: LoaderScreenProps) {
  return (
    <div
      className={`loader-screen ${isVisible ? 'is-visible' : 'is-hidden'} ${
        phase === 'reveal' ? 'is-revealing' : ''
      }`}
      aria-hidden={!isVisible}
    >
      <div className="loader-frame">
        <div className="loader-logo-wrap" aria-hidden="true">
          <img src="/Logo_Current.svg" alt="" className="loader-logo" />
        </div>
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

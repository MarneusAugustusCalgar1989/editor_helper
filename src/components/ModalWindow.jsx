import AnimatedPage from './AnimatedPage'

const ModalWindow = ({ progress = 0 }) => {
  return (
    <AnimatedPage>
      <div className="modal_window">
        <div
          className="progress_bar"
          style={{
            width: `${progress}`,
          }}
        ></div>
      </div>
    </AnimatedPage>
  )
}

export default ModalWindow

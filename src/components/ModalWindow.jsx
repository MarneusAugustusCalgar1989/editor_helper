const ModalWindow = ({ progress = 0 }) => {
  return (
    <div className='modal_window'>
      <div
        className='progress_bar'
        style={{
          width: `${progress}`,
        }}
      ></div>
      <h1 className='progress_header'>{progress}</h1>
    </div>
  );
};

export default ModalWindow;

const ModalWindow = ({ progress = 0 }) => {
  return (
    <div className='modal_window'>
      <h1>{progress}</h1>
      <div
        className='progress_bar'
        style={{
          backgroundColor: 'green',
          width: `${progress}`,
          height: '100%',
        }}
      ></div>
    </div>
  );
};

export default ModalWindow;

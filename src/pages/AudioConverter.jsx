import { useState } from 'react';
import Wrapper from '../components/Wrapper';
import { useNavigate } from 'react-router-dom';
import ModalWindow from '../components/ModalWindow';
const AudioConverter = e => {
  const navigate = useNavigate();
  const [soundUpload, setSoundUpload] = useState();
  const [audioName, setAudioName] = useState();
  const [showInput, setShowInput] = useState(true);
  const [uploadProgress, setUploadProgress] = useState();
  const [showModal, setShowModal] = useState(false);

  const sendAudio = async e => {
    e.preventDefault();
    setShowInput(false);
    setShowModal(true);

    let filename = e.target.filename.files[0].name;
    filename = 'to_' + filename.slice(0, filename.length - 4) + '.mp3';
    setAudioName(filename);
    const formData = new FormData();
    formData.append('file', e.target.filename.files[0]);
    const response = await fetch('http://213.59.156.172:3000/convert_audio', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const reader = response.body.getReader();
      let chunks = [];
      const contentLength = +response.headers.get('Content-Length');
      let recievedLength = 0;

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }
        chunks.push(value);
        recievedLength += value.length;
        setUploadProgress(
          `${Math.floor((recievedLength * 100) / contentLength)}%`
        );
      }
      const blob = new Blob(chunks, { type: 'audio/webm; codecs=opus' });
      const converterdFile = URL.createObjectURL(blob);
      console.log('All is ok');
      URL.revokeObjectURL(blob);
      setSoundUpload(converterdFile);
      await fetch('http://213.59.156.172:3000/cleaner_for_audio', {
        method: 'POST',
      });
      setShowModal(false);
      setUploadProgress(0);
      return converterdFile;
    } else {
      console.log(response.status, response.statusText);
      navigate('/');
    }
  };
  return (
    <div className='App'>
      <Wrapper>
        <h1>Audio Converter</h1>
        {showModal && <ModalWindow progress={uploadProgress} />}
        {soundUpload && (
          <>
            <a
              href={soundUpload}
              download={audioName}
              className='image_converter_result'
            >
              <p>Download file</p>
            </a>
            <button
              onClick={() => {
                setSoundUpload();
                setShowInput(true);
              }}
            >
              Попробовать еще раз
            </button>
          </>
        )}
        {showInput && (
          <form onSubmit={sendAudio}>
            <input type='file' name='filename' />
            <button type='submit'> Отправить аудио </button>
          </form>
        )}
      </Wrapper>
    </div>
  );
};

export default AudioConverter;
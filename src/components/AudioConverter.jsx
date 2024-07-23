import { useState } from 'react';
import Wrapper from './Wrapper';
import { useNavigate } from 'react-router-dom';
const AudioConverter = e => {
  const navigate = useNavigate();
  const [soundUpload, setSoundUpload] = useState();
  const [audioName, setAudioName] = useState();
  const [showInput, setShowInput] = useState(true);

  const sendAudio = async e => {
    e.preventDefault();
    setShowInput(false);

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
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }
        chunks.push(value);
      }
      const blob = new Blob(chunks, { type: 'audio/webm; codecs=opus' });
      const converterdFile = URL.createObjectURL(blob);
      console.log('All is ok');
      URL.revokeObjectURL(blob);
      setSoundUpload(converterdFile);
      await fetch('http://213.59.156.172:3000/cleaner_for_audio', {
        method: 'POST',
      });
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

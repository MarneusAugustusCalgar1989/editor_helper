import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Wrapper from '../components/Wrapper';
import ModalWindow from '../components/ModalWindow';
import AnimatedPage from '../components/AnimatedPage';
import AudioPlayer from '../components/AudioPlayer';
import { useAuth } from '../hooks/useAuth';

const AudioConverter = e => {
  const context = useAuth();
  useEffect(() => {
    const testFetch = async () => {
      try {
        await fetch('http://213.59.156.172:3000/', {
          method: 'POST',
          body: context?.user || 'default-token',
        }).then(data => {
          if (data) {
            context.setServiceON(true);
          } else {
            context.setServiceON(false);
          }
        });
      } catch (e) {
        console.log(e.text);
      } finally {
        console.log('Fetched');
      }
    };

    testFetch();
  }, [context.user, context.serviceON]);

  const navigate = useNavigate();
  const [soundUpload, setSoundUpload] = useState();
  const [audioName, setAudioName] = useState();
  const [showInput, setShowInput] = useState(true);
  const [uploadProgress, setUploadProgress] = useState();
  const [showModal, setShowModal] = useState(false);

  const [voznya, setVoznya] = useState(false);

  const sendAudio = async e => {
    e.preventDefault();
    setShowInput(false);
    setShowModal(true);

    let filename = e.target.files[0].name;
    filename = 'to_' + filename.slice(0, filename.length - 4) + '.mp3';
    setAudioName(filename);
    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    formData.append('text', context.user);
    formData.append('username', context.username);
    formData.append('timeStamp', new Date());

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
          setVoznya(false);
          setShowModal(false);

          break;
        }
        setVoznya(true);
        chunks.push(value);
        recievedLength += value.length;
        setUploadProgress(
          `${Math.floor((recievedLength * 100) / contentLength)}%`
        );
      }
      const blob = new Blob(chunks, { type: 'audio/webm; codecs=opus' });

      const converterdFile = URL.createObjectURL(blob);
      URL.revokeObjectURL(blob);
      setSoundUpload(converterdFile);

      await fetch('http://213.59.156.172:3000/cleaner_for_unconverted_audio', {
        method: 'POST',
        body: formData,
      });
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
        <AnimatedPage>
          <h1 className='module_header'>Аудиоконвертер</h1>
          {showModal && !voznya && (
            <p className='fun_word_block'>аудиоконвертирует...</p>
          )}
          {showModal && voznya && (
            <p className='fun_word_block'>оооо, пошла жара!!!</p>
          )}
          {showModal && <ModalWindow progress={uploadProgress} />}
          {soundUpload && !showModal && (
            <>
              <AudioPlayer song={soundUpload} />

              <div className='audioconverter_buttons_wrapper'>
                <div className='test_button'>
                  <a href={soundUpload} download={audioName}>
                    Скачать
                  </a>
                </div>
                <div
                  className='test_button'
                  onClick={() => {
                    setSoundUpload();
                    setShowInput(true);
                  }}
                >
                  Попробовать еще раз
                </div>
              </div>
            </>
          )}
          {showInput && (
            <>
              <div
                className='image_loader_wrapper'
                onClick={() => {
                  const input = document.querySelector('form').filename;
                  input.click();
                }}
              >
                <h1>Загрузите аудио</h1>
              </div>
              <form style={{ display: 'none' }}>
                <input type='file' name='filename' onChange={sendAudio} />
                <button type='submit'> Отправить аудио </button>
              </form>
            </>
          )}
        </AnimatedPage>
      </Wrapper>
    </div>
  );
};

export default AudioConverter;

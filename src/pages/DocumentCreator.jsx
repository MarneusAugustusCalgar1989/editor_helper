import DocumentEditor from '../components/DocumentEditor';
import Wrapper from '../components/Wrapper';

const DocumentCreator = () => {
  return (
    <div className='App'>
      <Wrapper>
        <h1>Создавалка документов</h1>
        <DocumentEditor />
      </Wrapper>
    </div>
  );
};

export default DocumentCreator;

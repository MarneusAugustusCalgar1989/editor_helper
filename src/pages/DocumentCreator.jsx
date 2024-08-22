import DocumentEditor from '../components/DocumentEditor';
import Wrapper from '../components/Wrapper';

const DocumentCreator = () => {
  return (
    <div className='App'>
      <Wrapper>
        <h1>Документодел</h1>
        <DocumentEditor />
      </Wrapper>
    </div>
  );
};

export default DocumentCreator;

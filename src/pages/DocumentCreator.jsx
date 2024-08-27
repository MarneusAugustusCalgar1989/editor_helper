import AnimatedPage from '../components/AnimatedPage';
import DocumentEditor from '../components/DocumentEditor';
import Wrapper from '../components/Wrapper';

const DocumentCreator = () => {
  return (
    <div className='App'>
      <Wrapper>
        <AnimatedPage>
          <h1>Документодел</h1>
          <DocumentEditor />
        </AnimatedPage>
      </Wrapper>
    </div>
  );
};

export default DocumentCreator;

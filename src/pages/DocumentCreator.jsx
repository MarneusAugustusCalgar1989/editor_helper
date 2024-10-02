import AnimatedPage from '../components/AnimatedPage';
import DocumentEditor from '../components/DocumentEditor';
import Wrapper from '../components/Wrapper';

const DocumentCreator = () => {
  return (
    <div className='App'>
      <Wrapper>
        <AnimatedPage>
          <DocumentEditor />
        </AnimatedPage>
      </Wrapper>
    </div>
  );
};

export default DocumentCreator;

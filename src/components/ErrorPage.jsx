import Wrapper from './Wrapper'

const ErrorPage = ({ props }) => {
  console.log(props.data)
  return (
    <div className="App">
      <Wrapper>
        <h1>{props.statusText}</h1>
        <p>Похоже такой страницы не существует</p>
      </Wrapper>
    </div>
  )
}

export default ErrorPage

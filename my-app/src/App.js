import React from 'react';
import logo from './logo.svg';
import './App.css';

class MyLabel extends React.Component {
  state = {
    age: 2000,
  }

  // Xảy ra duy nhất 1 lần khi component đã render lần đầu 
  componentDidMount = () => {
    // this.sound = new Audio('https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_1MG.mp3');

    // this.sound.play();

    console.log('MyLabel > componentDidMount');
  }

  // Xảy ra trước khi component bị xóa
  componentWillUnmount = () => {
    console.log('MyLabel > componentWillUnmount');
    // this.sound.pause();
  }

  // Kiểm tra giá trị mới nhận được từ component cha
  componentDidUpdate = (prevProps, prevState, snapshot) => {

  }

  // Bắt lỗi xảy ra trong component
  componentDidCatch = (error) => {

  }

  // Kiểm soát việc re-render của component
  shouldComponentUpdate = (nextProps, nextState) => {
    if (nextProps.name === this.props.name) {
      return false;
    }

    return true;
  }

  onClick = () => {

  }

  render = () => {
    const { name } = this.props;
    const { age } = this.state;

    return <span onClick={this.onClick}>{name}</span>
  }
}

function App() {
  const [state, setState] = React.useState({
    myInput: '',
    name: 'Tri Ngo',
    visible: false,
    myArray: [1, 2, 3, 4, 5, 6, 7, 8, 9]
  });

  const onClick = React.useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      visible: !prevState.visible
    }));
    return;
  }, []);

  React.useEffect(() => {
    // componentDidMount

    return () => {
      // componentWillUnmount
    }
  }, []);

  const onChange = React.useCallback((event) => {
    console.log('event > ', event.target.value);
    setState((prevState) => ({ ...prevState, myInput: event.target.value }));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        {state.visible && <MyLabel name={state.name} />}

        {state.myArray.map((item, index) => <MyLabel key={index} name={item} />)}

        <input value={state.myInput} placeholder='Please input message' onChange={onChange} />

        <button onClick={onClick} style={{ marginTop: 24 }}>Toggle MyLabel</button>
      </header>
    </div>
  );
}

export default App;

import logo from './logo.svg';
import './App.css';
import PostForm from './components/PostForm';
import UpdateForm from './components/UpdateForm';
import GetForm from './components/GetForm';
import DeleteForm from './components/DeleteForm';

function App() {
  return (
    <div className="App">
      <PostForm />
      <UpdateForm />
      <GetForm />
      <DeleteForm />
    </div>
  );
}

export default App;

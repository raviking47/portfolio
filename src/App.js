import './App.css';
import Footer from './Components/Footer';
import Navbar from './Components/Navbar';
import Project from './Components/Project';
import Skill from './Components/Skill';
import Title from './Components/Title';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Title/>
      <Project/>
      <Skill/>
      <Footer/>
    </div>
  );
}

export default App;

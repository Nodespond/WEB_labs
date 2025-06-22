import './styles/App.css';
import Navbar from './components/Navbar';
import Gallery from './components/Gallery';
import Content from './components/Content';
import Footer from './components/Footer';


function App() {
  return (
    <div>
      <Navbar />
      <Gallery/>
      <Content/>
      <Footer/>
    </div>
  );
}

export default App;

import './App.css';
import Navbar from './Components/Navbar';
import Banner from './Components/Banner';
import Movies from './Components/Movies';
import Favourites from './Components/Favourites';
import {Routes,Route} from "react-router-dom";

function App() {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route  path="/" element= {
        <>
          <Banner />
          <Movies />
        </>
      } />
      <Route  path="/favourites" element={<Favourites />} />
    </Routes>
    </>

  );
}

export default App;

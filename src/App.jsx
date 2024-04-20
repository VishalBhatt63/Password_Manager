import './App.css'
import Manager from './components/Manager'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {


  return (
    <>
    <Navbar/>
    <div className='bg-green-200 bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)] w-full'>

    <Manager/>
    <Footer/>
    </div>
    
    </>
  )
}

export default App

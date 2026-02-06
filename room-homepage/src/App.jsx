import { useState } from 'react'
import Header from './components/Header'
import pages from './data.json'
import Arrows from './components/Arrows'

function App() {
  const [activePage, setActivePage] = useState(1)
  const page = pages.find(p => p.id === activePage)
  const actualPage = 'home'
  return (
    <>
     {actualPage === 'home' &&
        ( 
          <div className='d-flex flex-column w-100 h-100'>
          <main className='container-fluid p-0 m-0 main'>
            <section className='row gx-0 gy-0'>
              <div className='position-relative col-12 col-md-6 col-lg-7'>
                <Header img={page.imageMob} imgDesk={page.imageDes}/>
                <Arrows 
                className={'position-absolute bottom-0 end-0 z-1 end-lg-4 d-xl-none estilo_botoes'}
                activePage={activePage} setActivePage={setActivePage}/>
              </div>
              <div className='bg-white col-12 col-md  d-flex align-items-center justify-content-center conteudo position-relative'>
                <div className='container_conteudo '>
                  <h1>{page.title}</h1>
                  <p>{page.text}</p>
                  <div className='d-flex     align-items-center'>
                    <h2>Shop now</h2>
                    <img src="/images/icon-arrow.svg" alt="icon arrow" />
                  </div>
                  <Arrows className={'d-none d-xl-flex estilo_botoes  position-absolute bottom-0 start-0'}
                  activePage={activePage} setActivePage={setActivePage}/>
                </div>
              </div>
            </section>
            <section className='row gx-0 gy-0'>
              <img className='col-12 col-md' src="images/image-about-dark.jpg" alt="image about-dark" />
              <div className='col-12 col-md-5 container_segundario d-flex align-items-center justify-content-center'>
                {pages.map((i,index) =>(
                  i.id ===4 &&(
                    <div key={index} className='container_text'>
                      <h3>{i.title}</h3>
                      <p>{i.text}</p>
                    </div>
                  )
                ))}
              </div>
              <img className='col-12 col-lg ' src="images/image-about-light.jpg" alt="image-about" />
            </section>
          </main>
          <footer className="p-3 mt-5 text-center">
            <p>
              Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>.
              Coded by <a href="https://github.com/laisTalita" target='_blank'>Lais Talita</a>.
            </p>
          </footer>
          </div>
          
        )}
    </>
  )
}

export default App

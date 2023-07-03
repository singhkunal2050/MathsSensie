import Header from './components/Header'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Features from './components/Features'
import VideoSection from './components/VideoSection'

export default function Home() {
    return <div>
        <Header/>
        <div className='min-h-[88vh]'>
            <Hero />
            <Features />
            <VideoSection />
        </div>
        <Footer/>
    </div>
}
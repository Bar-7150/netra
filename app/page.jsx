'use client'

import { useEffect, useRef, useState } from 'react'
import Nav from '../src/components/Navbar/nav.jsx'
import Hero from '../src/components/Hero/hero.jsx'
import Archiv from '../src/components/Archivements/archiv.jsx'
import Exp from '../src/components/Exp/exp.jsx'
import Projects from '../src/components/Projects/projects.jsx'
import Skills from '../src/components/Skills/Skills.jsx'
import Contact from '../src/components/Contacts/Contacts.jsx'
import HackerIntro from '../src/components/HackerIntro/HackerIntro.jsx'
import Footer from '../src/components/Footer/footer.jsx'

export default function Page() {
  const [isMounted, setIsMounted] = useState(false)
  const [isIntroActive, setIsIntroActive] = useState(false)
  const [scrollToContact, setScrollToContact] = useState(false)
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 })
  const [particles, setParticles] = useState([])
  const particleId = useRef(0)
  const lastSpawnTime = useRef(0)

  useEffect(() => {
    // The mount gate keeps the server and first client render identical.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true)
    setIsIntroActive(!sessionStorage.getItem('hacked_intro_seen'))
  }, [])

  useEffect(() => {
    if (!scrollToContact || isIntroActive) return undefined
    const timer = setTimeout(() => {
      const contactSection = document.querySelector('.contact-container')
      contactSection?.scrollIntoView({ behavior: 'smooth' })
      contactSection?.querySelector('input')?.focus()
      setScrollToContact(false)
    }, 100)
    return () => clearTimeout(timer)
  }, [scrollToContact, isIntroActive])

  useEffect(() => {
    const handleMouseMove = (event) => {
      setCursorPos({ x: event.clientX, y: event.clientY })
      const now = performance.now()
      if (now - lastSpawnTime.current < 100) return
      lastSpawnTime.current = now
      const id = particleId.current++
      setParticles((previous) => [...previous.slice(-20), {
        id, x: event.clientX, y: event.clientY,
        char: Math.random() > 0.5 ? '1' : '0',
        drift: (Math.random() * 14 - 7).toFixed(1),
        duration: 900 + Math.random() * 500,
        delay: Math.random() * 40,
      }])
    }
    const handleMouseLeave = () => setCursorPos({ x: -100, y: -100 })
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseout', handleMouseLeave)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseout', handleMouseLeave)
    }
  }, [])

  useEffect(() => {
    fetch('/api/visit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }).catch((error) => console.error('Failed to log visit', error))
  }, [])

  const handleCloseIntro = () => {
    sessionStorage.setItem('hacked_intro_seen', 'true')
    setIsIntroActive(false)
  }

  if (!isMounted) return null

  return (
    <>
      <div className="custom-cursor-layer" aria-hidden="true">
        {particles.map((particle) => (
          <span key={particle.id} className="binary-particle" style={{ left: particle.x, top: particle.y, animationDuration: `${particle.duration}ms`, animationDelay: `${particle.delay}ms`, transform: 'translate(-50%, -50%)', '--drift': `${particle.drift}px` }} onAnimationEnd={() => setParticles((previous) => previous.filter((item) => item.id !== particle.id))}>{particle.char}</span>
        ))}
        <div className="custom-cursor" style={{ left: cursorPos.x, top: cursorPos.y }}>
          <svg className="custom-cursor-svg" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
            <circle cx="40" cy="40" r="10" fill="none" stroke="#ff4d87" strokeWidth="3" />
            <circle cx="40" cy="40" r="4" fill="#ff4d87" />
            <line x1="40" y1="0" x2="40" y2="14" stroke="#fff" strokeWidth="3" opacity="0.9" />
            <line x1="40" y1="80" x2="40" y2="66" stroke="#fff" strokeWidth="3" opacity="0.9" />
            <line x1="0" y1="40" x2="14" y2="40" stroke="#fff" strokeWidth="3" opacity="0.9" />
            <line x1="80" y1="40" x2="66" y2="40" stroke="#fff" strokeWidth="3" opacity="0.9" />
          </svg>
        </div>
      </div>
      {isIntroActive && <HackerIntro onClose={handleCloseIntro} onContactClick={() => { setScrollToContact(true); handleCloseIntro() }} />}
      <Nav triggerIntro={() => setIsIntroActive(true)} />
      <Hero />
      <Archiv />
      <Exp />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
    </>
  )
}
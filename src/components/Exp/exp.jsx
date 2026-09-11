import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import './exp.css'

gsap.registerPlugin(ScrollTrigger)

const Exp = () => {
  const containerRef = useRef(null)
  const expCardsRef = useRef([])

  const experiences = [
    {
      id: 1,
      company: 'ECWoC-2026',
      role: 'OpenSource Contributor',
      duration: '1st JAN 2026 - 31st MAY 2026',
      description: 'Developed responsive web applications using React and Node.js'
    },
    {
      id: 2,
      company: '',
      role: 'Developer',
      duration: '2026 - Present',
      description: 'Development and architecting modern web solutions'
    }
  ]

  useEffect(() => {
    const context = gsap.context(() => {
      expCardsRef.current.forEach((exp) => {
        gsap.fromTo(
          exp,
          { opacity: 0, x: -100 },
          {
            opacity: 1, x: 0, duration: 0.8,
            scrollTrigger: {
              trigger: exp,
              start: 'top 70%', end: 'top 30%',
              scrub: 1, markers: false
            }
          }
        )
      })

      gsap.to('.expLine', {
        height: '100%',
        scrollTrigger: {
          trigger: '.expCont',
          start: 'top center', end: 'bottom center',
          scrub: 1
        }
      })
    })

    return () => context.revert()
  }, [])

  return (
    <div className='expSection' ref={containerRef}>
      <p className="expSectionLabel">// work_history.log</p>
      <h1>Experience</h1>
      <div className='expCont'>
        <div className='expTimeline'>
          <div className='expLine'></div>
          <div className='expDots'>
            {experiences.map((_, index) => (
              <div key={index} className='expDot'></div>
            ))}
          </div>
        </div>

        <div className='expList'>
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              ref={(el) => (expCardsRef.current[index] = el)}
              className='expCard'
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: false, amount: 0.3 }}
            >
              {/* Scan sweep line (triggered by CSS :hover) */}
              <div className="cardScan" />

              <p className="expIdTag">[ RECORD_{String(index + 1).padStart(2, '0')} ]</p>
              <div className='expHeader'>
                <h3>{exp.role}</h3>
                <span className='expDuration'>{exp.duration}</span>
              </div>
              {exp.company && <p className='expCompany'>{exp.company}</p>}
              <p className='expDesc'>{exp.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Exp

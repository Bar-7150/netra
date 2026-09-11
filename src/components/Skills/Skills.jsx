import { motion } from 'framer-motion'
import './Skills.css'

const Skills = () => {

  const cyberSecTools = [
    { tool: 'Nmap', bg:'/nmap2.png' },
    { tool: 'Hydra', bg:'hydra.png'},
    { tool: 'Wireshark',bg:'wireshark2.png' },
    { tool: 'Burp Suite' ,bg:'burpsuit.png'},
    { tool: 'Zmap',bg:'zmap.png' },
    { tool: 'Metasploit',bg:'metasploit2.png' },
    { tool: 'OWASP ZAP',bg:'oswapZap.png' },
    { tool: 'Zhon The Ripper',bg:'metasploit2.png' },
    { tool: 'OWASP ZAP',bg:'oswapZap.png' }
  ]

  const frontend = [
    { tool: 'React.js',bg:'react.png' },
    { tool: 'GSAP',bg:'gsap.png'},
    { tool: 'Three.js',bg:'threeJS.png' },
    { tool: 'JavaScript',bg:'javaScript.png' },
    { tool: 'Tailwind',bg:'tailwindCSS.png' },
    { tool: 'Bootstrap',bg:'boostrap.png' }
  ]

  const backend = [
    { tool: 'Node.js',bg:'node2.png' },
    { tool: 'Express.js',bg:'express.png' },
    // { tool: 'FastAPI',bg:'fastAPI.png' }
  ]

  const database = [
    { tool: 'MongoDB',bg:'mongodb2.png' },
    { tool: 'MySQL',bg:'mySQL2.png' },
    { tool: 'PostgreSQL',bg:'pSQL.png' },
    { tool: 'Supabase',bg:'sapabase.png' },
  ]

  const aiMlTools = [
    { tool: 'TensorFlow' },
    { tool: 'PyTorch' },
    { tool: 'scikit-learn' },
    // { tool: 'Keras' },
    { tool: 'Hugging Face' },
    // { tool: 'OpenCV' }
  ]

  const iotTools = [
    { tool: 'Arduino' },
    // { tool: 'Raspberry Pi' },
    { tool: 'ESP32' },
  ]

  const others = [
    { tool: 'Blender',bg:'blender.png' },
    // { tool: 'SVG',bg:'figma.png' },
    // { tool: 'Color Theory' ,bg:'express.png'}
  ]

  const renderToolPills = (list) =>
    list.map((item, index) => (
      <motion.span
        key={`${item.tool}-${index}`}
        className="tool-pill"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.32, ease: 'easeOut' }}
      >
        {item.tool}
      </motion.span>
    ))

  return (
    <section className="skills-dashboard">
      <div className="skills-header">
        <p className="skills-section-label">// skills_matrix.db</p>
        <h1>Skills</h1>
        <p className="skills-description">
          A dashboard-style view of tools and technologies across security, web, AI/ML, and IoT.
        </p>
      </div>

      <div className="skills-grid">
        <article className="dashboard-card wide-card">
          <div className="card-header">
            <span>Cyber Security Tools</span>
            <span className="card-tag">Secure</span>
          </div>
          <p className="card-copy">Active offensive and defensive tooling used for vulnerability analysis and audits.</p>
          <div className="chip-grid">{renderToolPills(cyberSecTools)}</div>
        </article>

        <article className="dashboard-card wide-card">
          <div className="card-header">
            <span>Web Development</span>
            <span className="card-tag">Live</span>
          </div>
          <div className="sub-panel-group">
            <div className="sub-panel">
              <h4>Frontend</h4>
              <div className="tool-pill-grid">{renderToolPills(frontend)}</div>
            </div>
            <div className="sub-panel">
              <h4>Backend</h4>
              <div className="tool-pill-grid">{renderToolPills(backend)}</div>
            </div>
            <div className="sub-panel">
              <h4>Database</h4>
              <div className="tool-pill-grid">{renderToolPills(database)}</div>
            </div>
          </div>
        </article>

        <article className="dashboard-card small-card">
          <div className="card-header">
            <span>AI / Machine Learning</span>
            <span className="card-tag">Smart</span>
          </div>
          <p className="card-copy">Frameworks and libraries used for data science, modeling, and intelligent automation.</p>
          <div className="chip-grid">{renderToolPills(aiMlTools)}</div>
        </article>

        <article className="dashboard-card small-card">
          <div className="card-header">
            <span>Internet of Things</span>
            <span className="card-tag">Edge</span>
          </div>
          <p className="card-copy">Connected-device tooling and protocols used for edge, automation, and sensor solutions.</p>
          <div className="chip-grid">{renderToolPills(iotTools)}</div>
        </article>

        <article className="dashboard-card small-card">
          <div className="card-header">
            <span>Other Tools</span>
            <span className="card-tag">Creative</span>
          </div>
          <p className="card-copy">Additional utilities used for modeling, visualization, and design workflows.</p>
          <div className="chip-grid">{renderToolPills(others)}</div>
        </article>
      </div>
    </section>
  )
}

export default Skills

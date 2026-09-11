import { useState } from 'react'
import './projects.css'
import { motion, AnimatePresence } from 'framer-motion'

// ── Category definitions ──────────────────────────────────────────
const CATEGORIES = [
  { key: 'webdev',    label: 'Web Dev',     icon: '⬡', color: '#00ffcc' },
  { key: 'aiml',     label: 'AI / ML',      icon: '◈', color: '#a78bfa' },
  { key: 'iot',      label: 'IoT',          icon: '⬢', color: '#38bdf8' },
  { key: 'cybersec', label: 'Cyber Sec',    icon: '⛊', color: '#ff3366', isWip: true },
  { key: '3dmodel',  label: '3D Modeling',  icon: '◎', color: '#fb923c', isWip: true },
]

// ── Project Data ──────────────────────────────────────────────────
const ALL_PROJECTS = {
  webdev: [
    {
      project: 'virtualMeetup',
      bg: 'vertualMeetup.png',
      desc: 'Secure real-time web video communications hub with encrypted channels.',
      id: 'PRJ::0x01',
      tags: ['React', 'Node.js', 'WebRTC'],
      link: '#',
    },
     {
      project: 'handShake',
      bg: 'handshake.png',
      desc: 'Real-time cryptocurrency dashboard with live charts, alerts, and portfolio tracking.',
      id: 'PRJ::0x03',
      tags: ['React', 'Chart.js', 'CoinGecko API'],
      link: '#',
    },
    {
      project: 'myDestination',
      bg: 'myDestination.png',
      desc: 'Modern MERN full-stack routing and geo-location service.',
      id: 'PRJ::0x02',
      tags: ['MERN', 'Maps API'],
      link: '#',
    },
  
    {
      project: 'HER',
      bg: 'her.png',
      desc: 'Full-stack Kanban project-management app with drag-and-drop and role-based auth.',
      id: 'PRJ::0x04',
      tags: ['Next.js', 'MongoDB', 'JWT'],
      link: '#',
    },
  ],

  aiml: [
    {
      project: 'faceVault',
      bg: null,
      desc: 'Real-time facial-recognition attendance system using OpenCV + FaceNet embeddings.',
      id: 'PRJ::0xA2',
      tags: ['OpenCV', 'Python', 'FaceNet'],
      link: '#',
    },
    {
      project: 'jansahayAI',
      bg: null,
      desc: 'road poteholes, garbage..',
      id: 'PRJ::0xA1',
      tags: ['Python', 'TensorFlow', 'Keras'],
      link: '#',
    },
    {
      project: 'cropOracle',
      bg: null,
      desc: 'ML model predicting optimal crop yield based on soil, weather, and satellite data.',
      id: 'PRJ::0xA4',
      tags: ['scikit-learn', 'Pandas', 'Flask'],
      link: '#',
    },
  ],

  iot: [
    {
      project: 'airSense',
      bg: null,
      desc: 'Air-quality monitoring node with MQ135 sensors publishing readings to AWS IoT Core.',
      id: 'PRJ::0xB2',
      tags: ['Arduino', 'AWS IoT', 'Node.js'],
      link: '#',
    },
  ],

  cybersec: [
    {
      project: 'phantomScan',
      bg: null,
      desc: 'Automated vulnerability scanner that maps open ports, services, and CVEs on a target.',
      id: 'PRJ::0xC1',
      tags: ['Python', 'Nmap', 'Shodan API'],
      link: '#',
    },
    {
      project: 'cipherShell',
      bg: null,
      desc: 'Lightweight reverse-shell framework with AES-256 payload obfuscation for red-team drills.',
      id: 'PRJ::0xC2',
      tags: ['C', 'Python', 'OpenSSL'],
      link: '#',
    },
    {
      project: 'logHunter',
      bg: null,
      desc: 'SIEM-lite tool that correlates Nginx/Apache logs and fires alerts on suspicious patterns.',
      id: 'PRJ::0xC3',
      tags: ['Python', 'Elasticsearch', 'Kibana'],
      link: '#',
    },
    {
      project: 'phishGuard',
      bg: null,
      desc: 'Browser extension that detects phishing URLs using a local ML classifier + VirusTotal API.',
      id: 'PRJ::0xC4',
      tags: ['JavaScript', 'ML', 'VirusTotal'],
      link: '#',
    },
  ],

  '3dmodel': [
    {
      project: 'cyberHelmet',
      bg: null,
      desc: 'Futuristic tactical helmet model with PBR textures and animated visor, rendered in Blender.',
      id: 'PRJ::0xD1',
      tags: ['Blender', 'PBR', 'Cycles'],
      link: '#',
    },
    {
      project: 'neonCity',
      bg: null,
      desc: 'Low-poly cyberpunk cityscape with procedural neon signs exported as glTF for Three.js.',
      id: 'PRJ::0xD2',
      tags: ['Blender', 'Three.js', 'glTF'],
      link: '#',
    },
    {
      project: 'droneMkII',
      bg: null,
      desc: 'Parametric quad-rotor drone designed in FreeCAD and 3D-printed for a robotics project.',
      id: 'PRJ::0xD3',
      tags: ['FreeCAD', '3D Print', 'CAD'],
      link: '#',
    },
    {
      project: 'avatarCore',
      bg: null,
      desc: 'Rigged humanoid avatar with facial morph targets, ready for VR application integration.',
      id: 'PRJ::0xD4',
      tags: ['Blender', 'Mixamo', 'Unity'],
      link: '#',
    },
  ],
}

// ── Card Component ────────────────────────────────────────────────
const ProjectCard = ({ item, i, accentColor, isWip, onLiveDemoClick }) => (
  <motion.div
    key={item.project}
    className={`project${isWip ? ' wip' : ''}`}
    initial={{ opacity: 0, y: 40, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: -20, scale: 0.95 }}
    transition={{ duration: 0.45, ease: 'easeOut', delay: i * 0.1 }}
    style={
      item.bg
        ? {
            backgroundImage: `linear-gradient(rgba(5,0,12,0.35),rgba(5,0,12,0.78)),url(${item.bg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }
        : {}
    }
  >
    {/* accent glow stripe at top */}
    <div className="projectAccentStripe" style={{ background: accentColor }} />

    {/* Vertical scan sweep line */}
    {!isWip && <div className="projectScanLine" />}

    <div className="projectCyberOverlay">
      {/* Top row */}
      <div className="projectTopRow">
        <div>
          <div className="projectNodeTag" style={{ color: accentColor, textShadow: `0 0 8px ${accentColor}88` }}>
            [ {item.project.toUpperCase()} ]
          </div>
          <div className="projectIdTag">{item.id}</div>
        </div>
        <div className="projectStatusLabel" style={{ borderColor: `${accentColor}30`, color: accentColor }}>
          <span className={isWip ? "pulseDotOrange" : "pulseDotGreen"} style={{ background: accentColor, boxShadow: `0 0 6px ${accentColor}` }} />
          {isWip ? "BUILDING" : "ONLINE"}
        </div>
      </div>

      {/* Tags */}
      <div className="projectTagsRow">
        {item.tags.map(t => (
          <span key={t} className="projectTag" style={{ borderColor: `${accentColor}40`, color: `${accentColor}cc` }}>
            {t}
          </span>
        ))}
      </div>

      {/* Bottom hover content */}
      <div className="projectHoverContent">
        <p className="projectDescTerminal" style={{ borderLeftColor: `${accentColor}55` }}>
          {item.desc}
        </p>
        <div className="projectBtnRow">
          <button
            className="projectEnterBtn"
            style={{ borderColor: accentColor, color: accentColor }}
            onMouseEnter={e => { e.currentTarget.style.background = accentColor; e.currentTarget.style.color = '#0d0206'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = accentColor; }}
          >
            DECRYPT CODE
          </button>
          <button 
            className="projectEnterBtn secondary"
            onClick={() => onLiveDemoClick(item)}
          >
            LIVE DEMO
          </button>
        </div>
      </div>
    </div>

    {/* WIP Lock Overlay */}
    {isWip && (
      <div className="projectWipOverlay">
        <div className="wipOverlayContent">
          <div className="wipLockIcon" style={{ color: accentColor, textShadow: `0 0 10px ${accentColor}` }}>🔒</div>
          <div className="wipStatusText" style={{ color: accentColor }}>[ ACTIVE WORKING PHASE ]</div>
          <div className="wipDetailsText">SYSTEM OFFLINE — DEPLOYMENT IN PROGRESS</div>
        </div>
      </div>
    )}
  </motion.div>
)

// ── Main Component ────────────────────────────────────────────────
const Projects = () => {
  const [activeTab, setActiveTab] = useState('webdev')
  const activeCategory = CATEGORIES.find(c => c.key === activeTab)
  const projects = ALL_PROJECTS[activeTab] || []

  // Security password modal state
  const [passwordModalOpen, setPasswordModalOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState(false)
  const [decrypting, setDecrypting] = useState(false)

  const handleLiveDemoClick = (project) => {
    setSelectedProject(project)
    setPasswordModalOpen(true)
    setPassword('')
    setPasswordError(false)
    setDecrypting(false)
  }

  const handleDecryptSubmit = (e) => {
    e.preventDefault()
    setDecrypting(true)
    
    // Simulating decrypt scan time
    setTimeout(() => {
      const validKeys = ['sunfolio', 'hacker', 'netra', 'admin']
      if (validKeys.includes(password.trim().toLowerCase())) {
        setPasswordModalOpen(false)
        if (selectedProject.link && selectedProject.link !== '#') {
          window.open(selectedProject.link, '_blank')
        }
      } else {
        setPasswordError(true)
        setDecrypting(false)
      }
    }, 800)
  }

  return (
    <div className="projectsContainer">
      <p className="projectsSectionLabel">// deployed_systems.list</p>
      <h1 className="projectsSectionTitle">My Projects</h1>

      {/* Sweeping loading bar */}
      <div className="projectsLoadingBar" />

      {/* ── Category Tabs ── */}
      <div className="projectsTabs">
        {CATEGORIES.map(cat => (
          <button
            key={cat.key}
            className={`projectsTab${activeTab === cat.key ? ' active' : ''}`}
            style={activeTab === cat.key ? { borderColor: cat.color, color: cat.color, boxShadow: `0 0 14px ${cat.color}44` } : {}}
            onClick={() => setActiveTab(cat.key)}
          >
            <span className="tabIcon">{cat.icon}</span>
            {cat.label} {cat.isWip && <span className="tabWipLock">🔒</span>}
          </button>
        ))}
      </div>

      {/* ── Project Cards ── */}
      <div className="projectsWrapper">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className="projectsInner"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {projects.map((item, i) => (
              <ProjectCard 
                key={item.project} 
                item={item} 
                i={i} 
                accentColor={activeCategory.color} 
                isWip={activeCategory.isWip} 
                onLiveDemoClick={handleLiveDemoClick}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Password Decryption Modal ── */}
      <AnimatePresence>
        {passwordModalOpen && (
          <div className="projectPasswordModal">
            <div className="passwordModalOverlay" onClick={() => setPasswordModalOpen(false)} />
            <motion.div 
              className="passwordModalContent"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              style={{ borderColor: activeCategory.color }}
            >
              <div className="modalHeader" style={{ color: activeCategory.color }}>
                <span>[ DEPLOYMENT SECURITY DETECTED ]</span>
                <button type="button" className="modalCloseBtn" onClick={() => setPasswordModalOpen(false)}>×</button>
              </div>
              
              <form onSubmit={handleDecryptSubmit} className="modalForm">
                <p className="modalDesc">
                  Node security protocol initialized. Enter decryption passphrase to initialize direct stream link for <strong>{selectedProject?.project.toUpperCase()}</strong>.
                </p>
                
                <div className="inputWrapper">
                  <span className="inputPrompt" style={{ color: activeCategory.color }}>&gt;</span>
                  <input 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="ENTER ACCESS KEY..."
                    className={`modalInput ${passwordError ? 'error' : ''}`}
                    disabled={decrypting}
                    autoFocus
                  />
                </div>

                {passwordError && (
                  <div className="modalErrorMsg">
                    ⚠️ ACCESS DENIED: INVALID SECURITY PASSPHRASE
                  </div>
                )}
                
                <div className="modalActionRow">
                  <button 
                    type="submit" 
                    className="modalSubmitBtn"
                    style={{ borderColor: activeCategory.color, color: activeCategory.color }}
                    disabled={decrypting}
                  >
                    {decrypting ? 'DECRYPTING...' : 'DECRYPT DEMO'}
                  </button>
                  <div className="modalHint">
                    [ Hint: Try 'hacker' or 'sunfolio' ]
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Projects

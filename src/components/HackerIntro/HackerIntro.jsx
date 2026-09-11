import { useEffect, useState, useRef } from 'react';
import './HackerIntro.css';

const HACKING_LOGS = [
  { text: "$ nmap -sV -p- -T4 target_node_ip", type: "input", delay: 100 },
  { text: "Starting Nmap 7.92 ( https://nmap.org ) at 2026-06-12", type: "system", delay: 200 },
  { text: "Nmap scan report for target.example", type: "system", delay: 100 },
  { text: "Host is up (0.0032s latency).", type: "success", delay: 100 },
  { text: "PORT     STATE SERVICE  VERSION", type: "system", delay: 100 },
  { text: "80/tcp   open  http     Apache/2.4.41", type: "success", delay: 150 },
  { text: "443/tcp  open  ssl/http Apache/2.4.41", type: "success", delay: 150 },
  { text: "22/tcp   open  ssh      OpenSSH 8.2p1", type: "success", delay: 150 },
  { text: "$ python3 exploit_stack_overflow.py -t target.example", type: "input", delay: 300 },
  { text: "[*] Initializing exploit payload...", type: "system", delay: 200 },
  { text: "[*] Injecting shellcode at buffer offset 256", type: "system", delay: 250 },
  { text: "[*] Overwriting return address (0x7fffffffe420)...", type: "system", delay: 200 },
  { text: "[+] Privilege escalation: SUCCESS (UID=0, GID=0)", type: "success", delay: 300 },
  { text: "[+] Shell spawned: /bin/bash -i", type: "success", delay: 100 },
  { text: "$ cat /root/secret_identity.txt", type: "input", delay: 400 },
  { text: "=========================================", type: "system", delay: 100 },
  { text: "SUBJECT ID: Sunetra Bar", type: "success", delay: 150 },
  { text: "CREDENTIALS: Cybersecurity Specialist & MERN Developer", type: "success", delay: 150 },
  { text: "=========================================", type: "system", delay: 100 },
  { text: "[+] Warning: Firewall bypassed successfully.", type: "warning", delay: 200 },
  { text: "[+] Session redirected to central portfolio node.", type: "success", delay: 300 },
  { text: "INTRUSION COMPLETE. CONNECTION TERMINATED.", type: "error", delay: 200 }
];

const INTRO_TEXT = "Hello user. You have successfully established a connection with my terminal. I am Sunetra Bar, a Cybersecurity Specialist and MERN Stack Developer. I build highly secure, scalable web applications and engineer robust network defense solutions. Choose a command below to proceed.";

const HackerIntro = ({ onClose, onContactClick }) => {
  const [logs, setLogs] = useState([]);
  const [currentLogIndex, setCurrentLogIndex] = useState(0);
  const [phase, setPhase] = useState('hacking');
  const [typedIntro, setTypedIntro] = useState('');
  const [introCharIndex, setIntroCharIndex] = useState(0);
  const [isDismissing, setIsDismissing] = useState(false);

  const canvasRef = useRef(null);
  const termEndRef = useRef(null);

  // Matrix Rain Background Effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    const columns = Math.floor(width / 20);
    const yPositions = Array(columns).fill(0);
    const chars = "010101SECURESHIELDBREACHPORT22PORTSCANFIREWALLHACKED0101";

    const drawMatrix = () => {
      ctx.fillStyle = 'rgba(5, 0, 2, 0.05)';
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = '#ff003c';
      ctx.font = '14px "JetBrains Mono", monospace';
      for (let i = 0; i < yPositions.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * 20, yPositions[i]);
        if (yPositions[i] > height && Math.random() > 0.975) yPositions[i] = 0;
        else yPositions[i] += 20;
      }
    };

    const handleResize = () => { width = canvas.width = window.innerWidth; height = canvas.height = window.innerHeight; };
    window.addEventListener('resize', handleResize);
    const tick = () => { drawMatrix(); animationId = requestAnimationFrame(tick); };
    tick();
    return () => { cancelAnimationFrame(animationId); window.removeEventListener('resize', handleResize); };
  }, []);

  // Sequential Terminal Logs
  useEffect(() => {
    if (phase !== 'hacking') return;
    if (currentLogIndex < HACKING_LOGS.length) {
      const log = HACKING_LOGS[currentLogIndex];
      const timer = setTimeout(() => {
        setLogs((prev) => [...prev, log]);
        setCurrentLogIndex((prev) => prev + 1);
      }, log.delay);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => setPhase('details'), 800);
      return () => clearTimeout(timer);
    }
  }, [currentLogIndex, phase]);

  // Auto-scroll terminal
  useEffect(() => {
    if (termEndRef.current) termEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  // Typewriter
  useEffect(() => {
    if (phase !== 'details') return;
    if (introCharIndex < INTRO_TEXT.length) {
      const timer = setTimeout(() => {
        setTypedIntro((prev) => prev + INTRO_TEXT[introCharIndex]);
        setIntroCharIndex((prev) => prev + 1);
      }, 20);
      return () => clearTimeout(timer);
    }
  }, [introCharIndex, phase]);

  const handleDismiss = (action) => {
    setIsDismissing(true);
    setTimeout(() => {
      onClose();
      if (action === 'contact') onContactClick();
    }, 600);
  };

  return (
    <div className={`hiOverlay ${isDismissing ? 'dismissing' : ''}`}>
      {/* Matrix Canvas */}
      <canvas ref={canvasRef} className="matrixCanvas" />

      {/* CRT overlays */}
      <div className="crtScreen" />
      <div className="crtScanline" />

      {/* Alert Corners */}
      <div className="alertBanner alertTopLeft">System Breach</div>
      <div className="alertBanner alertTopRight">Access Granted</div>
      <div className="alertBanner alertBotLeft">IP Logging: Active</div>
      <div className="alertBanner alertBotRight">Node: Sunetra</div>

      <div className="hiGrid">
        {/* Terminal */}
        <div className="termCol">
          <div className="termWin">
            <div className="termHeader">
              <span className="termTitle">NETWORK PROTOCOL ANALYZER</span>
              <div className="termDots">
                <span className="termDot"></span>
                <span className="termDot"></span>
                <span className="termDot"></span>
              </div>
            </div>
            <div className="termBody">
              {logs.map((log, idx) => (
                <div key={idx} className={`termLogLine ${log.type}`}>{log.text}</div>
              ))}
              {phase === 'hacking' && <span className="termCursor"></span>}
              <div ref={termEndRef} />
            </div>
          </div>
        </div>

        {/* Main Panel */}
        <div className="hiMainPanel">
          <div className="hackedTitleWrap">
            <h1 className="hackedTitle">System Hacked</h1>
          </div>

          {phase === 'details' && (
            <div className="maskWrap">
              <svg className="maskSvg" viewBox="0 0 72 72">
                <g id="line" transform="matrix(1.579 0 0 1.572 4.013 -9.525)">
                  <path className="maskPath maskFill" d="m50.91 23.98c0.3774 0.2199 0.4675-0.651 0.4675-1.902 0-1.6-0.0152-1.714-3.209-2.043-2.207-0.1426-3.003 0.02065-5.336 1.094-1.508 0.6936-3.307 1.813-3.999 2.488-1.065 1.039-1.181 1.36-0.7576 2.099 0.6767 1.182 2.054 1.097 3.736-0.2283 3.047-2.401 6.522-3.144 9.097-1.506z" />
                  <path className="maskPath maskFill" d="m21.29 23.98c-0.3774 0.2199-0.4675-0.651-0.4675-1.902 0-1.6 0.0152-1.714 3.209-2.043 2.207-0.1426 3.003 0.02065 5.336 1.094 1.508 0.6936 3.307 1.813 3.999 2.488 1.065 1.039 1.181 1.36 0.7576 2.099-0.6767 1.182-2.054 1.097-3.736-0.2283-3.047-2.401-6.522-3.144-9.097-1.506z" />
                  <path className="maskPath" d="m32.02 36.1c-2.187 2.411-1.531 2.89-1.409 3.732 1.997-0.3199 3.52 1.314 5.322 1.664" />
                  <path className="maskPath" d="m39.85 36.1c2.187 2.411 1.531 2.89 1.409 3.732-1.997-0.3199-3.52 1.314-5.322 1.664" />
                  <path className="maskPath maskAccent" d="m24 31.11c-2.437-0.6575-1.589-2.353 1.261-2.521 2.377-0.1407 5.607 0.4718 6.239 1.183 0.4804 0.5409 0.4359 0.7423-0.2707 1.225-0.9578 0.6545-4.989 0.7177-7.229 0.1133z" />
                  <path className="maskPath maskAccent" d="m41.43 31.0c-1.239-0.8469-0.207-1.795 2.378-2.185 3.848-0.5801 6.295-0.05888 6.295 1.341 0 1.265-7.053 1.951-8.673 0.844z" />
                  <path className="maskPath" d="m22.57 38.8 2.911 5.042h7.669l1.512-2.44" />
                  <path className="maskPath" d="m49.27 38.78-2.911 5.042h-7.669l-1.512-2.427" />
                  <path className="maskPath maskFill" d="m30.78 46.53c-0.6605-0.9987 0.4962-1.258 5.604-1.258 4.844 0 5.324 0.06719 5.189 0.7266-0.1301 0.6342-0.8072 0.7414-5.329 0.8432-3.214 0.0724-5.288-0.04579-5.463-0.3114z" />
                  <path className="maskPath maskFill" d="m36.07 60.5 2.482-0.237 0.1543-3.484s0.0814-1.791 0.4668-3.713c1.055-5.259 1.291-4.883-3.076-4.883-0.0091 0-0.01817 3e-6 -0.02724 1e-5z" />
                  <path className="maskPath maskFill" d="m36.07 60.5-2.482-0.237-0.1543-3.484s-0.0814-1.791-0.4668-3.713c-1.055-5.259-1.291-4.883 3.076-4.883 0.0091 0 0.01817 3e-6 0.02724 1e-5z" />
                  <path className="maskPath" d="m20.79 13.75c4.486-1.907 9.794-2.444 15.54-2.258 6.094-0.08112 11.72 0.4806 16.13 2.738 4.116 1.533 3.637 7.559 3.604 13.56 0.0665 5.123 0.3569 9.4-1.457 13.54-2.018 6.04-5.354 10.53-8.93 14.75-1.267 1.212-2.747 2.396-4.686 3.522-1.539 0.5021-3.132 0.9175-4.989 0.9047l-3.452-0.3979c-2.798-0.9362-4.443-2.413-6.064-3.901-3.49-3.68-6.748-8.312-9.237-16.11-1.045-3.183-1.92-6.823-1.307-14.46-0.035-6.012 0.5461-10.53 4.848-11.88z" />
                  <path className="maskPath" d="m32.02 36.09 1.35-10.91" />
                  <path className="maskPath" d="m39.84 36.09-1.01-10.98" />
                </g>
              </svg>
            </div>
          )}

          {phase === 'details' && (
            <div className="introBox">
              <div className="introHdr">
                <span className="introHdrGlitch">▶</span> CONTACT SUNETRA
              </div>
              <div className="introBody">
                {typedIntro}
                {introCharIndex < INTRO_TEXT.length && <span className="termCursor"></span>}
              </div>
            </div>
          )}

          {phase === 'details' && (
            <div className="ctrlsCont">
              <button className="cyberBtn" onClick={() => handleDismiss('bypass')}>
                [ BYPASS FIREWALL ]
              </button>
              <button className="cyberBtn primary" onClick={() => handleDismiss('contact')}>
                [ ESTABLISH SECURE LINK ]
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HackerIntro;

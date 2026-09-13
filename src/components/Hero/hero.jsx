import gsap from 'gsap';
import {useGSAP} from '@gsap/react';
import { useEffect, useRef } from 'react';
import './hero.css'

// --- Code snippets that scroll horizontally across the background ---
const CODE_LINES = [
    `const scanTarget = async (ip) => { const result = await nmap.scan(ip, '-sV -O'); return result; }`,
    `if (payload.includes('<script>')) { throw new XSSException('Malicious input detected'); }`,
    `function encryptAES(data, key) { return CryptoJS.AES.encrypt(data, key).toString(); }`,
    `SELECT * FROM users WHERE id = ? -- parameterized query prevents SQLi`,
    `ssh -i ~/.ssh/id_rsa user@remote-host -N -f`,
    `const token = jwt.sign({ userId, role }, process.env.SECRET, { expiresIn: '1h' });`,
    `nmap -sS -p 1-65535 --open -T4 -A target.example -oN scan_results.txt`,
    `import { useState, useEffect } from 'react'; // MERN Stack Developer`,
    `db.users.find({ $where: "this.password == '" + input + "'" }) // vulnerable!`,
    `bcrypt.hash(password, 12).then(hash => User.create({ email, password: hash }));`,
    `iptables -A INPUT -p tcp --dport 22 -j ACCEPT && iptables -A INPUT -j DROP`,
    `const socket = new WebSocket('wss://secure.example.com/api'); socket.onmessage = handleData;`,
    `wireshark -i eth0 -k -Y "http.request.method == POST" -w capture.pcap`,
    `app.use(helmet()); app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));`,
    `openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes`,
    `const xss = require('xss'); const safeHtml = xss(userInput, { whiteList: {} });`,
    `ping -c 4 8.8.8.8 && traceroute google.com && netstat -tulnp | grep LISTEN`,
    `mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });`,
    `curl -X POST https://api.target.com/login -d '{"user":"admin","pass":"' + fuzz + '"}'`,
    `class FirewallRule { allow(src, dst, port) { return src.match(this.whitelist); } }`,
];

function Hero() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const fontSize = 13;
        const lineHeight = 28;    // vertical gap between rows
        const scrollSpeed = 0.1; // pixels per frame — slow upward scroll

        // Typing timing (ms-based, not frame-based for realism)
        const TYPE_SPEED_MIN = 18;  // ms between chars (fast bursts)
        const TYPE_SPEED_MAX = 55;  // ms between chars (slower)
        const LINE_PAUSE     = 420; // ms pause after a line finishes before next starts

        const palette = [
            '#00ffcc',
            'rgba(0, 255, 204, 0.38)',
            '#ff3366',
            'rgba(255, 51, 102, 0.35)',
            'rgba(0, 229, 255, 0.65)',
            'rgba(255, 255, 255, 0.28)',
        ];
        let codeLineIndex = 0;

        // State for time-based typewriter
        let linePool    = [];   // completed lines scrolling up
        let typingLine  = null;
        let typeCharIdx = 0;
        let nextCharAt  = 0;    // timestamp when next char should appear
        let lineDoneAt  = null; // timestamp when line finished (for pause)

        const spawnTypingLine = (now) => {
            typingLine  = {
                text  : CODE_LINES[codeLineIndex % CODE_LINES.length],
                color : palette[codeLineIndex % palette.length],
                glow  : codeLineIndex % 3 === 0,
            };
            codeLineIndex++;
            typeCharIdx = 0;
            lineDoneAt  = null;
            nextCharAt  = now + TYPE_SPEED_MIN;
        };

        const buildRows = (now = performance.now()) => {
            canvas.width  = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;

            const rowCount = Math.ceil(canvas.height / lineHeight);
            linePool = [];
            for (let i = 0; i < rowCount; i++) {
                linePool.push({
                    y    : canvas.height - (rowCount - i) * lineHeight,
                    text : CODE_LINES[i % CODE_LINES.length],
                    color: palette[i % palette.length],
                    glow : i % 3 === 0,
                });
            }
            codeLineIndex = rowCount % CODE_LINES.length;
            spawnTypingLine(now);
        };

        buildRows();
        window.addEventListener('resize', () => buildRows());

        let animId;

        const draw = (now) => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.font         = `${fontSize}px "VT323", monospace`;
            ctx.textBaseline = 'top';

            /* ── Scroll completed lines upward ── */
            for (const row of linePool) row.y -= scrollSpeed;
            while (linePool.length > 0 && linePool[0].y < -lineHeight) linePool.shift();

            /* ── Draw completed lines ── */
            for (const row of linePool) {
                ctx.globalAlpha = 1;
                ctx.fillStyle   = row.color;
                ctx.shadowColor = row.glow ? row.color : 'transparent';
                ctx.shadowBlur  = row.glow ? 7 : 0;
                ctx.fillText(row.text, 24, row.y);
                ctx.shadowBlur = 0;
            }

            /* ── Typewriter logic ── */
            if (typingLine) {
                const typingY = canvas.height - lineHeight;

                // Advance one char at a time on timer
                if (lineDoneAt === null) {
                    if (now >= nextCharAt && typeCharIdx < typingLine.text.length) {
                        typeCharIdx++;
                        // randomise next char delay for human-like rhythm
                        const delay = TYPE_SPEED_MIN + Math.random() * (TYPE_SPEED_MAX - TYPE_SPEED_MIN);
                        nextCharAt = now + delay;
                    }

                    // Finished typing this line?
                    if (typeCharIdx >= typingLine.text.length) {
                        lineDoneAt = now;
                    }
                } else if (now - lineDoneAt >= LINE_PAUSE) {
                    // Pause over → commit line to pool, start next
                    linePool.push({
                        y    : typingY,
                        text : typingLine.text,
                        color: typingLine.color,
                        glow : typingLine.glow,
                    });
                    spawnTypingLine(now);
                }

                /* Draw partial text */
                const partial = typingLine.text.slice(0, typeCharIdx);
                ctx.fillStyle   = typingLine.color;
                ctx.shadowColor = typingLine.glow ? typingLine.color : 'transparent';
                ctx.shadowBlur  = typingLine.glow ? 10 : 0;
                ctx.fillText(partial, 24, typingY);

                /* Blinking solid-block cursor (like the intro section) */
                const cursorX  = 24 + ctx.measureText(partial).width;
                const blink    = Math.floor(now / 530) % 2 === 0;
                ctx.shadowBlur = 0;
                if (blink) {
                    ctx.fillStyle   = '#00ffcc';
                    ctx.shadowColor = '#00ffcc';
                    ctx.shadowBlur  = 12;
                    // solid block — same height & width as one monospace char
                    const charW = ctx.measureText('M').width;
                    ctx.fillRect(cursorX + 1, typingY + 1, charW, fontSize);
                    ctx.shadowBlur = 0;
                }
            }

            animId = requestAnimationFrame(draw);
        };

        animId = requestAnimationFrame(draw);

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('resize', buildRows);
        };
    }, []);

    useGSAP(()=>{
        gsap.from('.intro div',{
            x:-200,
            opacity:0,
            duration:2,
            stagger:0.5
        })
        gsap.from('.profilePic',{
            x:70,
            opacity:0,
            duration:2
        })
    })

    return (
        <div className='hero'>
            <canvas ref={canvasRef} className="hacker-rain-canvas" />
            <div className="intro">
                <div><h2>HII, I AM SUNETRA BAR</h2></div>
                <div className='cyber'>
                    <h1>PROVIDE THE BEST</h1>
                    <h1><span className="glow-cyan">CYBER</span> <span className="glow-pink">SOLUTION</span></h1>
                    <h1 style={{ fontWeight:'900', color: '#ffffff', textShadow: '0 0 10px rgba(255,255,255,0.2)' }}>FOR YOUR SECURITY</h1>
                </div>
                 <div>
                     <h4>I am a tech enthusiast skilled in MERN stack Web Development, AI/ML and Cyber Security. I build scalable applications, design intelligent models, solve algorithmic challenges, and ensure secure systems.</h4>
                </div> 
                <div><button className="cyber-btn" onClick={() => document.querySelector('.contact-container')?.scrollIntoView({ behavior: 'smooth' })}>Contact</button></div> 
            </div>
            {/* ── Hacker Target Profile Pic ── */}
            <div className="profile-target-wrapper">

                {/* Outer SVG radar / target rings */}
                <svg className="target-svg" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
                    {/* Dashed outer ring — slow rotate */}
                    <circle cx="250" cy="250" r="230" fill="none" stroke="rgba(0,255,204,0.18)" strokeWidth="1" strokeDasharray="6 10" className="ring-spin-slow"/>
                    {/* Middle ring */}
                    <circle cx="250" cy="250" r="195" fill="none" stroke="rgba(255,51,102,0.14)" strokeWidth="1" strokeDasharray="4 14"/>
                    {/* Inner ring — counter rotate */}
                    <circle cx="250" cy="250" r="215" fill="none" stroke="rgba(0,255,204,0.22)" strokeWidth="0.8" strokeDasharray="2 8" className="ring-spin-rev"/>

                    {/* Crosshair lines */}
                    <line x1="20"  y1="250" x2="100" y2="250" stroke="rgba(0,255,204,0.35)" strokeWidth="1"/>
                    <line x1="380" y1="250" x2="480" y2="250" stroke="rgba(0,255,204,0.35)" strokeWidth="1"/>
                    <line x1="250" y1="20"  x2="250" y2="100" stroke="rgba(0,255,204,0.35)" strokeWidth="1"/>
                    <line x1="250" y1="380" x2="250" y2="480" stroke="rgba(0,255,204,0.35)" strokeWidth="1"/>

                    {/* Corner bracket ticks */}
                    <path d="M 60 90 L 60 60 L 90 60"   fill="none" stroke="#00ffcc" strokeWidth="1.5" opacity="0.55"/>
                    <path d="M 440 90 L 440 60 L 410 60" fill="none" stroke="#00ffcc" strokeWidth="1.5" opacity="0.55"/>
                    <path d="M 60 410 L 60 440 L 90 440" fill="none" stroke="#00ffcc" strokeWidth="1.5" opacity="0.55"/>
                    <path d="M 440 410 L 440 440 L 410 440" fill="none" stroke="#00ffcc" strokeWidth="1.5" opacity="0.55"/>

                    {/* Rotating scan arm */}
                    <g className="scan-arm" style={{transformOrigin:'250px 250px'}}>
                        <line x1="250" y1="250" x2="250" y2="35" stroke="rgba(0,255,204,0.55)" strokeWidth="1.2"/>
                        <circle cx="250" cy="35" r="3" fill="#00ffcc" opacity="0.7"/>
                    </g>

                    {/* HEX coordinate labels */}
                    <text x="68" y="58"  fontFamily="VT323, monospace" fontSize="9" fill="rgba(0,255,204,0.55)">0x3A:FF</text>
                    <text x="390" y="58" fontFamily="VT323, monospace" fontSize="9" fill="rgba(0,255,204,0.55)">0xB7:2C</text>
                    <text x="68" y="455" fontFamily="VT323, monospace" fontSize="9" fill="rgba(255,51,102,0.55)">0xE1:94</text>
                    <text x="390" y="455" fontFamily="VT323, monospace" fontSize="9" fill="rgba(255,51,102,0.55)">0x4D:08</text>

                    {/* LOCKED ON label */}
                    <text x="250" y="490" fontFamily="VT323, monospace" fontSize="10" fill="rgba(0,255,204,0.6)" textAnchor="middle" letterSpacing="3">[ IT'S SUNETRA ]</text>

                    {/* Scan line gradient (horizontal sweep) */}
                    <defs>
                        <linearGradient id="scanGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%"   stopColor="rgba(0,255,204,0)"/>
                            <stop offset="50%"  stopColor="rgba(0,255,204,0.18)"/>
                            <stop offset="100%" stopColor="rgba(0,255,204,0)"/>
                        </linearGradient>
                        <clipPath id="circleClip">
                            <circle cx="250" cy="250" r="200"/>
                        </clipPath>
                    </defs>
                    <rect x="50" y="0" width="400" height="3" fill="url(#scanGrad)" clipPath="url(#circleClip)" className="scan-line-h"/>
                </svg>

                {/* Actual profile picture (circle) */}
                <div className="profilePic">
                    <img src="/netra2.png" alt="Sunetra Bar" />
                </div>
            </div>
        </div>
    )
}
export default Hero;
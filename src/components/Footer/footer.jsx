import './footer.css';

const Footer = () => {
  return (
    <footer className="siteFooter">
      <div className="ftShell">
        <div className="ftBrand">
          <p className="ftTag">// terminal_footer</p>
          <h3 className="ftTitle">Sunetra</h3>
          <p className="ftCopy">
            Building sharp interfaces, secure tools, and sleek portfolio experiences with a cyber-first feel.
          </p>
        </div>

        <div className="ftLinks">
          <a href="#top" className="ftLink">Back to top</a>
          <a href="#projects" className="ftLink">Projects</a>
          <a href="#contact" className="ftLink">Contact</a>
        </div>

        <div className="ftMeta">
          <p className="ftMetaLabel">Status</p>
          <p className="ftMetaVal">All systems operational</p>
          <p className="ftMetaLabel">Reach</p>
          <p className="ftMetaVal">suentrabarofficial@gmail.com</p>
        </div>
      </div>

      <div className="ftBottomLine">
        <span>© 2026 Sunetra. Crafted for the dark mode era.</span>
        <span>Secure • Fast • Minimal</span>
      </div>
    </footer>
  );
};

export default Footer;

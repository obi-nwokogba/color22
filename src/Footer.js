import "./styles.css";

export default function Footer() {
  return (
    <span className="footercontainer">
      Last Updated on September 1, 2024
      <br />
      color22 on GitHUb{" "}
      <a href="https://github.com/obi-nwokogba/color22">
        https://github.com/obi-nwokogba/color22
      </a>
      <br />
      <br />
      &copy; 2024 <a href="https://www.obilo.io">Obi Nwokogba</a>
      <img
        className="color22-footer-logo"
        src="/color22_logo_picker.svg"
        alt="color22"
      />
      <span className="text8">window.innerWidth:</span>
      <span className="text1">{window.innerWidth}px</span>
      <span className="text8">window.innerHeight:</span>
      <span className="text1">{window.innerHeight}px</span>
    </span>
  );
}

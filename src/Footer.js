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
        className="color22FooterLogo"
        src="/color22_logo_svg.svg"
        alt="color22"
      />
    </span>
  );
}

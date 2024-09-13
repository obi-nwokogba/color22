export default function LeftAnchoredMenu(props) {
  function scrollToSection() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  return (
    <div className="sticky-left-menu-box">
      <span onClick={scrollToSection()}>Shades</span>
      <span onClick={scrollToSection()}>Variants</span>
      <span onClick={scrollToSection()}>
        History &middot; {props.historyLength}
      </span>
      <span onClick={scrollToSection()}>Random Colors</span>
    </div>
  );
}

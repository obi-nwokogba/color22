export default function LeftAnchoredMenu() {

  function scrollToSection() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  return <div className='sticky-left-menu-box'>
    <span onClick={scrollToSection()}>Shades</span>
    <span onClick={scrollToSection()}>Variants</span>
    <span onClick={scrollToSection()}>History</span>
    <span onClick={scrollToSection()}>Random Colors</span>
  </div>
}

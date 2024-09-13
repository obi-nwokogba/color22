import "../styles.css";

export default function HexDisplay({ currentColorHex }) {
  return (
    <>
      <span className="detailDisplay1">
        {currentColorHex}
        <img
          onClick={() => {
            navigator.clipboard.writeText(currentColorHex);
          }}
          className="copyClipboardIcon"
          src="/copyIcon.svg"
          alt="Copy to Clipboard"
        />
      </span>
    </>
  );
}

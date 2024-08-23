import "./styles.css";

export default function ColorSampleCircle({ currentColorHex }) {
  return (
    <div
      className="colorSampleCirlce"
      style={{
        backgroundColor: currentColorHex,
        color: "gray",
        padding: 20,
      }}
    ></div>
  );
}

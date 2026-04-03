import khetiSpherePlant from "../KhetiSpherePlant.png";
import "./BrandHeader.css";

export function BrandHeader() {
  return (
    <header className="predictor-header">
      <div className="brand-capsule" aria-label="KhetiSphere brand">
        <img src={khetiSpherePlant} alt="KhetiSphere" className="brand-image" />
      </div>
      <p className="brand-kicker">AI BASED PLANT/CROP HEALTH DETECTOR</p>
      <h1>Potato Disease Predictor</h1>
      <p className="brand-sub">
        Upload a leaf image to know about potato disease.
      </p>
    </header>
  );
}

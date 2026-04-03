import "./PredictionResult.css";

export function PredictionResult({ prediction, confidenceText }) {
  return (
    <div className="result-panel" aria-label="prediction results">
      <div className="result-item">
        <span>Disease</span>
        <strong>{prediction.class || "Unknown"}</strong>
      </div>
      <div className="result-item">
        <span>Confidence</span>
        <strong>{confidenceText}</strong>
      </div>
    </div>
  );
}

import "./ClearButton.css";

export function ClearButton({ onClear }) {
  return (
    <button type="button" className="clear-btn" onClick={onClear}>
      Clear
    </button>
  );
}

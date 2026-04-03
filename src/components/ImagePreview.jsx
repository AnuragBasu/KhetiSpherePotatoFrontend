import "./ImagePreview.css";

export function ImagePreview({ previewUrl }) {
  return (
    <div className="preview-wrap">
      <img src={previewUrl} alt="Selected potato leaf" className="preview-image" />
    </div>
  );
}

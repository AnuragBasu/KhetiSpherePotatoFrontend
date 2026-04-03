import "./UploadZone.css";

export function UploadZone({ inputRef, onPickFile }) {
  return (
    <label
      className="upload-zone"
      onDragOver={(event) => event.preventDefault()}
      onDrop={(event) => {
        event.preventDefault();
        onPickFile(event.dataTransfer.files);
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={(event) => onPickFile(event.target.files)}
        hidden
      />
      <span className="upload-title">Upload PotatoPlant Image here</span>
      <span className="upload-title">CLICK HERE FOR IMAGE UPLOAD</span>
      <span className="upload-hint">
        Supports File ending with .JPG, .PNG, .WEBP{" "}
      </span>
    </label>
  );
}

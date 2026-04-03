import { useRef } from "react";
import { usePrediction } from "./hooks/usePrediction";
import { BrandHeader } from "./components/BrandHeader";
import { UploadZone } from "./components/UploadZone";
import { ImagePreview } from "./components/ImagePreview";
import { StatusMessage } from "./components/StatusMessage";
import { PredictionResult } from "./components/PredictionResult";
import { ClearButton } from "./components/ClearButton";
import "./home.css";

export function ImageUpload() {
  const inputRef = useRef(null);
  const {
    selectedFile,
    previewUrl,
    prediction,
    confidenceText,
    isLoading,
    errorMessage,
    pickFile,
    clearAll,
  } = usePrediction(inputRef);

  return (
    <main className="app-shell">
      <section className="predictor-card">
        <BrandHeader />

        {!previewUrl && (
          <UploadZone inputRef={inputRef} onPickFile={pickFile} />
        )}

        {previewUrl && <ImagePreview previewUrl={previewUrl} />}

        {isLoading && <StatusMessage>Predicting...</StatusMessage>}
        {errorMessage && !isLoading && (
          <StatusMessage variant="error">{errorMessage}</StatusMessage>
        )}

        {prediction && !isLoading && (
          <PredictionResult prediction={prediction} confidenceText={confidenceText} />
        )}

        {selectedFile && (
          <ClearButton onClear={clearAll} />
        )}
      </section>
    </main>
  );
}

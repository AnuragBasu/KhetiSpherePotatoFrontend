import { useEffect, useMemo, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

function getErrorMessage(error) {
  return (
    error?.response?.data?.message ||
    error?.response?.data?.detail ||
    error?.message ||
    "Prediction failed. Try again."
  );
}

export function usePrediction(inputRef) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl("");
      return undefined;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  useEffect(() => {
    if (!selectedFile) return undefined;
    if (!API_URL) {
      setErrorMessage("Missing VITE_API_URL in .env.");
      return undefined;
    }

    const controller = new AbortController();
    let active = true;

    async function predict() {
      setIsLoading(true);
      setPrediction(null);
      setErrorMessage("");

      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
        const response = await axios.post(`${API_URL}/predict`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
          timeout: 30000,
          signal: controller.signal,
        });
        if (active) setPrediction(response.data);
      } catch (error) {
        if (!active || error?.code === "ERR_CANCELED") return;
        setErrorMessage(getErrorMessage(error));
      } finally {
        if (active) setIsLoading(false);
      }
    }

    predict();

    return () => {
      active = false;
      controller.abort();
    };
  }, [selectedFile]);

  const confidenceText = useMemo(() => {
    if (prediction?.confidence === undefined || prediction?.confidence === null) {
      return "--";
    }
    return `${(Number(prediction.confidence) * 100).toFixed(2)}%`;
  }, [prediction]);

  const pickFile = (files) => {
    const file = files?.[0] || null;
    setSelectedFile(file);
    setPrediction(null);
    setErrorMessage("");
  };

  const clearAll = () => {
    setSelectedFile(null);
    setPrediction(null);
    setErrorMessage("");
    if (inputRef.current) inputRef.current.value = "";
  };

  return {
    selectedFile,
    previewUrl,
    prediction,
    confidenceText,
    isLoading,
    errorMessage,
    pickFile,
    clearAll,
  };
}

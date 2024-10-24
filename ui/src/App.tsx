import React, { useState } from "react";
import axios from "axios";
import Header from "./Header";
import Controls from "./Controls";
import ScoreList from "./ScoreList";
import ErrorBoundary from "./ErrorBoundary";

type ViewMode = "score" | "diff" | "clutch";

const App: React.FC = () => {
  const [date, setDate] = useState<string>("");
  const [scores, setScores] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("score");

  const getScores = async () => {
    if (!date) {
      alert("Please enter a date");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `http://localhost:5000/api/games?date=${date}`
      );
      console.log("Response:", response);
      setScores(response.data);
    } catch (error: any) {
      console.error("Error fetching scores:", error);
      setError("An error occurred while fetching the scores.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        fontFamily: "Arial",
        maxWidth: "800px",
        margin: "0 auto",
        padding: "20px",
      }}
    >
      <ErrorBoundary>
        <Header />
        <Controls
          date={date}
          setDate={setDate}
          viewMode={viewMode}
          setViewMode={setViewMode}
          getScores={getScores}
        />
        {loading && (
          <p
            style={{ textAlign: "center", fontStyle: "italic", color: "#666" }}
          >
            Loading scores...
          </p>
        )}
        {error && (
          <p
            style={{ textAlign: "center", fontStyle: "italic", color: "#666" }}
          >
            {error}
          </p>
        )}
        <ScoreList scores={scores} viewMode={viewMode} />
        {scores.length === 0 && !loading && !error && (
          <p
            style={{ textAlign: "center", fontStyle: "italic", color: "#666" }}
          >
            No scores available for this date.
          </p>
        )}
      </ErrorBoundary>
    </div>
  );
};

export default App;

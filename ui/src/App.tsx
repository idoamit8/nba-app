import React, { useState } from 'react';
import axios from 'axios';
import Header from './Header';
import Controls from './Controls';
import ScoreList from './ScoreList';

// Define modes for the view
type ViewMode = 'score' | 'diff' | 'clutch';

const App: React.FC = () => {
  const [date, setDate] = useState<string>('');
  const [scores, setScores] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('score'); // Default view is score

  const getScores = async () => {
    if (!date) {
      alert('Please enter a date');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:3000/api/nba-scores?date=${date}`);
      const sortedGames = response.data.data.sort((a: any, b: any) => {
        const scoreDiffA = Math.abs(a.home_team_score - a.visitor_team_score);
        const scoreDiffB = Math.abs(b.home_team_score - b.visitor_team_score);
        return scoreDiffA - scoreDiffB;
      });
      setScores(sortedGames); // Sort games by ascending order of score difference
    } catch (error: any) {
      console.error('Error fetching scores:', error);
      setError('An error occurred while fetching the scores.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: 'Arial', maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <Header />
      <Controls
        date={date}
        setDate={setDate}
        viewMode={viewMode}
        setViewMode={setViewMode} // Pass setViewMode to Controls
        getScores={getScores}
      />
      {loading && <p style={{ textAlign: 'center', fontStyle: 'italic', color: '#666' }}>Loading scores...</p>}
      {error && <p style={{ textAlign: 'center', fontStyle: 'italic', color: '#666' }}>{error}</p>}
      <ScoreList scores={scores} viewMode={viewMode} />
    </div>
  );
};

export default App;

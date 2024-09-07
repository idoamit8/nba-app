import React from 'react';

interface ScoreCardProps {
  homeTeam: string;
  visitorTeam: string;
  homeScore: string | number;
  visitorScore: string | number;
  scoreDiff: string | number;
  viewMode: 'score' | 'diff' | 'clutch';
  status: string;
  isClutch: boolean; // New prop to indicate if the game is clutch
}

const ScoreCard: React.FC<ScoreCardProps> = ({
  homeTeam,
  visitorTeam,
  homeScore,
  visitorScore,
  scoreDiff,
  viewMode,
  status,
  isClutch,
}) => {
  return (
    <div style={scoreCardStyles}>
      <h3 style={{ color: '#1d428a' }}>
        {homeTeam} vs {visitorTeam}
      </h3>
      {/* Conditionally render based on the view mode */}
      {viewMode === 'score' && <p>Score: {homeScore} - {visitorScore}</p>}
      {viewMode === 'diff' && <p>Score Difference: {scoreDiff}</p>}
      {viewMode === 'clutch' && isClutch && <span style={clutchLabelStyles}>Clutch Game</span>}
      <p>Status: {status}</p>
    </div>
  );
};

const scoreCardStyles: React.CSSProperties = {
  backgroundColor: 'white',
  padding: '15px',
  marginBottom: '15px',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  position: 'relative',
};

const clutchLabelStyles: React.CSSProperties = {
  backgroundColor: '#ff5733',
  color: 'white',
  padding: '5px 10px',
  borderRadius: '5px',
  position: 'absolute',
  top: '10px',
  right: '10px',
  fontSize: '12px',
};

export default ScoreCard;

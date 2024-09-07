import React from 'react';

interface ControlsProps {
  date: string;
  setDate: (date: string) => void;
  viewMode: 'score' | 'diff' | 'clutch';
  setViewMode: (mode: 'score' | 'diff' | 'clutch') => void;
  getScores: () => void;
}

const Controls: React.FC<ControlsProps> = ({ date, setDate, viewMode, setViewMode, getScores }) => {
  return (
    <div style={controlsStyles}>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        style={inputStyles}
      />
      <button onClick={getScores} style={buttonStyles}>
        Get Scores
      </button>

      {/* Separate buttons to select the view mode */}
      <div style={viewButtonsContainerStyles}>
        <button
          onClick={() => setViewMode('score')}
          style={{
            ...buttonStyles,
            backgroundColor: viewMode === 'score' ? '#2c5aa0' : '#1d428a',
          }}
        >
          Show Actual Scores
        </button>
        <button
          onClick={() => setViewMode('diff')}
          style={{
            ...buttonStyles,
            backgroundColor: viewMode === 'diff' ? '#2c5aa0' : '#1d428a',
          }}
        >
          Show Score Difference
        </button>
        <button
          onClick={() => setViewMode('clutch')}
          style={{
            ...buttonStyles,
            backgroundColor: viewMode === 'clutch' ? '#2c5aa0' : '#1d428a',
          }}
        >
          Show Clutch Games
        </button>
      </div>
    </div>
  );
};

const controlsStyles: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '10px',
  marginBottom: '20px',
};

const inputStyles: React.CSSProperties = {
  fontSize: '16px',
  padding: '10px',
  width: '100%',
  maxWidth: '300px',
};

const buttonStyles: React.CSSProperties = {
  fontSize: '16px',
  padding: '10px',
  backgroundColor: '#1d428a',
  color: 'white',
  border: 'none',
  cursor: 'pointer',
  borderRadius: '5px',
  transition: 'background-color 0.3s',
};

const viewButtonsContainerStyles: React.CSSProperties = {
  display: 'flex',
  gap: '10px',
};

export default Controls;

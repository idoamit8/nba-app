import React from 'react';

const Header: React.FC = () => {
  return (
    <header style={headerStyles}>
      <h1>NBA Scores</h1>
    </header>
  );
};

const headerStyles: React.CSSProperties = {
  backgroundColor: '#1d428a',
  color: 'white',
  textAlign: 'center',
  padding: '20px',
  fontSize: '2rem',
  borderRadius: '8px',
  marginBottom: '20px',
};

export default Header;

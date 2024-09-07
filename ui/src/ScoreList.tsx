import React from 'react';
import ScoreCard from './ScoreCard';

interface Game {
  home_team: { full_name: string };
  visitor_team: { full_name: string };
  home_team_score: number;
  visitor_team_score: number;
  status: string;
}

interface ScoreListProps {
  scores: Game[];
  viewMode: 'score' | 'diff' | 'clutch';
}

const ScoreList: React.FC<ScoreListProps> = ({ scores, viewMode }) => {
  return (
    <div>
      {scores.map((game, index) => {
        const homeScore = game.home_team_score !== null ? game.home_team_score : '-';
        const visitorScore = game.visitor_team_score !== null ? game.visitor_team_score : '-';
        const scoreDiff = game.home_team_score !== null && game.visitor_team_score !== null
          ? Math.abs(game.home_team_score - game.visitor_team_score)
          : '-';
        const isClutch = typeof scoreDiff === 'number' && scoreDiff < 10; // Clutch if score diff is less than 10

        return (
          <ScoreCard
            key={index}
            homeTeam={game.home_team.full_name}
            visitorTeam={game.visitor_team.full_name}
            homeScore={homeScore}
            visitorScore={visitorScore}
            scoreDiff={scoreDiff}
            viewMode={viewMode} // Pass the view mode to ScoreCard
            status={game.status}
            isClutch={isClutch} // Pass isClutch to ScoreCard
          />
        );
      })}
    </div>
  );
};

export default ScoreList;

import React from "react";
import ScoreCard2 from "./ScoreCard2";

interface Game {
  game_id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  interestScore: number;
}

interface ScoreListProps {
  scores: Game[];
  viewMode: "score" | "diff" | "clutch";
}

const ScoreList: React.FC<ScoreListProps> = ({ scores, viewMode }) => {
  // Create a sorted copy of the scores array
  const sortedScores = [...scores];
  sortedScores.sort((a, b) => b.interestScore - a.interestScore);

  return (
    <div>
      {sortedScores.map((game) => {
        const homeScore = game.homeScore ?? "-";
        const awayScore = game.awayScore ?? "-";
        const scoreDiff =
          game.homeScore !== null && game.awayScore !== null
            ? Math.abs(game.homeScore - game.awayScore)
            : "-";
        const isClutch = typeof scoreDiff === "number" && scoreDiff < 10;

        return (
          <ScoreCard2
            key={game.game_id}
            homeTeam={game.homeTeam}
            visitorTeam={game.awayTeam}
            homeScore={homeScore}
            visitorScore={awayScore}
            scoreDiff={scoreDiff}
            viewMode={viewMode}
            isClutch={isClutch}
            interestScore={game.interestScore} // Pass interestScore to ScoreCard2
          />
        );
      })}
    </div>
  );
};

export default ScoreList;

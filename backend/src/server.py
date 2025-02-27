import os
import uvicorn
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict, Any
try:
    # Try local import first
    from calculate_interesting_game import calculateInterestGame
    from get_game_play_by_play_by_id import getGamePlayByPlayById
    from get_games_summaries import getGamesSummariesByDate
except ImportError:
    from .calculate_interesting_game import calculateInterestGame
    from .get_game_play_by_play_by_id import getGamePlayByPlayById
    from .get_games_summaries import getGamesSummariesByDate


app = FastAPI()

# Enable CORS (same as Flask's CORS(app))
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (adjust as needed)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/games")
async def get_games(date: str):
    if not date:
        raise HTTPException(status_code=400, detail="Date parameter is required.")
    
    summaries: List[Dict[str, Any]] = getGamesSummariesByDate(date)
    
    for gameObj in summaries:
        gameId = gameObj['game_id']
        playByPlay = getGamePlayByPlayById(gameId)
        interestScore = calculateInterestGame(playByPlay)
        gameObj['interestScore'] = interestScore

    return summaries

# Ensure the server listens on 0.0.0.0 and uses Render's provided PORT
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))  # Default to 5000 if PORT is not set
    uvicorn.run(app, host="0.0.0.0", port=port)

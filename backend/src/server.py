import os
import uvicorn
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict, Any
import httpx
import asyncio
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

async def fetch_with_timeout(url: str, timeout: float = 30.0) -> Dict[Any, Any]:
    async with httpx.AsyncClient(timeout=timeout) as client:
        try:
            response = await client.get(url)
            response.raise_for_status()
            return response.json()
        except httpx.TimeoutException:
            raise HTTPException(status_code=504, detail="NBA API request timed out")
        except httpx.HTTPError as e:
            raise HTTPException(status_code=502, detail=f"NBA API error: {str(e)}")
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

@app.get("/api/games")
async def get_games(date: str):
    try:
        if not date:
            raise HTTPException(status_code=400, detail="Date parameter is required.")
        
        # Use the new fetch function with timeout
        nba_api_url = f"https://cdn.nba.com/static/json/liveData/scoreboard/todaysScoreboard_00.json"
        data = await fetch_with_timeout(nba_api_url)
        
        summaries: List[Dict[str, Any]] = getGamesSummariesByDate(date)
        
        for gameObj in summaries:
            gameId = gameObj['game_id']
            playByPlay = getGamePlayByPlayById(gameId)
            interestScore = calculateInterestGame(playByPlay)
            gameObj['interestScore'] = interestScore

        return summaries
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Ensure the server listens on 0.0.0.0 and uses Render's provided PORT
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))  # Default to 5000 if PORT is not set
    uvicorn.run(app, host="0.0.0.0", port=port)

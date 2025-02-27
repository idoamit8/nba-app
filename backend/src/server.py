import os
import uvicorn
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict, Any
import httpx
import asyncio
import logging
try:
    # Try local import first
    from calculate_interesting_game import calculateInterestGame
    from get_game_play_by_play_by_id import getGamePlayByPlayById
    from get_games_summaries import getGamesSummariesByDate
except ImportError:
    from .calculate_interesting_game import calculateInterestGame
    from .get_game_play_by_play_by_id import getGamePlayByPlayById
    from .get_games_summaries import getGamesSummariesByDate

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

# Enable CORS (same as Flask's CORS(app))
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (adjust as needed)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Browser-like headers to avoid being blocked
HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    'Accept': 'application/json',
    'Accept-Language': 'en-US,en;q=0.9',
    'Origin': 'https://www.nba.com',
    'Referer': 'https://www.nba.com/'
}

async def fetch_with_timeout(url: str, timeout: float = 30.0) -> Dict[Any, Any]:
    async with httpx.AsyncClient(timeout=timeout) as client:
        try:
            logger.info(f"Fetching data from: {url}")
            response = await client.get(url, headers=HEADERS)
            logger.info(f"Response status: {response.status_code}")
            logger.info(f"Response headers: {response.headers}")
            
            # Log the response content for debugging
            try:
                logger.info(f"Response content: {response.text[:500]}...")  # First 500 chars
            except Exception as e:
                logger.error(f"Could not log response content: {e}")

            response.raise_for_status()
            return response.json()
        except httpx.TimeoutException as e:
            logger.error(f"Timeout error: {str(e)}")
            raise HTTPException(status_code=504, detail="NBA API request timed out")
        except httpx.HTTPError as e:
            logger.error(f"HTTP error: {str(e)}")
            raise HTTPException(status_code=502, detail=f"NBA API error: {str(e)}")
        except Exception as e:
            logger.error(f"Unexpected error: {str(e)}")
            raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

@app.get("/api/games")
async def get_games(date: str):
    try:
        logger.info(f"Received request for date: {date}")
        if not date:
            raise HTTPException(status_code=400, detail="Date parameter is required.")
        
        # Use the new fetch function with timeout
        nba_api_url = f"https://cdn.nba.com/static/json/liveData/scoreboard/todaysScoreboard_00.json"
        logger.info(f"Requesting NBA API at: {nba_api_url}")
        data = await fetch_with_timeout(nba_api_url)
        logger.info("Successfully retrieved data from NBA API")
        
        summaries: List[Dict[str, Any]] = getGamesSummariesByDate(date)
        
        for gameObj in summaries:
            gameId = gameObj['game_id']
            playByPlay = getGamePlayByPlayById(gameId)
            interestScore = calculateInterestGame(playByPlay)
            gameObj['interestScore'] = interestScore

        return summaries
    except Exception as e:
        logger.error(f"Error in get_games: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
async def root():
    return {"status": "healthy", "message": "Server is running"}

# Ensure the server listens on 0.0.0.0 and uses Render's provided PORT
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))  # Default to 5000 if PORT is not set
    uvicorn.run(app, host="0.0.0.0", port=port)

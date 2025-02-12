from nba_api.stats.endpoints import PlayByPlay  # type: ignore
import json

def extract_score_story(play_by_play_data):
    # Find the PlayByPlay result set
    result_sets = next(
        (set for set in play_by_play_data["resultSets"] if set["name"] == "PlayByPlay"), 
        None
    )

    if not result_sets:
        raise ValueError("PlayByPlay result set not found.")
    
    row_set = result_sets["rowSet"]

    # Extract the score changes
    scores = []
    last_score = None  # Track the previous score to detect changes

    for row in row_set:
        period = row[4]  # Quarter/period
        game_time = row[6]  # Game time in the format MM:SS
        score = row[10]  # SCORE field

        if score and score != last_score:
            visitor_score, home_score = map(int, score.split(" - "))
            scores.append({
                "quarter": period,
                "time": game_time,
                "homeScore": home_score,
                "visitorScore": visitor_score
            })
            last_score = score  # Update the last seen score

    return scores
    # Find the PlayByPlay result set
    result_sets = next(
        (set for set in play_by_play_data["resultSets"] if set["name"] == "PlayByPlay"), 
        None
    )

    if not result_sets:
        raise ValueError("PlayByPlay result set not found.")
    
    row_set = result_sets["rowSet"]

    # Extract the score changes
    scores = []
    last_score = None  # Track the previous score to detect changes

    for row in row_set:
        score = row[10]  # SCORE field

        if score and score != last_score:
            visitor_score, home_score = map(int, score.split(" - "))
            scores.append({"homeScore": home_score, "visitorScore": visitor_score})
            last_score = score  # Update the last seen score

    return scores

def getGamePlayByPlayById(gameId):
    playByPlay = PlayByPlay(game_id=gameId)
    data = json.loads(playByPlay.get_json())
    return extract_score_story(data)

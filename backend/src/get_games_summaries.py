from nba_api.stats.endpoints import ScoreboardV2  # type: ignore
import json
import requests

def getGamesSummariesByDate(date):
    try:
        # Fetch scoreboard data (Reduce timeout to avoid hanging requests)
        scoreboard = ScoreboardV2(game_date=date, timeout=5)
        raw_json = scoreboard.get_json()

        # 🚨 Debugging: Print the response Render receives
        print("DEBUG: Raw JSON from NBA API:", raw_json[:500])  # Print first 500 chars

        # Ensure JSON is correctly loaded into a dictionary
        data = json.loads(raw_json) if isinstance(raw_json, str) else raw_json

        if not isinstance(data, dict):  # Ensure data is a dictionary
            return {"error": "Invalid response format from NBA API.", "response": raw_json}

        game_summaries = []
        game_header_set = None
        line_score_set = None

        for result_set in data.get('resultSets', []):
            if result_set['name'] == 'GameHeader':
                game_header_set = result_set
            elif result_set['name'] == 'LineScore':
                line_score_set = result_set

        if not game_header_set or not line_score_set:
            return {"error": "Missing expected data in NBA API response.", "response": data}

        # Create a mapping for the line score data
        line_score_data = {}
        headers = line_score_set['headers']
        for row in line_score_set['rowSet']:
            team_data = dict(zip(headers, row))
            team_id = team_data['TEAM_ID']
            line_score_data[team_id] = {
                'team_name': f"{team_data['TEAM_CITY_NAME']} {team_data['TEAM_NAME']}",
                'score': team_data['PTS']
            }

        # Process each game
        headers = game_header_set['headers']
        for row in game_header_set['rowSet']:
            game_data = dict(zip(headers, row))
            home_team_id = game_data['HOME_TEAM_ID']
            away_team_id = game_data['VISITOR_TEAM_ID']

            game_summary = {
                'game_id': game_data['GAME_ID'],
                'homeTeam': line_score_data.get(home_team_id, {}).get('team_name', 'Unknown'),
                'homeScore': line_score_data.get(home_team_id, {}).get('score', 0),
                'awayTeam': line_score_data.get(away_team_id, {}).get('team_name', 'Unknown'),
                'awayScore': line_score_data.get(away_team_id, {}).get('score', 0)
            }

            game_summaries.append(game_summary)

        return game_summaries
    
    except json.JSONDecodeError:
        return {"error": "Failed to parse JSON from NBA API."}
    except requests.exceptions.ReadTimeout:
        return {"error": "NBA API request timed out, please try again later."}
    except requests.exceptions.ConnectionError:
        return {"error": "Unable to connect to NBA API. Render might be blocking it."}
    except Exception as e:
        return {"error": str(e)}

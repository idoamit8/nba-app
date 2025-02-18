from nba_api.stats.endpoints import ScoreboardV2  # type: ignore
import json
import requests

def getGamesSummariesByDate(date):
    try:
        # Reduce timeout to 5 seconds
        scoreboard = ScoreboardV2(game_date=date, timeout=5)

        # Get the result in JSON format and parse it
        data = json.loads(scoreboard.get_json())
        game_summaries = []
        game_header_set = None
        line_score_set = None

        for result_set in data['resultSets']:
            if result_set['name'] == 'GameHeader':
                game_header_set = result_set
            elif result_set['name'] == 'LineScore':
                line_score_set = result_set

        if not game_header_set or not line_score_set:
            return []

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
                'homeTeam': line_score_data[home_team_id]['team_name'],
                'homeScore': line_score_data[home_team_id]['score'],
                'awayTeam': line_score_data[away_team_id]['team_name'],
                'awayScore': line_score_data[away_team_id]['score']
            }

            game_summaries.append(game_summary)

        return game_summaries
    
    except requests.exceptions.ReadTimeout:
        return {"error": "NBA API request timed out, please try again later."}
    except requests.exceptions.ConnectionError:
        return {"error": "Unable to connect to NBA API. Render might be blocking it."}
    except Exception as e:
        return {"error": str(e)}

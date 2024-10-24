from flask import Flask, request, jsonify  # type: ignore
from flask_cors import CORS # type: ignore
from calculate_intersting_game import calculateInterestGame # type: ignore
from get_game_play_by_play_by_id import getGamePlayByPlayById # type: ignore
from get_games_summaries import getGamesSummariesByDate # type: ignore

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# API endpoint to return games for a given date
@app.route('/api/games', methods=['GET'])
def get_games():
    date = request.args.get('date')

    if not date:
        return jsonify({'error': 'Date parameter is required.'}), 400

    summaries = getGamesSummariesByDate(date)
    
    # Process each game to add the interest score
    for gameObj in summaries:
        gameId = gameObj['game_id']
        playByPlay = getGamePlayByPlayById(gameId)
        interestScore = calculateInterestGame(playByPlay)
        gameObj['interestScore'] = interestScore

    # Return the list of games as JSON
    return jsonify(summaries), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
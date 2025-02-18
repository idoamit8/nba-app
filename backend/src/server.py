import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from calculate_interesting_game import calculateInterestGame
from get_game_play_by_play_by_id import getGamePlayByPlayById
from get_games_summaries import getGamesSummariesByDate

app = Flask(__name__)
CORS(app)

@app.route('/api/games', methods=['GET'])
def get_games():
    date = request.args.get('date')
    if not date:
        return jsonify({'error': 'Date parameter is required.'}), 400
    
    summaries = getGamesSummariesByDate(date)
    for gameObj in summaries:
        gameId = gameObj['game_id']
        playByPlay = getGamePlayByPlayById(gameId)
        interestScore = calculateInterestGame(playByPlay)
        gameObj['interestScore'] = interestScore

    return jsonify(summaries), 200

# Ensure the server listens on 0.0.0.0 and uses Render's provided PORT
if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))  # Default to 5000 if PORT is not set
    app.run(host='0.0.0.0', port=port)

from server_nba_api import app  # type: ignore # Import your Flask app

# Lambda handler function to bridge Flask and Lambda
def handler(event, context):
    from serverless_wsgi import handle_request # type: ignore
    return handle_request(app, event, context)

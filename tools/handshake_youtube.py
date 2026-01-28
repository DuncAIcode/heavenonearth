
import os
from googleapiclient.discovery import build
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

api_key = os.environ.get("YOUTUBE_API_KEY")

if not api_key:
    print("Error: Missing YOUTUBE_API_KEY in .env")
    exit(1)

try:
    youtube = build('youtube', 'v3', developerKey=api_key)
    # Simple query to check connection - search for "Google" channel
    request = youtube.channels().list(
        part="snippet",
        forUsername="Google"
    )
    response = request.execute()
    
    print("Connection Successful! YouTube API Responded.")
    print(f"Response Items: {len(response.get('items', []))}")

except Exception as e:
    print(f"YouTube Handshake Failed. Result: {e}")

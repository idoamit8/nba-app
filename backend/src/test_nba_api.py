import requests

url = "https://stats.nba.com/stats/scoreboardV2?GameDate=2025-02-12"
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    "Referer": "https://www.nba.com/",
    "Origin": "https://www.nba.com",
    "Accept-Language": "en-US,en;q=0.9",
    "Accept-Encoding": "gzip, deflate, br",
    "Connection": "keep-alive",
}

try:
    print("Sending request to NBA API...")
    response = requests.get(url, headers=headers, timeout=30)
    
    print(f"Response Status Code: {response.status_code}")
    
    if response.status_code == 200:
        print("NBA API Response (first 500 chars):")
        print(response.text[:500])
    else:
        print(f"Error: {response.status_code}")
        print("Response Body (first 500 chars):")
        print(response.text[:500])

except requests.exceptions.Timeout:
    print("❌ Request Timed Out")
except requests.exceptions.RequestException as e:
    print(f"❌ Request Error: {e}")

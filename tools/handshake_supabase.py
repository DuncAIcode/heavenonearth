
import os
from supabase import create_client, Client
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_ANON_KEY")

if not url or not key:
    print("Error: Missing Supabase credentials in .env")
    exit(1)

try:
    supabase: Client = create_client(url, key)
    # Simple query to check connection - listing public tables or just checking health
    # Since we might not have tables yet, we'll just check if we can essentially 'ping' or getting a known error is also a sign of connectivity vs network error
    # Let's try to get the auth settings or just specific check
    # Actually, listing buckets is a safe read operation if storage is enabled, or just checking auth.
    
    # A simple way to verify is to try and list users or something public.
    # But usually 'supabase' object creation is local. real request happens on call.
    # Let's try to list a non-existent table to see if we get a 404 or a connection error.
    # check health? Supabase logic usually involves making a request.
    
    # We will try to fetch the session to verify the key format at least, or querying a system table if possible.
    # Safest: Try to access a public table. If schema hasn't been applied, this might error with "relation does not exist", which CONFIRMS connectivity.
    
    response = supabase.table("users").select("*").limit(1).execute()
    print("Connection Successful! (Even if table empty or missing context)")
    print(f"Response: {response}")

except Exception as e:
    # If we get a specific API error, we connected. If we get a network error, we failed.
    print(f"Supabase Handshake Attempted. Result: {e}")
    # We consider "relation does not exist" as SUCCESS for connectivity.
    if "relation" in str(e) or "404" in str(e) or "does not exist" in str(e):
         print("Connection Verified: Reached Supabase (Database response received).")

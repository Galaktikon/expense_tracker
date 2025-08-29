import os
from plaid2 import PlaidClient

client = PlaidClient.from_env(
    client_id=os.environ["PLAID_CLIENT_ID"],
    secret=os.environ["PLAID_SECRET"],
    environment=os.environ["PLAID_ENV"]
)

def create_link_token(user_id: str):
    response = client.link_token_create({
        "user": {
            "client_user_id": user_id
        },
        "client_name": "Expense Tracker",
        "products": ["transactions"],
        "country_codes": ["US"],
        "language": "en"
    })
    return response["link_token"]

def exchange_public_token(public_token: str) -> str:
    response = client.item_public_token_exchange(public_token)
    access_token = response["access_token"]
    return access_token

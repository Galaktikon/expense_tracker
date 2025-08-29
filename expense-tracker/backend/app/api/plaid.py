from pydantic import BaseModel
from fastapi import APIRouter, Depends, Request, HTTPException
from app.services.plaid_service import create_link_token
from app.services.plaid_service import exchange_public_token

router = APIRouter(prefix="/plaid", tags=["Plaid"])

class TokenExchangeRequest(BaseModel):
    public_token: str
    user_id: str  # Supabase user ID

@router.post("/exchange-token")
def exchange_token(payload: TokenExchangeRequest):
    try:
        access_token = exchange_public_token(payload.public_token)
        # Store access_token to Supabase or your DB here
        print(f"Storing access token for user {payload.user_id}: {access_token}")
        return {"status": "success"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
@router.get("/link-token")
def get_link_token(request: Request):
    user_id = request.headers.get("x-user-id")
    if not user_id:
        return {"error": "Missing user ID"}

    token = create_link_token(user_id)
    return {"link_token": token}

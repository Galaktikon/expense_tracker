from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import plaid

app = FastAPI()

app.include_router(plaid.router)

# Allow your frontend (Expo) and Netlify domain
origins = [
    "http://localhost:3000",
    "http://localhost:19006",  # Expo web
    "https://your-app.netlify.app"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Backend is running"}

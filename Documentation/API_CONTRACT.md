# GapMyClub API Contract

Base URL:

Development:
http://localhost:8000/api/


## Clubs

Represents golf clubs owned by a user.

---

### Get All Clubs

GET /clubs/

Response:

[
  {
    "id": 1,
    "name": "Driver",
    "club_type": "Wood",
    "average_distance": 225
  }
]


---

### Create Club

POST /clubs/

Request:

{
  "name": "7 Iron",
  "club_type": "Iron"
}


Response:

{
  "id": 2,
  "name": "7 Iron",
  "club_type": "Iron",
  "average_distance": null
}


---

## Shot Sessions

Represents a practice session or simulator session.

GET /sessions/

Response:

[
  {
    "id": 1,
    "date": "2026-06-02",
    "location": "Indoor Simulator"
  }
]


---

## Shots

Represents an individual shot.

POST /shots/

Request:

{
  "club": 2,
  "session": 1,
  "distance": 147
}

Response:

{
  "id": 12,
  "club": 2,
  "distance": 147
}
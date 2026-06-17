# GapMyClub API Contract

## Base URL

### Development

```text
http://localhost:8000/api
```

### Local Network Testing

```text
http://192.168.1.75:8000/api
```

Note: The local network IP may change. Run `ipconfig` and use the IPv4 address under `Wireless LAN adapter Wi-Fi`.

---

# Clubs

Represents golf clubs tracked by a player.

## Get All Clubs

```http
GET /clubs/
```

### Response

```json
[
  {
    "id": 1,
    "user": null,
    "name": "Callaway",
    "club_type": "DRIVER",
    "club_type_display": "Driver",
    "average_distance": null,
    "shortest_distance": "180.0",
    "longest_distance": "380.0",
    "notes": "Test note",
    "created_at": "2026-06-04T14:39:30.275156Z",
    "updated_at": "2026-06-04T14:39:30.275156Z"
  }
]
```

---

# Shot Sessions

Represents a practice, simulator, or gapping session.

## Get All Sessions

```http
GET /sessions/
```

### Response

```json
[
  {
    "id": 1,
    "user": null,
    "name": "Indoor",
    "session_date": "2026-06-04T06:00:00Z",
    "location": "Round9",
    "notes": "Test note",
    "shots_count": 1
  }
]
```

---

# Shots

Represents an individual golf shot linked to a club and session.

## Get All Shots

```http
GET /shots/
```

## Get Shots by Club

```http
GET /shots/?club={club_id}
```

Example:

```http
GET /shots/?club=1
```

## Get Shots by Session

```http
GET /shots/?session={session_id}
```

Example:

```http
GET /shots/?session=1
```

## Create Shot

```http
POST /shots/
```

### Request

```json
{
  "club": 1,
  "session": 1,
  "carry_distance": 245.0,
  "total_distance": 260.0,
  "ball_speed": 145.5,
  "club_speed": 98.2,
  "launch_angle": 13.5,
  "spin_rate": 2500,
  "notes": "Solid contact"
}
```

### Response

```json
{
  "id": 1,
  "club": 1,
  "club_name": "Callaway",
  "club_type": "DRIVER",
  "club_type_display": "Driver",
  "session": 1,
  "session_name": "Indoor",
  "carry_distance": "245.0",
  "total_distance": "260.0"
}
```

---

# Notes

- User ownership is currently nullable until authentication is implemented.
- Decimal fields return as strings from Django REST Framework.
- Club statistics will eventually be calculated from related shots.
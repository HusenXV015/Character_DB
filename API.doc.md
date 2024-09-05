# API Documentation

This document provides the details of the API endpoints for user authentication, game management, and character management.

## Authentication

### POST `/login`

Authenticate a user and return an access token.

- **Request Body:**
  - `email` (string, required): User's email.
  - `password` (string, required): User's password.

- **Response:**
  - Status: `200 OK`
  - Body: 
    ```json
    {
      "access_token": "string"
    }
    ```

### POST `/google-login`

Authenticate a user via Google OAuth.

- **Request Header:**
  - `token` (string, required): Google token.

- **Response:**
  - Status: `200 OK`
  - Body: 
    ```json
    {
      "access_token": "string"
    }
    ```

### POST `/register`

Register a new user.

- **Request Body:**
  - `username` (string, required)
  - `email` (string, required)
  - `password` (string, required)
  - `gender` (string, optional)

- **Response:**
  - Status: `201 Created`
  - Body: 
    ```json
    {
      "message": "Success create new user",
      "user": {
        "id": "number",
        "username": "string",
        "email": "string",
        "gender": "string"
      }
    }
    ```

---

## Game Management

### GET `/games`

Retrieve a list of all games.

- **Response:**
  - Status: `200 OK`
  - Body: 
    ```json
    {
      "message": "Success read games",
      "games": [
        {
          "id": "number",
          "name": "string"
        }
      ]
    }
    ```

### POST `/games/add`

Add a new game. Requires `authorization`.

- **Request Body:**
  - `name` (string, required): The name of the game.

- **Response:**
  - Status: `201 Created`
  - Body: 
    ```json
    {
      "message": "Success create new game",
      "game": {
        "id": "number",
        "name": "string"
      }
    }
    ```

### DELETE `/games/:id`

Delete a game by ID. Requires `authorization`.

- **Path Parameter:**
  - `id` (number, required): Game ID.

- **Response:**
  - Status: `200 OK`
  - Body: 
    ```json
    {
      "message": "Success to delete game with id :id"
    }
    ```

---

## Character Management

### GET `/characters`

Retrieve a list of all characters.

- **Response:**
  - Status: `200 OK`
  - Body: 
    ```json
    {
      "message": "Success read Character",
      "characters": [
        {
          "id": "number",
          "name": "string",
          "gender": "string",
          "gameId": "number",
          "description": "string",
          "imgUrl": "string",
          "skill": "string",
          "weapon": "string",
          "User": {
            "username": "string",
            "email": "string"
          },
          "Game": {
            "name": "string"
          }
        }
      ]
    }
    ```

### GET `/characters/:id`

Retrieve a character by ID. Requires `authorization`.

- **Path Parameter:**
  - `id` (number, required): Character ID.

- **Response:**
  - Status: `200 OK`
  - Body: 
    ```json
    {
      "characters": {
        "id": "number",
        "name": "string",
        "gender": "string",
        "gameId": "number",
        "description": "string",
        "imgUrl": "string",
        "skill": "string",
        "weapon": "string",
        "User": {
          "username": "string",
          "email": "string"
        },
        "Game": {
          "name": "string"
        }
      }
    }
    ```

### POST `/characters/add`

Add a new character. Requires `authorization`.

- **Request Body:**
  - `name` (string, required)
  - `gender` (string, required)
  - `gameName` (string, required)
  - `gameId` (number, required)
  - `description` (string, required)
  - `imgUrl` (string, optional)
  - `skill` (string, optional)
  - `weapon` (string, optional)

- **Response:**
  - Status: `201 Created`
  - Body: 
    ```json
    {
      "message": "Success input Character",
      "character": {
        "id": "number",
        "name": "string",
        "gender": "string",
        "gameId": "number",
        "description": "string",
        "imgUrl": "string",
        "skill": "string",
        "weapon": "string"
      }
    }
    ```

### PUT `/characters/:id`

Update a character by ID. Requires `authorization`.

- **Path Parameter:**
  - `id` (number, required): Character ID.

- **Request Body:**
  - `name` (string, optional)
  - `gender` (string, optional)
  - `gameName` (string, optional)
  - `gameId` (number, optional)
  - `description` (string, optional)
  - `imgUrl` (string, optional)
  - `skill` (string, optional)
  - `weapon` (string, optional)

- **Response:**
  - Status: `200 OK`
  - Body: 
    ```json
    {
      "message": "Success edit Character",
      "character": {
        "id": "number",
        "name": "string",
        "gender": "string",
        "gameId": "number",
        "description": "string",
        "imgUrl": "string",
        "skill": "string",
        "weapon": "string"
      }
    }
    ```

### PATCH `/characters/:id`

Partially update a character by ID (image only or selected fields). Requires `authorization`.

- **Path Parameter:**
  - `id` (number, required): Character ID.

- **Request Body:**
  - `imgUrl` (file, optional): Image file for the character.
  - Other character fields (optional).

- **Response:**
  - Status: `200 OK`
  - Body: 
    ```json
    {
      "message": "Success update Character",
      "characters": {
        "id": "number",
        "name": "string",
        "gender": "string",
        "gameId": "number",
        "description": "string",
        "imgUrl": "string",
        "skill": "string",
        "weapon": "string"
      }
    }
    ```

### DELETE `/characters/:id`

Delete a character by ID. Requires `authorization`.

- **Path Parameter:**
  - `id` (number, required): Character ID.

- **Response:**
  - Status: `200 OK`
  - Body: 
    ```json
    {
      "message": "Successfully deleted."
    }
    ```

### GET `/characters/generate`

Generate a random character name using Google Generative AI.

- **Response:**
  - Status: `200 OK`
  - Body: 
    ```json
    {
      "message": "Generated Character Name",
      "characterName": "string"
    }
    ```

---

## Error Handling

Errors are returned in the following format:

- **Error Response:**
  - Status: `4xx` or `5xx`
  - Body:
    ```json
    {
      "message": "Error message"
    }
    ```


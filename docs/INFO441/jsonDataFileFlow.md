---
hide:
  - navigation
  - toc
---

<small><i>Last modified: {{ git_revision_date_localized }}</i></small>

<div class="back-button">
    <br>
    <a href="javascript:history.back()">← Back</a>
    <br>
    <br>
</div>

# JSON Data File Flow

### 🗂 Files on My Server

- **userData.json**: JSON file used to store user information.

### 🖥 My Page Server

- Acts as the intermediary between the user's browser and the JSON file.

#### Server-Side File Operations

- `fs.readFile(...)`: Reads user data from `userData.json`.
- `fs.writeFile(...)`: Writes user data to `userData.json`.

### 🌐 My Site in a User's Browser

- Interface where users interact with the application.
    
#### Browser-Server Communication

- **GET Request**:
    - Endpoint used to **load users** from the server.
    - Triggers a read from `userData.json`.
        
- **POST Request (with JSON body)**:
    - Used to **save user info**.
    - Sends data to server, which writes to `userData.json`.
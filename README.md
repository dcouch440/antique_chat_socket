# `Antique Chat Socket Server`

### Created by David Couch

### Project created 5/23/2021

## `About`

This is a socket server for my social media application ( https://github.com/dcouch440/antique_social_media )

This socket handles chat communications by using queries to get user avatars that are currently chatting and using socket events to send messages between users.

## `Events`

```

connection:
  When contact is made between the API and user client-side socket mounts.

join-room:
  When The user joins a room, client-side socket sends this event. This event is similar in functionality to connection but connection persists even if a user leaves the room.

user-joined:
  When a user joins the room, server-side socket sends this event to all users currently in the room

message:
  When a user sends a message, client-side notifies all users in a room that a message has been sent with message data.

disconnect:
  when a user leaves the room, this event is fired from Socket.io.

disconnection:
  when a user leaves the room, server-side emits this data to notify the client that a user has left the room.

show-room-user-count:
  An event to find how many users are currently in the room.

```

This app requires shared postgres server access
  
## `Tech used:`
  - dotenv `^10.0.0`
  - eslint `^7.27.0`
  - express `^4.17.1`
  - knex `^0.95.6`
  - nodemon `^2.0.7`
  - pg `^8.6.0`
  - socket . io `^4.1.2`
  
## `Install`

#### `Git`
Download this file by either download the zip file or cloning the repo

- click on the green "code" button while viewing this from github

- select the HTTPS repo link and copy it to your clipboard by clicking the clipboard button

- from your terminal type in git clone { repo here }

```
git clone https://github.com/dcouch440/antique_chat_socket.git
```

- then change directories to the downloaded repo

```
  cd antique_chat_socket
```

- open the project by typing

```
code .
```
  
From here you can view the project!
  
#### `Zip`
  
- click the green "code" button
  
- click Download ZIP
  
##### `Drop in?`
- most code editors let you drop in the folder!
- open your code editor and drop the folder in!

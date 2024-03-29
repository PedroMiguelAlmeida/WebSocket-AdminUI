
# WebSocket AdminUI

Hi there, this repository is regarding the project and tool frontend codebase, if you wish to checkout the frontend codebase:
https://github.com/PedroMiguelAlmeida/WebSocket-Control-Center .

●   A management and administration tool for communications among various users, whether human or machines,
using the WebSocket protocol. 

●   This page will have some schemes and charts detailing some of the functionality or concepts in order to be an easier to read and easier to understand package.


# Project Components

●  A web application was developed for WebSocket administration
and management (AdminUI), served by a RESTful API that allows the execution
of administrative tasks. In this context, the administrator can authenticate, create
and remove namespaces, create and remove topics within namespaces, add and remove users to topics and namespaces, associate and view schemas for topics, send
messages to topics and namespaces, and view sent messages and their senders.

# Websockets with versatility and control

●   The WebSocket server facilitates real-time
communication between clients. With the aim of extending the native capabilities
of WebSockets, a mechanism for grouping clients into logical subdivisions was
developed. These subdivisions have a hierarchical nature, composed of topics con-
tained within namespaces

●	This provides the user of the tool with the ability to
create and control numerous communication channels. We have also provided the
opportunity to validate the structure and data type sent to the communication
channels, if desired, through the upload of schemas. This allows for greater flexibility
and coverage for different possible use cases of the tool.














## Installation

In order to utilize and modify the project to your needs:

Clone the project:

```bash
  git clone https://github.com/PedroMiguelAlmeida/WebSocket-AdminUI.git
  cd WebSocket-AdminUI
```
Install packages and dependencies:

```bash
  npm install 
```
Run project:

```bash
  npm run start
```


# Screenshots

Some screenshots of the web applications and functionalities that can be performed with it.

### Login Page
![App Screenshot](https://github.com/PedroMiguelAlmeida/WebSocket-AdminUI/blob/main/Screenshots/paginaLogin.png?raw=true)

### Dashboard
![App Screenshot](https://github.com/PedroMiguelAlmeida/WebSocket-AdminUI/blob/main/Screenshots/Dashboard.png?raw=true)

### Create Namespace

![App Screenshot](https://github.com/PedroMiguelAlmeida/WebSocket-AdminUI/blob/main/Screenshots/CreateNamespace.png?raw=true)

### List of Namespaces

![App Screenshot](https://github.com/PedroMiguelAlmeida/WebSocket-AdminUI/blob/main/Screenshots/listAllNamespaces.png?raw=true)

### Namespace Dashboard

![App Screenshot](https://github.com/PedroMiguelAlmeida/WebSocket-AdminUI/blob/main/Screenshots/NamespaceInfo.png?raw=true)

### Topic Dashboard

![App Screenshot](https://github.com/PedroMiguelAlmeida/WebSocket-AdminUI/blob/main/Screenshots/TopicInfo.png?raw=true)








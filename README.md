# Chatbot Flow Builder with React Flow 🌊

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![React Flow](https://img.shields.io/badge/React_Flow-38B2AC?style=for-the-badge&logo=react&logoColor=white)

A powerful and intuitive drag-and-drop workflow builder that enables users to create and manage message flows visually. Built with React and React Flow, it offers a smooth, modular experience ideal for chatbot builders, automation tools, or decision trees.

![image](https://github.com/user-attachments/assets/4ef29c52-e944-4b8f-8ebf-6f811c82465f)


## Features 🚀

### Core Functionality
- **📌 Message Nodes** - Create and connect text message nodes
- **🔗 Connectors** – Visually link nodes to define flow paths
- **🧲  Drag-and-Drop** - Smooth and interactive node movement
- **🔌 Smart Connections** - Visual handles for node linking
- **📎 Flow Validation** – Prevent saving incomplete or disconnected flows
-  

### User Experience
- **✏️ Inline Node Editing** – Edit node messages in a side panel
- **📱 Mobile Responsive** - Works on all devices
- **💾 One-Click Save** - With proper flow validation
- **🔔 Toast Notifications** – Visual feedback on save success or validation errors

## Try It Out 🌐

[Live Demo](https://chatbot-flow-builder-87k7.vercel.app) *(Click on it for Live Demo)*

## Installation 💻

```bash
# Clone the repository
git clone https://github.com/Rakeshkumarsahugithub/chatbot_flow-builder.git

# Navigate to project
cd chatbot-flow

# Install dependencies
npm install

# Start development
npm run dev
```
## How It Works 🔧
### Add Nodes
1. Browse Available Nodes
 - In the right sidebar, you'll see all available node types (currently just Message nodes)

2. Click to Add
 - Simply click on any node type - it will automatically appear on the canvas at a random position
(No drag-and-drop required - we simplified this interaction!)

3. See It Appear
The new node will:

 - Have default text ("Text Message")

 - Show connection handles (⚫ on left and right)

 - Be ready to connect to other nodes

 ### Connect Nodes
 - Drag from a node's handle (right side) to another node's handle (left side)

 ### Edit Content
 - Click any node to edit its text in the settings panel

 ### Save Flow
 - Click "Save Changes" to validate and save your workflow

 ## Validation Rules ⚖️
 - ✅ All nodes must be connected (except one endpoint)

 - ❌ No empty message nodes allowed

 - 🔗 Source handles can only have one connection

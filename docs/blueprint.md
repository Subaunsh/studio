# **App Name**: Nova AI Assistant

## Core Features:

- Secure User Authentication: Allow users to register and log in via Google or email/password using Firebase Authentication, securing personal chat histories.
- Interactive AI Chat Interface: Provide a clean, responsive chat UI with input box, send button, and display AI responses with message bubbles and timestamps.
- Voice Assistant Integration: Enable speech-to-text for user input via a microphone button and text-to-speech for AI responses.
- Persistent Chat History: Store all user conversations securely in Firestore, allowing users to view and continue past discussions via a sidebar.
- AI Processing with Firebase Functions: Route user messages through Firebase Functions to an AI API (e.g., OpenAI or Gemini) and stream responses back to the user interface.
- Conversation Management Sidebar: Implement a sidebar for managing conversations, including options to start a new chat, browse chat history, access settings, and manage profile.
- Dynamic Response Enhancements: Include AI typing animations, loading indicators for AI responses, and a button to easily copy AI-generated text.

## Style Guidelines:

- Primary color: A sophisticated, vibrant blue (`#5A7AEC`) evoking a modern, intelligent feel, providing clear emphasis in a dark mode. This color is also suitable for headlines and interactive elements in a light theme.
- Background color: A very dark, subtle cool-toned grey (`#15151A`) to serve as a calming backdrop for the primary blue, supporting a dark mode experience. In light mode, a desaturated light variant of the same hue will be used.
- Accent color: A vibrant cyan (`#14B1E6`) providing a strong contrast and tech-inspired highlight for call-to-action buttons or dynamic status indicators. This analogous color complements the primary blue without being disruptive.
- Headline and Body text font: 'Inter' (sans-serif) for its modern, clean, and objective readability across various text lengths in both chat and settings interfaces.
- Utilize clean, minimal, and easily recognizable line-based icons for UI elements such as 'New Chat', 'Chat History', 'Settings', 'Profile', 'Send Message', and 'Voice Input' to maintain a contemporary aesthetic.
- Implement a modern, responsive chat layout similar to popular AI assistants, featuring a collapsible sidebar for navigation, a clear message display area with message bubbles for user and AI, and a persistent input field at the bottom.
- Incorporate subtle, smooth transition animations for sidebar expansion/collapse, loading indicators, and a distinct typing animation for AI responses to enhance user engagement and indicate activity.
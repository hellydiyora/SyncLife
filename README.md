# 🚀 SyncLife – AI-Enhanced Self Management Platform

SyncLife is a full-stack productivity and self-management platform designed to help users organize their daily lives, build positive habits, understand emotional patterns, and maintain gratitude practices.

The platform combines productivity tools with AI-powered insights to provide personalized recommendations that help users improve focus, consistency, and overall well-being.

---

## 🌟 Features

### 📅 Daily Planner (TaskMate)
- Create, update, and delete daily tasks
- Organize tasks by priority and status
- Track pending and completed activities
- Manage daily schedules efficiently

### 📊 Habit Tracker (GoalMinder)
- Create and monitor habits
- Track daily progress and consistency
- Visualize habit completion trends
- Build long-term productive routines

### 😊 Mood Tracker (EmoSense)
- Record daily moods and emotions
- Add factors influencing emotional states
- Analyze mood trends over time
- Gain insights into emotional well-being through visual reports

### 🙏 Gratitude Journal (GratiMemo)
- Maintain a daily gratitude journal
- Document positive experiences and reflections
- Upload images alongside journal entries
- Encourage mindfulness and self-reflection

### 🤖 AI-Powered Productivity Assistant
- Integrated OpenAI API for intelligent recommendations
- Generate personalized task prioritization suggestions
- Analyze user productivity patterns
- Provide actionable productivity insights
- Assist users in making better daily planning decisions

### 📈 Interactive Analytics
- Real-time charts and visualizations
- Track productivity metrics
- Monitor habit consistency
- Analyze mood patterns and trends

### 🔐 Secure Authentication
- JWT-based authentication and authorization
- Protected routes and secure API access
- User-specific data management

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Redux Toolkit
- React Redux
- JavaScript (ES6+)
- HTML5
- Tailwind CSS
- Chart.js

### Backend
- Node.js
- Express.js

### Database
- MongoDB
- Mongoose

### Authentication
- JWT (JSON Web Tokens)

### AI Integration
- OpenAI API

### Development Tools
- Git
- GitHub
- Postman

---

## 🏗️ System Architecture

```text
Frontend (React + Redux)
          │
          ▼
REST APIs (Express.js)
          │
          ▼
MongoDB Database
          │
          ▼
OpenAI API
```

---

## 📸 Core Modules

| Module | Description |
|----------|------------|
| TaskMate | Daily task planning and management |
| GoalMinder | Habit tracking and consistency monitoring |
| EmoSense | Mood tracking and emotional analytics |
| GratiMemo | Gratitude journaling and reflection |
| AI Assistant | Personalized productivity recommendations |

---

## 🚀 Installation & Setup

### Prerequisites

Make sure you have installed:

- Node.js (v18+ recommended)
- MongoDB
- Git

---

### Clone the Repository

```bash
git clone https://github.com/your-username/SyncLife.git
cd SyncLife
```

---

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

OPENAI_API_KEY=your_openai_api_key
```

Start the backend server:

```bash
npm run start
```

or

```bash
npm run dev
```

---

### Frontend Setup

```bash
cd frontend
npm install
```

Run the frontend:

```bash
npm run dev
```

---

### Access Application

Open your browser and navigate to:

```text
http://localhost:5173
```

---

## 🔑 Environment Variables

| Variable | Description |
|-----------|-------------|
| PORT | Backend server port |
| MONGO_URI | MongoDB connection string |
| JWT_SECRET | Secret key for JWT authentication |
| OPENAI_API_KEY | OpenAI API key |

---

## 📊 Key Highlights

- Full-stack MERN architecture
- AI-powered productivity recommendations
- JWT authentication and authorization
- RESTful API architecture
- Responsive and modern UI
- Redux Toolkit state management
- Real-time analytics dashboards
- Mood and habit tracking system
- Gratitude journaling with image support
- OpenAI integration for intelligent insights

---

## 🎯 Future Enhancements

- AI habit coaching
- AI-generated weekly productivity reports
- Calendar integrations (Google Calendar)
- Push notifications and reminders
- Social accountability groups
- Voice journaling
- Mobile application support
- AI-powered mood prediction

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome.

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature/new-feature
```

3. Commit changes

```bash
git commit -m "Add new feature"
```

4. Push branch

```bash
git push origin feature/new-feature
```

5. Open a Pull Request

---

## 📜 License

This project is licensed under the MIT License.

---

## 👩‍💻 Author

**Helly Diyora**

- GitHub: https://github.com/hellydiyora
- LinkedIn: https://linkedin.com/in/hellydiyora
- Portfolio: https://helly-diyora.netlify.app

---

### 💡 Built to help users take control of their productivity, habits, emotions, and personal growth through the power of AI and modern web technologies.

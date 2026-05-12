#  Unitoids – AI Powered Freelancing Platform

Unitoids is a modern AI-driven freelancing platform that connects **clients and freelancers** (both technical & non-technical) with smart recommendations, real-time chat assistance, and location-based discovery.

![Deployment Status]
[View Live Project](https://unitoids.vercel.app)

---

## Features

### Freelancing Marketplace

* Find freelancers based on **category, city, and skills**
* Supports both:

  *  **White-collar jobs** (Developers, Designers, etc.)
  *  **Blue-collar jobs** (Electricians, Plumbers, etc.)

###  AI Chatbot (RAG Based)

* Intelligent assistant for:

  * Freelancer suggestions
  * Platform support
  * General queries
* Uses **FAISS vector database + embeddings**

###  Location-Based Search

* Fetch freelancers based on:

  * City
  * Pincode

###  Authentication

* Secure login/signup using **Clerk**
* Role-based system (User / Freelancer)

###  Booking System

* Book freelancers easily
* Track project details & status

---

##  Tech Stack

###  Frontend

* React (Vite)
* Tailwind CSS
* shadcn/ui
* Clerk Authentication

###  Backend

* Node.js + Express
* MongoDB
* REST APIs

###  AI Service (Python)

* FastAPI
* FAISS (Vector Search)
* Custom RAG Engine

---

##  Project Structure

```
FreeLancers-Website/
│
├── Entrepreneur/
│   ├── frontend/        # React frontend
│   ├── backend/         # Node.js backend
│
├── csp/                 # AI service (FastAPI + RAG)
│
├── .gitignore
├── README.md
```

---

##  Setup Instructions

### 1️⃣ Clone Repository

```
git clone https://github.com/Ahamedin/Unitoids.git
cd Unitoids
```

---

### 2️⃣ Backend Setup

```
cd Entrepreneur/backend
npm install
npm start
```

---

### 3️⃣ Frontend Setup

```
cd Entrepreneur/frontend
npm install
npm run dev
```

---

### 4️⃣ AI Service Setup (Python)

```
cd csp
python -m venv venv
venv\Scripts\activate   # Windows

pip install -r requirements.txt
python app.py
```

---

##  Note on AI Files

Vector database files (`.faiss`, `.pkl`) are excluded from Git.

👉 To regenerate:

```
python create_vectorstore.py
```

---
## Environment Configuration

Before running the application, create `.env` files in the respective directories.

### AI Service (`csp/.env`)
```env
GOOGLE_API_KEY=your_google_api_key
PYTHON_API_KEY=your_python_api_key
```

### Backend (`Entrepreneur/backend/.env`)
```env
MONGO_URI=your_mongodb_uri
PYTHON_API_KEY=your_python_api_key
PYTHON_API_URL=your_python_api_url
JWT_SECRET=your_jwt_secret
```

### Frontend (`Entrepreneur/frontend/.env`)
```env
VITE_BACKEND_URL=your_backend_api_url
VITE_CHATBOT_URL=your_python_api_url
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key
```

---

##  Screenshots

<img width="1920" height="1080" alt="unitoids" src="https://github.com/user-attachments/assets/f97991cc-2580-43d7-9226-2e8dfdc0adb6" />
<img width="1920" height="1080" alt="unitoids" src="https://github.com/user-attachments/assets/72e1d0e8-2f02-42a6-afc1-47763c78d76d" />
<img width="1920" height="1080" alt="unitoids" src="https://github.com/user-attachments/assets/6165d925-b0e4-42c6-a819-76a815388139" />
<img width="1920" height="1080" alt="unitoids" src="https://github.com/user-attachments/assets/4ef2a2f5-0e98-4c32-ac84-8bd737167834" />
<img width="1920" height="1080" alt="unitoids" src="https://github.com/user-attachments/assets/f7d536b2-e9a8-459f-916a-107c196ccca2" />





---

##  Future Improvements

*  Payment Integration
*  Rating & Review System
*  Mobile Responsive Enhancements
*  Notifications System
*  Multi-language Support

---

##  Author

**Iklash Ahamed**

*  Full Stack Developer
*  Passionate about AI + Web + Startups

---

##  Conclusion

Unitoids is designed to bridge the gap between talent and opportunity using **AI-powered intelligence**, making freelancing smarter, faster, and more accessible.

---

⭐ If you like this project, give it a star!

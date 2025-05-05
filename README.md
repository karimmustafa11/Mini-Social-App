
# 🟦 Posta - Mini Social Media App

Posta is a simple Facebook-like front-end project built with React + Vite. It supports login, image uploads, and basic post CRUD functionality.

## 🎥 Demo Video

🔗 [Watch the demo](https://drive.google.com/file/d/1DSYrdVDRqkg0hAHLoN-MgKqKk44MqDT8/view?usp=sharing)

## 🚀 Features

- ✅ **Login System**
  - Sign up and login using JSON Server as a mock backend
  - Form validation with `yup` and `react-hook-form`
  - Toggle show/hide password
  - Upload profile image on signup

- 📝 **Post Management**
  - Create, edit, and delete posts
  - Only the owner of the post can edit or delete it
  - Posts include image, content, and timestamp

- 💡 **User Interface**
  - Clean and modern UI using Tailwind CSS
  - Toast messages for success and error feedback
  - Blur background effect while loading for polished UX

## 🛠️ Tech Stack

- **Frontend**: React + Vite  
- **Routing**: React Router  
- **Forms**: `react-hook-form` + `yup`  
- **State Management**: Context API  
- **Mock Backend**: JSON Server  
- **Styling**: Tailwind CSS  
- **Image Uploads**: Base64 encoding via FileReader API  

## ⚙️ How to Run

1. Clone the repository:
   ```bash
   git clone https://github.com/karimmustafa11/Mini-Social-App.git
   cd Mini-Social-App
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start JSON Server in a separate terminal:
   ```bash
   npx json-server --watch db.json --port 5000
   ```

4. Start the Vite dev server:
   ```bash
   npm run dev
   ```

5. Open your browser at: `http://localhost:5173`

## 📦 Requirements

- Node.js 16 or higher  
- npm  
- JSON Server  

## ✍️ Developer

Made with ❤️ by [Karim Mustafa](https://github.com/karimmustafa11)

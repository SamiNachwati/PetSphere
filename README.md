# PetSphere | Pet Inventory Management System

**PetSphere** is a full-stack web application that lets users browse adoptable pets and allows admins to manage pet inventory through a clean and user-friendly interface.

🔗 **Live Site:** [https://petsphere-app.onrender.com](https://petsphere-app.onrender.com)



## Features

- **Search Functionality**  
  Search pets by name, type, description, age, or price.

- **Inventory Management**  
  Add, edit, and delete pets easily with validation.

- **Toggle View Modes**  
  Switch between table view and card view for a flexible browsing experience.

- **Responsive Design**  
  Optimized layout for mobile and desktop.

- **Contact Form**  
  Mock contact form with toast notification (non-functional for now).



## Tech Stack

### Frontend
- React.js
- Tailwind CSS
- React Router
- React Toastify
- Font Awesome
- Vite

### Backend
- Node.js
- Express.js
- SQLite3 (in-memory database)



## Project Structure

```bash
petsphere/
├── backend/
│   ├── node.cjs
│   ├── package.json
│   ├── package-lock.json
│   └── node_modules/
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── About.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── ErrorBoundary.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Inventory.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── PetForm.jsx
│   │   │   ├── Search.jsx
│   │   │   └── MobileMenu.jsx
│   │   ├── services/
│   │   │   └── apiService.js
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── public/
│   │   └── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js
│   └── node_modules/
├── .gitignore
├── README.md
└── LICENSE (optional)
```


## Running Locally

### 1. Clone the Repository

```bash
git clone https://github.com/SamiNachwati/petsphere.git
cd petsphere

cd backend
npm install
npm start


cd ../frontend
npm install
npm run dev

```

## Notes

- This project is for demonstration purposes only.
- Data is stored **in-memory** using SQLite and resets every time the server restarts.
- The contact form is **non-functional** and included for UI demonstration only.



## Contact

Feel free to connect or check out more:

- [GitHub](https://github.com/SamiNachwati)
- [LinkedIn](https://www.linkedin.com/in/sami-nachwati-519288264/)



## Support

If you like this project, consider giving it a ⭐️ on GitHub to show your support!

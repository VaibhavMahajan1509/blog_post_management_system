# Blog Post Management System (MERN Stack)

A full-stack MERN Blog Post Management System with CRUD operations, search, filtering, pagination, and CSV export functionality.

---

## Features

### User Features
- Create blog posts
- Edit blog posts
- Delete blog posts
- View all blog posts in table format
- View single blog post
- Search posts by title, author, category
- Filter posts by category and status
- Pagination support
- Export posts data as CSV

---

## Tech Stack

### Frontend
- React.js
- React Router DOM
- Axios
- React Hook Form
- Tailwind CSS
- React Hot Toast

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- json2csv
- CORS
- dotenv

---

## Folder Structure

```bash
blog_post_management_system
│
├── backend
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── models
│   │   ├── routes
│   │   └── app.js
│   ├── server.js
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   └── App.js
│
├── .gitignore
└── README.md
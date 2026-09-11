# Lost & Found

A responsive full-stack web application for reporting, browsing, and
managing lost and found items. The project provides separate reporting
flows for lost and found belongings, searchable reports, item details,
image uploads, and a REST API backed by MongoDB.

# Features

Report a lost item with:

Student ID

Item name

Description

Last seen location

Last seen date and time

Contact number

Optional proof image

Report a found item with:

Finder ID

Item name

Description

Found location

Found date and time

Contact number

Optional item image

Browse lost and found reports

Filter reports by:

All

Lost

Found

Search reports by item, description, or location

View individual report details

Report status support for lost items

Cloudinary image uploads from the frontend

MongoDB data persistence through Mongoose

Responsive design for desktop, tablet, and mobile

Red and black visual theme

Plain CSS styling without Tailwind CSS

React Router based navigation

Environment-variable based API and service configuration

# Tech Stack

**Frontend**

React 18

TypeScript

Vite

React Router DOM

Lucide React

Plain CSS

**Backend**

Node.js

Express 5

MongoDB

Mongoose

CORS

dotenv

# External Services

MongoDB Atlas or another MongoDB deployment

Cloudinary for image hosting

# Project Structure

Lost-and-Found-Website/
│
├── Backend/
│   ├── controllers.js
│   ├── db.js
│   ├── middleware.js
│   ├── models.js
│   ├── models2.js
│   ├── routes/
│   │   └── reportRoutes.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
├── Frontend/
│   ├── public/
│   │   └── Logo.png
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── Browse/
│   │   │   ├── Footer/
│   │   │   ├── Home Page/
│   │   │   ├── Lost and Found Page/
│   │   │   ├── Navbar/
│   │   │   └── ReportDetails/
│   │   ├── App.tsx
│   │   ├── index.css
│   │   └── main.tsx
│   ├── index.html
│   ├── package.json
│   └── .env.example
│
└── README.md

node_modules, dist, and real .env files should not be committed
to Git.

Getting Started

# Prerequisites

Make sure the following are installed:

Node.js 18+ recommended

npm

MongoDB Atlas or a local MongoDB instance

A Cloudinary account if image uploads are enabled

1. Clone the repository

git clone <YOUR_GITHUB_REPOSITORY_URL>
cd Lost-and-Found-Website

2. Install frontend dependencies

cd Frontend
npm install

3. Install backend dependencies

Open another terminal:

cd Backend
npm install

Environment Variables

Do not commit real environment files or credentials.

Frontend .env

Create:

Frontend/.env

Add:

VITE_API_URL=http://localhost:5000/api
VITE_CLOUDINARY_UPLOAD_URL=https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload
VITE_CLOUDINARY_UPLOAD_PRESET=YOUR_UPLOAD_PRESET

VITE_ variables are exposed to the browser, so never put private API
secrets in them.

Backend .env

Create:

Backend/.env

Add:

PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
MONGODB_URI=YOUR_MONGODB_CONNECTION_STRING

The backend connects to MongoDB through MONGODB_URI.

The current application performs Cloudinary uploads directly from the
frontend, so the Cloudinary API secret should never be placed in the
frontend environment.

**Running the Project Locally**

Start the backend

cd Backend
npm run dev

The API runs on:

http://localhost:5000

Start the frontend

In a second terminal:

cd Frontend
npm run dev

Vite normally serves the frontend at:

http://localhost:5173

The exact local port shown by Vite should be used if it differs.

API Endpoints

The backend mounts report routes under /api.

Create reports

POST /api/report
POST /api/foundReport

Browse reports

GET /api/browse
GET /api/browse/:type/:id

The browse endpoint supports report filtering and search through query
parameters used by the frontend.

Existing lost-report endpoints

GET    /api/reports
GET    /api/report/:id
PATCH  /api/report/:id/status
DELETE /api/report/:id

Application Routes

The frontend currently provides:

/                       Home
/lost                   Report a lost item
/found                  Report a found item
/browse                 Browse reports
/browse/:type/:id       Report details

# Image Upload Flow

Images are uploaded directly from the frontend to Cloudinary using the
configured upload endpoint and upload preset.

After a successful upload:

Cloudinary returns the hosted image URL.

The frontend sends that URL with the report data.

The backend stores the image information along with the report.

The browse and report-details pages display the stored image.

No Cloudinary API secret should be exposed in frontend code.

# Production Deployment

The application can be deployed as two services:

Frontend

The React/Vite frontend can be deployed on a platform such as Vercel.

Typical build settings:

Root Directory: Frontend
Build Command: npm run build
Output Directory: dist

Set the frontend production environment variables in the hosting
platform:

VITE_API_URL=<YOUR_DEPLOYED_BACKEND_API_URL>/api
VITE_CLOUDINARY_UPLOAD_URL=<YOUR_CLOUDINARY_UPLOAD_ENDPOINT>
VITE_CLOUDINARY_UPLOAD_PRESET=<YOUR_UPLOAD_PRESET>

Backend

The Express backend can be deployed on a Node.js hosting platform such
as Render.

Typical settings:

Root Directory: Backend
Build Command: npm install
Start Command: npm start

Set the backend environment variables in the hosting platform:

PORT=10000
NODE_ENV=production
FRONTEND_URL=<YOUR_DEPLOYED_FRONTEND_URL>
MONGODB_URI=<YOUR_MONGODB_CONNECTION_STRING>

The hosting platform may provide its own PORT, so the backend should
continue using process.env.PORT.

**Build and Quality Checks**

Before deployment, run:

Frontend lint

cd Frontend
npm run lint

Frontend production build

npm run build

A successful Vite build creates the Frontend/dist directory.

Do not manually commit an old dist directory if the hosting platform
builds the application during deployment.

Security Notes

Never commit .env files.

Never hardcode MongoDB credentials.

Never expose Cloudinary API secrets in frontend code.

Keep production secrets in the deployment platform's
environment-variable settings.

Review staged changes before every push:

git status
git diff --cached

If a secret has already been committed, removing the file in a later
commit does not remove the secret from Git history. The Git history
must be rewritten, and affected credentials should be revoked or
rotated.

# Git Workflow

After modifying the project:

git status

Review the changes and make sure files such as these are not staged:

.env
.env.*
node_modules/
dist/

Then:

git add .
git diff --cached
git commit -m "Update Lost and Found application"
git push origin main

If the repository uses another default branch, replace main with that
branch name.

Future Improvements

Possible future enhancements include:

User authentication and authorization

User profiles

Email or notification support

Admin dashboard

Advanced report moderation

Image optimization

Pagination for large report collections

Contact/privacy controls

Deployment monitoring and logging

Automated tests

Rate limiting and stronger API validation
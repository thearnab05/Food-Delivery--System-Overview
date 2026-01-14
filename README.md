# Food Project - Full Stack Application

A modern food delivery and showcase application built with Next.js frontend and Node.js backend.

## 🚀 Features

### Authentication & User Management
- **User Registration & Login**: Secure user authentication system
- **Protected Cart Access**: Users must login to add items to cart
- **Session Management**: Persistent login state with localStorage
- **User Profile**: Display username and account options

### Shopping Cart
- **Authentication Required**: Cart functionality is protected behind login
- **Add/Remove Items**: Full cart management with quantity controls
- **Real-time Updates**: Live cart count and total price calculation
- **Checkout Process**: Complete order flow with customer information

### AI-Powered Features
- **Food Showcase**: Curated food recommendations with AI insights
- **Smart Recommendations**: Personalized dish suggestions
- **Cooking Assistant**: AI-powered cooking tips and guidance
- **Live Search**: Real-time food search functionality

### UI/UX Features
- **Responsive Design**: Mobile-first responsive layout
- **Dark/Light Theme**: Toggle between themes
- **Modern Animations**: Smooth transitions and hover effects
- **Interactive Components**: Dropdown menus, modals, and forms

## 🛠️ Technologies Used

### Frontend
- **Next.js 15**: React framework with App Router
- **React 19**: Latest React features and hooks
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Beautiful icon library
- **Axios**: HTTP client for API calls

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling
- **CORS**: Cross-origin resource sharing

## 📁 Project Structure

```
food-project/
├── backend/                 # Node.js backend
│   ├── controller/         # Request handlers
│   ├── db/                # Database connection
│   ├── models/            # Mongoose schemas
│   ├── routes/            # API route definitions
│   └── index.js           # Server entry point
├── frontend/              # Next.js frontend
│   ├── src/
│   │   ├── app/          # App router pages
│   │   ├── components/   # React components
│   │   ├── contexts/     # React contexts
│   │   └── lib/          # Utility functions
│   └── public/           # Static assets
└── README.md             # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB installed and running
- npm or yarn package manager

### Quick Start (Recommended)

1. **Install All Dependencies**:
   Run this once to set up everything:
   ```bash
   npm run install-all
   ```

2. **Start the Application**:
   Run this to start both Frontend and Backend together:
   ```bash
   npm start
   ```

   - Frontend: `http://localhost:3000`
   - Backend: `http://localhost:4000`

### Manual Setup (Optional)

If you prefer to run them separately:

#### Backend
1. Navigate to backend: `cd backend`
2. Install: `npm install`
3. Start: `npm start` (Runs on port 4000)

#### Frontend
1. Navigate to frontend: `cd frontend`
2. Install: `npm install`
3. Start: `npm run dev` (Runs on port 3000)

## 🔐 Authentication Flow

### User Registration
1. Navigate to `/signup`
2. Fill in username, email, and password
3. Submit form to create account
4. User is automatically logged in after successful registration

### User Login
1. Navigate to `/login`
2. Enter username and password
3. Submit form to authenticate
4. Redirected to main page on success

### Cart Protection
- **Unauthenticated Users**: See "Login" button instead of cart
- **Cart Access Attempt**: Authentication modal appears
- **Authenticated Users**: Full access to cart functionality

## 📡 API Endpoints

### Authentication
- `POST /api/post` - User registration
- `POST /api/login` - User login
- `GET /api/allData` - Get all users (admin)

### Request Format
```json
// Registration
{
  "username": "string",
  "email": "string",
  "password": "string"
}

// Login
{
  "username": "string",
  "password": "string"
}
```

### Response Format
```json
{
  "message": "string",
  "success": boolean,
  "error": "string" // if applicable
}
```

## 🛒 Cart Functionality

### Protected Features
- Adding items to cart requires authentication
- Cart icon shows item count for logged-in users
- Checkout process available only to authenticated users

### Cart Operations
- **Add Item**: Click "Add to Cart" button (requires login)
- **Update Quantity**: Use +/- buttons in cart modal
- **Remove Item**: Click remove button in cart modal
- **Clear Cart**: Remove all items at once

## 🎨 UI Components

### Header
- **Logo & Navigation**: Brand and main menu links
- **Search**: Global search functionality
- **Cart**: Protected cart access with item count
- **User Menu**: Profile dropdown for authenticated users
- **Theme Toggle**: Switch between light/dark themes

### Authentication Modal
- **Login Tab**: Username/password authentication
- **Signup Tab**: New user registration
- **Form Validation**: Real-time error handling
- **Responsive Design**: Mobile-friendly interface

### Food Showcase
- **Image Gallery**: High-quality food photography
- **AI Descriptions**: Intelligent food insights
- **Category Filtering**: Browse by cuisine type
- **Add to Cart**: Protected cart functionality

## 🔧 Configuration

### Environment Variables
- Backend port: `3001` (configured in `backend/index.js`)
- Frontend port: `3000` (Next.js default)
- Database connection: MongoDB local instance

### CORS Settings
- Backend configured to accept requests from `http://localhost:3000`
- Frontend makes API calls to `http://localhost:3001`

## 🚀 Deployment

### Backend Deployment
1. Set environment variables for production
2. Use PM2 or similar process manager
3. Configure MongoDB connection string
4. Set up reverse proxy (nginx)

### Frontend Deployment
1. Build the application: `npm run build`
2. Start production server: `npm start`
3. Deploy to Vercel, Netlify, or similar platforms

## 🐛 Troubleshooting

### Common Issues
1. **Port Conflicts**: Ensure ports 3000 and 3001 are available
2. **Database Connection**: Verify MongoDB is running
3. **CORS Errors**: Check backend CORS configuration
4. **Authentication Issues**: Clear localStorage and re-login

### Development Tips
- Use browser dev tools to monitor API calls
- Check console for error messages
- Verify database connection in backend logs
- Test authentication flow step by step

## 📝 License

This project is licensed under the ISC License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For support and questions, please open an issue in the repository.

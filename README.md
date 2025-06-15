# React Todo Application

A modern, responsive Todo application built with React that helps users manage their tasks efficiently. The application features a clean, user-friendly interface and robust error handling.

## Features

- **Task Management**

  - Create new todos with title and description
  - View all todos in a paginated list
  - View detailed information for each todo when you click on the todo title
  - Responsive design that works on all screen sizes

- **User Interface**

  - Clean and modern UI minimalist design
  - Clean and easy to use filter buttons for 'All, Complete and Incomplete' todos
  - Real-time search functionality
  - Responsive navigation with mobile-friendly menu
  - Loading states for better user experience
  - Success notifications for completed actions
  - Modal dialogs for adding new todos

- **Error Handling**

  - Comprehensive error boundary implementation
  - User-friendly error messages
  - Easy navigation back to home on errors

- **Technical Features**
  - React Query for efficient data fetching and caching
  - React Router for seamless navigation
  - Responsive design with mobile-first approach
  - Error boundary implementation for error handling

## Installation and Setup

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher) or yarn (v1.22 or higher)
- Git

### Environment Setup

1. Clone the repository:

   ```bash
   git clone [https://github.com/corneliusweb/cornelius_react_exam]
   cd cornelius_react_exam
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the root directory:

   ```env
   VITE_API_URL=your_api_url_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

The application will be available at `http://localhost:5173`

## Available Scripts

In the project directory, you can run:

- `npm run dev` or `yarn dev`

  - Runs the app in development mode
  - Open [http://localhost:5173](http://localhost:5173) to view it in the browser
  - The page will reload when you make changes
  - You may also see any lint errors in the console

- `npm run build` or `yarn build`

  - Builds the app for production to the `dist` folder
  - It correctly bundles React in production mode and optimizes the build for the best performance
  - The build is minified and the filenames include the hashes

- `npm run preview` or `yarn preview`

  - Locally preview the production build
  - Serves the built files from the `dist` folder

- `npm run lint` or `yarn lint`
  - Runs ESLint to check for code quality issues

## Technology Stack and Architecture

### Frontend Technologies

- **React**: Core UI library
- **Vite**: Build tool and development server
- **React Router**: Client-side routing
- **React Query**: Data fetching and caching
- **React Icons**: Icon library
- **CSS3**: Styling with custom properties

### Architecture Decisions

1. **Component Structure**

   - Functional components with hooks for state management
   - Separation of concerns between pages and reusable components
   - Error boundary implementation for error handling

2. **State Management**

   - React Query for server state management
   - Local state with useState for UI state

3. **Routing**

   - React Router for declarative routing
   - Nested routes for better organization
   - Protected routes for future authentication

4. **Styling**
   - CSS modules for component-specific styles
   - Mobile-first responsive design
   - Custom properties for theming

## API Documentation

### Todo Endpoints

#### Get All Todos

```http
GET /todos
```

Query Parameters:

- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `limit`: Items per response (default: 30)
- `total`:  254

Response:

```json
{
  "todos": [
    {
      "id": number,
      "todo": "string",
      "completed": boolean,
      "userId": number
    }
  ],
  "total": number,
  "page": number,
  "limit": number
}
```

#### Get Todo by ID

```http
GET /todos/:id
```

Response:

```json
{
  "id": number,
  "todo": "string",
  "completed": boolean,
  "userId": number
}
```

#### Create Todo

```http
POST /todos
```

Request Body:

```json
{
  "title": "string",
  "description": "string"
}
```

## Known Issues and Limitations

1. **Current Limitations**

   - No user authentication system
   - No data persistence (todos are stored in memory)
   - No offline support
   - No drag-and-drop functionality for todo reordering

2. **Known Issues**
   - Error boundary state persists on page refresh
   - No loading state for individual todo operations

## Future Improvements

1. **Planned Features**

   - User authentication and authorization
   - Data persistence with backend integration
   - Todo categories and tags
   - Due dates and reminders
   - Search and filter functionality
   - Dark mode support

2. **Technical Improvements**

   - Implement unit and integration tests
   - Add TypeScript for better type safety
   - Implement proper error logging
   - Add performance monitoring
   - Implement proper SEO optimization

3. **UI/UX Improvements**
   - Add animations for better user experience
   - Implement drag-and-drop for todo reordering
   - Add keyboard shortcuts
   - Improve accessibility features
   - Add more customization options

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

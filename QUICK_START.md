# 🚀 Quick Reference Guide

## Getting Started
```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Demo Credentials
| Role | Email | Password |
|------|-------|----------|
| Student | `student@example.com` | password |
| Teacher | `teacher@example.com` | password |

## Features Checklist ✅

### Required Features
- ✅ Deadline countdown timer (real-time, updates every second)
- ✅ Status badges (Pending, Submitted, Graded)
- ✅ File type validation (.pdf, .doc, .js, .zip, etc.)
- ✅ Loading spinner (shows during file upload/API calls)
- ✅ Toast notifications (auto-dismiss with types: success, error, info, warning)
- ✅ Responsive design (mobile, tablet, desktop support)
- ✅ Search & Filter (by title and status)
- ✅ Dark mode (toggle in navbar, saved to localStorage)

### Component Architecture
- **8 Reusable Components**: Navbar, Modal, FileUpload, CountdownTimer, StatusBadge, LoadingSpinner, ToastContainer, SubmissionGrading, AssignmentCard
- **3 Context Providers**: AuthContext (login), ToastContext (notifications), ThemeContext (dark mode)
- **3 Pages**: LoginPage, StudentDashboard, TeacherDashboard
- **2 Utility Modules**: dateUtils (formatting, countdown), validation (file validation)

### Student Dashboard
- View all assignments
- Filter by status and search by title
- View submission status and grades
- Submit files with validation
- See countdown timer for each deadline
- Review teacher feedback

### Teacher Dashboard
- Create new assignments
- Review student submissions with file download
- Grade submissions with score and feedback
- Filter submissions by status and search
- Delete assignments

## Key Technologies
- React 18+ with TypeScript
- Vite (fast build tool)
- Lucide React (icons)
- CSS variables for theming

## File Structure
- `src/components/` - Reusable UI components
- `src/pages/` - Page layouts (Login, Student, Teacher)
- `src/context/` - State management (Auth, Toast, Theme)
- `src/utils/` - Helper functions (validation, date formatting)
- `src/styles/` - CSS files with dark mode support
- `src/types/` - TypeScript interfaces and types

## Port & Access
- **Dev Server**: http://localhost:3000
- **Auto-reload**: Any file change auto-refreshes browser

## Responsive Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px  
- Desktop: > 1024px

## Next Steps (For Backend Integration)
1. Set up API endpoints for:
   - POST /api/auth/login
   - GET /api/assignments
   - POST /api/submissions
   - PUT /api/submissions/:id/grade

2. Replace mock data in components.tsx with API calls

3. Add file upload to cloud storage service

---

**All features working! Ready to integrate with backend API.** 🎉

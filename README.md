# AssignHub - Assignment Submission & Grading System

An online platform where students can submit their assignments electronically and teachers can review, grade, and provide feedback. The system streamlines the grading process and helps students track their progress.

## Features ✨

### Student Features
- 📝 **View Assignments**: Browse all assignments with descriptions and deadlines
- 📤 **Submit Assignments**: Upload solution files with validation
- 📊 **Track Progress**: View submission status (Pending, Submitted, Graded)
- ⏰ **Deadline Countdown**: Real-time countdown timer showing time remaining
- 📋 **View Grades**: Check grades and feedback from teachers
- 🔍 **Search & Filter**: Find assignments by title or filter by status

### Teacher Features
- ✏️ **Create Assignments**: Define new assignments with deadlines and scoring
- 📥 **Review Submissions**: View student submissions with file downloads
- ⭐ **Grade Submissions**: Assign scores and provide detailed feedback
- 📊 **Manage Submissions**: Filter submissions by status
- 🗑️ **Delete Assignments**: Remove assignments from the system

### General Features
- 🎨 **Dark Mode**: Toggle between light and dark themes
- 📱 **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- 🔐 **Authentication**: Simple login system with role-based access (Student/Teacher)
- 🔔 **Toast Notifications**: Real-time feedback for user actions
- ⚡ **Loading States**: Visual feedback during file uploads and API calls
- 🏷️ **Status Badges**: Visual indicators for submission status

## Tech Stack 🛠️

- **Frontend Framework**: React 18+ with TypeScript
- **Build Tool**: Vite (lightning-fast build and HMR)
- **Styling**: Custom CSS with CSS variables for theming
- **Icons**: Lucide React
- **Version Control**: Git ready

## Project Structure 📁

```
src/
├── components/          # Reusable React components
│   ├── AssignmentCard.tsx      # Assignment display card
│   ├── CountdownTimer.tsx      # Real-time deadline countdown
│   ├── FileUpload.tsx          # File upload with validation
│   ├── LoadingSpinner.tsx      # Loading indicator
│   ├── Modal.tsx              # Reusable modal dialog
│   ├── Navbar.tsx             # Top navigation bar
│   ├── StatusBadge.tsx        # Status indicator badge
│   ├── SubmissionGrading.tsx  # Submission grading interface
│   └── ToastContainer.tsx     # Toast notification container
├── context/             # React Context for state management
│   ├── AuthContext.tsx        # Authentication state and logic
│   ├── ThemeContext.tsx       # Dark mode theme management
│   └── ToastContext.tsx       # Toast notification state
├── pages/               # Page components
│   ├── LoginPage.tsx          # Authentication page
│   ├── StudentDashboard.tsx   # Student main interface
│   └── TeacherDashboard.tsx   # Teacher management interface
├── styles/              # CSS stylesheets
│   ├── dashboard.css          # Dashboard and cards styling
│   ├── index.css              # Global styles and variables
│   ├── modal.css              # Modal and toast styling
│   └── navbar.css             # Navigation bar styling
├── types/               # TypeScript type definitions
│   └── index.ts               # Global types and interfaces
├── utils/               # Utility functions
│   ├── dateUtils.ts           # Date formatting and countdown
│   └── validation.ts          # File validation and formatting
├── App.tsx              # Root component with providers
└── main.tsx             # Application entry point
```

## Installation & Setup 🚀

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Steps
1. **Clone or navigate to project directory**
   ```bash
   cd "d:\FSAD\FRONT END"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   - Local: `http://localhost:3000`
   - The app will auto-reload on code changes

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Demo Credentials 🔐

### Student Account
- **Email**: `student@example.com`
- **Password**: `password`

### Teacher Account
- **Email**: `teacher@example.com`
- **Password**: `password`

## Component Documentation 📚

### AssignmentCard
Displays assignment information with status and action buttons.
```tsx
<AssignmentCard
  assignment={assignment}
  submission={submission}
  onSubmit={() => handleSubmit()}
  onGrade={() => handleGrade()}
/>
```

### CountdownTimer
Shows time remaining until deadline with visual status.
```tsx
<CountdownTimer dueDate={assignment.dueDate} />
```

### FileUpload
Handles file selection with validation.
```tsx
<FileUpload
  onFileSelect={(files) => handleUpload(files)}
  allowedTypes={['.pdf', '.doc']}
  maxSize={50 * 1024 * 1024}
/>
```

### Modal
Reusable dialog component.
```tsx
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Dialog Title"
  footer={<button>Submit</button>}
>
  Content here
</Modal>
```

### StatusBadge
Visual status indicator.
```tsx
<StatusBadge status="submitted" />
// Shows: pending, submitted, graded
```

## Theme & Styling 🎨

The application uses CSS variables for theming, making it easy to customize colors and styles. All color variables are defined in `src/styles/index.css`.

### CSS Variables
- Primary colors: `--primary`, `--primary-dark`
- Status colors: `--success`, `--warning`, `--error`
- Neutral colors: `--neutral-50` through `--neutral-900`
- Semantic colors: `--bg-color`, `--text-primary`, `--text-secondary`

### Dark Mode
Toggle dark mode using the theme button in the navbar. The preference is saved to localStorage.

## File Validation 📄

Supported file types:
- **Documents**: `.pdf`, `.doc`, `.docx`, `.txt`, `.rtf`
- **Images**: `.jpg`, `.jpeg`, `.png`, `.gif`, `.bmp`
- **Code**: `.js`, `.ts`, `.tsx`, `.jsx`, `.py`, `.java`, `.cpp`, `.c`, `.html`, `.css`
- **Archives**: `.zip`, `.rar`, `.7z`, `.tar`, `.gz`

Maximum file size: **50MB**

## Features in Detail 🔍

### Countdown Timer
- Displays days, hours, minutes, and seconds
- Updates every second
- Shows "Overdue" when deadline is passed
- Visual warning when less than 24 hours remain
- Green when safe, yellow when warning, red when danger

### Toast Notifications
- Success: Green border on left
- Error: Red border on left
- Info: Blue border on left  
- Warning: Amber border on left
- Auto-dismisses after 3 seconds (configurable)
- Manual close button

### Search & Filter
- Real-time search across assignment titles and student names
- Filter by submission status
- Works on both student and teacher dashboards

## Responsive Design 📱

The application is fully responsive with breakpoints at:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

Grid layouts adapt automatically for optimal viewing on all devices.

## Accessibility ♿

- Semantic HTML structure
- Proper form labeling
- Keyboard navigable
- Clear visual feedback
- Color contrast compliance

## Future Enhancements 🚀

- [ ] Backend API integration
- [ ] Real file upload to cloud storage
- [ ] Email notifications
- [ ] Advanced analytics dashboard
- [ ] Batch grading
- [ ] Comment threads on submissions
- [ ] Assignment rubrics
- [ ] Student peer review
- [ ] Mobile app version
- [ ] Export grades to CSV

## Browser Support 🌐

- Chrome/Edge (Latest 2 versions)
- Firefox (Latest 2 versions)
- Safari (Latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Troubleshooting 🔧

### Port 3000 is already in use
The development server will automatically try the next available port (3001, 3002, etc.)

### Components not importing correctly
Ensure all TypeScript imports use `type` keyword for type-only imports:
```tsx
import type { Assignment } from '../types';
```

### Styles not applying
Clear browser cache and restart the dev server:
```bash
npm run dev
```

## Contributing 🤝

This is a frontend-only implementation. For production use, you'll need to:
1. Create a backend API (Node.js/Express, Python/Django, etc.)
2. Set up a database (PostgreSQL, MongoDB, etc.)
3. Implement real authentication
4. Add file storage (AWS S3, Google Cloud Storage, etc.)

## License 📄

This project is created for FSAD (Full Stack Assignment Development) course.

## Quick Start Guide 📖

1. **First Time Setup**
   ```bash
   npm install
   npm run dev
   ```

2. **Login** with demo credentials
   - Student: `student@example.com`
   - Teacher: `teacher@example.com`
   - Password: `password`

3. **For Students**
   - View assignments in dashboard
   - Click "Submit" to upload files
   - Check status and grades in the card

4. **For Teachers**
   - Click "New Assignment" to create
   - Grade submissions by clicking "Grade Submission"
   - View all submissions with search/filter

5. **Toggle Dark Mode** using the sun/moon button in navbar

## Support 💬

For issues or questions, please refer to the project documentation or create an issue in the repository.

---

**Happy Learning & Teaching! 📚**

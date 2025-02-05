import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { AuthProvider } from './contexts/AuthContext';
// import { ProtectedRoute } from './components/ProtectedRoute';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
// import { CreateEnvironment } from './pages/CreateEnvironment';
import { Dashboard } from './pages/Dashboard';
import './App.css';


const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    background: {
      default: '#f5f5f5',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            {/* <Route path="/asdf" element={<LearningPlatform />} /> */}
            <Route path="/" element={
              <Home />
            } />
          </Routes>
        </Router>
        <Toaster position="top-right" />
      </AuthProvider>

      {/*    <AuthProvider>
         <Router>
           <Routes>
             <Route path="/login" element={<Login />} />
             <Route path="/register" element={<Register />} />
             <Route
               path="/"
               element={
                 <>
                   <h1>
                     Home
                   </h1>
                 </>
               }
             />
           </Routes>
         </Router>
       </AuthProvider> */}
    </ThemeProvider>
  );
}

export default App;
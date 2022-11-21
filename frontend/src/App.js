import './App.css';
import { BrowserRouter, Routes, Route, } from 'react-router-dom'
import SignIn from './pages/signin/SignIn';
import SignUp from './pages/signup/Signup'
import TodoList from './pages/todolist/TodoList';

export const ProtectedRoute = ({ children}) => {
  const isAuthenticated = localStorage.getItem('auth')
  if (!isAuthenticated) {
    
    return <div>Access Denied</div>;
  }
  return children;
};
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUp />}  />
          <Route path="/signin" element={<SignIn />}  />
          {/* <Route path="/*" element={<div>404 Not Found</div>}  /> */}
          <Route path="/*" element={<SignUp />}  />
          <Route path="/list" element={<ProtectedRoute  ><TodoList /></ProtectedRoute>} /> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;


import { BrowserRouter, Routes, Route} from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { LoginPage } from "./pages/LoginPage";
import { DashboardPage } from "./pages/DashboardPage";
import { EventsListPage } from "./pages/EventsListPage";
import { CreateEventPage } from "./pages/CreateEventPage";
import { EventDetailPage } from "./pages/EventDetailPage";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EventsListPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } 
        />

          <Route path="/dashboard/events/new" 
          element={
            <ProtectedRoute>
              <CreateEventPage />
            </ProtectedRoute>
          }
          />

          <Route path="/dashboard/events/:id" 
          element={
            <ProtectedRoute>
              <EventDetailPage />
            </ProtectedRoute>
          }
          />
          
      </Routes>
    </BrowserRouter>
  );
}

export default App;
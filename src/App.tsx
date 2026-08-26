import { BrowserRouter, Routes, Route} from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { LoginPage } from "./pages/LoginPage";
import { DashboardPage } from "./pages/DashboardPage";
import { EventsListPage } from "./pages/EventsListPage";
import { CreateEventPage } from "./pages/CreateEventPage";
import { EventDetailPage } from "./pages/EventDetailPage";
import { CheckinScanPage } from "./pages/CheckinScanPage";
import { PublicEventPage } from "./pages/PublicEventPage";
import { FeedbackPage } from "./pages/FeedbackPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EventsListPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/events/:id" element={<PublicEventPage />} />
        <Route path="/feedback/:participationId" element={<FeedbackPage />} /> 
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

          <Route path="/dashboard/events/:id/scan"
          element={
            <ProtectedRoute>
              <CheckinScanPage />
            </ProtectedRoute>
          }
          />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
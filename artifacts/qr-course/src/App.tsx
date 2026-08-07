import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import Dashboard from "@/pages/Dashboard";
import Assignments from "@/pages/Assignments";
import Analytics from "@/pages/Analytics";
import WeekView from "@/pages/WeekView";
import LectureView from "@/pages/LectureView";
import AssignmentRunner from "@/pages/AssignmentRunner";
import PracticeAssignment from "@/pages/PracticeAssignment";
import Diagnostics from "@/pages/Diagnostics";
import TopicPractice from "@/pages/TopicPractice";
import Reasoning from "@/pages/Reasoning";
import ReasoningRunner from "@/pages/ReasoningRunner";
import Grades from "@/pages/Grades";
import AdminMode from "@/pages/AdminMode";
import Administrative from "@/pages/Administrative";

import { AuthProvider, useAuth, Spinner, protectedComponent } from "@/lib/auth";
import Landing from "@/pages/Landing";
import { Redirect } from "wouter";

const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");
const queryClient = new QueryClient();

function HomeRedirect() {
  const { loading, authenticated } = useAuth();
  // Dev: skip login entirely — go straight to the app
  if (import.meta.env.DEV) return <Redirect to="/dashboard" />;
  if (loading) return <Spinner />;
  if (authenticated) return <Redirect to="/dashboard" />;
  return <Landing />;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomeRedirect} />

      {/* ── Open routes — reading/browsing, no login required in production ── */}
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/weeks/:weekNumber" component={WeekView} />
      <Route path="/lectures/:lectureId" component={LectureView} />
      <Route path="/assignments" component={Assignments} />
      <Route path="/analytics" component={Analytics} />
      <Route path="/grades" component={Grades} />
      <Route path="/reasoning" component={Reasoning} />
      <Route path="/diagnostics" component={Diagnostics} />
      <Route path="/admin" component={AdminMode} />
      <Route path="/administrative" component={Administrative} />

      {/* ── Feedback routes — require login in production ── */}
      {/* These are the routes where the app grades, tutors, or scores the user */}
      <Route path="/assignments/:id/practice" component={protectedComponent(PracticeAssignment)} />
      <Route path="/assignments/:id" component={protectedComponent(AssignmentRunner)} />
      <Route path="/practice/topic/:topicId" component={protectedComponent(TopicPractice)} />
      <Route path="/reasoning/:id" component={protectedComponent(ReasoningRunner)} />

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <WouterRouter base={basePath}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TooltipProvider>
            <Router />
            <Toaster />
          </TooltipProvider>
        </AuthProvider>
      </QueryClientProvider>
    </WouterRouter>
  );
}

export default App;

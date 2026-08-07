import { Switch, Route, Router as WouterRouter } from "wouter";
import {
  QueryClient,
  QueryClientProvider,
  QueryCache,
  MutationCache,
} from "@tanstack/react-query";
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

import { AuthProvider, useAuth, Spinner } from "@/lib/auth";
import Landing from "@/pages/Landing";
import { Redirect } from "wouter";

const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

// When the API says the anonymous free allowance is spent, send the visitor
// through Google sign-in and bring them back to the page they were on.
function handleLoginRequired(error: unknown) {
  const err = error as { status?: number; data?: { error?: string } } | null;
  if (err && err.status === 401 && err.data?.error === "login_required") {
    window.location.href = `${basePath}/api/auth/google`;
  }
}

const queryClient = new QueryClient({
  queryCache: new QueryCache({ onError: handleLoginRequired }),
  mutationCache: new MutationCache({ onError: handleLoginRequired }),
});

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

      {/* ── AI-powered routes — open to everyone; the server meters anonymous
          usage and asks for Google sign-in once the free allowance is spent ── */}
      <Route path="/assignments/:id/practice" component={PracticeAssignment} />
      <Route path="/assignments/:id" component={AssignmentRunner} />
      <Route path="/practice/topic/:topicId" component={TopicPractice} />
      <Route path="/reasoning/:id" component={ReasoningRunner} />

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

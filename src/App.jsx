import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./layouts/app-layout.jsx";
import LandingPage from "./pages/landing.jsx";
import Onboarding from "./pages/onboarding.jsx";
import JobPage from "./pages/job";
import JobListing from "./pages/job-listing";
import SavedJob from "./pages/saved-job";
import MyJob from "./pages/my-job";
import { ThemeProvider } from "./components/theme-provider.jsx";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/onboarding",
        element: <Onboarding />,
      },
      {
        path: "/jobs",
        element: <JobListing />,
      },
      {
        path: "/jobs/:id",
        element: <JobPage />,
      },
      {
        path: "/saved-job",
        element: <SavedJob />,
      },
      {
        path: "/job",
        element: <JobPage />,
      },
      {
        path: "/my-jobs",
        element: <MyJob />,
      },
    ],
  },
]);

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;

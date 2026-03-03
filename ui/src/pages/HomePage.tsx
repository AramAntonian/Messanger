import AuthWrapper from "../components/AuthWrapper/AuthWrapper";
import Home from "../features/home";

function HomePage() {
  return (
    <AuthWrapper>
      <Home />
    </AuthWrapper>
  );
}

export default HomePage;

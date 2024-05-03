import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from '@mui/material'
import LandingPage from "./components/LandingPage";
// import LoginSignupPage from "./components/LoginSignupPage";
import { Routes, Route,Navigate} from 'react-router-dom'
import Stock from "./components/Stock/Stock";
import News from "./components/News/News";
import Chat from './components/Chat/Chat'
import Crypto from "./components/Crypto";
import AuthRoutes from "./components/Auth/AuthRoute";
import CryptoGraph from "./components/Crypto/CryptoGraph";
import { useSelector } from "react-redux";

function App() {
  const [theme, colorMode] = useMode();
  const user = useSelector((state) => state.user.email);
  
  return (
    <ColorModeContext.Provider value={colorMode}>
      {/* <BrowserRouter> */}
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth/*" element={<AuthRoutes />} />
          <Route path="/stock" element={user ? <Stock /> : <Navigate to="/auth/login" />} />
          <Route path="/news" element={user ? <News /> : <Navigate to="/auth/login" />} />
          <Route path="/chat" element={user ? <Chat /> : <Navigate to="/auth/login" />} />
          <Route path="/crypto" element={user ? <Crypto /> : <Navigate to="/auth/login" />} />
          <Route path="/cryptograph" element={user ? <CryptoGraph /> : <Navigate to="/auth/login" />} />
        </Routes>
      </ThemeProvider>
      {/* </BrowserRouter> */}
    </ColorModeContext.Provider>
  );
}

export default App;

import { ThemeProvider } from "@mui/system";
import { globalTheme } from "./utils/Theme";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing";
import Login from "./Pages/Login";
import { BaseTablesProvider } from "./context/baseTable";
import Signup from "./Pages/Signup";
import Verify from "./Pages/Verify";

function App() {
  return (
    <ThemeProvider theme={globalTheme}>
      <BaseTablesProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />}></Route>
            <Route path="login" element={<Login />}></Route>
            <Route path="signup" element={<Signup />}></Route>
            <Route path="verifyEmail">
              <Route path=":uid" element={<Verify />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </BaseTablesProvider>
    </ThemeProvider>
  );
}
export default App;

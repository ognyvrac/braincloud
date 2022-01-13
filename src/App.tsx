import { ThemeProvider } from "@mui/material/styles";
import "./App.css";
import { Navigation } from "./views/navigation/Navigation";
import { theme } from "./Theme";
import { Group } from "./views/group/Group";
import { Generate } from "./views/generate/Generate";
import { Vote } from "./views/vote/Vote";
import { ChooseWinner } from "./views/choose-winner/ChooseWinner";
import { ShowWinner } from "./views/show-winner/ShowWinner";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <div className="App">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 5fr",
              background: "#F9B2BE",
            }}
          >
            <div
              style={{
                background:
                  "radial-gradient(100% 162.15% at 0% 0%, rgba(255, 255, 255, 0.49) 0%, rgba(255, 255, 255, 0.07) 100%)",
                boxShadow: "inset 0px 0px 60px rgba(255, 255, 255, 0.25)",
                backdropFilter: "blur(12px)",
                position: "sticky",
                top: "0",
                height: "100vh",
              }}
            >
              <h2 style={{ paddingBottom: "15%" }}>BrainCloud</h2>
              <Navigation></Navigation>
            </div>
            <div>
              <div style={{ paddingBottom: "5%" }}>Describe intetions here</div>
              <div
                style={{
                  marginLeft: "15px",
                  marginRight: "15px",
                  overflowY: "auto",
                }}
              >
                <Routes>
                  <Route path="/" element={<Generate />} />
                  <Route path="/group" element={<Group />} />
                  <Route path="/vote" element={<Vote />} />
                  <Route path="/choose" element={<ChooseWinner />} />
                  <Route path="/winner" element={<ShowWinner />} />
                </Routes>
              </div>
            </div>
          </div>
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;

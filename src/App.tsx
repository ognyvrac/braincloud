import { ThemeProvider } from "@mui/material/styles";
import "./App.css";
import { Navigation } from "./views/navigation/Navigation";
import { theme } from "./Theme";
import { Grid } from "@mui/material";
import { Group } from "./views/group/Group";
import { Generate } from "./views/generate/Generate";
import { Vote } from "./views/vote/Vote";
import { CriteriaComponent } from "./views/vote/components/CriteriaComponent";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App" style={{ background: "#F9B2BE", height: "100%" }}>
        <Grid container spacing={0} style={{ height: "100%" }}>
          <Grid
            item
            xs={2}
            style={{
              background:
                "radial-gradient(100% 162.15% at 0% 0%, rgba(255, 255, 255, 0.49) 0%, rgba(255, 255, 255, 0.07) 100%)",
              boxShadow: "inset 0px 0px 60px rgba(255, 255, 255, 0.25)",
              backdropFilter: "blur(12px)",
            }}
          >
            <h2 style={{ paddingBottom: "15%" }}>BrainCloud</h2>
            <Navigation></Navigation>
          </Grid>
          <Grid item xs={10}>
            <div style={{ paddingBottom: "5%" }}>Describe intetions here</div>
            <Vote/>
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
}

export default App;

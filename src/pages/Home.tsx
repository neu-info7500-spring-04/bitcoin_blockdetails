import React from "react";
import DashboardTable from "../components/BlockTransaction";
import { Grid } from "@mui/material";

const Home: React.FC = () => {
  return (
    <Grid container spacing={6} sx={{ p: 5 }}>
      <Grid item xs={12}>
        <DashboardTable />
      </Grid>
    </Grid>
  );
};

export default Home;

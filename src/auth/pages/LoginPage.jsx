import { Grid } from "@mui/material";
import { Login } from "./Login";
import { Registration } from "./Registration";

export const LoginPage = () => {
  return (
    <>
      <Grid container className="container login-container">
        <Grid className="row">
          <Login />
          <Registration />
        </Grid>
      </Grid>
    </>
  );
};

import { useForm } from "react-hook-form";
import "./LoginPage.css";
import { useAuthStore } from "../../hooks";
import { useEffect } from "react";
import { Button, notification } from "antd";
import { Grid } from "@mui/material";

export const Login = () => {
  const { startLogin, errorMessage } = useAuthStore();

  useEffect(() => {
    if (errorMessage !== undefined) {
      openNotificationWithIcon(
        "error",
        "Error en la autenticación",
        errorMessage
      );
    }
  }, [errorMessage]);

  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, msg, descript) => {
    api[type]({
      message: msg,
      description: descript,
    });
  };

  const { register, handleSubmit } = useForm();
  const handleLogin = (data) => {
    startLogin({ email: data.email, password: data.password });
  };

  return (
    <>
      {contextHolder}
      <Grid container className="container login-container">
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={6}
          className="col-md-6 login-form-1"
        >
          <h3>Ingreso</h3>
          <form onSubmit={handleSubmit(handleLogin)}>
            <div className="form-group mb-2">
              <input
                {...register("email", { required: true })}
                type="text"
                className="form-control"
                placeholder="Correo"
              />
            </div>
            <div className="form-group mb-2">
              <input
                {...register("password", { required: true })}
                type="password"
                className="form-control"
                placeholder="Contraseña"
              />
            </div>
            <div className="d-grid gap-2">
              <Button htmlType="submit">Login</Button>
            </div>
          </form>
        </Grid>
      </Grid>
    </>
  );
};

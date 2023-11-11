import { useForm } from "react-hook-form";
import "./LoginPage.css";
import { useAuthStore } from "../../hooks";
import { useEffect } from "react";
import { Button, notification } from "antd";
import { Grid } from "@mui/material";

export const Registration = () => {
  const { errorMessage, startRegister } = useAuthStore();

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
  const handleRegistration = (data) => {
    console.log(data);
    if (data.password1 !== data.password2) {
      openNotificationWithIcon(
        "error",
        "Error en registro",
        "Contraseñas no son iguales"
      );
      return;
    }

    startRegister({
      name: data.fullName,
      email: data.email,
      password: data.password1,
    });
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
          className="col-md-6 login-form-2"
        >
          <h3>Registro</h3>
          <form onSubmit={handleSubmit(handleRegistration)}>
            <input
              {...register("fullName", { required: true })}
              type="text"
              className="form-control"
              placeholder="Nombre"
            />

            <input
              {...register("email", { required: true })}
              type="email"
              className="form-control"
              placeholder="Correo"
            />

            <input
              {...register("password1", { required: true })}
              type="password"
              className="form-control"
              placeholder="Contraseña"
            />

            <input
              {...register("password2", { required: true })}
              type="password"
              className="form-control"
              placeholder="Repita la contraseña"
            />

            <Button htmlType="submit">Submit</Button>
          </form>
        </Grid>
      </Grid>
    </>
  );
};

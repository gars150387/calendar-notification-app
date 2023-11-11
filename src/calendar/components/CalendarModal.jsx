import { useState, useEffect } from "react";
import { addHours, differenceInSeconds } from "date-fns";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import es from "date-fns/locale/es";
import { useCalendarStore, useUiStore } from "../../hooks";
import { Modal, Input, notification, Button } from "antd";
import { Grid } from "@mui/material";
const { TextArea } = Input;
registerLocale("es", es);
export const CalendarModal = () => {
  const { isDateModalOpen, closeDateModal } = useUiStore();
  const { activeEvent, startSavingEvent } = useCalendarStore();

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formValues, setFormValues] = useState({
    title: "",
    notes: "",
    start: new Date(),
    end: addHours(new Date(), 2),
  });

  useEffect(() => {
    if (activeEvent !== null) {
      setFormValues({ ...activeEvent });
    }
  }, [activeEvent]);

  const onInputChanged = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const onDateChanged = (event, changing) => {
    setFormValues({
      ...formValues,
      [changing]: event,
    });
  };
  const onCloseModal = () => {
    closeDateModal();
  };

  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, msg, dscrpt) => {
    api[type]({
      message: msg,
      description: dscrpt,
    });
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    const difference = differenceInSeconds(formValues.end, formValues.start);

    if (isNaN(difference) || difference <= 0) {
      openNotificationWithIcon(
        "error",
        "Fechas incorrectas",
        "Revisar las fechas ingresadas"
      );
      return;
    }

    if (formValues.title.length <= 0) return;
    await startSavingEvent(formValues);
    closeDateModal();
    setFormSubmitted(false);
  };

  return (
    <Modal
      title="New event"
      style={{
        top: 20,
      }}
      open={isDateModalOpen}
      onOk={() => onCloseModal()}
      onCancel={() => onCloseModal()}
      footer={[]}
    >
      {contextHolder}
      <Grid
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        margin={"auto"}
        container
      >
        <form
          style={{ width: "100%" }}
          className="container"
          onSubmit={onSubmit}
        >
          <Grid
            marginY={1}
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            item
            xs={12}
          >
            <label>Fecha y hora inicio</label>
            <DatePicker
              selected={formValues.start}
              onChange={(event) => onDateChanged(event, "start")}
              dateFormat="Pp"
              showTimeSelect
              locale="es"
              timeCaption="Hora"
            />
          </Grid>
          <Grid
            marginY={1}
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            item
            xs={12}
          >
            <label>Fecha y hora fin</label>
            <DatePicker
              minDate={formValues.start}
              selected={formValues.end}
              onChange={(event) => onDateChanged(event, "end")}
              dateFormat="Pp"
              showTimeSelect
              locale="es"
              timeCaption="Hora"
            />
          </Grid>

          <hr />
          <Grid
            marginY={1}
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            item
            xs={12}
          >
            {" "}
            <label>Titulo y notas</label>
            <Input
              name="title"
              value={formValues.title}
              onChange={onInputChanged}
              type="text"
              placeholder="Título del evento"
              autoComplete="off"
            />
          </Grid>
          <Grid marginY={1} item xs={12}>
            <TextArea
              name="notes"
              value={formValues.notes}
              onChange={onInputChanged}
              type="text"
              rows="5"
            />
          </Grid>
          <Grid marginY={1} item xs={12}>
            <Button htmlType="submit" loading={formSubmitted}>
              <i className="far fa-save"></i>
              <span> Guardar</span>
            </Button>
          </Grid>
        </form>
      </Grid>
    </Modal>
  );
};

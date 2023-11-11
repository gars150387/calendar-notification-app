import { addHours } from "date-fns";
import { useCalendarStore, useUiStore } from "../../hooks";
import { Icon } from "@iconify/react";

export const FabAddNew = () => {
  const { openDateModal } = useUiStore();
  const { setActiveEvent } = useCalendarStore();

  const handleClickNew = () => {
    setActiveEvent({
      title: "",
      notes: "",
      start: new Date(),
      end: addHours(new Date(), 2),
      bgColor: "#fafafa",
      user: {
        _id: "123",
        name: "Gustavo",
      },
    });
    openDateModal();
  };

  return (
    <button
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      className="btn btn-primary fab"
      onClick={handleClickNew}
    >
      <Icon icon="simple-line-icons:plus" width={30} />
    </button>
  );
};

import { Icon } from "@iconify/react";
import { useCalendarStore } from "../../hooks";

export const FabDelete = () => {
  const { startDeletingEvent, hasEventSelected } = useCalendarStore();

  const handleDelete = () => {
    startDeletingEvent();
  };

  return (
    <button
      className="btn btn-danger fab-danger"
      onClick={handleDelete}
      style={{
        display: hasEventSelected ? "flex" : "none",
        justifyContent:"center",
        alignItems:"center"
      }}
    >
      <Icon icon="pepicons-pop:trash-circle" width={30} />
    </button>
  );
};

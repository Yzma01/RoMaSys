import React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from "../../components/ui/alert-dialog";
const Popover = ({ button, child: ChildComponent, client }) => {
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>{button}</AlertDialogTrigger>
        <AlertDialogContent className="flex w-fit bg-transparent border-none text-white">
          {typeof ChildComponent === "function" ? (
            <ChildComponent client={client} />
          ) : (
            ChildComponent
          )}
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Popover;

import React, { useState } from "react";
import { Dialog } from "primereact/dialog";

const DialogComponent = ({
  buttonClassname,
  buttonStyle,
  buttonTitle,
  bodyDialog
}) => {
    const [displayDialog, setDisplayDialog] = useState(false);

    const onClick = () => {
      setDisplayDialog(true);
    };

    const onHide = (name) => {
      setDisplayDialog(false);
    };

    return (
        <div>
            <button className={buttonClassname} style={buttonStyle} onClick={() => onClick("displayDialog")}>
                {buttonTitle}
            </button>
            <Dialog header="Mua kèm bàn ghế công thái học" visible={displayDialog} breakpoints={{'960px': '75vw'}} style={{width: '65vw'}} onHide={() => onHide("displayDialog")}>
                {bodyDialog}
            </Dialog>
        </div>
    );
};

export default DialogComponent;

import React, { useState, useRef } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import dayjs from "dayjs";

export default React.memo(function BasicModal({
  alert,
  isFromMachines,
  reportId,
  setError,
}: any) {
  const [open, setOpen] = useState<boolean>(false);
  const [imgSource, setImgSource] = useState("");
  const imgView3 = useRef<HTMLImageElement>(null);

  const handleOpen = async () => {
    if (isFromMachines) {
      try {
        const response = await fetch("http://localhost:8080/get-image", {
          method: "POST",
          body: reportId,
        });
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        setImgSource(url);
        if (response.status != 200) {
          setError(true);
          return;
        }
        setOpen(true);
      } catch {
        setError(true);
      }
    } else {
      setOpen(true);
    }
  };
  const handleClose = () => setOpen(false);

  if (!open)
    return (
      <Button
        style={{
          textDecoration: "underline",
          fontFamily: "fantasy",
          fontSize: 20,
          color: "black",
        }}
        onClick={handleOpen}
      >
        {isFromMachines ? "תמונת מכונה" : "פרטים"}
      </Button>
    );

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isFromMachines ? "80%" : "55%",
    height: isFromMachines ? "85%" : "55%",
    bgcolor: "#002846ff",
    boxShadow: 24,
    p: isFromMachines ? 0 : 4,
  };

  const detailsStyle = { fontSize: "1em", fontWeight: "bold" };

  const imageModal = (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <img
        ref={imgView3}
        src={imgSource}
        alt={"מכונה"}
        style={{
          width: "100%",
          height: "90vh",
          objectFit: "cover",
        }}
        className="image-preview"
      ></img>
    </div>
  );

  const alerts = (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        flexDirection: "column",
        boxShadow: "2px 5px 15px -1px rgba(0, 0, 0, 0.73)",
        borderRadius: "4px",
        background: "white",
      }}
    >
      {" "}
      <Typography
        id="modal-modal-title"
        variant="h6"
        component="h2"
        style={{ textDecoration: "underline" }}
      >
        פרטים נוספים:{"\n\n"}
      </Typography>
      {alert?.machineName && (
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          שם מכונה: <span style={detailsStyle}>{alert.machineName}</span>
        </Typography>
      )}
      {alert?.michlolName && (
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          שם מחלול: <span style={detailsStyle}>{alert.michlolName}</span>
        </Typography>
      )}
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        נשמר ב:{" "}
        <span style={detailsStyle}>
          {dayjs(alert?.createdAt).format("HH:mm:ss MM/DD/YYYY")}
        </span>
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        נערך על ידי: <span style={detailsStyle}>{alert?.lastEditBy?.name}</span>
      </Typography>
      {(alert?.alertFromDeteriorate || alert.alertFromHmi) && (
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          סיבת ההתראה: {``}
          {alert.alertFromDeteriorate && (
            <span style={detailsStyle}>
              {`current: ${alert.alertFromDeteriorate.currentVal}`}
              {`previous: ${alert.alertFromDeteriorate.previousVal}`}
            </span>
          )}
          {alert.alertFromHmi && (
            <span style={detailsStyle}>
              {"HMI: "} {alert.alertFromHmi?.currentVal}
              {"HMI קודם: "}
              {alert.alertFromHmi?.previousVal}
            </span>
          )}
        </Typography>
      )}
      {alert?.data?.text && (
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          טקסט חופשי:{" "}
          <span style={detailsStyle}>
            {alert?.data?.text ? alert.data.text : ""}
          </span>
        </Typography>
      )}
    </div>
  );

  return (
    <div style={{ flex: 1, textAlign: "center" }}>
      <Button
        style={{
          textDecoration: "underline",
          fontFamily: "fantasy",
          fontSize: 20,
          color: "black",
        }}
        onClick={handleOpen}
      >
        {isFromMachines ? "תמונת מכונה" : "פרטים"}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {isFromMachines ? imageModal : alerts}
          {/* {!isFromMachines && (
            <Button style={{ marginTop: 15 }} onClick={handleClose}>
              חזור
            </Button>
          )} */}
        </Box>
      </Modal>
    </div>
  );
});

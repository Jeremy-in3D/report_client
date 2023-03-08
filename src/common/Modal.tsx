// import * as React from "react";
import { useState, useRef } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import dayjs from "dayjs";

export default function BasicModal({
  alert,
  isFromMachines,
  reportId,
  setError,
}: any) {
  const [open, setOpen] = useState<boolean>(false);
  const [imgSource, setImgSource] = useState("");
  const imgView3 = useRef<HTMLImageElement>(null);

  console.count("modal");

  const handleOpen = async () => {
    if (isFromMachines) {
      const response = await fetch(
        "https://icl-report.herokuapp.com/get-image",
        {
          method: "POST",
          body: reportId,
        }
      );
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      if (response.status != 200) return;
      setError(true);
      setImgSource(url);
    }

    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isFromMachines ? "80%" : "55%",
    height: isFromMachines ? "85%" : "55%",
    bgcolor: "background.paper",
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
        border: "1px solid black",
        height: "100%",
        flexDirection: "column",
      }}
    >
      {" "}
      <Typography id="modal-modal-title" variant="h6" component="h2">
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
          {!isFromMachines && (
            <Button style={{ marginTop: 15 }} onClick={handleClose}>
              חזור
            </Button>
          )}
        </Box>
      </Modal>
    </div>
  );
}

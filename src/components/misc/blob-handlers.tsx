import React, { useState, useEffect } from "react";
import BasicModal from "../../common/Modal";

export const TakePicture: React.FC<{
  reportId: string | undefined | null;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}> = ({ reportId, setFormData }) => {
  const [image, setImage] = useState<any>();

  useEffect(() => {
    if (!image) return;
    const formData = new FormData();
    formData.append("imgFile", image[0]);
    formData.append("reportId", typeof reportId == "string" ? reportId : "");
    setFormData(formData);
  }, [image]);

  return (
    <>
      {/* Upload Image */}
      <form
        onSubmit={async (e) => {
          if (!reportId) {
            alert("Error uploading your image");
          }
          e.preventDefault();
        }}
      >
        {/* upload image */}
        <div className="img-upload-container">
          {" "}
          <input
            name="imgFile"
            type="file"
            accept="image/*"
            capture
            onChange={(e) => {
              setImage(e.target.files);
            }}
          />
          <BasicModal isFromMachines reportId={reportId} />
        </div>
      </form>
    </>
  );
};

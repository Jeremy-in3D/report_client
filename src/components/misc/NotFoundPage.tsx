import { pageNotFound } from "../../data/imports";

export function NotFoundPage() {
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        alignItems: "center",
      }}
    >
      <img
        style={{ objectFit: "fill", width: "100vw" }}
        src={pageNotFound.href}
      />
    </div>
  );
}

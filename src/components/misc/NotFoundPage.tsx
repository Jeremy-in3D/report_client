import { pageNotFound } from "../../data/imports";

export function NotFoundPage() {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <img src={pageNotFound.href} />
    </div>
  );
}

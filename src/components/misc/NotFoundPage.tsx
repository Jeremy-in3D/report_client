import { pageNotFoundBg, logo } from "../../data/imports";
import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: `url(${pageNotFoundBg})`,
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="page-not-found-container">
        <div
          style={{
            flex: 1.5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-evenly",
            padding: "5px",
          }}
        >
          <div
            style={{
              borderBottom: "3px solid #002846ff",
              width: "25%",
              height: "12%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img src={logo.href} style={{ width: "90%", height: "95%" }} />
          </div>

          <div>
            <h1
              style={{
                color: "#002846ff",
                textDecoration: "bold",
                fontSize: 120,
                textAlign: "center",
              }}
            >
              404
            </h1>
            <h2
              style={{
                color: "#002846ff",
                textAlign: "center",
              }}
            >
              Page not found
            </h2>
            <p
              style={{
                color: "#002846ff",
                fontSize: 22,
                textAlign: "center",
                marginTop: "6%",
              }}
            >
              The page you are looking for does not exist
            </p>
            <h3
              style={{
                color: "#002846ff",
                textAlign: "center",
                marginTop: "3%",
                fontSize: 40,
                fontWeight: "100",
              }}
            >
              You can
            </h3>
          </div>

          <div
            style={{
              height: "25%",
              width: "90%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "40%",
                height: "80%",
                padding: "3px",
                background: "#002846ff",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                justifyContent: "space-evenly",
              }}
            >
              <p style={{ textAlign: "center", color: "white" }}>
                Click the button below to go back to homepage
              </p>
              <Link to="/" style={{ textDecoration: "none" }}>
                <button
                  style={{
                    all: "unset",
                    width: "80px",
                    height: "120%",
                    background: "white",
                    border: "none",
                    color: "#002846ff",
                    textAlign: "center",
                    fontSize: 20,
                    fontWeight: "bold",
                  }}
                >
                  Home
                </button>
              </Link>
            </div>
            <h2 style={{ color: "#002846ff", fontSize: 30 }}>or</h2>
            <div
              style={{
                width: "40%",
                height: "80%",
                padding: "3px",
                background: "#002846ff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <p
                style={{
                  textAlign: "center",
                  color: "white",
                  fontSize: "1.2em",
                  transform: "scale(.9, 1.2)",
                  fontWeight: 100,
                }}
              >
                Contact us: <span>ran@in3d-tech.com </span>
                <span>+972-52-478-0066</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

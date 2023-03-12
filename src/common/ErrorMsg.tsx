export function ErrorMsg(message: any) {
  const errorMsg = message || "אופס! משהו השתבש";
  return (
    <h4
      style={{ color: "red", fontSize: 15 }}
      className="generic-error-message"
    >
      {"אופס! משהו השתבש (אם נסית לעלות תמונה אנא חכה כמה שניות ונסה שנית) "}
    </h4>
  );
}

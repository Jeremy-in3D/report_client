export function ErrorMsg(message: string) {
  const errorMsg = message || "אופס! משהו השתבש";
  return <div className="generic-error-message">{errorMsg}</div>;
}

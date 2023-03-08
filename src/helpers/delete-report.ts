import React from "react";

export async function deleteReport(
  publishedAt: string,
  results: any,
  idx: number,
  setResults: React.Dispatch<React.SetStateAction<any>>
) {
  const answer = confirm(
    "אתה רוצה למחוק את הדוח?\n This will permanently delete the report"
  );
  if (answer) {
    const deleteResult = await fetch(
      "https://icl-report.herokuapp.com/delete-report",
      {
        method: "POST",
        body: publishedAt,
      }
    );
    if (deleteResult.status === 200) {
      const newSearchResults = results.filter(
        (result: any, i: number) => i !== idx
      );
      setResults(newSearchResults);
    }
  }
}

import { Route } from "../../src/classes/route";
import { arrayOfRouteNames } from "../components/report/common/reportTypes";
import { Context } from "../context/context";
import { Routes } from "../data/reports-data";
import { User } from "../app";

export const createNewReport = async (
  reportInstance: Route,
  newReport: any,
  appContext: Context
) => {
  const reportResponse = await fetch(
    "https://icl-report.herokuapp.com/create-report",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newReport),
    }
  );
  if (reportResponse.status === 200) {
    reportInstance.instantiateReport(newReport);
    const existingReports = [...appContext.reports, newReport];
    appContext.setReports(existingReports);
  } else {
    throw new Error("Failed to create new report");
  }
};

export const getRoutes = async () => {
  const response = await fetch("https://icl-report.herokuapp.com/get-routes");
  const data = await response.json();
  return data;
};

export const getMachines = async (
  reportId: string | undefined,
  reportInstance: Route
) => {
  const reportResponse = await fetch(
    "https://icl-report.herokuapp.com/get-docs",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reportId }),
    }
  );
  if (reportResponse.status === 200) {
    const responseBody = await reportResponse.json();
    reportInstance.loadMachines(responseBody);
  } else {
    throw new Error("Failed to create new report");
  }
};

export const publishReport = async (
  reports: [],
  setReports: React.Dispatch<React.SetStateAction<[]>>,
  reportInstance: Route,
  routes: Routes | undefined,
  user: User,
  navigate: any
) => {
  if (!reports.length) {
    alert("No reports to publish");
    return;
  }

  confirm("Are you sure you want to publish the report?");
  const numberOfReportsForCompleteReport = 7;
  const reportsCopy: any[] = [...reports];

  if (reports.length < numberOfReportsForCompleteReport) {
    const checkForMissingReports = arrayOfRouteNames.map((routeName) => {
      let routeAlreadyExistsInReport = false;
      const searchReportsForExistingReport = reportsCopy.map((report: any) => {
        if (report.routeName == routeName) {
          routeAlreadyExistsInReport = true;
        }
      });

      if (!routeAlreadyExistsInReport) {
        const createNewReport = routes?.map((route) => {
          if (route.routeName === routeName) {
            const newReport = reportInstance.newReport(route);
            reportsCopy.push(newReport);
          }
        });
      }
    });
  }

  try {
    const response = await fetch(
      "https://icl-report.herokuapp.com/publish-report",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reports: reportsCopy, user }),
      }
    );

    if (response.status === 200) {
      setReports([]);
      navigate("/");
    }
  } catch (err) {
    console.log("error publishing report", err);
  }
};

export const getCurrentReport = async (appContext: Context) => {
  try {
    fetch("https://icl-report.herokuapp.com/get-current-reports", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "",
    })
      .then((response) => response.json())
      .then((data) => {
        const reportsContextCopy = [...appContext.reports, ...data];
        appContext.setReports(reportsContextCopy);
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  } catch (err) {
    console.log("error getting current report", err);
  }
};

export const sendImage = async (formData: any) => {
  const response = await fetch(
    "https://icl-report.herokuapp.com/upload-image",
    {
      method: "POST",
      body: formData,
    }
  );
  return response;
};

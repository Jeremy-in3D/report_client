import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  useContext,
  useRef,
} from "react";
import { AlertData } from "../../src/classes/route";
import { checkmarkIcon, lookatAlert, minusIcon } from "../data/imports";
import { Route } from "../../src/classes/route";
import BasicModal from "../common/Modal";
import AppContext, { Context } from "../context/context";
import { Routes } from "../data/reports-data";
import { getRoutes } from "../routes/routes";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { Filter } from "./search/AlertFilter";
import { arrayOfRouteNames } from "./report/common/reportTypes";

export const StatusScreen: React.FC<{}> = () => {
  const [alerts, setAlerts] = useState<AlertData[]>();
  const [filterOption, setFilterOption] = useState<string[]>(arrayOfRouteNames);
  const appContext = useContext<Context>(AppContext);
  const navigate = useNavigate();

  const routes = appContext.routes;
  const reportInstance = appContext.reportInstance?.current
    ? appContext.reportInstance?.current
    : useRef(new Route()).current;

  async function getAlerts() {
    const alertsResponse = await fetch(
      "https://icl-report.herokuapp.com/get-alerts"
    );
    const data = await alertsResponse.json();
    setAlerts(data);
  }

  useEffect(() => {
    getAlerts();
  }, []);

  return (
    <div className="alerts-screen">
      <h2 className="alerts-title">התראות</h2>
      <Filter
        setAlerts={setAlerts}
        alerts={alerts}
        setFilterOption={setFilterOption}
      />
      <div className="alerts">
        {alerts?.length ? (
          alerts
            .filter((alert) => filterOption.includes(alert.routeName))
            .map((alert, i) =>
              alert.completed ? null : (
                <div className="alert-item" key={alert.uniqueId + i}>
                  <div style={{ flex: 1, textAlign: "center" }}>
                    {alert.routeName}
                  </div>
                  <div style={{ flex: 1, textAlign: "center" }}>
                    {dayjs(alert.createdAt).format("MM/DD/YYYY HH:mm:ss")}
                  </div>
                  <div style={{ flex: 1, textAlign: "center" }}>
                    {alert.lastEditBy?.name}
                  </div>
                  <div
                    style={{ flex: 1, textAlign: "center" }}
                    onClick={() => {
                      handleViewAlert(
                        reportInstance,
                        alert.reportId,
                        true,
                        appContext.reports,
                        routes,
                        appContext.setRoutes,
                        appContext,
                        alert.machineName,
                        navigate
                      );
                    }}
                  >
                    צפייה בדו"ח
                  </div>
                  <BasicModal alert={alert} />
                  <div
                    style={{
                      display: "flex",
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onClick={() => {
                      handleViewAlert(
                        reportInstance,
                        alert.reportId,
                        false,
                        appContext.reports,
                        routes,
                        appContext.setRoutes,
                        appContext,
                        alert.machineName,
                        navigate
                      );
                    }}
                  >
                    למכונה
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      className={`alert-item-btn ${
                        alert.completed ? "completed" : ""
                      }`}
                      src={
                        alert.completed ? checkmarkIcon.href : minusIcon.href
                      }
                      onClick={async () => {
                        const answer = confirm(
                          `Would you like to mark alert as ${
                            alert.completed ? "incomplete" : "complete"
                          }?`
                        );
                        if (answer) {
                          const updateResponse = await fetch(
                            "https://icl-report.herokuapp.com/update-alert",
                            {
                              method: "POST",
                              body: alert.reportId,
                            }
                          );
                          if (updateResponse.status === 200) {
                            getAlerts();
                          }
                        }
                      }}
                    ></img>
                  </div>
                </div>
              )
            )
        ) : (
          <div className="alert-item-default">
            <p>אין התראות</p>
          </div>
        )}
      </div>
    </div>
  );
};

const handleViewAlert = async (
  reportInstance: Route,
  reportId: string,
  isShowFullReport: boolean,
  currentReports: any[],
  routes: Routes | undefined,
  setRoutes: Dispatch<SetStateAction<any>>,
  appContext: any,
  machineName: string,
  navigate: any
) => {
  if (!routes) {
    const routesToSet = await getRoutes();
    setRoutes(routesToSet);
  }
  let isAlertFromCurrentReport;
  const checkIsAlertFromCurrentReport = currentReports.map((report) => {
    if (report.reportId == reportId) isAlertFromCurrentReport = true;
  });

  const result = await fetch("https://icl-report.herokuapp.com/get-docs", {
    method: "POST",
    body: JSON.stringify({
      reportId,
      isFromAlerts: true,
      isAlertFromCurrentReport,
      isShowFullReport,
    }),
  });

  const data = await result.json();

  const { reportHistoryResults, results } = data || {};

  if (isShowFullReport) {
    const extra = { ...appContext.extra };
    appContext.setExtra({ ...extra, selectedAlert: "" });
    appContext.extra?.selectedAlert !== machineName;
    appContext.setSelectedReport(reportHistoryResults[0]);
  } else {
    const extra = { ...appContext.extra };
    appContext.setExtra({
      ...extra,
      isFromAlertAndMachine: true,
      selectedAlert: machineName,
    });

    reportInstance.instantiateReport(reportHistoryResults);
    reportInstance.loadMachines(results);
  }

  navigate("/reports");
};

import React, { useState } from "react";
import PropTypes from "prop-types";
import stats2016 from "../lib/historyStats/2016.json";
import stats2017 from "../lib/historyStats/2017.json";
import stats2018 from "../lib/historyStats/2018.json";
import stats2019 from "../lib/historyStats/2019.json";
import stats2020 from "../lib/historyStats/2020.json";
import BetService from "@/lib/betService";
import { useMediaQuery } from 'react-responsive'
import styles from "@/styles/pages/Stats.module.scss";
import DotLoader from "react-spinners/DotLoader";
import classNames from "classnames";

export default function Stats({ start, end, statsArr }) {
  const yearsButtons = [...Array(end - start + 1).keys()].map((x) => x + start);
  const isDesktop = useMediaQuery({ query: '(min-width: 1024px)' })
  const littleScreen = useMediaQuery({ query: '(max-width: 384px)' })
  const [yearSelected, setYearSelected] = useState(end);
  const [statsType, setStatsType] = useState("Meses");
  const [tableBody, setTableBody] = useState(statsArr);
  const [spinner, setSpinner] = useState(false);

  const statsTyperArr = ["Meses", "Hipódromos", "Categorías", "Stakes"];
  const tableHeader = [
    statsType ? statsType : "Meses",
    "Apuestas",
    "Aciertos",
    "Fallos",
    "Nulos",
    "Acierto",
    "Stake Medio",
    "Uds Jugadas",
    "Yield",
    "Profit",
  ];

  const arrKeys = [
    statsType === "Stakes"
      ? "stake"
      : statsType === "Hipódromos"
      ? "racecourse"
      : statsType === "Categorías"
      ? "category"
      : "month",
    "bets",
    "wins",
    "loss",
    "voids",
    "win_percent",
    "medium_stake",
    "units_staked",
    "yield",
    "profit",
  ];

  const setYear = async (year) => {
    if (year === yearSelected) return;
    setYearSelected(year);
    setStatsType(null);
    let staticStats;

    if (year < 2021) {
      if (year === 2016) {
        staticStats = stats2016;
      } else if (year === 2017) {
        staticStats = stats2017;
      } else if (year === 2018) {
        staticStats = stats2018;
      } else if (year === 2019) {
        staticStats = stats2019;
      } else {
        staticStats = stats2020;
      }

      setTableBody(staticStats);
      setStatsType(null);
    } else {
      try {
        setStatsType("Meses");
        setSpinner(true);
        const res = await BetService.getBetsByMonth(year);
        setTableBody(res);
      } catch (error) {
        return error;
      } finally {
        setSpinner(false);
      }
    }
  };

  const setType = async (type) => {
    if (type === statsType) return;

    const typeBd =
      type === "Stakes"
        ? "stake"
        : type === "Hipódromos"
        ? "racecourse"
        : type === "Categorías"
        ? "category"
        : "month";

    setStatsType(type);

    try {
      setSpinner(true);
      let res;
      if (typeBd === "month") {
        res = await BetService.getBetsByMonth(yearSelected);
      } else {
        res = await BetService.getBetsByType(yearSelected, typeBd);
      }
      setTableBody(res);
    } catch (error) {
      return error;
    } finally {
      setSpinner(false);
    }
  };

  return (
    <div className={styles["stats-page"]}>
      <main className="main">
        <h2>Stats</h2>
        <h6>
          Ponemos a tu disposición nuestros números desde que empezamos a
          pronosticar públicamente en el año 2016.
        </h6>

        <div className={styles["stats-page__type-container"]}>
          <p>Año:</p>
          <div className={styles["stats-page__type-container__grid"]}>
            {yearsButtons.map((elm, index) => (
              <p key={`year-${index}`}>
                <span
                  onClick={() => setYear(elm)}
                  className={classNames({
                    [styles["stats-page__type-container--active"]]:
                      elm === yearSelected,
                  })}
                >
                  {elm}
                </span>
              </p>
            ))}
          </div>
        </div>

        <div>
          {!spinner ? (
            <div>
              <h4>Estadísticas Año {yearSelected}</h4>
              {yearSelected > 2020 && (
                <div className={styles["stats-page__type-container"]}>
                  {!littleScreen &&<p>Tipo:</p>}
                  <div className={styles["stats-page__type-container__flex"]}>
                    {statsTyperArr.map((elm, index) => (
                      <p key={`type-${index}`}>
                        <span
                          onClick={() => setType(elm)}
                          className={classNames({
                            [styles["stats-page__type-container--active"]]:
                              elm === statsType,
                          })}
                        >
                          {elm}
                        </span>
                      </p>
                    ))}
                  </div>
                </div>
              )}
              {tableBody.length && (
                <table className={styles["table-stats"]}>
                  <thead>
                    <tr>
                      {tableHeader.map((elm, index) => {
                        if ((
                          elm === "Aciertos" ||
                          elm === "Fallos" ||
                          elm === "Nulos"
                      ) && (isDesktop)) {
                          return (
                            <th key={`header-${index}`}>
                              <div
                                className={classNames(
                                  styles["table-stats__bet"],
                                  {
                                    [styles["table-stats__bet--win"]]:
                                      elm === "Aciertos",
                                    [styles["table-stats__bet--void"]]:
                                      elm === "Nulos",
                                    [styles["table-stats__bet--loss"]]:
                                      elm === "Fallos",
                                  }
                                )}
                              ></div>
                            </th>
                          );
                        }
                        if (((statsType !== "Stakes" || elm !== "Stake Medio") && (isDesktop)) || (elm === statsType) || (elm === 'Acierto') || (elm === 'Yield') || (elm === 'Profit')) {
                          return <th key={`header-${index}`}>{elm}</th>;
                        }
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {tableBody.map((item, index) => (
                      <tr key={index}>
                        {arrKeys.map((itemKey, keyIndex) => {
                          if (((
                            statsType !== "Stakes" ||
                            itemKey !== "medium_stake"
                          ) && (isDesktop)) || (itemKey === 'yield') || (itemKey === 'profit') || (itemKey === 'win_percent') || (itemKey === arrKeys[0])) {
                            return (
                              <td
                                id={`body-${index}-${keyIndex}`}
                                key={`body-${index}-${keyIndex}`}
                                className={classNames({
                                  [styles["table-stats__result"]]:
                                    itemKey === "yield" || itemKey === "profit",
                                  [styles["table-stats__result--win"]]:
                                    (itemKey === "yield" ||
                                      itemKey === "profit") &&
                                    item[itemKey] > 0,
                                  [styles["table-stats__result--loss"]]:
                                    (itemKey === "yield" ||
                                      itemKey === "profit") &&
                                    item[itemKey] < 0,
                                  [styles["table-stats__result--void"]]:
                                    (itemKey === "yield" ||
                                      itemKey === "profit") &&
                                    (item[itemKey] === "0.00" ||
                                      item[itemKey] === "NaN"),
                                })}
                              >
                                {(itemKey === "win_percent" ||
                                  itemKey === "yield") &&
                                item[itemKey] !== "NaN"
                                  ? `${item[itemKey]}%`
                                  : itemKey === "medium_stake" &&
                                    item[itemKey] === "NaN"
                                  ? "0.00"
                                  : (itemKey === "win_percent" ||
                                      itemKey === "yield") &&
                                    item[itemKey] === "NaN"
                                  ? "N/A"
                                  : item[itemKey]}
                              </td>
                            );
                          }
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          ) : (
            <DotLoader color={"#3860fb"} loading={spinner} size={150} />
          )}
        </div>
      </main>
    </div>
  );
}

Stats.propTypes = {
  start: PropTypes.number.isRequired,
  end: PropTypes.number.isRequired,
  statsArr: PropTypes.array.isRequired,
};

export async function getServerSideProps(ctx) {
  const start = 2016;
  const end = new Date().getFullYear();

  const statsArr = await BetService.getBetsByMonth(end);

  const serverSideResponse = {
    props: { start, end, statsArr },
  };

  return serverSideResponse;
}

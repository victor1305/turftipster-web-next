import React, { useState } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import stats2016 from "../lib/historyStats/2016.json";
import stats2017 from "../lib/historyStats/2017.json";
import stats2018 from "../lib/historyStats/2018.json";
import stats2019 from "../lib/historyStats/2019.json";
import stats2020 from "../lib/historyStats/2020.json";
import BetService from "@/lib/betService";

export default function Stats({ start, end, paramYear }) {
  const yearsButtons = [...Array(end - start + 1).keys()].map((x) => x + start);
  const router = useRouter();
  const [yearSelected, setYearSelected] = useState(paramYear);
  const [statsType, setStatsType] = useState(null);
  const [tableBody, setTableBody] = useState([]);

  const statsTyperArr = ["Meses", "Hipódromos", "Categorías", "Stakes"];
  const tableHeader = [
    statsType,
    "Apuestas",
    "Aciertos",
    "Fallos",
    "Nulos",
    "% Acierto",
    "Stake Medio",
    "Uds Jugadas",
    "Yield",
    "Uds Ganadas",
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
        const res = await BetService.getBetsByMonth(year);
        setStatsType('Meses');
        setTableBody(res);
      } catch (error) {
        return error;
      }
    }

    router.push({
      pathname: "/stats",
      query: { year: year.toString() },
    });
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
    const newQuery = { year: yearSelected.toString(), type };

    router.push({
      pathname: "/stats",
      query: newQuery,
    });

    try {
      let res;
      if (typeBd === "month") {
        res = await BetService.getBetsByMonth(yearSelected);
      } else {
        res = await BetService.getBetsByType(yearSelected, typeBd);
      }
      setTableBody(res);
    } catch (error) {
      return error;
    }
  };

  return (
    <div>
      <main className="main">
        <h2>Stats</h2>
        <h6>
          Ponemos a tu disposición nuestros números desde que empezamos a
          pronosticar públicamente en el año 2016.
        </h6>

        <div>
          {yearsButtons.map((elm, index) => (
            <button key={index} type="button" onClick={() => setYear(elm)}>
              {elm}
            </button>
          ))}
        </div>

        {yearSelected > 2020 && (
          <div>
            {statsTyperArr.map((elm, index) => (
              <button key={index} type="button" onClick={() => setType(elm)}>
                {elm}
              </button>
            ))}
          </div>
        )}

        <div>
          {tableBody.length && (
            <table>
              <thead>
                <tr>
                  {tableHeader.map((elm, index) => {
                    if (statsType !== "Stakes" || elm !== "Stake Medio") {
                      return <td key={index}>{elm}</td>;
                    }
                  })}
                </tr>
              </thead>
              <tbody>
                {tableBody.map((item, index) => (
                  <tr key={index}>
                    {arrKeys.map((itemKey, keyIndex) => {
                      if (
                        statsType !== "Stakes" ||
                        itemKey !== "medium_stake"
                      ) {
                        return <td key={keyIndex}>{item[itemKey]}</td>;
                      }
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}

Stats.propTypes = {
  start: PropTypes.number.isRequired,
  end: PropTypes.number.isRequired,
};

export async function getServerSideProps(ctx) {
  const start = 2016;
  const end = new Date().getFullYear();
  let paramYear = null;

  if (ctx.query.year) {
    paramYear = parseInt(ctx.query.year);
  }

  const serverSideResponse = {
    props: { start, end, paramYear },
  };

  return serverSideResponse;
}

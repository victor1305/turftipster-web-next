import React, { useState } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import stats2016 from "../lib/historyStats/2016.json";

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

  const setYear = (year) => {
    setYearSelected(year);
    setStatsType(null);
    setTableBody(stats2016);

    router.push({
      pathname: "/stats",
      query: { year: year.toString() },
    });
  };

  const setType = (type) => {
    setStatsType(type);
    const newQuery = { year: yearSelected.toString(), type };

    router.push({
      pathname: "/stats",
      query: newQuery,
    });
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
                    if (statsType !== "Stakes" || itemKey !== "medium_stake") {
                      return <td key={keyIndex}>{item[itemKey]}</td>;
                    }
                  })}
                </tr>
              ))}
            </tbody>
          </table>
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

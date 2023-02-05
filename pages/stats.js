import React, { useState } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";

export default function Stats({ start, end, paramYear }) {
  const yearsButtons = [...Array(end - start + 1).keys()].map((x) => x + start);
  const router = useRouter();
  const [yearSelected, setYearSelected] = useState(paramYear);
  const [statsType, setStatsType] = useState(null);

  const statsTyperArr = ["Meses", "Hipódromos", "Categorías", "Stakes"];

  const setYear = (year) => {
    setYearSelected(year);
    setStatsType(null);

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
        
        <div></div>
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

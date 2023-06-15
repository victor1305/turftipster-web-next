import BetService from "@/lib/betService";
import BetCard from "@/components/betCard";
import styles from "@/styles/pages/Home.module.scss";
import { useEffect, useState } from "react";
import DotLoader from "react-spinners/DotLoader";

export default function Home() {
  const [bets, setBets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBets()
    setLoading(false)
  }, []);

  const getBets = async () => {
    const lastBets = await BetService.getHomeBets();
    setBets(lastBets);
  }

  return (
    <div className={styles.home}>
      <main className="main">
        <div className={styles["home__principal-section"]}>
          <div className={styles["home__principal-section__image-box"]}>
            <img src="/home-image.png" alt="horse" />
          </div>
          <div className={styles["home__principal-section__title-box"]}>
            <h1>TurfTipster</h1>
            <h4>HORSE RACING TIPSTERS</h4>
          </div>
        </div>
        {/* <div className={styles["home__last-bets"]}>
          <h4>Últimas apuestas:</h4>
          {!loading ? (
            <div>
              {bets.map((elm, index) => (
                <BetCard key={`card-${index + 1}`} bet={elm} />
              ))}
            </div>
          ) : (
            <div>
              <DotLoader color={"#3860fb"} loading={loading} size={90} />
            </div>
          )}
        </div> */}
      </main>
    </div>
  );
}

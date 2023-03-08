import Link from "next/link";
import RouterService from "../../lib/routerService";
import styles from '@/styles/pages/HorseRacing.module.scss'

export default function HorseRaces() {
  return (
    <div className={styles["horse-racing"]}>
      <main className="main">
        <h2>¿Eres nuevo en el mundo de las Carreras de Caballos?</h2>
        <h6>En esta sección encontraras todo lo necesario para iniciarte.</h6>
        <div className={styles["horse-racing--sections-container"]}>
          <section>
            <div>
              <img src="/start.jpg" alt="Start" />
            </div>
            <div>
              <h4>Lo que debes saber antes de empezar</h4>
              <Link href={RouterService.FIRST_STEPS_URL} className="card-btn">Saber más</Link>
            </div>
          </section>
          <section className={styles["horse-racing--second-section"]}>
            <div>
              <h4>El bank, la unidad, el stake y el yield</h4>
              <Link href={RouterService.TERMINOLOGY_URL} className="card-btn">Saber más</Link>
            </div>
            <div>
              <img src="/nextstep.jpg" alt="Siguientes pasos" />
            </div>
          </section>
          <section>
            <div>
              <img src="/finish.jpg" alt="Finish" />
            </div>
            <div>
              <h4>Tipos de apuestas</h4>
              <Link href={RouterService.BETS_TYPE_URL} className="card-btn">Saber más</Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

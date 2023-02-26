import styles from "@/styles/pages/BetsType.module.scss"
import RouterService from "@/lib/routerService";
import Link from "next/link";

export default function BetsType() {
  return (
    <div className={styles["bets-type-page"]}>
      <main className="main">
        <h2>Tipos de apuestas</h2>
        <h4>
          En las carreras de caballos tenemos varios tipos de apuestas, a
          continuación citaremos y explicaremos cada una de ellas
        </h4>
        <div>
          <p className={styles["bets-type-page__go-back"]}><Link id="go-back-btn" href={RouterService.HORSE_RACING_URL}>← Volver al índice</Link></p>
          <div>
            <article>
              <h4>Ganador</h4>
              <p>
                La apuesta por excelencia. El caballo que crees que ganará la
                carrera.
              </p>
            </article>
            <article>
              <h4>Colocado</h4>
              <p>
                Esta jugada depende directamente del numero de participantes. En
                carreras de 5 a 7 corredores serán colocados los 2 primeros. En
                carreras de 8 a 15 serán colocados los 3 primeros y cuando tengamos
                16 o mas serán 4 colocados (En handicaps).
              </p>
            </article>
            <article>
              <h4>Ganador con seguro</h4>
              <p>
                En este caso sería como jugar un ganador pero si nuestro caballo
                fuese segundo, tercero o cuarto (En función del seguro cogido),
                nuestra apuesta sería nula y recuperaríamos lo invertido.
              </p>
            </article>
            <article>
              <h4>Ganador sin favoritos</h4>
              <p>
                Nuestra apuesta será ganadora si nuestra caballo gana o finaliza
                batido solamente por el favorito o favoritos (En función de los que
                hayamos jugado) designados por el bookie.
              </p>
            </article>
            <article>
              <h4>Gemelas</h4>
              <p>
                Hay varios tipos de gemelas: Gemela Directa o En orden, que es
                acertar los dos primeros y su orden. Gemela Reversible, que es
                acertar los dos primeros sin especificar quien queda primero y quien
                segundo. Gemela Colocada, consiste en acertar dos de los tres
                primeros y está disponible en carreras con más de 8 partants,
                nuestra apuesta será ganadora si los dos caballos elegidos terminan
                entre los tres primeros clasificados... 2Sur4 o Couple4, seleccionar
                2 caballos que queden entre los 4 primeros.
              </p>
            </article>
            <article>
              <h4>Trio</h4>
              <p>
                Al igual que las gemelas tenemos varios tipos. Por un lado el trio
                reversible que es acertar los 3 primeros sin importar el orden. Y
                por otro lado tenemos el trio en orden o Trifecta, que consiste en
                acertar los 3 primeros especificando quien es el primero, quien es
                el segundo y quien es el tercero.
              </p>
            </article>
          </div>
        </div>
      </main>
    </div>
  );
}

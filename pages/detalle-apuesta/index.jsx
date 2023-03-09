import styles from "@/styles/pages/BetDetail.module.scss";
import BetService from "@/lib/betService";
import RouterService from "@/lib/routerService";

export default function BetDetail({ bet }) {
  
  let statusClient = ""
  let statusClass = ""

  if (bet.status === "win") {
      statusClient = "Ganada"
      statusClass = "detail-status-win"
  }
  if (bet.status === "loss") {
      statusClient = "Perdida"
      statusClass = "detail-status-loss"
  }
  if (bet.status === "void") {
      statusClient = "Nula"
      statusClass = "detail-status-void"
  }
  if (bet.status === "pending") {
      statusClient = "Pendiente"
      statusClass = "detail-status-pending"
  }

  let dateFormated = ""

  if (bet.date) {
    dateFormated = new Date(bet.date).toLocaleDateString()
  } 

  const goBack = () => {
    RouterService.goToHome()
  }

  return (
    <div className={styles["bet-detail-page"]}>
      <main>
        <h2>Detalle de apuesta</h2>
        <div className={styles["bet-detail-page__content"]}>
          <p><strong>Bookie</strong>: {bet.bookie}</p>
          <p><strong>Hipódromo: </strong>{bet.racecourse}</p>
          <p><strong>Carrera: </strong>{bet.race}</p>
          <p><strong>Apuesta: </strong>{bet.betName}</p>
          <p><strong>Cuota: </strong>{bet.price}</p>
          <p><strong>Stake: </strong>{bet.stake}</p>   
          <p><strong>Resultado: </strong>{bet.position}</p>
          <p><strong>Beneficio: </strong>{(bet.profit).toFixed(2)} Uds</p>
          <p><strong>Fecha: </strong>{dateFormated}</p>
          <p><strong>Código: </strong>{bet.betCode}</p> 
          <p><strong>Estado: </strong><span className={styles[`bet-detail-page__content--${statusClass}`]}>{statusClient}</span></p>
        </div>
        <div className={styles["bet-detail-page__btn-container"]}>
          <button className="card-btn" onClick={goBack}>Volver</button>
        </div>
      </main>
    </div>
  )
}

export async function getServerSideProps({ query }) {
  const betId = query.bet_ref

  const bet = await BetService.getBetDetail(betId);

  const serverSideResponse = {
    props: { bet },
  };

  return serverSideResponse;
}
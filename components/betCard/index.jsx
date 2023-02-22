import RouterService from "@/lib/routerService";
import classNames from "classnames";
import styles from "@/components/betCard/BetCard.module.scss";

export default function BetCard({ bet }) {

  let dateFormated = "";

  if (bet.date) {
    dateFormated = new Date(bet.date).toLocaleDateString();
  }

  const viewOffer = () => {
    RouterService.goToBetDetail(bet._id)
  }

  return (
    <div className={classNames(styles["card"], {
      [styles["card--win"]]:
        bet.status === "win",
      [styles["card--void"]]:
        bet.status === "void",
      [styles["card--loss"]]:
        bet.status === "loss",
    })}>
      <p className={styles["card--date"]}>
        {dateFormated}
      </p>
      <h4>
        <strong>{bet.racecourse}</strong>
      </h4>
      <p className={styles["card--limit-lines"]}>
        <strong>{bet.betName}</strong>
      </p>
      <p>
        Stake:
        <strong> {bet.stake}</strong>
      </p>
      <p>
        Cuota:
        <strong> {bet.price}</strong>
      </p>
      <p>
        Ganancia:
        <strong className={classNames({
          "text-win":
            bet.status === "win",
          "text-void":
            bet.status === "void",
          "text-loss":
            bet.status === "loss",
        })}> {bet.profit.toFixed(2)} Uds</strong>
      </p>
      <p>
        Bookie:
        <strong> {bet.bookie}</strong>
      </p>
      <div className={styles["card--separator"]} />
      <div className={styles["card__btn-container"]} >
        <button className="card-btn" onClick={viewOffer}>Detalles</button>
      </div>
    </div>
  );
}

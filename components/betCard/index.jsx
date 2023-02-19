import RouterService from "@/lib/routerService";
import Link from "next/link";

export default function BetCard({ bet }) {
  let betstate = "";

  if (bet.status === "pending") {
    betstate = "card-p-pending";
  }
  if (bet.status === "win") {
    betstate = "card-p-win";
  }
  if (bet.status === "loss") {
    betstate = "card-p-loss";
  }
  if (bet.status === "void") {
    betstate = "card-p-void";
  }

  let dateFormated = "";

  if (bet.date) {
    dateFormated = new Date(bet.date).toLocaleDateString();
  }

  const viewOffer = () => {
    RouterService.goToBetDetail(bet._id)
  }

  return (
    <div>
      <h4>
        <strong>{bet.bookie}</strong>
      </h4>
      <p>
        <strong>{bet.racecourse}</strong>
      </p>
      <p>{bet.betName}</p>
      <p>
        <strong>Stake: </strong>
        {bet.stake}
      </p>
      <p>
        <strong>Cuota: </strong>
        {bet.price}
      </p>
      <p className={betstate}>
        <strong>Ganancia: </strong>
        {bet.profit.toFixed(2)} Uds
      </p>
      <p>
        <strong>{dateFormated}</strong>
      </p>
      <div>
        <button onClick={viewOffer}>Detalles</button>
      </div>
    </div>
  );
}

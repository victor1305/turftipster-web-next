import BetService from "@/lib/betService";
import BetCard from "@/components/betCard";

export default function Home({ lastBets }) {

  return (
    <div>
      <main className="main">
        <h1>SOMOS PRONOSTICADORES</h1>
        <div>
          <h4>Últimas apuestas:</h4>
          <div>
            {lastBets.map((elm, index) => (
              <BetCard 
                key={`card-${index + 1}`} 
                bet={elm} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const lastBets = await BetService.getHomeBets();

  const serverSideResponse = {
    props: { lastBets },
  };

  return serverSideResponse;
}

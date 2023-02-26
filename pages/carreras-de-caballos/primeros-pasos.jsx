import styles from "@/styles/pages/FirstStepsPage.module.scss"

export default function FirstSteps() {
  return (
    <div className={styles["first-steps-page"]}>
      <main className="main">
        <article>
          <h2>Lo que debes saber antes de empezar</h2>
          <p>
            Un altísimo porcentaje de las personas de nuestro grupo han llegado
            a nosotros sin saber nada de las carreras de caballos, venían de
            apostar a tenis, fútbol... Y si hay algo que es realmente importante
            recalcar, es que apostar a carreras de caballos no tiene nada que
            ver con ninguno de esos deportes. Aquí las variantes son mucho
            mayores (también lo son las rentabilidades). En un partido de futbol
            las opciones son 1/X/2 (salvo que entremos a mercados mas complejos)
            pero en las carreras de caballos no es raro encontrarse con partants
            de 8-12-16 caballos, y eso amplía mucho las opciones...
          </p>
          <p>
            Dicho esto, parece obvio deducir que no podemos jugar con la misma
            contundencia a un deporte como el tenis o el fútbol, que a carreras
            de caballos. ¿Cómo consigo esto? Fácil, primero de todo dejándote
            asesorar por la persona adecuada, y en segundo lugar, haciendo una
            adaptación correcta de la unidad. Es decir, si mi bank son 500€ no
            puedo tener una unidad de más de 10 o 20€ porque lo mas probable es
            que si viene una racha mala mi bank se quede a 0€.
          </p>
          <p>
            Otro de los puntos que más controversia suele generar entre los que
            empiezan a apostar a las carreras, es el "problema" de utilizar
            varias casas de apuestas. ¿Por qué es esto necesario? Muy sencillo,
            retomo el ejemplo del fútbol, un partido va a tener diferencias
            mínimas entre una bookie y otra, por lo cual con una bookie podemos
            realizar todo sin mayores complicaciones. Pero en las carreras
            podemos encontrarnos con que un caballo que esta a 5/1 en Sportium
            puede estar a 8/1 en William Hill, y ahí la diferencia si es
            notoria. No obstante, con Bet365 puedes seguir <b>todos</b> los
            picks del grupo.
          </p>
          <p>
            Como cierre de este apartado, me siento obligado a recordar que las
            apuestas pueden ser rentables, pero tambien peligrosas. Si quieres
            apostar lo primero que necesitas es dinero que puedas permitirte
            perder, porque puedes perderlo. Y lo siguiente, es ser responsable y
            prudente. En las apuestas se gana a medio/largo plazo, no te fíes de
            quien te prometa ganar mucho en dos días, porque lo más probable es
            que lo pierdas todo.
          </p>

          <div>
            <img src="/horsesStart.jpg" alt="Race Start" />
          </div>
        </article>
      </main>
    </div>
  );
}

import Router from "next/router";

export default class RouterService {
  static HOME_URL = "/"

  static HORSE_RACING_URL = "/carreras-de-caballos"

  static STATS_URL = "/stats"

  static WHO_ARE_US_URL = "/quienes-somos" 

  static FIRST_STEPS_URL = `${RouterService.HORSE_RACING_URL}/primeros-pasos`

  static BETS_TYPE_URL = `${RouterService.HORSE_RACING_URL}/tipos-apuestas`

  static TERMINOLOGY_URL = `${RouterService.HORSE_RACING_URL}/terminos`

  static goToHome() {
    Router.push(RouterService.HOME_URL)
  }

  static goToHorseRacing() {
    Router.push(RouterService.HORSE_RACING_URL)
  }

  static goToFirstSteps() {
    Router.push(RouterService.FIRST_STEPS_URL)
  }

  static goToBetsType() {
    Router.push(RouterService.BETS_TYPE_URL)
  }

  static goToTerminology() {
    Router.push(RouterService.TERMINOLOGY_URL)
  }

  static goToStats() {
    Router.push(RouterService.STATS_URL)
  }

  static goToWhoAreUs() {
    Router.push(RouterService.WHO_ARE_US_URL)
  }
}
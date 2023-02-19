export default class BetService {
  static async getHomeBets() {
    try {
      const res = await fetch(`${process.env.BASE_API_URL}/apuestas`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      return await res.json();
    } catch (error) {
      return error;
    }
  }

  static async getBetDetail(id) {
    try {
      const res = await fetch(`${process.env.BASE_API_URL}/apuestas/detalle-apuesta/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      const { data } = await res.json();

      return data;
    } catch (error) {
      return error;
    }
  }
}
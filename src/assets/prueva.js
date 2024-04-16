function fondo(){
    function obtenerHora() {
        function obtenerHoraActual() {
        const now = new Date();
        return now.getHours();
        }

        const utcMinutos = data.timezone;
        const utcHoras = utcMinutos / 3600;
        let hora_dia;
        if (utcHoras === -6) {
        hora_dia = obtenerHoraActual();
        } else {
        const now = new Date();
        now.setHours(now.getHours() + utcHoras);
        hora_dia = now.getHours();
        }

        return hora_dia;
    }
    let hora = obtenerHora()
    if (hora >= 5 && hora < 9) {
        periodo = "amanecer";
    } else if (hora >= 9 && hora < 18) {
        periodo = "dia";
    } else if (hora >= 18 && hora < 24) {
        periodo = "atardecer";
    } else {
        periodo = "noche";
    }
    return(periodo)
}
console.log(fondo())
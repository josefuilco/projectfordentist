const parseMonth = function (month: string) {
  let monthString = "";
  // Usamos casos para devolver los meses en cadenas
  switch (month) {
    case "Jan":
      monthString = "enero";
      break;
    case "Feb":
      monthString = "febrero";
      break;
    case "Mar":
      monthString = "marzo";
      break;
    case "Apr":
      monthString = "abril";
      break;
    case "May":
      monthString = "mayo";
      break;
    case "Jun":
      monthString = "junio";
      break;
    case "Jul":
      monthString = "julio";
      break;
    case "Aug":
      monthString = "agosto";
      break;
    case "Sep":
      monthString = "septiembre";
      break;
    case "Oct":
      monthString = "octubre";
      break;
    case "Nov":
      monthString = "noviembre";
      break;
    case "Dec":
      monthString = "diciembre";
      break;
    default:
      return "none";
  }
  // Retornamos el mes escrito en letras
  return monthString;
};

function dateToString(date: string) {
  let [_day, month, numDay, year] = date.toString().split(" ");
  return `${numDay} de ${parseMonth(month)} del ${year}.`;
}

export default dateToString;

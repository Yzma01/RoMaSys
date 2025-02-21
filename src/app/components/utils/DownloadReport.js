import html2canvas from "html2canvas";

export function downloadReport(Report) {
  const fecha = new Date();
  const dia = String(fecha.getDate()).padStart(2, "0");
  const mes = String(fecha.getMonth() + 1).padStart(2, "0");
  const año = fecha.getFullYear();

  console.log("sirvio o nel?");
  html2canvas(Report)
    .then((canvas) => {
      const url = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.setAttribute("download", `Report (${dia}-${mes}-${año}).png`);
      a.setAttribute("href", url);
      a.click();
    })
    .catch((err) => {
      console.log(
        "Error al descargar el reporte, contacte con soporte",
        err
      );
      return res.status(500).json({ message: "Error al generar el reporte" });
    });
}

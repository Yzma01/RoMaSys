import html2canvas from "html2canvas";

export function downloadReport(Report) {
  const date = new Date();
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  html2canvas(Report)
    .then((canvas) => {
      const url = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.setAttribute("download", `Report (${day}-${month}-${year}).png`);
      a.setAttribute("href", url);
      a.click();
    })
    .catch((err) => {
      console.log(
        "Error al descargar el reporte",
        err
      );
      return res.status(500).json({ message: "Error al generar el reporte, si el problema persiste contacte a soporte" });
    });
}

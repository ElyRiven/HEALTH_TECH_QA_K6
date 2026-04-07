export function generatePatientData() {
  const vuPart = String(__VU).padStart(4, "0");
  const iterPart = String(__ITER).padStart(6, "0");
  const identificacion = `${vuPart}${iterPart}`;

  return {
    identificacion: identificacion,
    nombres: `Nombre${__VU}`,
    apellidos: `Apellido${__ITER}`,
    fecha_de_nacimiento: "1990-05-15",
    genero: "masculino",
    estado: "En espera",
  };
}

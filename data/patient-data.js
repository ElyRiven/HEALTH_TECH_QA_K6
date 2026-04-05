const BASE_ID = Math.floor(Date.now() / 1000) % 10000;

export function generatePatientData() {
  const identificacion = BASE_ID * 100000 + __VU * 1000 + __ITER;

  return {
    identificacion: identificacion,
    nombres: `Nombre${__VU}`,
    apellidos: `Apellido${__ITER}`,
    fecha_de_nacimiento: "1990-05-15",
    genero: "masculino",
    estado: "En espera",
  };
}

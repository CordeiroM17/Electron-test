import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Intento {
  tiro: number;
  puntaje: number;
}

interface Disparo {
  blanco: number;
  intentos: Intento[];
}

interface Serie {
  serie_id: number;
  fecha: string;
  ronda: string;
  disparos: Disparo[];
  puntaje_total: number;
}

interface Participante {
  tirador_id: number;
  nombre: string;
  region: string;
  series: Serie[];
  puntaje_acumulado: number;
  posicion: string;
}

interface Torneo {
  nombre: string;
  ubicacion: string;
  fecha_inicio: string;
  fecha_final: string;
  participantes: Participante[];
}

const Welcome = () => {
  const [torneo, setTorneo] = useState<Torneo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/tournament")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch tournament data");
        }
        return response.json();
      })
      .then((data) => {
        setTorneo(data.torneo);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!torneo) return <div>No se encontraron datos del torneo.</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{torneo.nombre}</h1>
      <p className="mb-2">
        <strong>Ubicación:</strong> {torneo.ubicacion}
      </p>
      <p className="mb-2">
        <strong>Fecha de inicio:</strong> {torneo.fecha_inicio}
      </p>
      <p className="mb-4">
        <strong>Fecha final:</strong> {torneo.fecha_final}
      </p>

      <h2 className="text-2xl font-bold mb-2">Participantes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {torneo.participantes.map((participante) => (
          <div key={participante.tirador_id} className="border p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">
              {participante.nombre}
            </h3>
            <p>
              <strong>Región:</strong> {participante.region}
            </p>
            <p>
              <strong>Puntaje acumulado:</strong>{" "}
              {participante.puntaje_acumulado}
            </p>
            <p>
              <strong>Posición:</strong> {participante.posicion}
            </p>
            <Link
              to={`/shooter/${participante.tirador_id}`}
              className="text-blue-500 hover:underline"
            >
              Ver detalles
            </Link>
          </div>
        ))}
      </div>

      <Link
        to="/shooters"
        className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Go shooters
      </Link>
    </div>
  );
};

export default Welcome;

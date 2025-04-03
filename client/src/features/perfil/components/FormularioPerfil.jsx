import DefaultLayout from "@/layouts/default"; 
import { Button } from "@headlessui/react"; // Alternativa si @heroui/button no existe
import { Input } from "@radix-ui/react-input"; // Alternativa para Input
import { useState, useEffect } from "react";

export default function FormularioPerfil() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const query = search ? `?search=${encodeURIComponent(search)}` : "";
      const response = await fetch(`http://localhost:3000/api/users${query}`);

      if (!response.ok) {
        throw new Error(`Error al obtener usuarios: ${response.status}`);
      }

      const data = await response.json();
      setUsers(data);
    } catch (err) {
      console.error("Error al cargar usuarios:", err);
      setError("Error al cargar usuarios");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [search]);

  const deleteUser = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/users/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Error al borrar el usuario");
      }

      fetchUsers();
    } catch (err) {
      console.error("Error al borrar el usuario:", err);
      setError("No se pudo borrar el usuario");
    }
  };

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-5xl rounded-xl shadow-md p-6">
          <h1 className="text-3xl font-semibold text-center mb-6">
            Listado de Usuarios
          </h1>

          <div className="mb-4">
            <Input
              name="search"
              placeholder="Buscar por nombre..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {loading && <p>Cargando usuarios...</p>}
          {error && <p className="text-red-500">{error}</p>}

          {!loading && !error && (
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border px-4 py-2">ID</th>
                    <th className="border px-4 py-2">Nombre</th>
                    <th className="border px-4 py-2">Apellidos</th>
                    <th className="border px-4 py-2">Correo</th>
                    <th className="border px-4 py-2">Teléfono</th>
                    <th className="border px-4 py-2">Cédula</th>
                    <th className="border px-4 py-2">Rol</th>
                    <th className="border px-4 py-2">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length === 0 ? (
                    <tr>
                      <td className="border px-4 py-2 text-center" colSpan={8}>
                        No se encontraron usuarios.
                      </td>
                    </tr>
                  ) : (
                    users.map((user) => (
                      <tr key={user.id}>
                        <td className="border px-4 py-2">{user.id}</td>
                        <td className="border px-4 py-2">{user.nombre}</td>
                        <td className="border px-4 py-2">{user.apellidos}</td>
                        <td className="border px-4 py-2">{user.correo}</td>
                        <td className="border px-4 py-2">{user.telefono}</td>
                        <td className="border px-4 py-2">{user.cedula}</td>
                        <td className="border px-4 py-2">{user.rol}</td>
                        <td className="border px-4 py-2">
                          <Button
                            onClick={() => deleteUser(user.id)}
                            className="bg-red-500 text-white px-2 py-1 rounded"
                          >
                            Borrar
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </DefaultLayout>
  );
}
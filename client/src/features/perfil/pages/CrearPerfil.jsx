import React, { useState } from "react";
import { Button } from "@heroui/button";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { RadioGroup, Radio } from "@heroui/radio";

export default function CrearPerfil() {
  const [action, setAction] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));

    // Log para depuración: ver los datos enviados al backend
    console.log("Enviando datos:", data);

    try {
      // Hacer la solicitud a la API
      const res = await fetch("http://localhost:3000/api/create-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.statusText}`);
      }

      const json = await res.json();
      
      // Log para ver la respuesta del backend
      console.log("Respuesta de la API:", json);

      setAction(`submit ${JSON.stringify(json)}`);
    } catch (error) {
      // Log para ver el error si algo sale mal
      console.error("Error al enviar el perfil:", error);
      setAction(`Error: ${error.message}`);
    }
  };

  return (
    <section className="flex flex-col items-center justify-center mt-20">
      <div className="w-full max-w-2xl rounded-xl shadow-md p-4">
        <h1 className="text-3xl font-semibold text-center mb-2">Crear Perfil</h1>
        <p className="text-center text-gray-600 mb-6">
          Complete el formulario para crear un perfil de usuario
        </p>

        <Form
          className="w-full flex flex-col gap-6"
          onReset={() => setAction("reset")}
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-3 grid-rows-2 gap-4">
            <Input isRequired name="nombre" label="Nombre" placeholder="Ingresar nombres" type="text" />
            <Input isRequired name="apellidos" label="Apellidos" placeholder="Ingresar apellidos" type="text" className="col-span-2" />
            <Input isRequired name="correo" label="Correo" placeholder="Ingresar correo" type="email" className="row-span-2" />
            <Input isRequired name="telefono" label="Teléfono" placeholder="Ingresar teléfono" type="number" className="row-span-2" />
            <Input isRequired name="cedula" label="Cédula" placeholder="Ingresar cédula" type="text" className="row-span-2" />
          </div>

          <div>
            <label className="font-medium text-sm mb-2 block">Rol</label>
            <RadioGroup name="rol" className="flex flex-col gap-2">
              <Radio value="mecanico">Mecánico</Radio>
              <Radio value="cliente">Cliente</Radio>
              <Radio value="gerente">Gerente</Radio>
              <Radio value="director">Director</Radio>
              <Radio value="financiero">Sector Financiero</Radio>
            </RadioGroup>
          </div>

          <div className="flex flex-row gap-4 mt-6">
            <Button color="primary" type="submit">
              Crear perfil
            </Button>
            <Button type="reset" variant="flat">
              Limpiar
            </Button>
          </div>

          {action && (
            <div className="text-sm text-gray-500 text-center mt-4">
              Acción: <code className="px-2 py-1 rounded">{action}</code>
            </div>
          )}
        </Form>
      </div>
    </section>
  );
}





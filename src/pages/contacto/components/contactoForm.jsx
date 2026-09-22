
import { useForm, Controller } from "react-hook-form";
import Swal from "sweetalert2";
import FormInput from "./FormImput";
import FormFile from "./FormFile";
import FormSelect from "./Formselect";
import FormTextArea from "./FormTextArea";

function ContactoForm() {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      primerNombre: "",
      segundoNombre: "",
      primerApellido: "",
      segundoApellido: "",
      genero: "",
      pais: "",
      ciudad: "",
      correo: "",
      telefono: "",
      mensaje: "",
      archivo: [],
    },
  });

  // Enviar formulario
  const onSubmit = async (data) => {
    console.log("Datos del formulario:", data);
    
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            if (key === "archivo") {
                value.forEach((file) => formData.append("archivo", file));
            } else {
                formData.append(key, value);
            }
        });
        try {
            const response = await fetch(import.meta.env.VITE_FORMSPREE_ENDPOINT, {
                method: "POST",
                body: formData,
                headers: { Accept: "application/json" },
            });
            if (response.ok) {
                console.log("Datos del formulario:", data);


                Swal.fire({
                    icon: "success",
                    title: "¡Mensaje enviado!",
                    text: "Tu mensaje fue enviado correctamente",
                    confirmButtonColor: "#0ea5e9",
                });
                reset();
            } else {
                // Formspree responde con { errors: [{ message: "..." }, ...] } si algo falla
                const resultado = await response.json();
                const mensajeError = resultado.errors
                    ? resultado.errors.map((e) => e.message).join(", ")
                    : "Ocurrió un error al enviar el formulario";


                Swal.fire({
                    icon: "error",
                    title: "No se pudo enviar",
                    text: mensajeError,
                    confirmButtonColor: "#0ea5e9",
                });
            }
        } catch (error) {
            console.error("Error de red al enviar el formulario:", error);


            Swal.fire({
                icon: "error",
                title: "No se pudo enviar",
                text: "Revisa tu conexión a internet e intenta de nuevo.",
                confirmButtonColor: "#0ea5e9",
            });
        };
};

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-8 rounded-xl shadow-md"
    >
      {/* Datos personales */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Primer Nombre */}
        <FormInput
          label="Primer Nombre"
          placeholder="Escribe tu primer nombre"
          required
          error={errors.primerNombre?.message}
          {...register("primerNombre", {
            required: "El primer nombre es obligatorio",
          })}
        />

        {/* Segundo Nombre */}
        <FormInput
          label="Segundo Nombre"
          placeholder="Escribe tu segundo nombre"
          error={errors.segundoNombre?.message}
          {...register("segundoNombre")}
        />

        {/* Primer Apellido */}
        <FormInput
          label="Primer Apellido"
          placeholder="Escribe tu primer apellido"
          required
          error={errors.primerApellido?.message}
          {...register("primerApellido", {
            required: "El primer apellido es obligatorio",
          })}
        />

        {/* Segundo Apellido */}
        <FormInput
          label="Segundo Apellido"
          placeholder="Escribe tu segundo apellido"
          error={errors.segundoApellido?.message}
          {...register("segundoApellido")}
        />

        {/* Género */}
        <FormSelect
          label="Género"
          required
          options={[
            "Femenino",
            "Masculino",
            "Otro",
          ]}
          error={errors.genero?.message}
          {...register("genero", {
            required: "El género es obligatorio",
          })}
        />

        {/* País */}
        <FormSelect
          label="País"
          required
          options={[
            "Colombia",
            "Argentina",
            "Chile",
            "México",
            "Perú",
          ]}
          error={errors.pais?.message}
          {...register("pais", {
            required: "El país es obligatorio",
          })}
        />

        {/* Ciudad */}
        <FormSelect
          label="Ciudad"
          required
          options={[
            "Medellín",
            "Girardota",
            "Copacabana",
            "Bogotá",
            "Cali",
            "Otro",
          ]}
          error={errors.ciudad?.message}
          {...register("ciudad", {
            required: "La ciudad es obligatoria",
          })}
        />

        {/* Correo */}
        <FormInput
          label="Correo"
          required
          type="email"
          placeholder="ejemplo@correo.com"
          error={errors.correo?.message}
          {...register("correo", {
            required: "El correo es obligatorio",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Ingresa un correo válido",
            },
          })}
        />

        {/* Teléfono */}
        <FormInput
          label="Teléfono"
          required
          type="tel"
          placeholder="300 000 0000"
          error={errors.telefono?.message}
          {...register("telefono", {
            required: "El teléfono debe ser obligatorio",
            pattern: {
              value: /^[0-9]{10}$/,
              message: "El teléfono debe tener 10 números",
            },
          })}
        />
      </div>

      {/* Mensaje */}
      <div className="mt-6">
        <FormTextArea
          label="Mensaje"
          required
          placeholder="Escribe tu mensaje"
          error={errors.mensaje?.message}
          {...register("mensaje", {
            required: "El mensaje es obligatorio",
          })}
        />
      </div>

      {/* Archivos */}
      <div className="mt-6">
        <Controller
          name="archivo"
          control={control}
          render={({ field }) => (
            <FormFile
              label="Adjuntar archivos"
              name="archivo"
              required={false}
              maxFiles={3}
              maxSizeMB={2}
              accept={{
                "application/pdf": [".pdf"],
                "image/png": [".png"],
                "image/jpeg": [".jpg", ".jpeg"],
                "video/*": [],
              }}
              onFilesChange={field.onChange}
              error={errors.archivo?.message}
            />
          )}
        />
      </div>

      {/* Botón */}
      <div className="mt-8 flex justify-center">
        <button
          type="submit"
          className="bg-sky-500 hover:bg-sky-600 text-white font-semibold px-8 py-3 rounded-lg transition"
        >
          Enviar mensaje
        </button>
      </div>
    </form>
  );
}

export default ContactoForm;
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";


import monito from "../components/layaout/img/monito.jpg";
function Login({ cerrar, onLogin }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    if (!data.email || !data.password) {
      Swal.fire({
        icon: "error",
        title: "Completa los datos",
        text: "Debes ingresar correo y contraseña.",
        confirmButtonColor: "#fb923c",
      });
      return;
    }

    onLogin({
      email: data.email,
      nombre: data.email.split("@")[0],
      
    });

    Swal.fire({
      icon: "success",
      title: "¡Bienvenido!",
      text: "Has ingresado correctamente.",
      confirmButtonColor: "#fb923c",
    });

    cerrar();
  };

  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-2xl border border-orange-500/30 bg-[#1f2937] p-6 text-white shadow-2xl">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-2xl font-black text-orange-300">Iniciar sesión</h2>
          <button
            type="button"
            onClick={cerrar}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 text-lg text-slate-400 hover:bg-slate-700 hover:text-white cursor-pointer"
            aria-label="Cerrar login"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-300">
              Correo electrónico
            </label>
            <input
              type="email"
              {...register("email", {
                required: "El correo es obligatorio",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Ingresa un correo válido",
                },
              })}
              className="w-full rounded-xl border border-slate-700 bg-slate-900/80 px-3 py-2.5 text-white placeholder-slate-500 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20"
              placeholder="tucorreo@ejemplo.com"
            />
            {errors.email && (
              <p className="mt-1 text-xs text-rose-400">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-300">
              Contraseña
            </label>
            <input
              type="password"
              {...register("password", {
                required: "La contraseña es obligatoria",
                minLength: {
                  value: 6,
                  message: "La contraseña debe tener mínimo 6 caracteres",
                },
              })}
              className="w-full rounded-xl border border-slate-700 bg-slate-900/80 px-3 py-2.5 text-white placeholder-slate-500 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20"
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="mt-1 text-xs text-rose-400">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-orange-400 px-4 py-3 font-bold text-slate-950 transition hover:bg-orange-300 active:scale-[0.99] cursor-pointer shadow-lg shadow-orange-500/20"
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}

export default Login;
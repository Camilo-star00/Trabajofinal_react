import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import "./Login.css";

function Login({ cerrar, onLogin }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Valida el formulario y luego envía el usuario al contexto global de autenticación.
  const onSubmit = (data) => {
    if (!data.email || !data.password) {
      Swal.fire({
        icon: 'error',
        title: 'Completa los datos',
        text: 'Debes ingresar correo y contraseña.',
      });
      return;
    }

    onLogin({ email: data.email });
    Swal.fire({
      icon: 'success',
      title: '¡Bienvenido!',
      text: 'Has ingresado correctamente.',
      confirmButtonColor: '#0ea5e9',
    });
    cerrar();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">Iniciar sesión</h2>
          <button
            type="button"
            onClick={cerrar}
            className="rounded-full bg-slate-100 px-2.5 py-1 text-lg text-slate-600 hover:bg-slate-200"
            aria-label="Cerrar login"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Correo electrónico</label>
            <input
              type="email"
              {...register('email', {
                required: 'El correo es obligatorio',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Ingresa un correo válido',
                },
              })}
              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
              placeholder="tucorreo@ejemplo.com"
            />
            {errors.email && <p className="mt-1 text-xs text-rose-500">{errors.email.message}</p>}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Contraseña</label>
            <input
              type="password"
              {...register('password', {
                required: 'La contraseña es obligatoria',
                minLength: {
                  value: 6,
                  message: 'La contraseña debe tener mínimo 6 caracteres',
                },
              })}
              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
              placeholder="••••••••"
            />
            {errors.password && <p className="mt-1 text-xs text-rose-500">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-slate-900 px-4 py-3 font-semibold text-white transition hover:bg-cyan-600"
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
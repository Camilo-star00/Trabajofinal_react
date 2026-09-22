import { useDropzone } from "react-dropzone";
import { useState, useEffect } from "react";

function FormFile({
  label,
  name,
  required = false,
  error = "",
  accept,
  maxFiles = 5,
  onFilesChange
}) {
  const [archivos, setArchivos] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [mensajeEliminado, setMensajeEliminado] = useState("");

  const limiteAlcanzado = archivos.length >= maxFiles;
  const espacioDisponible = maxFiles - archivos.length;

  const onDrop = (acceptedFiles) => {
    setErrorMsg("");
    if (archivos.length + acceptedFiles.length > maxFiles) {
      setErrorMsg(`Solo puedes subir un máximo de ${maxFiles} archivos.`);
      return;
    }

    const nuevosArchivos = acceptedFiles.map((file) => ({
      id: `${file.name}-${Date.now()}`,
      file,
      preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : null
    }));

    const listaActualizada = [...archivos, ...nuevosArchivos];
    setArchivos(listaActualizada);
    if (onFilesChange) onFilesChange(listaActualizada);
  };

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept,
    disabled: limiteAlcanzado,
    noClick: true
  });

  const eliminarArchivo = (id) => {
    const archivoAEliminar = archivos.find((item) => item.id === id);
    if (archivoAEliminar?.preview) {
      URL.revokeObjectURL(archivoAEliminar.preview);
    }

    const listaActualizada = archivos.filter((item) => item.id !== id);
    setArchivos(listaActualizada);
    if (onFilesChange) onFilesChange(listaActualizada);

    setMensajeEliminado(`Se eliminó "${archivoAEliminar?.file.name || "el archivo"}"`);
    setTimeout(() => setMensajeEliminado(""), 3000);
  };

  useEffect(() => {
    return () => {
      archivos.forEach((item) => {
        if (item.preview) URL.revokeObjectURL(item.preview);
      });
    };
  }, [archivos]);

  return (
    <div className="space-y-3">
      {/* Label */}
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-slate-700 dark:text-slate-200">
          {label}
          {required && <span className="text-rose-500"> *</span>}
        </label>
      )}

      {/* Zona Dropzone */}
      <div
        {...getRootProps()}
        className={`mt-2 rounded-md p-4 text-center border-2 transition ${
          isDragActive
            ? "border-cyan-400 bg-cyan-50/60 dark:bg-cyan-900/30"
            : "border-dashed border-slate-300 dark:border-slate-700 bg-white/50 dark:bg-slate-900/60"
        } ${limiteAlcanzado ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
      >
        <input {...getInputProps({ required: required && archivos.length === 0 })} id={name} name={name} />

        {limiteAlcanzado ? (
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Ya alcanzaste el máximo de {maxFiles} archivos.
          </p>
        ) : (
          <>
            <button
              type="button"
              onClick={open}
              className="inline-block px-4 py-2 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-300 dark:border-slate-600 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 text-sm font-medium transition cursor-pointer"
            >
              📎 Agregar archivo
            </button>

            <div className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              {isDragActive
                ? "Suelta los archivos aquí..."
                : 'Arrastra tus archivos aquí o haz clic en "Agregar archivo".'}
            </div>

            <small className="text-xs text-slate-500 dark:text-slate-400">
              Puedes subir hasta {espacioDisponible} archivo{espacioDisponible > 1 ? "s" : ""}.
            </small>
          </>
        )}
      </div>

      {/* Mensajes de Estado */}
      {errorMsg && <p className="text-sm text-rose-600 dark:text-rose-400">{errorMsg}</p>}
      {error && <p className="text-sm text-rose-600 dark:text-rose-400">{error}</p>}
      {mensajeEliminado && <p className="text-sm text-emerald-600 dark:text-emerald-400">✅ {mensajeEliminado}</p>}

      {/* Lista de archivos */}
      {archivos.length > 0 && (
        <div className="mt-3 space-y-2">
          {archivos.map(({ id, file, preview }) => (
            <div
              key={id}
              className="flex items-center gap-3 p-3 border border-slate-200 dark:border-slate-800 rounded-md bg-white/50 dark:bg-slate-900/60"
            >
              {preview ? (
                <div className="w-16 h-16 shrink-0 rounded-md overflow-hidden flex items-center justify-center bg-slate-100 dark:bg-slate-800">
                  <img src={preview} alt={`Vista previa de ${file.name}`} className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-12 h-12 shrink-0 flex items-center justify-center text-2xl bg-slate-100 dark:bg-slate-800 rounded-md">
                  📄
                </div>
              )}

              <div className="flex-1 text-sm text-slate-700 dark:text-slate-200 space-y-0.5 overflow-hidden">
                <strong className="block truncate">{file.name}</strong>
                <span className="block text-xs text-slate-500 dark:text-slate-400">
                  Tipo: {file.type || "Desconocido"}
                </span>
                <span className="block text-xs text-slate-500 dark:text-slate-400">
                  Tamaño: {(file.size / 1024).toFixed(2)} KB
                </span>
                <span className="block text-xs text-slate-500 dark:text-slate-400">
                  Modificado: {new Date(file.lastModified).toLocaleDateString()}
                </span>
              </div>

              <button
                type="button"
                onClick={() => eliminarArchivo(id)}
                aria-label={`Eliminar ${file.name}`}
                className="ml-2 text-rose-600 hover:text-rose-700 p-1 rounded-md transition cursor-pointer"
              >
                🗑️
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Contador */}
      <p className="text-xs text-slate-500 dark:text-slate-400">
        {archivos.length} de {maxFiles} archivos
      </p>
    </div>
  );
}

export default FormFile;
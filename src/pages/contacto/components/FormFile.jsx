import { useDropzone } from "react-dropzone";
import { useState, useEffect } from "react";
import "./FormFile.css";

function FormFile({
  label,
  name,
  required = false,
  error = "",
  accept = {
    "application/pdf": [".pdf"],
  },
  maxSizeMB = 2,
  maxFiles = 3,
  onFilesChange = () => {},
}) {
  const [archivos, setArchivos] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [mensajeEliminado, setMensajeEliminado] = useState("");

  const espacioDisponible = maxFiles - archivos.length;
  const limiteAlcanzado = espacioDisponible <= 0;

  // Generar un ID único para cada archivo
  const generarId = (file) => {
    return `${file.name}-${file.lastModified}-${file.size}`;
  };

  // Cuando se agregan archivos
  const onDrop = (acceptedFiles, fileRejections) => {
    setErrorMsg("");

    // Mostrar errores de archivos rechazados
    if (fileRejections.length > 0) {
      const rechazados = fileRejections.map(
        ({ file, errors }) =>
          `${file.name}: ${errors
            .map((error) => error.message)
            .join(", ")}`
      );

      setErrorMsg(rechazados.join(" | "));
    }

    // Verificar si ya se alcanzó el máximo
    if (espacioDisponible <= 0) {
      setErrorMsg(
        `Ya alcanzaste el máximo de ${maxFiles} archivos`
      );
      return;
    }

    // Tomar únicamente los archivos que caben
    const archivosDisponibles = acceptedFiles.slice(
      0,
      espacioDisponible
    );

    // Crear estructura de los nuevos archivos
    const nuevosArchivos = archivosDisponibles.map((file) => ({
      id: generarId(file),
      file,
      preview: file.type.startsWith("image/")
        ? URL.createObjectURL(file)
        : null,
    }));

    // Agregar los archivos
    setArchivos((anteriores) => [
      ...anteriores,
      ...nuevosArchivos,
    ]);

    // Avisar al formulario padre
    onFilesChange([
      ...archivos.map((archivo) => archivo.file),
      ...archivosDisponibles,
    ]);

    // Avisar si se intentaron agregar demasiados
    if (acceptedFiles.length > espacioDisponible) {
      setErrorMsg(
        `Solo puedes agregar ${espacioDisponible} archivo${
          espacioDisponible > 1 ? "s" : ""
        }. El máximo es de ${maxFiles}.`
      );
    }
  };

  // Eliminar archivo
  const eliminarArchivo = (id) => {
    setArchivos((anteriores) => {
      const archivoAEliminar = anteriores.find(
        (archivo) => archivo.id === id
      );

      // Eliminar vista previa
      if (archivoAEliminar?.preview) {
        URL.revokeObjectURL(archivoAEliminar.preview);
      }

      // Mostrar mensaje
      if (archivoAEliminar) {
        setMensajeEliminado(
          `Archivo "${archivoAEliminar.file.name}" eliminado`
        );
      }

      const nuevosArchivos = anteriores.filter(
        (archivo) => archivo.id !== id
      );

      // Avisar al formulario padre
      onFilesChange(
        nuevosArchivos.map((archivo) => archivo.file)
      );

      return nuevosArchivos;
    });
  };

  // Ocultar mensaje después de 3 segundos
  useEffect(() => {
    if (!mensajeEliminado) return;

    const temporizador = setTimeout(() => {
      setMensajeEliminado("");
    }, 3000);

    return () => clearTimeout(temporizador);
  }, [mensajeEliminado]);

  // Limpieza de las vistas previas
  useEffect(() => {
    return () => {
      archivos.forEach((archivo) => {
        if (archivo.preview) {
          URL.revokeObjectURL(archivo.preview);
        }
      });
    };
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    open,
  } = useDropzone({
    onDrop,
    accept,
    multiple: true,
    maxFiles,
    maxSize: maxSizeMB * 1024 * 1024,
    disabled: limiteAlcanzado,
    noClick: true,
  });

  return (
    <div className="form-file">

      {/* Label */}
      <label
        htmlFor={name}
        className="form-file__label"
      >
        {label}
        {required && <span> *</span>}
      </label>

      {/* Zona para arrastrar archivos */}
      <div
        {...getRootProps()}
        className={`form-file__dropzone ${
          isDragActive
            ? "form-file__dropzone--active"
            : ""
        } ${
          limiteAlcanzado
            ? "form-file__dropzone--disabled"
            : ""
        }`}
      >
        <input
          {...getInputProps({
            required:
              required && archivos.length === 0,
          })}
          id={name}
          name={name}
        />

        {limiteAlcanzado ? (
          <p>
            Ya alcanzaste el máximo de {maxFiles} archivos.
          </p>
        ) : (
          <>
            {/* Botón visible */}
            <button
              type="button"
              className="form-file__add"
              onClick={open}
            >
              📎 Agregar archivo
            </button>

            {isDragActive ? (
              <p>
                Suelta los archivos aquí...
              </p>
            ) : (
              <p>
                Arrastra tus archivos aquí o haz clic en
                "Agregar archivo".
              </p>
            )}

            <small>
              Puedes subir hasta {espacioDisponible} archivo
              {espacioDisponible > 1 ? "s" : ""}.
            </small>
          </>
        )}
      </div>

      {/* Error interno */}
      {errorMsg && (
        <p className="form-file__error">
          {errorMsg}
        </p>
      )}

      {/* Error externo */}
      {error && (
        <p className="form-file__error">
          {error}
        </p>
      )}

      {/* Mensaje de archivo eliminado */}
      {mensajeEliminado && (
        <p className="form-file__success">
          ✅ {mensajeEliminado}
        </p>
      )}

      {/* Lista de archivos */}
      {archivos.length > 0 && (
        <div className="form-file__list">
          {archivos.map(({ id, file, preview }) => (
            <div
              className="form-file__item"
              key={id}
            >

              {/* Vista previa */}
              {preview ? (
                <div className="form-file__preview">
                  <img
                    src={preview}
                    alt={`Vista previa de ${file.name}`}
                  />
                </div>
              ) : (
                <div className="form-file__icon">
                  📄
                </div>
              )}

              {/* Información */}
              <div className="form-file__info">
                <strong>{file.name}</strong>

                <span>
                  Tipo: {file.type || "Desconocido"}
                </span>

                <span>
                  Tamaño:{" "}
                  {(file.size / 1024).toFixed(2)} KB
                </span>

                <span>
                  Modificado:{" "}
                  {new Date(
                    file.lastModified
                  ).toLocaleDateString()}
                </span>
              </div>

              {/* Botón eliminar */}
              <button
                type="button"
                className="form-file__delete"
                onClick={() =>
                  eliminarArchivo(id)
                }
                aria-label={`Eliminar ${file.name}`}
              >
                🗑️
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Contador */}
      <p className="form-file__counter">
        {archivos.length} de {maxFiles} archivos
      </p>
    </div>
  );
}

export default FormFile;
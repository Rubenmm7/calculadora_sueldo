"use client";

import { useMemo, useState } from "react";

type NumeroPagas = 12 | 14;
type EstadoCivil = "soltero" | "casado" | "con_hijos";
type ComunidadAutonoma = 
  | "andalucia" | "aragon" | "asturias" | "baleares" | "canarias" 
  | "cantabria" | "castilla_la_mancha" | "castilla_leon" | "cataluna" 
  | "comunidad_valenciana" | "extremadura" | "galicia" | "madrid" 
  | "murcia" | "navarra" | "pais_vasco" | "rioja" | "ceuta" | "melilla";

const BASE_MAXIMA_SS_MENSUAL = 4909.5;

const MINIMO_PERSONAL_POR_ESTADO: Record<EstadoCivil, number> = {
  soltero: 5550,
  casado: 6000,
  con_hijos: 7000,
};

// Componentes de la Seguridad Social del trabajador
const COMPONENTES_SS = {
  desempleo: 0.0155,
  contingenciasComunes: 0.047,
  formacionProfesional: 0.006,
  accidentesTrabajo: 0.0000,
};

const TOTAL_SS_TRABAJADOR = 
  COMPONENTES_SS.desempleo + 
  COMPONENTES_SS.contingenciasComunes + 
  COMPONENTES_SS.formacionProfesional + 
  COMPONENTES_SS.accidentesTrabajo;

// Retenciones IRPF por estado civil (porcentaje)
const RETENCIONES_IRPF: Record<EstadoCivil, number> = {
  soltero: 0.15,
  casado: 0.10,
  con_hijos: 0.05,
};

const TRAMOS_IRPF: { hasta: number; tipo: number }[] = [
  { hasta: 12450, tipo: 0.19 },
  { hasta: 20200, tipo: 0.24 },
  { hasta: 35200, tipo: 0.3 },
  { hasta: 60000, tipo: 0.37 },
  { hasta: 300000, tipo: 0.45 },
  { hasta: Infinity, tipo: 0.47 },
];

function reduccionRendimientosTrabajo(rendimientoNeto: number): number {
  const reduccionGeneral = 2000;
  let adicional = 0;

  if (rendimientoNeto <= 14847.99) {
    adicional = 7302;
  } else if (rendimientoNeto < 17673.99) {
    adicional = 7302 - 1.75 * (rendimientoNeto - 14847.99);
  }

  return Math.min(rendimientoNeto, reduccionGeneral + Math.max(0, adicional));
}

function cuotaIrpf(baseLiquidable: number): number {
  if (baseLiquidable <= 0) return 0;

  let restante = baseLiquidable;
  let anterior = 0;
  let cuota = 0;

  for (const tramo of TRAMOS_IRPF) {
    const amplitud = tramo.hasta - anterior;
    const gravado = Math.min(restante, amplitud);
    cuota += gravado * tramo.tipo;
    restante -= gravado;
    anterior = tramo.hasta;
    if (restante <= 0) break;
  }

  return cuota;
}

interface ResultadoNomina {
  brutoMensual: number;
  brutoAnual: number;
  complementosAnual: number;
  totalIngresoAnual: number;
  netoMensual: number;
  netoAnual: number;
  irpfAnual: number;
  irpfMensual: number;
  ssAnual: number;
  ssMensual: number;
  ssDesempleo: number;
  ssContingencias: number;
  ssFormacion: number;
  ssAccidentes: number;
  tipoIrpfEfectivo: number;
  tipoRetencionIrpf: number;
  totalDeducciones: number;
}

function calcularNomina(
  brutoAnual: number,
  pagas: NumeroPagas,
  tipoSS: number,
  minimoPer: number,
  complementos: number,
  tienePagasExtra: boolean,
): ResultadoNomina {
  const brutoMensual = brutoAnual / 12;
  const baseSsMensual = Math.min(brutoMensual, BASE_MAXIMA_SS_MENSUAL);
  
  // Desglose de componentes de SS
  const ssDesempleo = baseSsMensual * COMPONENTES_SS.desempleo * 12;
  const ssContingencias = baseSsMensual * COMPONENTES_SS.contingenciasComunes * 12;
  const ssFormacion = baseSsMensual * COMPONENTES_SS.formacionProfesional * 12;
  const ssAccidentes = baseSsMensual * COMPONENTES_SS.accidentesTrabajo * 12;
  const ssAnual = ssDesempleo + ssContingencias + ssFormacion + ssAccidentes;
  
  const totalIngresoAnual = brutoAnual + complementos;
  const rendimientoNeto = Math.max(0, totalIngresoAnual - ssAnual);
  const reduccion = reduccionRendimientosTrabajo(rendimientoNeto);
  const baseImponible = Math.max(0, rendimientoNeto - reduccion);
  const baseLiquidable = Math.max(0, baseImponible - minimoPer);
  const irpfAnual = cuotaIrpf(baseLiquidable);
  const netoAnual = totalIngresoAnual - ssAnual - irpfAnual;
  const totalDeducciones = ssAnual + irpfAnual;

  return {
    brutoMensual,
    brutoAnual,
    complementosAnual: complementos,
    totalIngresoAnual,
    netoMensual: netoAnual / pagas,
    netoAnual,
    irpfAnual,
    irpfMensual: irpfAnual / pagas,
    ssAnual,
    ssMensual: ssAnual / pagas,
    ssDesempleo,
    ssContingencias,
    ssFormacion,
    ssAccidentes,
    tipoIrpfEfectivo: totalIngresoAnual > 0 ? (irpfAnual / totalIngresoAnual) * 100 : 0,
    tipoRetencionIrpf: RETENCIONES_IRPF["soltero"] * 100,
    totalDeducciones,
  };
}

function formatEur(valor: number): string {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
  }).format(valor);
}

function Tooltip({ text }: { text: string }) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative inline-flex">
      <button
        type="button"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onClick={() => setShow(!show)}
        className="ml-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-zinc-300 text-xs font-bold text-zinc-700 hover:bg-zinc-400 dark:bg-zinc-600 dark:text-zinc-200 dark:hover:bg-zinc-500"
        aria-label="Información"
      >
        ?
      </button>
      {show && (
        <div className="absolute bottom-full left-1/2 mb-2 w-48 -translate-x-1/2 transform rounded-lg bg-zinc-900 px-3 py-2 text-xs text-white shadow-lg dark:bg-zinc-100 dark:text-zinc-900 z-50">
          {text}
          <div className="absolute bottom-0 left-1/2 -mb-1 h-2 w-2 -translate-x-1/2 transform rotate-45 bg-zinc-900 dark:bg-zinc-100"></div>
        </div>
      )}
    </div>
  );
}

export default function Calculadora() {
  const [brutoInput, setBrutoInput] = useState("30000");
  const [pagas, setPagas] = useState<NumeroPagas>(14);
  const [estadoCivil, setEstadoCivil] = useState<EstadoCivil>("soltero");
  const [tipoSS, setTipoSS] = useState(TOTAL_SS_TRABAJADOR);
  const [customMinimo, setCustomMinimo] = useState("");
  const [bonusAnual, setBonusAnual] = useState("0");
  const [incentivos, setIncentivos] = useState("0");
  const [horasExtras, setHorasExtras] = useState("0");
  const [gratificaciones, setGratificaciones] = useState("0");
  const [tienePagasExtra, setTienePagasExtra] = useState(false);
  const [comunidad, setComunidad] = useState<ComunidadAutonoma>("madrid");

  const brutoAnual =
    brutoInput === "" ? 0 : Math.max(0, Number(brutoInput) || 0);

  const complementos =
    Math.max(0, Number(bonusAnual) || 0) +
    Math.max(0, Number(incentivos) || 0) +
    Math.max(0, Number(horasExtras) || 0) +
    Math.max(0, Number(gratificaciones) || 0);

  const minimoPersonal =
    customMinimo === ""
      ? MINIMO_PERSONAL_POR_ESTADO[estadoCivil]
      : Math.max(0, Number(customMinimo) || 0);

  const resultado = useMemo(
    () => calcularNomina(brutoAnual, pagas, tipoSS, minimoPersonal, complementos, tienePagasExtra),
    [brutoAnual, pagas, tipoSS, minimoPersonal, complementos, tienePagasExtra],
  );

  const obtenerContenidoExportacion = () => {
    return `CALCULADORA DE SUELDO BRUTO A NETO
Fecha: ${new Date().toLocaleDateString("es-ES")}
Comunidad Autónoma: ${comunidad.replace(/_/g, " ")}

=== INGRESOS ===
Salario Bruto Anual: ${formatEur(resultado.brutoAnual)}
${complementos > 0 ? `Complementos Salariales: ${formatEur(complementos)}
  - Bonus Anual: ${formatEur(Math.max(0, Number(bonusAnual) || 0))}
  - Incentivos/Comisiones: ${formatEur(Math.max(0, Number(incentivos) || 0))}
  - Horas Extras: ${formatEur(Math.max(0, Number(horasExtras) || 0))}
  - Gratificaciones: ${formatEur(Math.max(0, Number(gratificaciones) || 0))}` : ""}
Total Ingresos: ${formatEur(resultado.totalIngresoAnual)}

=== DEDUCCIONES ===
Seguridad Social:
  - Desempleo (1.55%): ${formatEur(resultado.ssDesempleo / 12)} / mes (${formatEur(resultado.ssDesempleo)} / año)
  - Contingencias Comunes (4.70%): ${formatEur(resultado.ssContingencias / 12)} / mes (${formatEur(resultado.ssContingencias)} / año)
  - Formación Profesional (0.60%): ${formatEur(resultado.ssFormacion / 12)} / mes (${formatEur(resultado.ssFormacion)} / año)
  - Accidentes de Trabajo: ${formatEur(resultado.ssAccidentes / 12)} / mes (${formatEur(resultado.ssAccidentes)} / año)
Total SS: ${formatEur(resultado.ssMensual)} / mes (${formatEur(resultado.ssAnual)} / año)

IRPF (${resultado.tipoIrpfEfectivo.toFixed(2)}% efectivo):
${formatEur(resultado.irpfMensual)} / mes (${formatEur(resultado.irpfAnual)} / año)

=== NETO ===
Neto Mensual: ${formatEur(resultado.netoMensual)}
Neto Anual: ${formatEur(resultado.netoAnual)}`;
  };

  const exportarTXT = () => {
    const contenido = obtenerContenidoExportacion();
    const element = document.createElement("a");
    element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(contenido));
    element.setAttribute("download", `calculadora_sueldo_${new Date().toISOString().split("T")[0]}.txt`);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const exportarPDF = () => {
    const contenido = obtenerContenidoExportacion();
    
    // Crear un elemento HTML invisible para imprimir
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Calculadora de Sueldo</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 20px;
            line-height: 1.6;
            color: #333;
          }
          h1 {
            color: #1f2937;
            border-bottom: 2px solid #1f2937;
            padding-bottom: 10px;
            font-size: 24px;
          }
          h2 {
            color: #374151;
            margin-top: 20px;
            font-size: 16px;
            font-weight: bold;
          }
          .section {
            margin-bottom: 20px;
            page-break-inside: avoid;
          }
          .row {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px solid #e5e7eb;
          }
          .row-total {
            font-weight: bold;
            background-color: #f3f4f6;
            padding: 10px 8px;
          }
          .label {
            flex: 1;
          }
          .value {
            text-align: right;
            font-weight: 500;
          }
          .meta {
            color: #6b7280;
            font-size: 12px;
            margin-top: 10px;
          }
        </style>
      </head>
      <body>
        <h1>Calculadora de Sueldo Bruto a Neto</h1>
        <div class="meta">${contenido.split('\n').slice(0, 2).join('<br>')}</div>
        
        <div class="section">
          ${contenido
            .split('\n')
            .slice(3)
            .join('<br>')
            .replace(/=== /g, '<h2>')
            .replace(/ ===/g, '</h2>')}
        </div>
      </body>
      </html>
    `;
    
    printWindow.document.write(html);
    printWindow.document.close();
    
    // Esperar a que se cargue el contenido antes de imprimir
    setTimeout(() => {
      printWindow.print();
    }, 250);
  };

  return (
    <section className="mx-auto w-full max-w-4xl rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <header className="mb-6 space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Calculadora bruto → neto
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Estimación orientativa para España (régimen general). No sustituye una nómina real.
        </p>
      </header>

      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        {/* UBICACIÓN */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wide">
            Ubicación
          </h2>
          <label className="block space-y-2">
            <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
              Comunidad Autónoma
            </span>
            <select
              value={comunidad}
              onChange={(e) => setComunidad(e.target.value as ComunidadAutonoma)}
              className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 outline-none ring-zinc-400 focus:ring-2 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
            >
              <option value="andalucia">Andalucía</option>
              <option value="aragon">Aragón</option>
              <option value="asturias">Asturias</option>
              <option value="baleares">Baleares</option>
              <option value="canarias">Canarias</option>
              <option value="cantabria">Cantabria</option>
              <option value="castilla_la_mancha">Castilla-La Mancha</option>
              <option value="castilla_leon">Castilla y León</option>
              <option value="cataluna">Cataluña</option>
              <option value="comunidad_valenciana">Comunidad Valenciana</option>
              <option value="extremadura">Extremadura</option>
              <option value="galicia">Galicia</option>
              <option value="madrid">Madrid</option>
              <option value="murcia">Murcia</option>
              <option value="navarra">Navarra</option>
              <option value="pais_vasco">País Vasco</option>
              <option value="rioja">La Rioja</option>
              <option value="ceuta">Ceuta</option>
              <option value="melilla">Melilla</option>
            </select>
          </label>
        </div>

        {/* INGRESOS */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wide">
            Ingresos
          </h2>
          <label className="block space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                Salario bruto anual
              </span>
              <Tooltip text="El sueldo anual bruto es el dinero total que recibirás antes de cualquier descuento de impuestos o seguridad social." />
            </div>
            <input
              type="number"
              min={0}
              step={100}
              inputMode="decimal"
              value={brutoInput}
              onChange={(e) => {
                const value = e.target.value;
                if (value === "") {
                  setBrutoInput("");
                  return;
                }
                if (Number(value) < 0) return;
                setBrutoInput(value);
              }}
              className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 outline-none ring-zinc-400 focus:ring-2 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
            />
          </label>

          <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-900">
            <h3 className="mb-3 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Complementos Salariales
              <Tooltip text="Ingresos adicionales no incluidos en el salario base como bonus, comisiones, horas extras, etc." />
            </h3>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <label className="block space-y-1">
                <span className="text-xs font-medium text-zinc-800 dark:text-zinc-200">
                  Bonus Anual
                </span>
                <input
                  type="number"
                  min={0}
                  step={100}
                  inputMode="decimal"
                  value={bonusAnual}
                  onChange={(e) => setBonusAnual(e.target.value)}
                  className="w-full rounded-lg border border-zinc-300 bg-white px-2 py-1 text-sm text-zinc-900 outline-none ring-zinc-400 focus:ring-2 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
                />
              </label>
              <label className="block space-y-1">
                <span className="text-xs font-medium text-zinc-800 dark:text-zinc-200">
                  Incentivos/Comisiones
                </span>
                <input
                  type="number"
                  min={0}
                  step={100}
                  inputMode="decimal"
                  value={incentivos}
                  onChange={(e) => setIncentivos(e.target.value)}
                  className="w-full rounded-lg border border-zinc-300 bg-white px-2 py-1 text-sm text-zinc-900 outline-none ring-zinc-400 focus:ring-2 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
                />
              </label>
              <label className="block space-y-1">
                <span className="text-xs font-medium text-zinc-800 dark:text-zinc-200">
                  Horas Extras
                </span>
                <input
                  type="number"
                  min={0}
                  step={100}
                  inputMode="decimal"
                  value={horasExtras}
                  onChange={(e) => setHorasExtras(e.target.value)}
                  className="w-full rounded-lg border border-zinc-300 bg-white px-2 py-1 text-sm text-zinc-900 outline-none ring-zinc-400 focus:ring-2 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
                />
              </label>
              <label className="block space-y-1">
                <span className="text-xs font-medium text-zinc-800 dark:text-zinc-200">
                  Gratificaciones
                </span>
                <input
                  type="number"
                  min={0}
                  step={100}
                  inputMode="decimal"
                  value={gratificaciones}
                  onChange={(e) => setGratificaciones(e.target.value)}
                  className="w-full rounded-lg border border-zinc-300 bg-white px-2 py-1 text-sm text-zinc-900 outline-none ring-zinc-400 focus:ring-2 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
                />
              </label>
            </div>
          </div>
        </div>

        {/* CONFIGURACIÓN */}
        <div className="space-y-4 border-t border-zinc-200 pt-6 dark:border-zinc-800">
          <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wide">
            Configuración
          </h2>

          <fieldset className="space-y-2">
            <legend className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
              Número de pagas
            </legend>
            <div className="grid grid-cols-2 gap-2">
              {([12, 14] as const).map((n) => (
                <label
                  key={n}
                  className={`flex cursor-pointer items-center justify-center rounded-lg border px-3 py-2 text-sm font-medium transition ${
                    pagas === n
                      ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
                      : "border-zinc-300 text-zinc-700 dark:border-zinc-700 dark:text-zinc-300 hover:border-zinc-400 dark:hover:border-zinc-600"
                  }`}
                >
                  <input
                    type="radio"
                    name="pagas"
                    value={n}
                    checked={pagas === n}
                    onChange={() => setPagas(n)}
                    className="sr-only"
                  />
                  {n} pagas
                </label>
              ))}
            </div>
          </fieldset>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={tienePagasExtra}
              onChange={(e) => setTienePagasExtra(e.target.checked)}
              className="rounded border-zinc-300 text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900"
            />
            <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
              Incluir pagas extraordinarias (junio/diciembre)
              <Tooltip text="Las pagas extraordinarias son dos pagos adicionales, normalmente en junio y diciembre. Algunos convenios las incluyen en el salario mensual." />
            </span>
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
              Estado civil / Dependientes
            </span>
            <select
              value={estadoCivil}
              onChange={(e) => setEstadoCivil(e.target.value as EstadoCivil)}
              className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 outline-none ring-zinc-400 focus:ring-2 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
            >
              <option value="soltero">Soltero/a sin hijos</option>
              <option value="casado">Casado/a</option>
              <option value="con_hijos">Con hijos / Dependientes</option>
            </select>
          </label>

          <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-900">
            <h3 className="mb-3 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Seguridad Social
              <Tooltip text="La Seguridad Social se divide en varios componentes: desempleo, contingencias comunes, formación profesional y accidentes de trabajo." />
            </h3>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <div className="space-y-1">
                <label className="block text-xs font-medium text-zinc-800 dark:text-zinc-200">
                  Desempleo: {(COMPONENTES_SS.desempleo * 100).toFixed(2)}%
                </label>
              </div>
              <div className="space-y-1">
                <label className="block text-xs font-medium text-zinc-800 dark:text-zinc-200">
                  Contingencias Comunes: {(COMPONENTES_SS.contingenciasComunes * 100).toFixed(2)}%
                </label>
              </div>
              <div className="space-y-1">
                <label className="block text-xs font-medium text-zinc-800 dark:text-zinc-200">
                  Formación Profesional: {(COMPONENTES_SS.formacionProfesional * 100).toFixed(2)}%
                </label>
              </div>
              <div className="space-y-1">
                <label className="block text-xs font-medium text-zinc-800 dark:text-zinc-200">
                  Accidentes de Trabajo: {(COMPONENTES_SS.accidentesTrabajo * 100).toFixed(2)}%
                </label>
              </div>
            </div>
            <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400">
              Total: {(tipoSS * 100).toFixed(2)}%
            </p>
          </div>

          <label className="block space-y-2">
            <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
              Mínimo personal anual (€)
              <Tooltip text="Es la cantidad que se deduce de tu base imponible antes de calcular el IRPF. Varía según tu estado civil y dependientes." />
            </span>
            <input
              type="number"
              min={0}
              step={100}
              inputMode="decimal"
              placeholder={MINIMO_PERSONAL_POR_ESTADO[estadoCivil].toString()}
              value={customMinimo}
              onChange={(e) => {
                const value = e.target.value;
                if (value === "") {
                  setCustomMinimo("");
                  return;
                }
                if (Number(value) < 0) return;
                setCustomMinimo(value);
              }}
              className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 outline-none ring-zinc-400 focus:ring-2 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
            />
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Dejar vacío para usar el valor predeterminado ({minimoPersonal}€)
            </p>
          </label>
        </div>
      </form>

      {/* RESULTADOS */}
      <div className="mt-8 space-y-6 border-t border-zinc-200 pt-6 dark:border-zinc-800">
        {/* Resumen Principal */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 p-4 dark:from-green-950 dark:to-emerald-950">
            <p className="text-xs font-semibold uppercase text-green-700 dark:text-green-300">
              Neto Mensual
            </p>
            <p className="text-3xl font-bold text-green-900 dark:text-green-100">
              {formatEur(resultado.netoMensual)}
            </p>
            <p className="text-xs text-green-700 dark:text-green-300">
              ({pagas} pagas)
            </p>
          </div>

          <div className="rounded-lg bg-gradient-to-br from-blue-50 to-cyan-50 p-4 dark:from-blue-950 dark:to-cyan-950">
            <p className="text-xs font-semibold uppercase text-blue-700 dark:text-blue-300">
              Neto Anual
            </p>
            <p className="text-3xl font-bold text-blue-900 dark:text-blue-100">
              {formatEur(resultado.netoAnual)}
            </p>
            <p className="text-xs text-blue-700 dark:text-blue-300">
              ({pagas} pagas)
            </p>
          </div>
        </div>

        {/* Desglose de Ingresos */}
        <div>
          <h3 className="mb-3 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            Desglose de Ingresos
          </h3>
          <dl className="space-y-2 rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-900">
            <div className="flex justify-between">
              <dt className="text-sm text-zinc-700 dark:text-zinc-300">Bruto base mensual</dt>
              <dd className="font-semibold text-zinc-900 dark:text-zinc-100">
                {formatEur(resultado.brutoMensual)}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-sm text-zinc-700 dark:text-zinc-300">Bruto base anual</dt>
              <dd className="font-semibold text-zinc-900 dark:text-zinc-100">
                {formatEur(resultado.brutoAnual)}
              </dd>
            </div>
            {complementos > 0 && (
              <>
                <div className="border-t border-zinc-200 pt-2 dark:border-zinc-700"></div>
                <div className="flex justify-between">
                  <dt className="text-sm text-zinc-700 dark:text-zinc-300">Complementos totales</dt>
                  <dd className="font-semibold text-zinc-900 dark:text-zinc-100">
                    {formatEur(complementos)}
                  </dd>
                </div>
                {Math.max(0, Number(bonusAnual) || 0) > 0 && (
                  <div className="flex justify-between text-xs text-zinc-600 dark:text-zinc-400">
                    <span>  Bonus: {formatEur(Math.max(0, Number(bonusAnual) || 0))}</span>
                  </div>
                )}
                {Math.max(0, Number(incentivos) || 0) > 0 && (
                  <div className="flex justify-between text-xs text-zinc-600 dark:text-zinc-400">
                    <span>  Incentivos: {formatEur(Math.max(0, Number(incentivos) || 0))}</span>
                  </div>
                )}
                {Math.max(0, Number(horasExtras) || 0) > 0 && (
                  <div className="flex justify-between text-xs text-zinc-600 dark:text-zinc-400">
                    <span>  Horas Extras: {formatEur(Math.max(0, Number(horasExtras) || 0))}</span>
                  </div>
                )}
                {Math.max(0, Number(gratificaciones) || 0) > 0 && (
                  <div className="flex justify-between text-xs text-zinc-600 dark:text-zinc-400">
                    <span>  Gratificaciones: {formatEur(Math.max(0, Number(gratificaciones) || 0))}</span>
                  </div>
                )}
                <div className="border-t border-zinc-200 pt-2 dark:border-zinc-700"></div>
              </>
            )}
            <div className="flex justify-between font-bold">
              <dt className="text-zinc-900 dark:text-zinc-100">Total Ingresos</dt>
              <dd className="text-zinc-900 dark:text-zinc-100">
                {formatEur(resultado.totalIngresoAnual)}
              </dd>
            </div>
          </dl>
        </div>

        {/* Desglose de Deducciones - SS Detallado */}
        <div>
          <h3 className="mb-3 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            Seguridad Social (Desglose Detallado)
          </h3>
          <dl className="space-y-2 rounded-lg border border-orange-200 bg-orange-50 p-4 dark:border-orange-800 dark:bg-orange-950">
            <div className="flex justify-between text-sm">
              <dt className="text-orange-700 dark:text-orange-300">Desempleo (1.55%)</dt>
              <dd className="font-semibold text-orange-900 dark:text-orange-100">
                {formatEur(resultado.ssDesempleo / 12)} / mes
              </dd>
            </div>
            <div className="flex justify-between text-xs text-orange-600 dark:text-orange-400">
              <span></span>
              <span>{formatEur(resultado.ssDesempleo)} / año</span>
            </div>

            <div className="flex justify-between text-sm">
              <dt className="text-orange-700 dark:text-orange-300">Contingencias Comunes (4.70%)</dt>
              <dd className="font-semibold text-orange-900 dark:text-orange-100">
                {formatEur(resultado.ssContingencias / 12)} / mes
              </dd>
            </div>
            <div className="flex justify-between text-xs text-orange-600 dark:text-orange-400">
              <span></span>
              <span>{formatEur(resultado.ssContingencias)} / año</span>
            </div>

            <div className="flex justify-between text-sm">
              <dt className="text-orange-700 dark:text-orange-300">Formación Profesional (0.60%)</dt>
              <dd className="font-semibold text-orange-900 dark:text-orange-100">
                {formatEur(resultado.ssFormacion / 12)} / mes
              </dd>
            </div>
            <div className="flex justify-between text-xs text-orange-600 dark:text-orange-400">
              <span></span>
              <span>{formatEur(resultado.ssFormacion)} / año</span>
            </div>

            <div className="flex justify-between text-sm">
              <dt className="text-orange-700 dark:text-orange-300">Accidentes de Trabajo (0.00%)</dt>
              <dd className="font-semibold text-orange-900 dark:text-orange-100">
                {formatEur(resultado.ssAccidentes / 12)} / mes
              </dd>
            </div>
            <div className="flex justify-between text-xs text-orange-600 dark:text-orange-400">
              <span></span>
              <span>{formatEur(resultado.ssAccidentes)} / año</span>
            </div>

            <div className="my-2 border-t border-orange-200 dark:border-orange-800"></div>

            <div className="flex justify-between font-bold">
              <dt className="text-orange-900 dark:text-orange-100">Total SS</dt>
              <dd className="text-orange-900 dark:text-orange-100">
                {formatEur(resultado.ssMensual)} / mes
              </dd>
            </div>
            <div className="flex justify-between text-xs font-bold text-orange-900 dark:text-orange-100">
              <span></span>
              <span>{formatEur(resultado.ssAnual)} / año</span>
            </div>
          </dl>
        </div>

        {/* Desglose de IRPF */}
        <div>
          <h3 className="mb-3 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            IRPF (Impuesto sobre la Renta)
          </h3>
          <dl className="space-y-2 rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-950">
            <div className="flex justify-between text-sm">
              <dt className="text-red-700 dark:text-red-300">
                IRPF ({resultado.tipoIrpfEfectivo.toFixed(2)}% efectivo)
              </dt>
              <dd className="font-semibold text-red-900 dark:text-red-100">
                {formatEur(resultado.irpfMensual)} / mes
              </dd>
            </div>
            <div className="flex justify-between text-xs text-red-600 dark:text-red-400">
              <span></span>
              <span>{formatEur(resultado.irpfAnual)} / año</span>
            </div>
            <p className="text-xs text-red-700 dark:text-red-300 mt-2">
              Retención aproximada según estado civil: {(RETENCIONES_IRPF[estadoCivil] * 100).toFixed(1)}%
            </p>
          </dl>
        </div>

        {/* Resumen Final */}
        <div>
          <h3 className="mb-3 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            Resumen Final
          </h3>
          <dl className="space-y-2 rounded-lg border border-zinc-300 bg-zinc-100 p-4 dark:border-zinc-600 dark:bg-zinc-800">
            <div className="flex justify-between">
              <dt className="text-sm font-medium text-zinc-800 dark:text-zinc-200">Total ingresos</dt>
              <dd className="font-semibold text-zinc-900 dark:text-zinc-100">
                {formatEur(resultado.totalIngresoAnual)}
              </dd>
            </div>
            <div className="flex justify-between text-red-700 dark:text-red-300">
              <dt className="text-sm font-medium">− Total deducciones</dt>
              <dd className="font-semibold">
                {formatEur(resultado.totalDeducciones)}
              </dd>
            </div>
            <div className="border-t-2 border-zinc-300 dark:border-zinc-600 pt-2">
              <div className="flex justify-between">
                <dt className="text-base font-bold text-green-700 dark:text-green-300">
                  = Neto anual
                </dt>
                <dd className="text-base font-bold text-green-700 dark:text-green-300">
                  {formatEur(resultado.netoAnual)}
                </dd>
              </div>
            </div>
          </dl>
        </div>

        {/* Botones Exportar */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <button
            onClick={exportarTXT}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 transition"
          >
            📄 Descargar TXT
          </button>
          <button
            onClick={exportarPDF}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600 transition"
          >
            📕 Descargar PDF
          </button>
        </div>
      </div>
    </section>
  );
}

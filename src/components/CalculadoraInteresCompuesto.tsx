"use client";

import { useMemo, useState } from "react";

type Frecuencia = 1 | 4 | 12;

const añoActual = new Date().getFullYear();

interface FilaAnual {
  año: number;
  aportaciones: number;
  intereses: number;
  saldo: number;
}

interface Resultado {
  capitalAportado: number;
  intereses: number;
  saldoBruto: number;
  impuestos: number;
  saldoNeto: number;
  valorActual: number;
  filas: FilaAnual[];
}

const frecuencias: { value: Frecuencia; label: string }[] = [
  { value: 12, label: "Mensual" },
  { value: 4, label: "Trimestral" },
  { value: 1, label: "Anual" },
];

function calcularInteresCompuesto(
  inicial: number,
  aportacion: number,
  rentabilidad: number,
  años: number,
  frecuencia: Frecuencia,
  inflacion: number,
  impuestos: number,
): Resultado {
  const rentabilidadPeriodica = Math.pow(1 + rentabilidad / 100, 1 / frecuencia) - 1;
  let saldo = inicial;
  let capitalAportado = inicial;
  const filas: FilaAnual[] = [];

  for (let año = 1; año <= años; año += 1) {
    const saldoInicial = saldo;
    let aportacionesAño = 0;

    for (let periodo = 0; periodo < frecuencia; periodo += 1) {
      saldo *= 1 + rentabilidadPeriodica;
      saldo += aportacion;
      aportacionesAño += aportacion;
    }

    capitalAportado += aportacionesAño;
    filas.push({
      año: añoActual + año - 1,
      aportaciones: aportacionesAño,
      intereses: saldo - saldoInicial - aportacionesAño,
      saldo,
    });
  }

  const intereses = Math.max(0, saldo - capitalAportado);
  const impuestosEstimados = intereses * (impuestos / 100);
  const saldoNeto = saldo - impuestosEstimados;
  const valorActual = saldoNeto / Math.pow(1 + inflacion / 100, años);

  return {
    capitalAportado,
    intereses,
    saldoBruto: saldo,
    impuestos: impuestosEstimados,
    saldoNeto,
    valorActual,
    filas,
  };
}

function formatEur(value: number): string {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatMiles(value: number): string {
  return new Intl.NumberFormat("es-ES", { useGrouping: "always" }).format(value);
}

function formatPercent(value: number): string {
  return new Intl.NumberFormat("es-ES", {
    style: "percent",
    minimumFractionDigits: 1,
    maximumFractionDigits: 2,
  }).format(value / 100);
}

function InputCampo({
  label,
  value,
  onChange,
  min = 0,
  max,
  step = 1,
  suffix,
  currency = false,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  suffix: string;
  currency?: boolean;
}) {
  const [texto, setTexto] = useState(() => (currency ? formatMiles(value) : String(value)));

  const handleChange = (rawValue: string) => {
    if (currency) {
      const normalizedValue = rawValue.replace(/\./g, "").replace(/\D/g, "");
      if (normalizedValue === "") {
        setTexto("");
        onChange(0);
        return;
      }

      const withoutLeadingZeros = normalizedValue.replace(/^0+(?=\d)/, "");
      const parsedValue = Number(withoutLeadingZeros);
      const limitedValue = max === undefined ? Math.max(min, parsedValue) : Math.min(max, Math.max(min, parsedValue));
      setTexto(formatMiles(limitedValue));
      onChange(limitedValue);
      return;
    }

    if (rawValue === "") {
      setTexto("");
      onChange(0);
      return;
    }

    const normalizedValue = rawValue.replace(",", ".");
    const parsedValue = Number(normalizedValue);
    if (!Number.isFinite(parsedValue)) return;
    const limitedValue = Math.max(min, parsedValue);
    const finalValue = max === undefined ? limitedValue : Math.min(max, limitedValue);
    setTexto(rawValue.replace(",", "."));
    onChange(finalValue);
  };

  return (
    <label className="block space-y-2">
      <span className="text-xs font-medium text-zinc-800 dark:text-zinc-200">{label}</span>
      <div className="relative">
        <input
          type={currency ? "text" : "number"}
          inputMode={currency ? "numeric" : "decimal"}
          min={min}
          max={max}
          step={step}
          value={texto}
          onChange={(event) => handleChange(event.target.value)}
          className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 pr-12 text-zinc-900 outline-none ring-zinc-400 focus:ring-2 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
        />
        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-sm text-zinc-500 dark:text-zinc-400">
          {suffix}
        </span>
      </div>
    </label>
  );
}

export default function CalculadoraInteresCompuesto() {
  const [versionFormulario, setVersionFormulario] = useState(0);
  const [añoActivo, setAñoActivo] = useState<number | null>(null);
  const [inicial, setInicial] = useState(5000);
  const [aportacion, setAportacion] = useState(300);
  const [rentabilidad, setRentabilidad] = useState(6);
  const [años, setAños] = useState(20);
  const [frecuencia, setFrecuencia] = useState<Frecuencia>(12);
  const [inflacion, setInflacion] = useState(2);
  const [impuestos, setImpuestos] = useState(19);

  const resultado = useMemo(
    () => calcularInteresCompuesto(inicial, aportacion, rentabilidad, años, frecuencia, inflacion, impuestos),
    [inicial, aportacion, rentabilidad, años, frecuencia, inflacion, impuestos],
  );

  const resetear = () => {
    setVersionFormulario((version) => version + 1);
    setInicial(5000);
    setAportacion(300);
    setRentabilidad(6);
    setAños(20);
    setFrecuencia(12);
    setInflacion(2);
    setImpuestos(19);
  };

  return (
    <section className="mx-auto min-h-0 w-full max-w-6xl rounded-[32px] border border-zinc-200 bg-white p-5 shadow-sm ring-1 ring-zinc-100 dark:border-zinc-800 dark:bg-zinc-950 dark:ring-zinc-800 sm:min-h-[620px] sm:p-7 lg:p-8">
      <header className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">
            Simulador
          </p>
          <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-2xl">
            Calculadora de interés compuesto
          </h2>
        </div>
        <p className="max-w-xl text-xs text-zinc-600 dark:text-zinc-400">
          Simula cómo pueden crecer tus ahorros con una inversión inicial, aportaciones periódicas y efecto del tiempo.
        </p>
      </header>

      <div className="space-y-6">
        <div className="space-y-4">
          <h2 className="text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-900 dark:text-zinc-100">
            Datos de la inversión
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <InputCampo key={`inicial-${versionFormulario}`} label="Inversión inicial" value={inicial} onChange={setInicial} step={100} suffix="€" currency />
            <InputCampo key={`aportacion-${versionFormulario}`} label="Aportación periódica" value={aportacion} onChange={setAportacion} step={25} suffix="€" currency />
            <InputCampo key={`rentabilidad-${versionFormulario}`} label="Rentabilidad anual estimada" value={rentabilidad} onChange={setRentabilidad} max={100} step={0.1} suffix="%" />
            <InputCampo key={`años-${versionFormulario}`} label="Duración de la inversión" value={años} onChange={setAños} min={1} max={100} suffix="años" />
          </div>
        </div>

        <fieldset className="space-y-3 border-t border-zinc-200 pt-6 dark:border-zinc-800">
          <legend className="text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-900 dark:text-zinc-100">
            Frecuencia y supuestos
          </legend>
          <div className="grid grid-cols-3 gap-2">
            {frecuencias.map((opcion) => (
              <label
                key={opcion.value}
                className={`flex cursor-pointer items-center justify-center rounded-lg border px-2 py-2 text-sm font-medium transition ${
                  frecuencia === opcion.value
                    ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
                    : "border-zinc-300 text-zinc-700 hover:border-zinc-400 dark:border-zinc-700 dark:text-zinc-300"
                }`}
              >
                <input
                  type="radio"
                  name="frecuencia"
                  value={opcion.value}
                  checked={frecuencia === opcion.value}
                  onChange={() => setFrecuencia(opcion.value)}
                  className="sr-only"
                />
                {opcion.label}
              </label>
            ))}
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <InputCampo key={`inflacion-${versionFormulario}`} label="Inflación anual estimada" value={inflacion} onChange={setInflacion} max={30} step={0.1} suffix="%" />
            <InputCampo key={`impuestos-${versionFormulario}`} label="Impuestos sobre ganancias" value={impuestos} onChange={setImpuestos} max={100} step={1} suffix="%" />
          </div>
          <p className="text-xs leading-5 text-zinc-500 dark:text-zinc-400">
            La aportación se realiza al final de cada periodo. Los impuestos son una estimación simplificada sobre los intereses, no una liquidación fiscal.
          </p>
        </fieldset>

        <div className="grid grid-cols-1 gap-4 border-t border-zinc-200 pt-6 md:grid-cols-3 dark:border-zinc-800">
          <div className="min-w-0 overflow-hidden rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 p-4 dark:from-green-950 dark:to-emerald-950">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-green-700 dark:text-green-300">Capital final neto</p>
            <p className="overflow-x-auto whitespace-nowrap text-xl font-bold text-green-900 dark:text-green-100">{formatEur(resultado.saldoNeto)}</p>
            <p className="mt-1 text-[11px] text-green-700 dark:text-green-300">Después de impuestos estimados</p>
          </div>
          <div className="min-w-0 overflow-hidden rounded-lg bg-gradient-to-br from-blue-50 to-cyan-50 p-4 dark:from-blue-950 dark:to-cyan-950">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700 dark:text-blue-300">Intereses generados</p>
            <p className="overflow-x-auto whitespace-nowrap text-xl font-bold text-blue-900 dark:text-blue-100">{formatEur(resultado.intereses)}</p>
            <p className="mt-1 text-[11px] text-blue-700 dark:text-blue-300">Antes de impuestos</p>
          </div>
          <div className="min-w-0 overflow-hidden rounded-lg bg-gradient-to-br from-amber-50 to-orange-50 p-4 dark:from-amber-950 dark:to-orange-950">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-700 dark:text-amber-300">Valor actual estimado</p>
            <p className="overflow-x-auto whitespace-nowrap text-xl font-bold text-amber-900 dark:text-amber-100">{formatEur(resultado.valorActual)}</p>
            <p className="mt-1 text-[11px] text-amber-700 dark:text-amber-300">Descontando inflación</p>
          </div>
        </div>

        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-900">
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-900 dark:text-zinc-100">Resumen de la simulación</h2>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between gap-4"><dt className="text-zinc-600 dark:text-zinc-400">Capital aportado</dt><dd className="font-semibold text-zinc-900 dark:text-zinc-100">{formatEur(resultado.capitalAportado)}</dd></div>
            <div className="flex justify-between gap-4"><dt className="text-zinc-600 dark:text-zinc-400">Saldo antes de impuestos</dt><dd className="font-semibold text-zinc-900 dark:text-zinc-100">{formatEur(resultado.saldoBruto)}</dd></div>
            <div className="flex justify-between gap-4"><dt className="text-zinc-600 dark:text-zinc-400">Impuestos estimados</dt><dd className="font-semibold text-red-700 dark:text-red-300">- {formatEur(resultado.impuestos)}</dd></div>
            <div className="flex justify-between gap-4 border-t border-zinc-200 pt-2 dark:border-zinc-700"><dt className="font-bold text-zinc-900 dark:text-zinc-100">Rentabilidad sobre lo aportado</dt><dd className="font-bold text-green-700 dark:text-green-300">{formatPercent((resultado.intereses / Math.max(1, resultado.capitalAportado)) * 100)}</dd></div>
          </dl>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-900 dark:text-zinc-100">Crecimiento del capital</h2>
            <span className="text-[11px] text-zinc-500 dark:text-zinc-400">Saldo acumulado por año</span>
          </div>
            <p className="text-xs leading-5 text-zinc-500 dark:text-zinc-400">
              La línea representa la evolución estimada del saldo acumulado, sumando tus aportaciones y la rentabilidad anual seleccionada.
              La línea naranja muestra cuánto conservarías si solo ahorraras esas cantidades, descontando la inflación. Los importes del eje vertical son aproximados.
            </p>
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-zinc-600 dark:text-zinc-400">
            <span className="inline-flex items-center gap-2"><span className="h-0.5 w-5 bg-emerald-500" /> Inversión</span>
            <span className="inline-flex items-center gap-2"><span className="h-0.5 w-5 bg-orange-500" /> Solo ahorro, valor real</span>
          </div>
          <div className="overflow-hidden rounded-lg border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-700 dark:bg-zinc-900">
            <svg
              viewBox="0 0 720 280"
              role="img"
              aria-labelledby="grafica-titulo grafica-descripcion"
              className="h-auto w-full"
            >
              <title id="grafica-titulo">Evolución estimada del capital</title>
              <desc id="grafica-descripcion">
                Gráfica que compara el saldo acumulado de la inversión con el valor real del ahorro sin invertir para cada año.
              </desc>
              {(() => {
                const chartWidth = 660;
                const chartHeight = 210;
                const offsetX = 42;
                const offsetY = 18;
                const ahorroSinInvertir = resultado.filas.map((fila, index) => {
                  const capitalAhorrado = inicial + resultado.filas
                    .slice(0, index + 1)
                    .reduce((total, filaAnual) => total + filaAnual.aportaciones, 0);
                  return capitalAhorrado / Math.pow(1 + inflacion / 100, index + 1);
                });
                const maxSaldo = Math.max(1, ...resultado.filas.map((fila) => fila.saldo), ...ahorroSinInvertir);
                const yTicks = [0, 0.25, 0.5, 0.75, 1];
                const points = resultado.filas
                  .map((fila, index) => {
                    const x = offsetX + (index / Math.max(1, resultado.filas.length - 1)) * chartWidth;
                    const y = offsetY + chartHeight - (fila.saldo / maxSaldo) * chartHeight;
                    return `${x},${y}`;
                  })
                  .join(" ");

                return (
                  <>
                    {yTicks.map((tick) => {
                      const y = offsetY + chartHeight - tick * chartHeight;
                      return (
                        <g key={tick}>
                          <line x1={offsetX} y1={y} x2={offsetX + chartWidth} y2={y} className="stroke-zinc-200 dark:stroke-zinc-800" strokeDasharray="3 5" />
                          <text x="8" y={y + 4} className="fill-zinc-500 text-[12px]">{formatEur(maxSaldo * tick)}</text>
                        </g>
                      );
                    })}
                    <line x1={offsetX} y1={offsetY} x2={offsetX} y2={offsetY + chartHeight} className="stroke-zinc-300 dark:stroke-zinc-700" />
                    {resultado.filas.map((fila, index) => {
                      const x = offsetX + (index / Math.max(1, resultado.filas.length - 1)) * chartWidth;
                      const y = offsetY + chartHeight - (fila.saldo / maxSaldo) * chartHeight;
                      return <line key={`guia-${fila.año}`} x1={x} y1={offsetY + chartHeight} x2={x} y2={y} className="stroke-zinc-300 opacity-50 dark:stroke-zinc-600" strokeWidth="1" />;
                    })}
                    <polyline
                      points={ahorroSinInvertir.map((saldo, index) => {
                        const x = offsetX + (index / Math.max(1, resultado.filas.length - 1)) * chartWidth;
                        const y = offsetY + chartHeight - (saldo / maxSaldo) * chartHeight;
                        return `${x},${y}`;
                      }).join(" ")}
                      fill="none"
                      className="stroke-orange-500 dark:stroke-orange-400"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeDasharray="6 5"
                    />
                    {resultado.filas.map((fila, index) => {
                      const x = offsetX + (index / Math.max(1, resultado.filas.length - 1)) * chartWidth;
                      const y = offsetY + chartHeight - (ahorroSinInvertir[index] / maxSaldo) * chartHeight;
                      return <circle key={`ahorro-${fila.año}`} cx={x} cy={y} r="3" className="fill-orange-500 dark:fill-orange-400" pointerEvents="none" />;
                    })}
                    <polyline points={points} fill="none" className="stroke-emerald-600 dark:stroke-emerald-400" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                    {resultado.filas.map((fila, index) => {
                      const x = offsetX + (index / Math.max(1, resultado.filas.length - 1)) * chartWidth;
                      const y = offsetY + chartHeight - (fila.saldo / maxSaldo) * chartHeight;
                      const ahorroY = offsetY + chartHeight - (ahorroSinInvertir[index] / maxSaldo) * chartHeight;
                      return (
                        <g key={fila.año}>
                          <circle
                            cx={x}
                            cy={ahorroY}
                            r="8"
                            className="fill-transparent"
                            onMouseEnter={() => setAñoActivo(fila.año)}
                            onMouseLeave={() => setAñoActivo(null)}
                          />
                          <circle
                            cx={x}
                            cy={y}
                            r="8"
                            className="fill-transparent"
                            onMouseEnter={() => setAñoActivo(fila.año)}
                            onMouseLeave={() => setAñoActivo(null)}
                          />
                          <circle cx={x} cy={y} r="4" className="fill-emerald-600 dark:fill-emerald-400" pointerEvents="none">
                            <title>{`${fila.año}: ${formatEur(fila.saldo)} acumulados`}</title>
                          </circle>
                          {añoActivo === fila.año && (
                            <g transform={`translate(${Math.max(86, Math.min(chartWidth - 44, x))}, ${Math.max(62, Math.min(y, ahorroY) - 14)})`} pointerEvents="none">
                              <rect x="-82" y="-56" width="164" height="50" rx="5" className="fill-zinc-900 dark:fill-zinc-100" />
                              <text x="0" y="-40" textAnchor="middle" className="fill-white text-[11px] font-semibold dark:fill-zinc-900">
                                {fila.año}
                              </text>
                              <text x="0" y="-25" textAnchor="middle" className="fill-white text-[10px] dark:fill-zinc-900">
                                {`Inversión: ${formatEur(fila.saldo)}`}
                              </text>
                              <text x="0" y="-11" textAnchor="middle" className="fill-white text-[10px] dark:fill-zinc-900">
                                {`Ahorro: ${formatEur(ahorroSinInvertir[index])}`}
                              </text>
                            </g>
                          )}
                        </g>
                      );
                    })}
                    {resultado.filas.map((fila, index) => {
                      const x = offsetX + (index / Math.max(1, resultado.filas.length - 1)) * chartWidth;
                      return (
                        <g key={fila.año}>
                          {index % 2 === 0 ? (
                            <text x={x} y="260" textAnchor={index === 0 ? "start" : index === resultado.filas.length - 1 ? "end" : "middle"} className="fill-zinc-500 text-[12px]">
                              {fila.año}
                            </text>
                          ) : (
                            <line x1={x} y1="253" x2={x} y2="260" className="stroke-zinc-400 dark:stroke-zinc-500" strokeWidth="1" />
                          )}
                        </g>
                      );
                    })}
                  </>
                );
              })()}
            </svg>
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-900 dark:text-zinc-100">Evolución anual</h2>
          <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-700">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead className="bg-zinc-100 text-xs uppercase text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                <tr><th className="px-4 py-3">Año</th><th className="px-4 py-3 text-right">Aportaciones</th><th className="px-4 py-3 text-right">Intereses</th><th className="px-4 py-3 text-right">Saldo acumulado</th></tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
                {resultado.filas.map((fila) => (
                  <tr key={fila.año} className="bg-white dark:bg-zinc-950"><td className="px-4 py-2 text-zinc-700 dark:text-zinc-300">{fila.año}</td><td className="px-4 py-2 text-right text-zinc-700 dark:text-zinc-300">{formatEur(fila.aportaciones)}</td><td className="px-4 py-2 text-right text-zinc-700 dark:text-zinc-300">{formatEur(fila.intereses)}</td><td className="px-4 py-2 text-right font-semibold text-zinc-900 dark:text-zinc-100">{formatEur(fila.saldo)}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <button type="button" onClick={resetear} className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-semibold text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800">
          Restaurar valores iniciales
        </button>
      </div>
    </section>
  );
}

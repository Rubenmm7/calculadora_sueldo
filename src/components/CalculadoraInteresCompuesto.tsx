"use client";

import { useMemo, useState } from "react";

type Frecuencia = 1 | 4 | 12;

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
  const totalPeriodos = años * frecuencia;
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
      año,
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
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  suffix: string;
}) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">{label}</span>
      <div className="relative">
        <input
          type="number"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(event) => onChange(Math.max(min, Number(event.target.value) || 0))}
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
    setInicial(5000);
    setAportacion(300);
    setRentabilidad(6);
    setAños(20);
    setFrecuencia(12);
    setInflacion(2);
    setImpuestos(19);
  };

  return (
    <section className="mx-auto w-full max-w-4xl rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <header className="mb-6 space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Calculadora de interés compuesto
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Simula cómo pueden crecer tus ahorros con una inversión inicial y aportaciones periódicas.
        </p>
      </header>

      <div className="space-y-6">
        <div className="space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wide text-zinc-900 dark:text-zinc-100">
            Datos de la inversión
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <InputCampo label="Inversión inicial" value={inicial} onChange={setInicial} step={100} suffix="€" />
            <InputCampo label="Aportación periódica" value={aportacion} onChange={setAportacion} step={25} suffix="€" />
            <InputCampo label="Rentabilidad anual estimada" value={rentabilidad} onChange={setRentabilidad} max={100} step={0.1} suffix="%" />
            <InputCampo label="Duración de la inversión" value={años} onChange={setAños} max={100} suffix="años" />
          </div>
        </div>

        <fieldset className="space-y-3 border-t border-zinc-200 pt-6 dark:border-zinc-800">
          <legend className="text-sm font-bold uppercase tracking-wide text-zinc-900 dark:text-zinc-100">
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
            <InputCampo label="Inflación anual estimada" value={inflacion} onChange={setInflacion} max={30} step={0.1} suffix="%" />
            <InputCampo label="Impuestos sobre ganancias" value={impuestos} onChange={setImpuestos} max={100} step={1} suffix="%" />
          </div>
          <p className="text-xs leading-5 text-zinc-500 dark:text-zinc-400">
            La aportación se realiza al final de cada periodo. Los impuestos son una estimación simplificada sobre los intereses, no una liquidación fiscal.
          </p>
        </fieldset>

        <div className="grid grid-cols-1 gap-4 border-t border-zinc-200 pt-6 md:grid-cols-3 dark:border-zinc-800">
          <div className="min-w-0 overflow-hidden rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 p-4 dark:from-green-950 dark:to-emerald-950">
            <p className="text-xs font-semibold uppercase text-green-700 dark:text-green-300">Capital final neto</p>
            <p className="overflow-x-auto whitespace-nowrap text-2xl font-bold text-green-900 dark:text-green-100">{formatEur(resultado.saldoNeto)}</p>
            <p className="mt-1 text-xs text-green-700 dark:text-green-300">Después de impuestos estimados</p>
          </div>
          <div className="min-w-0 overflow-hidden rounded-lg bg-gradient-to-br from-blue-50 to-cyan-50 p-4 dark:from-blue-950 dark:to-cyan-950">
            <p className="text-xs font-semibold uppercase text-blue-700 dark:text-blue-300">Intereses generados</p>
            <p className="overflow-x-auto whitespace-nowrap text-2xl font-bold text-blue-900 dark:text-blue-100">{formatEur(resultado.intereses)}</p>
            <p className="mt-1 text-xs text-blue-700 dark:text-blue-300">Antes de impuestos</p>
          </div>
          <div className="min-w-0 overflow-hidden rounded-lg bg-gradient-to-br from-amber-50 to-orange-50 p-4 dark:from-amber-950 dark:to-orange-950">
            <p className="text-xs font-semibold uppercase text-amber-700 dark:text-amber-300">Valor actual estimado</p>
            <p className="overflow-x-auto whitespace-nowrap text-2xl font-bold text-amber-900 dark:text-amber-100">{formatEur(resultado.valorActual)}</p>
            <p className="mt-1 text-xs text-amber-700 dark:text-amber-300">Descontando inflación</p>
          </div>
        </div>

        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-900">
          <h2 className="mb-3 text-sm font-semibold text-zinc-900 dark:text-zinc-100">Resumen de la simulación</h2>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between gap-4"><dt className="text-zinc-600 dark:text-zinc-400">Capital aportado</dt><dd className="font-semibold text-zinc-900 dark:text-zinc-100">{formatEur(resultado.capitalAportado)}</dd></div>
            <div className="flex justify-between gap-4"><dt className="text-zinc-600 dark:text-zinc-400">Saldo antes de impuestos</dt><dd className="font-semibold text-zinc-900 dark:text-zinc-100">{formatEur(resultado.saldoBruto)}</dd></div>
            <div className="flex justify-between gap-4"><dt className="text-zinc-600 dark:text-zinc-400">Impuestos estimados</dt><dd className="font-semibold text-red-700 dark:text-red-300">- {formatEur(resultado.impuestos)}</dd></div>
            <div className="flex justify-between gap-4 border-t border-zinc-200 pt-2 dark:border-zinc-700"><dt className="font-bold text-zinc-900 dark:text-zinc-100">Rentabilidad sobre lo aportado</dt><dd className="font-bold text-green-700 dark:text-green-300">{formatPercent((resultado.intereses / Math.max(1, resultado.capitalAportado)) * 100)}</dd></div>
          </dl>
        </div>

        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Evolución anual</h2>
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

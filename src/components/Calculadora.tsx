"use client";

import { useMemo, useState } from "react";

type NumeroPagas = 12 | 14;

const TIPO_SS_TRABAJADOR = 0.0648;
const BASE_MAXIMA_SS_MENSUAL = 4909.5;
const MINIMO_PERSONAL = 5550;

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

function calcularNomina(brutoAnual: number, pagas: NumeroPagas) {
  const baseSsMensual = Math.min(brutoAnual / 12, BASE_MAXIMA_SS_MENSUAL);
  const ssAnual = baseSsMensual * TIPO_SS_TRABAJADOR * 12;
  const rendimientoNeto = Math.max(0, brutoAnual - ssAnual);
  const reduccion = reduccionRendimientosTrabajo(rendimientoNeto);
  const baseImponible = Math.max(0, rendimientoNeto - reduccion);
  const baseLiquidable = Math.max(0, baseImponible - MINIMO_PERSONAL);
  const irpfAnual = cuotaIrpf(baseLiquidable);
  const netoAnual = brutoAnual - ssAnual - irpfAnual;

  return {
    netoMensual: netoAnual / pagas,
    irpfAnual,
    irpfMensual: irpfAnual / pagas,
    ssAnual,
    ssMensual: ssAnual / pagas,
    tipoIrpfEfectivo: brutoAnual > 0 ? (irpfAnual / brutoAnual) * 100 : 0,
  };
}

function formatEur(valor: number): string {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
  }).format(valor);
}

export default function Calculadora() {
  const [brutoInput, setBrutoInput] = useState("30000");
  const [pagas, setPagas] = useState<NumeroPagas>(14);

  const brutoAnual =
    brutoInput === "" ? 0 : Math.max(0, Number(brutoInput) || 0);

  const resultado = useMemo(
    () => calcularNomina(brutoAnual, pagas),
    [brutoAnual, pagas],
  );

  return (
    <section className="mx-auto w-full max-w-xl rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <header className="mb-6 space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Calculadora bruto → neto
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Estimación orientativa para España (régimen general, indefinido,
          soltero sin hijos). No sustituye una nómina real.
        </p>
      </header>

      <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
        <label className="block space-y-2">
          <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
            Salario bruto anual
          </span>
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

        <fieldset className="space-y-2">
          <legend className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
            Número de pagas
          </legend>
          <div className="grid grid-cols-2 gap-2">
            {([12, 14] as const).map((n) => (
              <label
                key={n}
                className={`flex cursor-pointer items-center justify-center rounded-lg border px-3 py-2 text-sm font-medium ${
                  pagas === n
                    ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
                    : "border-zinc-300 text-zinc-700 dark:border-zinc-700 dark:text-zinc-300"
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
      </form>

      <dl className="mt-8 space-y-3 border-t border-zinc-200 pt-6 dark:border-zinc-800">
        <div className="flex items-baseline justify-between">
          <dt className="text-sm text-zinc-600 dark:text-zinc-400">
            Neto mensual ({pagas} pagas)
          </dt>
          <dd className="text-2xl font-semibold tabular-nums text-zinc-900 dark:text-zinc-50">
            {formatEur(resultado.netoMensual)}
          </dd>
        </div>
        <div className="flex justify-between text-sm">
          <dt className="text-zinc-600 dark:text-zinc-400">
            IRPF ({resultado.tipoIrpfEfectivo.toFixed(1)} % efectivo)
          </dt>
          <dd className="tabular-nums text-zinc-900 dark:text-zinc-100">
            {formatEur(resultado.irpfMensual)} / mes ·{" "}
            {formatEur(resultado.irpfAnual)} / año
          </dd>
        </div>
        <div className="flex justify-between text-sm">
          <dt className="text-zinc-600 dark:text-zinc-400">
            Seguridad Social (trabajador)
          </dt>
          <dd className="tabular-nums text-zinc-900 dark:text-zinc-100">
            {formatEur(resultado.ssMensual)} / mes · {formatEur(resultado.ssAnual)}{" "}
            / año
          </dd>
        </div>
      </dl>
    </section>
  );
}
import Calculadora from "@/components/Calculadora";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-50 px-4 py-12 dark:bg-zinc-900">
      <div className="mx-auto max-w-4xl space-y-12">
        {/* Componente de la Calculadora */}
        <Calculadora />

        {/* Sección SEO clave para la aprobación de AdSense */}
        <article className="prose prose-zinc mx-auto max-w-xl dark:prose-invert">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
            ¿Cómo se calcula el salario neto en España?
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            El sueldo neto se obtiene restando del salario bruto anual dos deducciones clave: las aportaciones a la 
            <strong> Seguridad Social</strong> (desempleo, contingencias comunes y formación) y las retenciones a cuenta del 
            <strong> IRPF</strong>.
          </p>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Diferencia entre 12 y 14 pagas
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Cobrar en 12 o 14 pagas no altera la retribución bruta total al año ni la cantidad global de impuestos pagados. 
            Con 14 pagas se perciben dos pagas extraordinarias (habitualmente en junio y diciembre), lo que reduce la mensualidad ordinaria.
          </p>
        </article>
      </div>
    </main>
  );
}
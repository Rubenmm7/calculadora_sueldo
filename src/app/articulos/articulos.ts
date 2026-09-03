export interface Articulo {
  slug: string;
  title: string;
  description: string;
  category: string;
  updatedAt: string;
  readTime: string;
  paragraphs: string[];
  points?: string[];
}

export const articulos: Articulo[] = [
  {
    slug: "como-calcular-sueldo-neto",
    title: "Cómo calcular el sueldo neto a partir del salario bruto",
    description:
      "Aprende qué se descuenta del salario bruto y cómo estimar el dinero que recibirás cada mes.",
    category: "Nóminas",
    updatedAt: "3 de septiembre de 2026",
    readTime: "5 min de lectura",
    paragraphs: [
      "El salario bruto es la cantidad pactada antes de aplicar deducciones. Para estimar el sueldo neto hay que restar las cotizaciones de la Seguridad Social y la retención a cuenta del IRPF.",
      "El resultado depende de factores como el salario anual, el número de pagas, la situación familiar, los complementos y la comunidad autónoma. Por eso una calculadora ofrece una orientación y no sustituye una nómina oficial.",
    ],
    points: [
      "Parte del salario bruto anual, no solo de la mensualidad.",
      "Calcula primero las cotizaciones de la Seguridad Social.",
      "Aplica después una estimación de la retención del IRPF.",
      "Divide el neto anual entre 12 o 14 pagas según tu contrato.",
    ],
  },
  {
    slug: "12-o-14-pagas",
    title: "12 o 14 pagas: diferencias en el sueldo mensual",
    description:
      "Descubre cómo cambia tu nómina mensual cuando cobras en 12 o 14 pagas.",
    category: "Nóminas",
    updatedAt: "3 de septiembre de 2026",
    readTime: "4 min de lectura",
    paragraphs: [
      "El número de pagas cambia la forma en la que se distribuye el salario anual. Cobrar en 14 pagas suele incluir dos pagas extraordinarias, mientras que en 12 pagas esas cantidades se prorratean durante el año.",
      "Si el salario bruto anual es el mismo, la suma anual antes de deducciones también debería ser equivalente. La diferencia principal está en cuánto recibes cada mes y en cuándo cobras las pagas extraordinarias.",
    ],
    points: [
      "12 pagas: una mensualidad más alta y pagas extra prorrateadas.",
      "14 pagas: mensualidades ordinarias más bajas y dos extras.",
      "Comprueba siempre el convenio colectivo y tu contrato.",
    ],
  },
  {
    slug: "irpf-en-la-nomina",
    title: "Qué es el IRPF de la nómina y por qué cambia",
    description:
      "Una explicación sencilla sobre la retención del IRPF, sus variables y su efecto en el sueldo neto.",
    category: "Finanzas personales",
    updatedAt: "3 de septiembre de 2026",
    readTime: "6 min de lectura",
    paragraphs: [
      "El IRPF es un impuesto sobre la renta. En la nómina, la empresa aplica una retención como pago anticipado del impuesto que se regulariza en la declaración de la renta.",
      "La retención no depende únicamente del sueldo: también pueden influir la situación familiar, los hijos, el tipo de contrato y otros datos comunicados a la empresa. Una retención más alta reduce el neto mensual, pero no significa necesariamente pagar más impuesto al final del año.",
    ],
    points: [
      "La retención es un adelanto, no el resultado definitivo de la declaración.",
      "Comunica los cambios personales relevantes a tu empresa.",
      "Compara el porcentaje retenido con tu certificado de retenciones.",
    ],
  },
];

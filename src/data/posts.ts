export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  description: string;
  category: string;
  publishedAt: string;
  readingTime: string;
  toc: Array<{ id: string; label: string }>;
  sections: Array<{
    id: string;
    heading: string;
    content: string[];
  }>;
  relatedSlugs: string[];
};

export const posts: Post[] = [
  {
    slug: "por-que-el-interes-compuesto-es-importante-y-por-que-deberias-empezar-joven",
    title: "Por qué el interés compuesto es tan importante y por qué deberías empezar joven",
    excerpt:
      "Descubre cómo el tiempo, la constancia y la rentabilidad pueden convertir pequeñas cantidades en un ahorro mucho más grande si empiezas desde joven.",
    description:
      "Explicación detallada del interés compuesto, por qué funciona, cómo mejora con el tiempo y por qué empezar joven puede marcar una gran diferencia en tu futuro financiero.",
    category: "Inversión",
    publishedAt: "2026-09-09",
    readingTime: "10 min de lectura",
    toc: [
      { id: "que-es", label: "Qué es el interés compuesto" },
      { id: "por-que-importa", label: "Por qué importa tanto" },
      { id: "empezar-joven", label: "Por qué empezar joven cambia todo" },
      { id: "ejemplo-practico", label: "Ejemplo práctico con números" },
      { id: "como-empezar", label: "Cómo empezar aunque sea con poco" },
    ],
    sections: [
      {
        id: "que-es",
        heading: "Qué es el interés compuesto y por qué sorprende tanto",
        content: [
          "El interés compuesto es un concepto financiero muy sencillo en teoría, pero con un efecto enorme en la práctica: no solo ganas intereses sobre el dinero que inviertes, sino también sobre los intereses que ese dinero ya ha generado antes.",
          "Es decir, el dinero empieza a trabajar para ti y, con el tiempo, el crecimiento no es lineal. Al principio puede parecer lento, pero a medida que pasan los años el efecto se acelera. Esa es la razón por la que el interés compuesto se considera una de las fuerzas más poderosas para construir patrimonio a largo plazo.",
          "La clave está en entender una idea muy simple: no se trata de ganar mucho de golpe, sino de dejar que el tiempo haga el trabajo pesado. En finanzas, el tiempo suele ser más importante que la cantidad exacta que empieces a ahorrar. La constancia y la paciencia cuentan muchísimo más que intentar encontrar una gran rentabilidad de un día para otro."
        ],
      },
      {
        id: "por-que-importa",
        heading: "Por qué el interés compuesto importa tanto en la vida real",
        content: [
          "La mayoría de la gente se centra en el ingreso mensual o en el sueldo. Eso es importante, pero el verdadero crecimiento patrimonial suele venir de la combinación de tres cosas: ahorrar, evitar gastar demasiado y dejar que el dinero crezca durante años.",
          "El interés compuesto ayuda a convertir pequeñas decisiones diarias en grandes resultados a largo plazo. Por ejemplo, si cada mes apartas una cantidad aunque sea pequeña, no solo estarás aumentando tu saldo, sino que ese saldo también empezará a generar más saldo en el futuro.",
          "Esto es especialmente útil para objetivos como la jubilación, una vivienda, la autonomía financiera o simplemente crear un colchón para imprevistos. Cuando el horizonte es amplio, el interés compuesto te da una ventaja enorme porque no necesita que el dinero sea enorme al inicio, sino que tenga tiempo y continuidad.",
          "Una de las ideas más importantes es que el ahorro no tiene que ser espectacular para ser potente. Si se hace de forma constante, incluso una cuota modesta puede convertirse en una cantidad considerable años después. La clave es empezar antes y seguir sin interrupciones."
        ],
      },
      {
        id: "empezar-joven",
        heading: "Por qué empezar joven cambia todo el resultado",
        content: [
          "Empezar joven no significa que tengas que invertir grandes cantidades o entender todo del mercado desde el principio. Significa que tienes más tiempo para que el efecto del interés compuesto se multiplique. Y ese tiempo es un recurso muy valioso, quizá incluso más valioso que el dinero inicial.",
          "Imagínate dos personas. Una empieza a los 20 años aportando 100 euros al mes. La otra empieza a los 40. Ambas intentan llegar a un mismo objetivo. Aunque la que empiece más tarde podría aportar cantidades mucho mayores, normalmente tendrá que hacer un esfuerzo mucho más grande para alcanzar un resultado parecido, porque el tiempo disponible es mucho menor.",
          "Esto no quiere decir que empezar tarde sea imposible. De hecho, no es imposible en absoluto. Pero sí significa que el coste de esperar es alto. Cuanto más tarde empieces, más sacrificio tendrás que hacer después para compensar la pérdida de años de crecimiento.",
          "Por eso, una de las mejores decisiones financieras que puedes tomar cuando eres joven es crear el hábito del ahorro o la inversión. No hace falta cargar con complejidad ni buscar un producto perfecto desde el inicio. Basta con empezar con una cantidad razonable y revisar la estrategia con calma a lo largo del tiempo."
        ],
      },
      {
        id: "ejemplo-practico",
        heading: "Un ejemplo sencillo para entenderlo bien",
        content: [
          "Vamos a poner un ejemplo práctico. Si una persona invierte 1.000 euros y además aporta 100 euros al mes durante 30 años con una rentabilidad anual media del 6%, el crecimiento no es simplemente 100 euros mensuales durante 30 años. El efecto compuesto hace que cada año esos intereses generen más intereses, y que las aportaciones periódicas también se conviertan en una base cada vez más grande.",
          "Con el paso del tiempo, la diferencia entre ahorrar 100 euros al mes y 300 euros al mes puede parecer grande, pero la diferencia más destacada no viene solo de la cantidad, sino de que el dinero lleva años compuestos. Cuanto más tiempo esté invertido, más impacto tendrá ese crecimiento acumulativo.",
          "Esto también explica por qué muchos ahorros de largo plazo no se sostienen solo en el capital inicial, sino en la repetición constante, la rentabilidad y la paciencia. La fórmula más efectiva no es intentar ganar más de golpe, sino dejar que el tiempo haga su trabajo con disciplina.",
          "Si quieres probarlo tú mismo, puedes usar la calculadora de interés compuesto de Números claritos para simular cómo cambia el resultado según la aportación inicial, la rentabilidad anual y el número de años. Es una forma muy útil de visualizar cómo el tiempo y la constancia pueden transformar cantidades pequeñas en cifras mucho más interesantes.",
          "En términos simples: el interés compuesto premia la continuidad. Si inviertes de forma periódica y mantienes el enfoque a largo plazo, el crecimiento se vuelve cada vez más visible. El secreto no está en la suerte, sino en la regularidad y en no retirar el dinero prematuramente."
        ],
      },
      {
        id: "como-empezar",
        heading: "Cómo empezar aunque sea con poco dinero",
        content: [
          "El primer paso no es llegar a un gran capital, sino construir un hábito. Puedes empezar con una cantidad pequeña y aumentarla con el tiempo. La clave es la regularidad y la consistencia, no la perfección. Muchos pequeños aportes durante años pueden generar mucho más que una gran cantidad que no se mantiene.",
          "Una buena estrategia suele ser automatizar el ahorro. Si cada mes transfieres una cantidad fija a una cuenta de ahorro o a un producto de inversión, la disciplina se vuelve mucho más fácil. Así evitas depender de la motivación del momento y conviertes la decisión en un hábito.",
          "También es importante separar dos ideas: ahorrar para imprevistos y ahorrar para objetivos a medio y largo plazo. El interés compuesto funciona mejor cuando el dinero puede quedarse invertido durante años, y no se retira a la mínima señal de inestabilidad.",
          "No hace falta obsesionarse con la perfección. Lo más útil es empezar con un plan realista, revisarlo periódicamente y dejar que el tiempo haga el resto. Cuando se entiende bien el interés compuesto, la decisión de empezar joven deja de parecer una opción apenas recomendable y pasa a ser una decisión muy inteligente.",
          "En resumen, el interés compuesto no es magia, pero sí es una herramienta muy poderosa. Te recompensa por la paciencia, la disciplina y el tiempo. Y precisamente por eso, el mejor momento para empezar no es el futuro, sino ahora mismo."
        ],
      },
    ],
    relatedSlugs: [
      "como-leer-una-nomina-en-espana-guia-explicativa-paso-a-paso",
      "diferencia-entre-12-y-14-pagas-cual-te-conviene-mas",
      "retenciones-de-irpf-en-2026-tabla-de-tramos-y-como-te-afectan",
    ],
  },
  {
    slug: "como-leer-una-nomina-en-espana-guia-explicativa-paso-a-paso",
    title: "¿Cómo leer una nómina en España? Guía explicativa paso a paso",
    excerpt:
      "Entiende cada concepto de tu nómina, desde el bruto hasta el neto, y descubre qué se retiene por IRPF y Seguridad Social en España.",
    description:
      "Guía paso a paso para interpretar tu nómina en España, entender el bruto, el neto, las cotizaciones y la retención del IRPF.",
    category: "Nóminas",
    publishedAt: "2026-09-08",
    readingTime: "7 min de lectura",
    toc: [
      { id: "resumen", label: "Resumen rápido" },
      { id: "bruto-y-neto", label: "Bruto y neto" },
      { id: "cotizaciones", label: "Cotizaciones a la Seguridad Social" },
      { id: "irpf", label: "IRPF y retenciones" },
      { id: "como-comprobarlo", label: "Cómo revisarlo cada mes" },
    ],
    sections: [
      {
        id: "resumen",
        heading: "Resumen rápido: qué te está diciendo tu nómina",
        content: [
          "Una nómina no es solo un número: es una explicación de la retribución que te corresponde por tu trabajo, su reparto a lo largo del año y las deducciones que se aplican antes del cobro.",
          "En España, lo más importante es separar tres conceptos: salario bruto, cotizaciones y salario neto. El bruto es lo pactado antes de deducciones; el neto es lo que realmente llega a tu cuenta; las cotizaciones y la retención del IRPF son las principales causas de esa diferencia.",
          "Si entiendes estos tres bloques, ya tendrás una base muy sólida para leer cualquier nómina y detectar si algo no encaja."
        ],
      },
      {
        id: "bruto-y-neto",
        heading: "Bruto, neto y el valor real de la nómina",
        content: [
          "El salario bruto es la base sobre la que se calculan las cotizaciones y el IRPF. Puede venir expresado como mensual, anual o como suma de pagas ordinarias y extras, según el contrato y el convenio colectivo.",
          "El sueldo neto es la cantidad que te abona la empresa tras descontar todas las cargas obligatorias. Es el importe que verás en tu cuenta bancaria y la cifra más útil para saber cuánto dinero tienes disponible para gastos, ahorro e inversión.",
          "En la práctica, el sueldo neto no es un dato mágico ni estático: cambia si variamos el salario bruto, la base imponible, el número de pagas o la situación personal del trabajador."
        ],
      },
      {
        id: "cotizaciones",
        heading: "Cotizaciones a la Seguridad Social: qué se descuenta y por qué",
        content: [
          "Las cotizaciones a la Seguridad Social son deducciones obligatorias que financian la protección social: contingencias comunes, desempleo, formación profesional y otros conceptos. Se calculan sobre la base de cotización y no se pagan por capricho, sino porque forman parte del marco jurídico del empleo en España.",
          "Dentro de la nómina suelen aparecer varios importes asociados a la Seguridad Social: contingencias comunes, desempleo, formación profesional, y, en algunos casos, conceptos adicionales según el tipo de contrato o colectivo profesional.",
          "Lo importante es entender que estas cantidades son una parte del coste de la relación laboral, no un impuesto arbitrario. Se aplican a todos los trabajadores con un cálculo reglado y pueden variar según el convenio o la base de cotización."
        ],
      },
      {
        id: "irpf",
        heading: "IRPF: la retención que te afecta cada mes",
        content: [
          "El IRPF es el impuesto sobre la renta. En la nómina, la empresa aplica una retención a cuenta del impuesto anual. Es decir, el trabajador va adelantando parte del que debería pagar en la declaración de la renta.",
          "La retención no depende solo del sueldo bruto, sino también de la base imponible, la situación personal o familiar, las deducciones y la base por tramos. Por eso dos personas con el mismo salario pueden percibir nóminas distintas si tienen situaciones fiscales distintas.",
          "Cuando revises tu nómina, busca la base imponible, la cuota tributaria y la retención aplicada. Si esa retención es muy alta o muy baja respecto a tu perfil, puede ser síntoma de que algo no está bien ajustado en la información fiscal comunicada a la empresa."
        ],
      },
      {
        id: "como-comprobarlo",
        heading: "Cómo revisar tu nómina cada mes sin errores",
        content: [
          "Lo más útil es comparar cada mes el salario bruto, las bases de cotización, las deducciones y el neto final. Si la nómina es estable, no suele haber grandes sorpresas, pero sí conviene revisar si hay cambios en la base, antigüedad, pagas extra, jornada o reducciones de jornada.",
          "También es recomendable mirar el último certificado de retenciones, la documentación de tu contrato y, si procede, el convenio colectivo. La nómina no sustituye la comprensión global de tu situación fiscal y laboral, pero sí es un documento clave para detectar errores o previsiones antes de la declaración de la renta.",
          "Si quieres estimar tu situación antes de que llegue la nómina, una calculadora de salario neto puede ayudarte a hacer un cálculo orientativo que te permita entender el efecto del IRPF, la Seguridad Social y el número de pagas."
        ],
      },
    ],
    relatedSlugs: [
      "diferencia-entre-12-y-14-pagas-cual-te-conviene-mas",
      "retenciones-de-irpf-en-2026-tabla-de-tramos-y-como-te-afectan",
      "contingencias-comunes-y-desempleo-que-te-descuentan-de-la-nomina",
    ],
  },
  {
    slug: "diferencia-entre-12-y-14-pagas-cual-te-conviene-mas",
    title: "Diferencia entre 12 y 14 pagas: ¿Cuál te conviene más?",
    excerpt:
      "Descubre cómo cambia tu nómina mensual si cobras 12 o 14 pagas y qué impacto tiene en el salario neto y la planificación financiera.",
    description:
      "Explicación clara de la diferencia entre 12 y 14 pagas, cómo afecta a la nómina y qué conviene según tu perfil y contrato.",
    category: "Nóminas",
    publishedAt: "2026-09-08",
    readingTime: "6 min de lectura",
    toc: [
      { id: "concepto", label: "Qué significa 12 o 14 pagas" },
      { id: "mensualidad", label: "Efecto sobre el sueldo mensual" },
      { id: "extras", label: "Pagas extraordinarias" },
      { id: "ejemplo", label: "Ejemplo práctico" },
      { id: "conclusion", label: "Conclusión" },
    ],
    sections: [
      {
        id: "concepto",
        heading: "Qué significa tener 12 o 14 pagas",
        content: [
          "En España, la mayoría de los contratos se pagan en 12 mensualidades, aunque algunos convenios y empleos incluyen dos pagas extraordinarias, es decir, 14 pagas anuales. El salario bruto total anual puede ser el mismo, pero el calendario de cobro no lo es.",
          "Esto cambia la forma de percibir el dinero: con 14 pagas, el trabajador suele recibir 14 pagos al año frente a 12, y cada mensualidad ordinaria suele ser más baja. Con 12 pagas, cada cobro mensual es ligeramente más alto, pero las pagas extra no están separadas en fechas específicas.",
          "Es fundamental comprender que no siempre «más pagas» significa «más dinero» en bruto. No existe un criterio universal para decidir qué es mejor; depende del flujo de caja, del calendario personal y del convenio aplicable."
        ],
      },
      {
        id: "mensualidad",
        heading: "Efecto sobre el sueldo mensual",
        content: [
          "La diferencia más visible es la nómina habitual: cuando el salario bruto anual se reparte en 12 pagas, la cantidad mensual suele ser mayor que si se reparte en 14. Esto es importante para quienes tienen gastos fijos y quieren prever mejor su flujo mensual.",
          "En cambio, con 14 pagas el ingreso se distribuye en 14 partes, por lo que la cantidad de cada mensualidad puede ser menor. Sin embargo, el trabajador puede recibir dos pagas extra al año, normalmente en junio y diciembre, que aportan liquidez y permiten planificar gastos extraordinarios.",
          "La clave está en el equilibrio entre recibir más cada mes o contar con ingresos extra puntuales."
        ],
      },
      {
        id: "extras",
        heading: "Las pagas extraordinarias y su impacto real",
        content: [
          "Las pagas extras se consideran parte del salario anual, aunque se abonen en fechas concretas del año. No siempre se calculan igual en todos los convenios, y en algunos casos dependen del calendario de la empresa o las condiciones pactadas.",
          "Cuando se cobra en 14 pagas, la suma anual no cambia en términos de retribución total bruta; lo que cambia es cuándo se recibe. Si la empresa paga dos extras, la suma a percibir se reparte en 14 fracciones, no en 12, y eso puede ajustar el resultado neto anual y la disponibilidad mensual.",
          "Si tu prioridad es amortiguar la presión de gastos mensuales, 12 pagas suele aportar más estabilidad; si buscas un mayor nivel de ahorro o cobros puntuales, 14 pagas puede ser más ventajosa."
        ],
      },
      {
        id: "ejemplo",
        heading: "Ejemplo práctico para entenderlo",
        content: [
          "Supón un salario bruto anual de 30.000 euros. Con 12 pagas, la base mensual sería de 2.500 euros antes de retenciones. Con 14 pagas, el cálculo se reparte en 14 fracciones, así que cada paga mensual sería algo menor, pero la empresa también entregará dos pagas extras en momentos concretos del año.",
          "El resultado neto total puede ser muy parecido si no cambian otras variables. En la práctica, la diferencia real viene de la gestión del flujo de caja y de cómo encaja la nómina con tus gastos, ahorro e inversiones personales."
        ],
      },
      {
        id: "conclusion",
        heading: "Conclusión: qué conviene según tu situación",
        content: [
          "No existe una fórmula mágica para decidir si 12 o 14 pagas es mejor. Si necesitas más dinero cada mes y vas a gastar más a lo largo del año, 12 pagas suele ser más cómodo. Si prefieres planificar con dos grandes ingresos puntuales, 14 pagas puede resultar interesante.",
          "Lo ideal es evaluar la nómina real, revisar el convenio colectivo y comprobar la diferencia neta al final del año. Eso te permitirá comparar los dos escenarios con datos y no con suposiciones."
        ],
      },
    ],
    relatedSlugs: [
      "como-leer-una-nomina-en-espana-guia-explicativa-paso-a-paso",
      "retenciones-de-irpf-en-2026-tabla-de-tramos-y-como-te-afectan",
      "el-mito-del-salto-de-tramo-del-irpf",
    ],
  },
  {
    slug: "retenciones-de-irpf-en-2026-tabla-de-tramos-y-como-te-afectan",
    title: "Retenciones de IRPF en 2026: Tabla de tramos y cómo te afectan",
    excerpt:
      "Consulta la lógica de los tramos del IRPF en 2026 y aprende a interpretar la retención que aparece en tu nómina.",
    description:
      "Guía completa sobre los tramos del IRPF en 2026, la retención en nómina y cómo afecta al salario neto en España.",
    category: "IRPF",
    publishedAt: "2026-09-08",
    readingTime: "8 min de lectura",
    toc: [
      { id: "base", label: "Qué es la retención" },
      { id: "tramos", label: "Tramos del IRPF" },
      { id: "no-significa", label: "Qué no significa" },
      { id: "ejemplo", label: "Ejemplo de cálculo" },
      { id: "recomendacion", label: "Cómo revisar tu caso" },
    ],
    sections: [
      {
        id: "base",
        heading: "Qué es la retención por IRPF en la nómina",
        content: [
          "La retención del IRPF es un pago anticipado del impuesto sobre la renta que realiza la empresa cada mes. Es decir, el trabajador avanza parte de lo que deberá pagar al final del ejercicio en su declaración de la renta.",
          "La retención es un mecanismo de reparto anual: se toma una estimación de la cuota tributaria según la renta y se va liquidando de forma fraccionada en cada nómina. La cifra final puede variar respecto al cálculo anual definitivo, por eso es muy importante entender que es un adelanto y no un dato final.",
          "Cuando el sueldo aumenta, la retención suele ser mayor, pero no siempre en la misma proporción. El importe no se determina solo por el bruto; también influyen la situación personal, las bases retenidas, las deducciones, el tipo de contrato y la información que se comunica al empleador."
        ],
      },
      {
        id: "tramos",
        heading: "Los tramos del IRPF y su lógica",
        content: [
          "El IRPF se calcula por tramos. Cada tramo tiene un tipo impositivo aplicable a la parte de la base imponible que cae dentro de ese rango. Por eso, un aumento de salario no siempre implica que todo el ingreso se gravará con el mismo porcentaje.",
          "El tramo más alto se aplica solo a la parte de la renta que supera el umbral correspondiente. En otras palabras, la parte que cae por debajo del tramo se grava con un porcentaje más bajo. Esto es clave para entender por qué no siempre hay un salto lineal de impuestos al ganar más dinero.",
          "Los tramos pueden variar según la normativa del ejercicio y la situación personal. Lo que sí es constante es que la retención se calcula sobre la base imponible y puede verse influida por las reducciones y deducciones aplicables."
        ],
      },
      {
        id: "no-significa",
        heading: "Qué no significa una retención alta",
        content: [
          "Una retención elevada no significa necesariamente que vayas a pagar más impuesto al final del año. Puede ser solo un adelanto mayor, y la diferencia se regulariza en la declaración. Del mismo modo, una retención baja no siempre significa que te vayas a quedar con más renta final si luego te toca liquidar más en la declaración.",
          "La finalidad del IRPF en la nómina es que el trabajador vaya saldando su deuda tributaria de manera gradual, sin que haya que pagar de golpe al final del año. Por eso algunas personas reciben más neto en la nómina pero luego pagan más en la declaración, y viceversa."
        ],
      },
      {
        id: "ejemplo",
        heading: "Ejemplo simplificado",
        content: [
          "Si tu base imponible anual está en un tramo bajo, tu retención será menor. Si la base imponible crece y entra en un tramo superior, la parte adicional puede tributar más, pero no todo el salario se grava al máximo. Ese sistema hace que la relación entre ingreso bruto y cuota final no sea lineal.",
          "Por eso es útil revisar la nómina y comparar la base imponible, la cuota a pagar y la retención aplicada. Ver esos datos con claridad te permite anticiparte y detectar si realmente estás pagando según tu perfil fiscal."
        ],
      },
      {
        id: "recomendacion",
        heading: "Cómo comprobar si tu retención está bien",
        content: [
          "El primer paso es mirar la base imponible y la situación personal declarada a la empresa. Si cambias de empleo, te separas, tienes hijos o cambias de contrato, la retención puede ajustarse. También influye que el certificado de retenciones muestre un residuo anual positivo o negativo respecto a tu situación real.",
          "Si quieres calcular tu caso con rigor, usa una estimación orientativa de nómina y compara la retención aplicable con la renta anual esperada. Es una forma útil de detectar exageraciones y entender qué porcentaje te están dejando en la cuenta cada mes."
        ],
      },
    ],
    relatedSlugs: [
      "como-leer-una-nomina-en-espana-guia-explicativa-paso-a-paso",
      "contingencias-comunes-y-desempleo-que-te-descuentan-de-la-nomina",
      "el-mito-del-salto-de-tramo-del-irpf",
    ],
  },
  {
    slug: "contingencias-comunes-y-desempleo-que-te-descuentan-de-la-nomina",
    title: "Contingencias comunes y desempleo: ¿Qué te descuentan de la nómina?",
    excerpt:
      "Conoce qué conceptos se descuentan por contingencias comunes, desempleo y formación profesional, y qué protección te brinda cada uno.",
    description:
      "Desglose de las cotizaciones por contingencias comunes y desempleo en la nómina y qué conceptos se descuentan cada mes en España.",
    category: "Seguridad Social",
    publishedAt: "2026-09-08",
    readingTime: "7 min de lectura",
    toc: [
      { id: "que-son", label: "Qué son estas cotizaciones" },
      { id: "contingencias", label: "Contingencias comunes" },
      { id: "desempleo", label: "Desempleo" },
      { id: "formacion", label: "Formación profesional" },
      { id: "recomendacion", label: "Cómo revisarlas" },
    ],
    sections: [
      {
        id: "que-son",
        heading: "Qué son estas cotizaciones y por qué aparecen en la nómina",
        content: [
          "La Seguridad Social recoge una serie de cotizaciones que se descuentan de la nómina para financiar la protección social del trabajador. Estas cuotas están reguladas y forman parte del sistema público de protección laboral en España.",
          "En la práctica, cada nómina incluye conceptos asociados a contingencias comunes, desempleo y formación profesional, entre otros. Aunque no todas las personas ven exactamente los mismos importes, la lógica es similar para la mayoría de los contratos por cuenta ajena."
        ],
      },
      {
        id: "contingencias",
        heading: "Contingencias comunes",
        content: [
          "Las contingencias comunes cubren situaciones de enfermedad, baja por accidente, protección sanitaria y otros riesgos generales. Es uno de los conceptos más habituales dentro de la cotización de la Seguridad Social.",
          "En una nómina, este apartado suele aparecer como un porcentaje de la base de cotización. Su finalidad es garantizar la protección del trabajador frente a situaciones que puedan afectar a su salud o a su capacidad de trabajo."
        ],
      },
      {
        id: "desempleo",
        heading: "Desempleo",
        content: [
          "La cuota por desempleo también se descuenta del salario para financiar la prestación por desempleo y otros mecanismos de protección ante la pérdida del empleo. Aunque se suele considerar un tipo de cotización general, su cuantía depende de la base de cotización y del tipo aplicable.",
          "Esto es importante porque, aunque no te da de inmediato un beneficio económico, te permite acceder a protección si te quedas sin empleo por circunstancias cubiertas por la normativa."
        ],
      },
      {
        id: "formacion",
        heading: "Formación profesional",
        content: [
          "El apartado de formación profesional es otra cotización de la Seguridad Social. Su objetivo es financiar la formación y la mejora de competencias del trabajador dentro del sistema de empleo y protección social.",
          "En algunos casos, este concepto va junto con otras cotizaciones y, aunque su afectación al sueldo neto suele ser menor, sí forma parte del total que te se descuenta cada mes."
        ],
      },
      {
        id: "recomendacion",
        heading: "Cómo revisar este descuento sin asustarte",
        content: [
          "Lo más importante es entender que estas cotizaciones no son un recargo arbitrario, sino una parte del sistema de protección social español. La forma más útil de revisarlo cada mes es comparar la base de cotización y las cantidades parciales dentro de la nómina.",
          "Si detectas cambios inesperados en estas cuotas, es recomendable revisar si hubo una modificación de contrato, salario base, convenio o situación laboral. Un análisis de la nómina te permitirá detectar si la diferencia es razonable o si hay un error de cálculo."
        ],
      },
    ],
    relatedSlugs: [
      "como-leer-una-nomina-en-espana-guia-explicativa-paso-a-paso",
      "retenciones-de-irpf-en-2026-tabla-de-tramos-y-como-te-afectan",
      "diferencia-entre-12-y-14-pagas-cual-te-conviene-mas",
    ],
  },
  {
    slug: "el-mito-del-salto-de-tramo-del-irpf",
    title: "El mito del salto de tramo del IRPF: Por qué no cobras menos si ganas más",
    excerpt:
      "Explicamos por qué el IRPF se aplica por tramos y por qué un aumento de sueldo no siempre significa que te queden menos euros netos en la nómina.",
    description:
      "Entiende cómo funciona el IRPF por tramos y por qué un aumento de sueldo no equivale automáticamente a cobrar menos neto.",
    category: "IRPF",
    publishedAt: "2026-09-08",
    readingTime: "6 min de lectura",
    toc: [
      { id: "mito", label: "El mito del salto de tramo" },
      { id: "tramos", label: "Cómo funciona por tramos" },
      { id: "porque-ganas-mas", label: "Por qué puedes ganar más neto" },
      { id: "ejemplo", label: "Ejemplo visual" },
      { id: "conclusion", label: "Conclusión" },
    ],
    sections: [
      {
        id: "mito",
        heading: "El mito del salto de tramo del IRPF",
        content: [
          "Una idea muy extendida es que, si ganas más, te quedas peor porque pasas a un tramo del IRPF más alto. Esto es parcialmente cierto en términos de tributación marginal, pero no es una regla que signifique que el salario neto baje al ganar más.",
          "El IRPF se aplica por tramos en la base imponible. Eso significa que solo la parte de la renta que supera cada umbral tributa al tipo correspondiente. La parte inferior sigue gravando con un porcentaje menor. No todo el salario se grava a «tipo máximo».",
          "Por eso, un aumento de sueldo puede suponer una renta neta mayor, pese a que una parte adicional se quede retenida en cada nómina."
        ],
      },
      {
        id: "tramos",
        heading: "La clave: se tribut a bandas, no a toda la cuantía igual",
        content: [
          "Cuando hablamos de IRPF por tramos, casi siempre se hace referencia a una regla de progresividad. La base imponible se divide en porciones y cada porción tributa de forma distinta. Es una lógica muy distinta a sumar todo el salario y aplicar un único porcentaje a la totalidad.",
          "Esta estructura es la que permite que un aumento de ingresos pueda implicar más neto, incluso si se aplica una retención superior en la parte extra. El sistema progresa de manera gradual, y no es una penalización automática por subir de nivel salarial."
        ],
      },
      {
        id: "porque-ganas-mas",
        heading: "Por qué puedes ganar más neto aunque suba la retención",
        content: [
          "Imagina que aumentas tu sueldo en 500 euros al mes. Aunque una parte de ese incremento pueda quedar sujeta a un tipo impositivo más alto, el resto de la base sigue gravándose a porcentajes más bajos. Así, el incremento bruto puede reflejarse en un aumento neto del salario disponible.",
          "La retención es útil para evitar que el trabajador tenga que afrontar un gran pago al final del año, pero no siempre se interpreta como un castigo por ganar más. Lo importante es distinguir entre el tipo medio, el tipo marginal y la renta total disponible."
        ],
      },
      {
        id: "ejemplo",
        heading: "Ejemplo para entender la diferencia",
        content: [
          "Si subes desde 1.800 a 2.200 euros mensuales brutos, es posible que la base imponible aumente y la retención del IRPF también. Pero el salario neto final puede seguir creciendo, ya que cada tramo se grava de forma distinta y la base total del ingreso cambia.",
          "En este tipo de escenarios, resulta muy útil comparar el neto mensual y el neto anual, no solo la retención aplicada. Eso permite dejar de lado el mito y concentrarse en la realidad económica del caso."
        ],
      },
      {
        id: "conclusion",
        heading: "Conclusión",
        content: [
          "El salto de tramo del IRPF no es un castigo automático. Es un sistema progresivo que te permite ganar más y, en términos de renta disponible, seguir mejorando tu situación financiera si la base imponible aumenta de forma sostenida.",
          "La mejor estrategia es entender los tramos, consultar la nómina y usar una calculadora de sueldo neto para observar el efecto real del incremento antes de asumir que “si ganas más, cobras menos”."
        ],
      },
    ],
    relatedSlugs: [
      "retenciones-de-irpf-en-2026-tabla-de-tramos-y-como-te-afectan",
      "como-leer-una-nomina-en-espana-guia-explicativa-paso-a-paso",
      "diferencia-entre-12-y-14-pagas-cual-te-conviene-mas",
    ],
  },
];

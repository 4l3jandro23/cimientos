/* Contenido ampliado 17: calle, límites, manipulación, estafas y que no se aprovechen de ti (sin volverte desconfiado ni duro). */
'use strict';
const S18 = (id, titulo, pasa, hacer, sale, practica, extra) => ({ id, titulo, pasa, hacer, ejemplos: [], cierre: '', extra: extra || [], sale, practica });

DOCS.push(
  { id:'d-calle', grupo:'calle', icono:'🧠', titulo:'Tener calle sin dejar de ser buena persona', sub:'Qué es y cómo se gana', secciones:[
    ['Qué es de verdad', ['Tener calle no es ser duro, desconfiado ni vacilón. Es leer bien a las personas y las situaciones, y poder decir que no cuando algo no encaja.', 'Se puede tener mucha calle y ser amable. De hecho, es lo mejor: bondad con criterio.']],
    ['Lo que lo da', ['Experiencia: cada situación nueva te enseña. Por eso se gana con el tiempo y con intentar cosas.', 'Observar: cómo hablan, si lo que dicen coincide con lo que hacen.', 'Hablar con gente de todo tipo: cuanto más variada, más aprendes.', 'Equivocarte y aprender sin castigarte.']],
    ['La regla de oro', ['Los hechos repetidos pesan más que las palabras. Una persona se conoce por lo que hace una y otra vez, no por lo que promete.']],
    ['El primo y el duro', ['El «primo» cree todo y da sin mirar. El «duro» no se fía de nadie. Lo sano es el punto medio: confiar poco a poco, según lo que vas viendo.']],
    ['Un hábito útil', ['Cuando algo te chirríe, no te lo calles: pregúntate «¿qué me molesta exactamente?» y apúntalo. Tu intuición suele detectar antes de que sepas explicarlo.']]
  ]},
  { id:'d-limites', grupo:'calle', icono:'🚧', titulo:'Poner límites y decir que no sin culpa', sub:'La habilidad que más te protege', secciones:[
    ['Por qué cuesta', ['Si de pequeño aprendiste que decir que no molesta, de mayor lo evitas. Es muy común en gente amable.', 'Decir que no a algo no es rechazar a la persona: es cuidar tu tiempo, tu dinero o tu energía.']],
    ['Fórmula sencilla', ['Un no claro y breve, sin justificarte de más: «Gracias, pero no me viene bien».', 'Si quieres suavizarlo: añade una alternativa: «Otro día sí» o «Eso no, pero esto sí».', 'No hace falta una excusa. Cuantas más excusas, más fácil es que insistan.']],
    ['Si insisten', ['Repite lo mismo con calma, como un disco rayado: «Ya te lo he dicho, no me viene bien».', 'No te enfades ni te justifiques. Con repetir basta.']],
    ['Frases útiles', ['«Lo pienso y te digo».', '«Hoy no puedo».', '«No me siento cómodo con eso».', '«Prefiero no hacerlo».', '«Eso no lo hago».']],
    ['Cómo saber si es sano', ['Quien te quiere bien acepta tus límites sin castigarte. Quien se enfada, te hace sentir culpable o insiste, te está dando información.']]
  ]},
  { id:'d-aprovechan', grupo:'calle', icono:'🧲', titulo:'Cómo se aprovechan de la gente buena', sub:'Las formas más comunes y cómo verlas', secciones:[
    ['Con favores', ['Te piden cosas pequeñas que van creciendo: llevar, recoger, hacer algo por ellos.', 'Pista: siempre das tú y casi nunca recibes.']],
    ['Con dinero', ['Te piden prestado «hasta el mes que viene» y nunca vuelve. O siempre te toca pagar a ti.', 'Pista: evitan hablar del tema cuando toca devolver.']],
    ['Con tiempo y energía', ['Te llaman cuando necesitan algo o cuando están mal, y desaparecen cuando estás tú mal.', 'Pista: la relación solo existe cuando les conviene.']],
    ['Con tu afecto', ['Te dan migajas de atención para que sigas ahí y no pidas más.', 'Pista: te sientes agradecido por muy poco.']],
    ['Qué hacer', ['Pon un límite pequeño y mira cómo reacciona. La reacción lo dice todo.', 'Equilibra: da a quien da. Y acepta que no todo el mundo merece tu energía.', 'Habla con alguien de confianza para tener otra mirada.']]
  ]},
  { id:'d-manipulacion', grupo:'calle', icono:'🎭', titulo:'Manipulación: tácticas comunes y cómo verlas', sub:'Aprende a reconocerlas para no caer', secciones:[
    ['Culpa', ['«Si de verdad me quisieras…», «Después de todo lo que he hecho por ti…».', 'Cómo verla: te sientes mal por decir que no. Respuesta: «Te quiero y aun así no puedo hacerlo».']],
    ['Gaslighting', ['Te hacen dudar de tu memoria o tu percepción: «Eso nunca pasó», «Estás exagerando», «Estás loco».', 'Cómo verla: sales de la conversación sin saber qué crees. Respuesta: anota las cosas y di «Yo lo recuerdo así».']],
    ['Ley del hielo', ['Te ignoran para castigarte hasta que cedes.', 'Cómo verla: el silencio llega después de que expreses algo. Respuesta: «Cuando quieras hablar, aquí estoy». Y sigue con tu vida.']],
    ['Bombardeo de amor (love bombing)', ['Mucho cariño, halagos y planes enseguida, y luego frialdad o control.', 'Cómo verla: demasiado intenso demasiado pronto. Respuesta: ve más despacio y mira si es constante con el tiempo.']],
    ['Calor y frío', ['Un día muy cariñosa y otro muy distante, sin motivo.', 'Cómo verla: vives pendiente del móvil. Respuesta: pide claridad y mira los hechos de varias semanas.']],
    ['Presión de tiempo', ['«Tienes que decidir ya», «Es una oportunidad única».', 'Cómo verla: no te dejan pensar. Respuesta: «Lo pienso y te digo». Si es bueno, esperará.']],
    ['Triangulación', ['Te comparan con otros o te cuentan que tienen más opciones para que compitas.', 'Cómo verla: te hace sentir en competición. Respuesta: «No quiero competir».']],
    ['Victimismo', ['Siempre es la víctima y tú el culpable de todo.', 'Cómo verla: acabas pidiendo perdón por cosas que no hiciste. Respuesta: escucha, pero no asumas lo que no es tuyo.']],
    ['Halagos con intención', ['«Eres el único que me entiende» seguido de una petición.', 'Cómo verla: el halago viene antes de pedir algo.']],
    ['Una pregunta clave', ['¿Cómo me siento después de hablar con esta persona? Si casi siempre peor, mal asunto.']]
  ]},
  { id:'d-banderas', grupo:'calle', icono:'🚩', titulo:'Banderas rojas y verdes', sub:'Señales de alarma y señales buenas', secciones:[
    ['Rojas (para parar y mirar)', ['Quiere controlar con quién hablas, dónde vas o qué móvil.', 'Se enfada si dices que no o pones límites.', 'Te insulta, te humilla o se ríe de tus inseguridades.', 'Te aísla de tus amigos y tu familia.', 'Miente o cambia la historia.', 'Es muy intensa al principio y luego cambia.', 'Habla mal de todos sus ex y nunca tiene culpa.', 'Presiona para ir más rápido de lo que tú quieres.']],
    ['Verdes (buena señal)', ['Respeta tus límites y tus tiempos.', 'Te escucha y se interesa por tu vida.', 'Es coherente: lo que dice y hace coinciden.', 'Puede decir «lo siento» y cambiar.', 'Te anima a ver a tus amigos y a tus cosas.', 'Te sientes tranquilo a su lado.']],
    ['Una regla', ['Una bandera roja aislada es una pista. Varias, o repetidas, son un patrón. Hazle caso a los patrones.']]
  ]},
  { id:'d-estafas', grupo:'calle', icono:'🕵️', titulo:'Estafas y timos: apps, calle y noche en Barcelona', sub:'Los más comunes y cómo evitarlos', secciones:[
    ['Estafa romántica online', ['Alguien que te escribe muy cariñosa, no puede quedar o hacer videollamada y, tras unas semanas, te pide dinero por una urgencia.', 'Regla: nunca envíes dinero a alguien que no has conocido en persona.']],
    ['Perfiles falsos', ['Fotos demasiado perfectas, historia poco clara, evita videollamada. Busca la foto en el buscador inverso y pide una videollamada breve.']],
    ['Sextorsión', ['Te piden fotos íntimas y luego te amenazan con difundirlas si no pagas.', 'Qué hacer: no pagues, bloquea, guarda pruebas y denuncia (Policía Nacional o Guardia Civil). No eres culpable.']],
    ['El bar de la «invitación»', ['Una chica (o grupo) te aborda en la calle, te invita a un bar o local y te cobran una cuenta enorme. Es un timo conocido en zonas turísticas.', 'Regla: no te vayas a un local con desconocidos que te abordan en la calle. Pregunta precios antes de pedir.']],
    ['Calle y turismo', ['Carteristas en metro, Rambla y zonas concurridas: mochila delante y móvil en bolsillo interior.', 'Timos de la pulsera, del juego de los vasos y de «firma por esta causa»: ignora y sigue.']],
    ['Entradas y ofertas', ['Entradas de reventa solo en plataformas oficiales. Cuidado con ofertas «increíbles» por mensaje.']],
    ['Inversiones y negocios', ['«Gana dinero fácil», criptos garantizadas, pirámides y multinivel: si prometen mucho sin riesgo, es estafa.']],
    ['Reglas de oro', ['Si algo te presiona o parece demasiado bueno, para y consulta con alguien de confianza.', 'Nunca des códigos, contraseñas ni datos del banco.']]
  ]},
  { id:'d-seguridad-noche', grupo:'calle', icono:'🌃', titulo:'Seguridad de noche', sub:'Para disfrutar sin sustos', secciones:[
    ['Tu bebida', ['No la pierdas de vista ni aceptes bebidas abiertas de desconocidos. Si la dejas, pide otra.']],
    ['Con quién y cómo', ['Avisa a un amigo de dónde estás y comparte la ubicación en tiempo real.', 'Acordad una frase o un gesto por si alguien se siente mal.']],
    ['Volver a casa', ['Taxi, VTC o NitBus. No vayas solo si has bebido mucho.', 'Cuida de tus amigos y que cuiden de ti.']],
    ['Con desconocidos', ['No vayas a un sitio aislado con alguien que acabas de conocer sin que un amigo lo sepa.', 'Si te sientes mal de golpe (mareo raro, sueño intenso), avisa a un amigo o al personal.']],
    ['Cartera y móvil', ['Lleva lo imprescindible y guárdalo en bolsillo interior. Haz copia de seguridad del móvil.']]
  ]},
  { id:'d-dinero-limites', grupo:'calle', icono:'💶', titulo:'Dinero, favores y préstamos', sub:'Cuándo sí, cuándo no, y cómo decirlo', secciones:[
    ['Regla básica', ['Presta solo lo que puedas permitirte no recuperar. Si no puedes perderlo, no lo prestes.']],
    ['Cómo decir que no', ['«Ahora no me viene bien».', '«No suelo prestar dinero, pero te ayudo de otra manera».']],
    ['Si prestas', ['Ponlo claro: cuánto y cuándo se devuelve. Un mensaje escrito basta.', 'Si no devuelven, recuérdalo con calma. Si siguen evitándolo, pierdes la confianza.']],
    ['Con pareja o ligue', ['Pagar a veces es un detalle. Pagar siempre y sin recibir nada, no. Mira el equilibrio.', 'Cuidado con quien te pide dinero pronto en una relación.']]
  ]},
  { id:'d-presion-grupo', grupo:'calle', icono:'👥', titulo:'Presión de grupo y bromas pesadas', sub:'Cuando «es una broma» y a ti no te hace gracia', secciones:[
    ['Qué pasa', ['Hay grupos donde se vacila a uno para reír. A veces es cariño; a veces es humillación.']],
    ['Cómo diferenciar', ['Cariño: todos se ríen juntos y todos reciben. Humillación: siempre le toca al mismo y no le hace gracia.']],
    ['Cómo responder', ['Con calma y una sonrisa: «Esa no me ha hecho gracia».', 'O con humor ligero: «Vaya, qué original».', 'Si se repite: «Prefiero que no bromees con eso».', 'Si no cambian, alejarte un poco es sano.']],
    ['Presión para hacer cosas', ['«Venga, tío, bebe», «No seas aburrido». Un «yo paso» con una sonrisa basta.']]
  ]},
  { id:'d-ligue-trampas', grupo:'calle', icono:'🪤', titulo:'Trampas del ligue y las apps', sub:'Patrones que te hacen perder el tiempo y el ánimo', secciones:[
    ['Migajas (breadcrumbing)', ['Te da atención de vez en cuando sin comprometerse.', 'Respuesta: pide claridad o aléjate.']],
    ['Banquillo (benching)', ['Te mantiene «en reserva» mientras ve a otros.', 'Respuesta: si no priorizas, no estás.']],
    ['Apoyo emocional sin nada más', ['Te cuenta todo, te usa de consuelo y no hay interés romántico.', 'Respuesta: decide si te compensa y pon límites.']],
    ['Orbitar', ['Desaparece pero sigue viendo tus historias y dando likes.', 'Respuesta: no le des importancia; silencia si te afecta.']],
    ['Ghosting', ['Desaparece sin más. No es culpa tuya: dice más de quien lo hace.']],
    ['Una pregunta útil', ['¿Esta persona invierte tanto como yo? Si no, es información.']]
  ]},
  { id:'d-relaciones-danino', grupo:'calle', icono:'🆘', titulo:'Relaciones que hacen daño: señales y salidas', sub:'Para detectarlo a tiempo y pedir ayuda', secciones:[
    ['Señales', ['Ciclos de tensión, explosión y reconciliación.', 'Control, celos intensos, humillaciones, miedo a su reacción.', 'Te sientes culpable, pequeño o «raro» casi siempre.']],
    ['Importante', ['Esto le puede pasar a cualquier persona, también a los hombres. Pedir ayuda no es de débiles.']],
    ['Qué hacer', ['Habla con alguien de confianza y con un psicólogo.', 'Guarda mensajes y pruebas si hay amenazas.', 'Si hay peligro físico o amenazas graves: 112.', 'Si te sientes mal emocionalmente: 024 (atención a la conducta suicida, 24 horas).']],
    ['Salir', ['Salir de una relación así es difícil y lleva tiempo. Hazlo con apoyo y poco a poco.']]
  ]},
  { id:'d-sin-ser-duro', grupo:'calle', icono:'🤝', titulo:'Ser amable sin ser primo', sub:'La fórmula que te protege y te hace atractivo', secciones:[
    ['La fórmula', ['Amable con todos, confiado solo poco a poco.', 'Generoso con quien lo es contigo.', 'Claro con lo que quieres y con lo que no.']],
    ['Tres hábitos', ['Espera antes de decir sí a lo importante: «Lo pienso».', 'Pregúntate qué hay detrás de una petición.', 'Observa cómo reacciona cuando dices que no.']],
    ['Lo que ganas', ['Respeto, mejores relaciones y más seguridad. La gente buena con límites es mucho más atractiva que la gente buena sin ellos.']]
  ]},
  { id:'d-leer-gente', grupo:'calle', icono:'👀', titulo:'Cómo leer a las personas', sub:'Intenciones, coherencia y señales', secciones:[
    ['Coherencia', ['¿Lo que dice coincide con lo que hace? ¿Y con cómo trata a los demás?']],
    ['Trato a los demás', ['Fíjate en cómo trata a camareros, a gente «sin poder» y a quien no le interesa. Dice mucho.']],
    ['Intención', ['¿Qué gana con esto? Que alguien gane no es malo, pero si solo gana ella y tú pierdes, mira.']],
    ['El tiempo', ['Las personas se muestran con el tiempo. Mejor ir poco a poco antes de dar confianza total.']],
    ['Tu cuerpo', ['A veces el cuerpo avisa antes: tensión, nudo, ganas de irte. No lo ignores, escríbelo y piénsalo.']]
  ]},
  { id:'d-captadores', grupo:'calle', icono:'📣', titulo:'Captadores, vendedores y propuestas raras', sub:'Cómo decir que no y seguir', secciones:[
    ['Qué pasa', ['En la calle y en apps hay gente que busca captar: ONG, ofertas, cursos, «oportunidades de negocio».']],
    ['Cómo actuar', ['No te pares si no quieres: un «no, gracias» sin parar de andar.', 'No des datos personales ni bancarios.', 'Si insisten o te toman del brazo, aléjate o pide ayuda.']],
    ['Propuestas de dinero fácil', ['Pirámides, multinivel, cripto garantizada, «trabajo desde casa» con pago previo: no.']],
    ['Regla simple', ['Si no te dejan pensarlo ni consultar con alguien, no es buena oferta.']]
  ]},
  { id:'d-trabajo-aprovechan', grupo:'calle', icono:'💼', titulo:'Que no se aprovechen de ti en el trabajo', sub:'Límites sanos con compañeros y jefes', secciones:[
    ['Señales', ['Te cargan tareas de otros, te piden horas extra sin reconocer y nunca dicen «gracias».']],
    ['Cómo actuar', ['Ayuda cuando puedas, pero marca límites: «Hoy no llego, ¿lo vemos mañana?».', 'Deja constancia por escrito de lo importante.', 'Pide reconocimiento: «Me gustaría que se tuviera en cuenta».']],
    ['Cuándo hablar', ['Si se repite, habla con tu responsable o con RR. HH.']]
  ]},
  { id:'d-amistades-toman', grupo:'calle', icono:'⚖️', titulo:'Amistades que solo toman', sub:'Cómo equilibrar y cuándo alejarte', secciones:[
    ['Señales', ['Siempre eres tú quien propone, escucha y ayuda. Cuando necesitas algo, no están.']],
    ['Qué hacer', ['Prueba a no ser tú quien propone una vez y mira qué pasa.', 'Dile con calma cómo te sientes: «Siento que doy más».']],
    ['Cuándo alejarte', ['Si nada cambia, reduce la energía y apuesta por quien sí devuelve.']]
  ]}
);

GUIA.push(
  { bloque:'Calle: que no se aprovechen de ti', items:[
    S18('g-piden-dinero', 'Te piden dinero prestado', 'Alguien cercano o conocido te pide dinero y te da corte decir que no.', [
      'Presta solo lo que puedas perder sin problema.',
      'Dilo claro: «Ahora no me viene bien».',
      'Si prestas, fija cuánto y cuándo y apúntalo por escrito.',
      'Si la relación depende de que prestes, ya sabes qué es.'
    ], 'Decir que no no te hace mala persona: te hace persona con límites.', 'Practicar «ahora no me viene bien»'),
    S18('g-siempre-pagas', 'Siempre acabas pagando tú', 'En planes y citas, la cuenta siempre te toca a ti.', [
      'Invitar a veces es un detalle. Siempre, no.',
      'Propón dividir con naturalidad: «¿Vamos a medias?».',
      'Si ella espera que pagues siempre, es información sobre lo que busca.',
      'Equilibra: «Hoy invito yo, la próxima tú».'
    ], 'Quien te valora quiere repartir, no cobrar.', 'Proponer pagar a medias o turnarnos'),
    S18('g-favores', 'Te piden favores todo el rato', 'Siempre te llaman cuando necesitan algo.', [
      'Elige cuándo ayudas y cuándo no.',
      'Di «hoy no puedo» sin dar explicaciones.',
      'Fíjate en si te ayudan a ti cuando lo necesitas.',
      'Si no hay reciprocidad, reduce el trato.'
    ], 'Ayudar no es obligación.', 'Decir que no a un favor esta semana'),
    S18('g-culpa', 'Te hacen sentir culpable para que cedas', 'Te dicen «si me quisieras…» o «después de lo que hice por ti…».', [
      'Para y respira. No decidas sintiéndote culpable.',
      'Contesta con calma: «Te quiero, y aun así hoy no puedo».',
      'No te justifiques en exceso.',
      'Si se repite, es un patrón.'
    ], 'Decir que no no es dejar de querer.', 'Practicar «te quiero y aun así no puedo»'),
    S18('g-gaslighting', 'Te hacen dudar de lo que recuerdas', 'Te dicen «eso nunca pasó» o «estás exagerando» cuando planteas algo.', [
      'Apunta lo que pasa con fecha: móvil o diario.',
      'Dilo con calma: «Yo lo recuerdo así».',
      'No discutas quién tiene razón en el momento; mira el patrón.',
      'Cuéntaselo a alguien de confianza para contrastar.'
    ], 'Tu percepción importa. Si dudas mucho, habla con tu psicóloga.', 'Anotar en el diario una conversación que me dejó dudando'),
    S18('g-hielo', 'Te ignoran para castigarte', 'Tras decir algo que no les gusta, te dejan de hablar.', [
      'No corras a pedir perdón por algo razonable.',
      'Di una vez: «Cuando quieras hablar, aquí estoy». Y sigue con tu vida.',
      'Observa si cambian cuando ceden otros.',
      'Si es habitual, es una forma de control.'
    ], 'El silencio como castigo no es comunicación.', 'Responder una vez con calma y no perseguir'),
    S18('g-calor-frio', 'Un día muy cariñosa y otro distante', 'No sabes a qué atenerte y vives pendiente del móvil.', [
      'Mira los hechos de varias semanas, no de un día.',
      'Pregunta con calma: «Noto que a veces estás muy cerca y otras lejos, ¿qué pasa?».',
      'Si no hay claridad, decide qué quieres tú.',
      'Evita adaptarte a todo: tu estabilidad vale.'
    ], 'Quien quiere, se nota de forma constante.', 'Apuntar cómo me siento cada semana con esa persona'),
    S18('g-love-bombing', 'Todo va muy rápido y muy intenso', 'Mucho cariño, planes y halagos desde el primer día.', [
      'Disfruta pero ve a tu ritmo.',
      'Mira si es constante o si luego cambia.',
      'No tomes decisiones grandes en las primeras semanas.',
      'Si te agobia, dilo: «Me gusta, pero prefiero ir más despacio».'
    ], 'Lo que es bueno resiste el tiempo.', 'Decir «prefiero ir más despacio» sin culpa'),
    S18('g-presion-tiempo', 'Te presionan para decidir ya', 'Te dicen «es ahora o nunca» sobre un plan, un dinero o una relación.', [
      'Responde: «Lo pienso y te digo».',
      'Si es algo bueno, esperará.',
      'Consúltalo con alguien de confianza.',
      'La prisa es una señal de alerta.'
    ], 'Quien te respeta te da tiempo.', 'Practicar «lo pienso y te digo»'),
    S18('g-estafa-app', 'Alguien de una app te pide dinero', 'Tras unas semanas hablando, aparece una urgencia y te piden ayuda económica.', [
      'No envíes dinero a nadie que no conozcas en persona.',
      'Pide una videollamada: si la evita, sospecha.',
      'Busca sus fotos con el buscador inverso.',
      'Bloquea y denuncia el perfil.'
    ], 'No es culpa tuya: estas estafas están muy bien pensadas.', 'Recordar la regla: no mando dinero a quien no conozco en persona'),
    S18('g-sextorsion', 'Te amenazan con difundir fotos tuyas', 'Te piden dinero a cambio de no publicarlas.', [
      'No pagues: suelen seguir pidiendo.',
      'Bloquea, guarda las pruebas y denuncia.',
      'Cuéntalo a alguien de confianza: no estás solo.',
      'No eres culpable: es un delito.'
    ], 'Pedir ayuda enseguida lo arregla antes.', 'Saber dónde denunciar y a quién llamar'),
    S18('g-bar-estafa', 'Te abordan en la calle para ir a un bar', 'Una chica o un grupo te invitan a un local y no conoces el sitio.', [
      'No vayas a locales a los que te llevan desconocidos en zonas turísticas.',
      'Pregunta precios antes de pedir.',
      'Si te piden una cuenta enorme, no pagues a la fuerza: llama a la policía.',
      'Mejor elige tú el sitio.'
    ], 'Es un timo muy conocido. Reconocerlo es protegerte.', 'Elegir yo el sitio cuando alguien me invita'),
    S18('g-vacilan', 'Te vacilan en el grupo', 'Siempre eres el blanco de las bromas.', [
      'Responde con calma y una sonrisa: «Esa no me ha hecho gracia».',
      'Si se repite, díselo en privado.',
      'Observa si se ríen contigo o de ti.',
      'Aléjate de quien no cambia.'
    ], 'No tienes que aguantar bromas que te hieren.', 'Decir una vez «esa no me ha hecho gracia»'),
    S18('g-amigo-usa', 'Un amigo solo te busca cuando le conviene', 'Cuando necesita algo, aparece; cuando tú, no.', [
      'Prueba a no proponer tú y mira qué pasa.',
      'Díselo con calma: «Siento que no estás cuando te necesito».',
      'Reduce lo que das si no hay reciprocidad.',
      'Apuesta por quien sí está.'
    ], 'Perder una amistad así no es perder mucho.', 'Dejar que otro proponga un plan'),
    S18('g-carga-trabajo', 'Te cargan trabajo en la oficina', 'Compañeros te pasan tareas y acabas con todo.', [
      'Di «hoy no llego, ¿lo vemos mañana?».',
      'Deja constancia de lo que haces.',
      'Habla con tu responsable si se repite.',
      'Ayudar sí; hacer el trabajo de otros, no.'
    ], 'Marcar límites en el trabajo se respeta.', 'Decir «hoy no llego» sin culpa'),
    S18('g-apoyo-emocional', 'Ella te usa de apoyo emocional', 'Te cuenta todo, te busca cuando está mal y no hay nada más.', [
      'Decide si te compensa ser su apoyo sin recibir más.',
      'Díselo: «Me encanta ayudarte, pero siento que yo busco algo más».',
      'Si no cambia, pon distancia.',
      'No esperes a que cambie por sí sola.'
    ], 'Tu cariño merece reciprocidad.', 'Decir con calma qué busco yo'),
    S18('g-celos-provocados', 'Te provoca celos a propósito', 'Te cuenta de otros chicos o te compara.', [
      'No entres en competición.',
      'Di: «No me gusta competir, prefiero claridad».',
      'Mira si lo hace a menudo.',
      'Si es un juego constante, es una bandera roja.'
    ], 'La claridad vale más que los juegos.', 'Practicar «no me gusta competir»'),
    S18('g-exagerado', 'Te dicen «eres un exagerado» o «no seas sensible»', 'Cuando expresas algo que te molesta, lo minimizan.', [
      'Mantén tu postura con calma: «Para mí es importante».',
      'No discutas si es un drama: di cómo te sientes.',
      'Mira si te escuchan o te cortan siempre.',
      'Tus emociones son válidas.'
    ], 'Quien te quiere escucha lo que te molesta.', 'Decir «para mí es importante» una vez'),
    S18('g-negocio', 'Te proponen un negocio, cripto o «inversión»', 'Alguien te ofrece ganar dinero fácil.', [
      'Si prometen mucho sin riesgo, es estafa.',
      'No des dinero ni datos bancarios.',
      'Consúltalo con alguien de confianza.',
      'Di: «Lo pienso» y no vuelvas a contestar.'
    ], 'El dinero fácil casi nunca existe.', 'Decir que no sin explicaciones a ofertas de dinero fácil'),
    S18('g-captador', 'Un captador en la calle te frena', 'Te paran para pedirte datos, dinero o una firma.', [
      'Sigue andando con un «no, gracias».',
      'No des datos personales ni bancarios.',
      'No tienes que explicar nada.',
      'Si se pone pesado, aléjate.'
    ], 'No te debes a nadie en la calle.', 'Decir «no, gracias» sin parar de andar'),
    S18('g-migajas', 'Te da migajas de atención', 'De vez en cuando te escribe, pero nunca concreta.', [
      'Mira cuántas veces propone y concreta ella.',
      'Pide claridad: «Me gustaría quedar de verdad, ¿tú?».',
      'Si no concreta, aléjate con cariño.',
      'No te conformes con migajas.'
    ], 'Quien quiere, se hace presente.', 'Preguntar con claridad y decidir según la respuesta')
  ]}
);

TIPS.push(
  ['Calle', 'Los hechos repetidos pesan más que las palabras. Fíjate en lo que hace una persona una y otra vez.'],
  ['Calle', 'Confía poco a poco, según lo que vayas viendo. No hace falta dar todo desde el principio.'],
  ['Calle', 'Una bandera roja aislada es una pista. Varias son un patrón.'],
  ['Calle', 'Cuando algo te chirríe, apúntalo. Tu intuición detecta antes de que sepas explicarlo.'],
  ['Calle', 'Observa cómo trata una persona a quien no le interesa o no tiene poder: dice mucho de ella.'],
  ['Calle', 'Tener calle es leer situaciones, no desconfiar de todo el mundo.'],
  ['Calle', 'Habla con gente de tipos distintos: cada conversación te enseña algo.'],
  ['Calle', 'Equivocarte te da calle: aprende y sigue sin castigarte.'],
  ['Calle', 'Si alguien te hace sentir mal casi siempre, hazle caso a esa sensación.'],
  ['Límites', 'Un no claro y breve vale más que mil excusas.'],
  ['Límites', '«Lo pienso y te digo» es una frase que te protege de casi todo.'],
  ['Límites', 'No te justifiques de más: cuantas más excusas, más fácil es que insistan.'],
  ['Límites', 'Quien te quiere bien acepta tus límites sin castigarte.'],
  ['Límites', 'Cuidar tu tiempo y tu energía no es egoísmo.'],
  ['Límites', 'Si dices que sí por miedo a que se enfaden, no es un sí.'],
  ['Límites', 'Repite tu no con calma las veces que haga falta. No hace falta enfadarte.'],
  ['Manipulación', 'Si después de hablar con alguien te sientes peor casi siempre, mira por qué.'],
  ['Manipulación', 'Si te hacen sentir culpable por decir que no, es una táctica.'],
  ['Manipulación', 'Si te dicen que exageras cada vez que expresas algo, tu percepción está siendo minimizada.'],
  ['Manipulación', 'Los halagos seguidos de una petición suelen tener intención.'],
  ['Manipulación', 'La prisa («ahora o nunca») es una señal de alerta en dinero y en relaciones.'],
  ['Manipulación', 'Cuando alguien cambia de versión según a quién habla, mira con cuidado.'],
  ['Manipulación', 'Ante una táctica, no hace falta pelear: responde con calma y mira si respetan.'],
  ['Manipulación', 'El victimismo constante te deja siempre como culpable: no asumas lo que no es tuyo.'],
  ['Manipulación', 'Anota lo que pasa cuando dudes de tu memoria. Los datos te dan seguridad.'],
  ['Estafas', 'No envíes dinero a nadie que no conozcas en persona.'],
  ['Estafas', 'Si alguien en una app evita la videollamada, sospecha.'],
  ['Estafas', 'En zonas turísticas, desconfía de quien te aborda para llevarte a un local.'],
  ['Estafas', 'Pregunta los precios antes de pedir en sitios desconocidos.'],
  ['Estafas', 'Nunca des contraseñas, códigos ni datos del banco por mensaje o teléfono.'],
  ['Estafas', 'Si te amenazan con fotos íntimas, no pagues: denuncia y bloquea.'],
  ['Estafas', 'Las ofertas de dinero fácil casi siempre son estafas.'],
  ['Estafas', 'Mochila delante y móvil en bolsillo interior en metro y zonas concurridas.'],
  ['Banderas', 'Controlar con quién hablas o dónde vas es una bandera roja.'],
  ['Banderas', 'Una persona sana puede decir «lo siento» y cambiar.'],
  ['Banderas', 'Si te aísla de tus amigos, mira con cuidado.'],
  ['Banderas', 'Si te sientes tranquilo a su lado, es una buena señal.'],
  ['Banderas', 'Hablar mal de todos sus ex y no tener nunca culpa es una pista.'],
  ['Banderas', 'La intensidad desde el primer día no es amor: es intensidad. Mira cómo es con el tiempo.'],
  ['Dinero', 'Presta solo lo que puedas permitirte no recuperar.'],
  ['Dinero', 'Si siempre pagas tú, propón turnos o dividir con naturalidad.'],
  ['Dinero', 'Quien te pide dinero pronto en una relación merece una pausa.'],
  ['Dinero', 'Un mensaje escrito con cuánto y cuándo se devuelve evita malentendidos.'],
  ['Amistad', 'Prueba a no proponer tú un plan: así ves quién se acuerda de ti.'],
  ['Amistad', 'Quien solo te busca cuando necesita algo no es una gran amistad.'],
  ['Amistad', 'Una amistad sana es recíproca: das y recibes.'],
  ['Presencia', 'Hablar con calma y mirar a los ojos te protege más que parecer duro.'],
  ['Presencia', 'La gente que quiere aprovecharse busca a quien duda. Responder con calma corta muchas situaciones.'],
  ['Presencia', 'No tienes que explicarte a quien no te respeta.'],
  ['Cabeza', 'Ser amable no significa estar a disposición de todos.'],
  ['Cabeza', 'No te debes a nadie por haber sido educado.'],
  ['Cabeza', 'Si algo te incomoda, tienes derecho a irte.']
);

QUIZ.push(
  { p:'Un amigo te pide 200 € «hasta fin de mes» por tercera vez y todavía no te devolvió lo anterior.', o:[['«Ahora no me viene bien. Primero me gustaría que me devolvieras lo anterior».', 1, 'Claro, amable y con límite.'], ['Se los dejas otra vez para no quedar mal.', 0, 'Refuerza el patrón.'], ['Dejas de hablarle sin decir nada.', 0, 'Evita el conflicto sin resolverlo.']] },
  { p:'Ella te dice: «Si de verdad me quisieras, vendrías hoy», y tú tienes un plan.', o:[['«Te quiero, y aun así hoy no puedo. Mañana sí».', 1, 'Mantienes tu plan con cariño.'], ['Cancelas tu plan para evitar la discusión.', 0, 'Cedes por culpa.'], ['Te enfadas y le dices que es una manipuladora.', 0, 'Mejor responder con calma.']] },
  { p:'Una chica te aborda en la Rambla y te invita a un bar «muy bueno» que está cerca.', o:[['Declinas con amabilidad y eliges tú otro sitio si quieres.', 1, 'Es un timo conocido: mejor evitar.'], ['Vas con ella sin preguntar nada.', 0, 'Puede acabar en una cuenta enorme.'], ['Aceptas pero pagas lo que te pidan.', 0, 'No tienes por qué pagar una cuenta abusiva.']] },
  { p:'Alguien que conociste en una app lleva dos semanas muy cariñoso, no hace videollamada y hoy te pide dinero por una urgencia.', o:[['No envías nada, bloqueas y denuncias el perfil.', 1, 'Es el patrón de la estafa romántica.'], ['Le envías una pequeña cantidad por si es verdad.', 0, 'Seguirán pidiendo.'], ['Le pides su cuenta bancaria para ayudarle.', 0, 'Nunca des ni pidas datos así.']] },
  { p:'Tu pareja te dice «eso nunca pasó» sobre algo que recuerdas claramente.', o:[['Dices con calma «yo lo recuerdo así» y lo anotas si se repite.', 1, 'Mantienes tu percepción sin pelear.'], ['Empiezas a dudar de tu memoria.', 0, 'Es lo que busca el gaslighting.'], ['Gritas hasta que lo admita.', 0, 'Mejor calma y datos.']] },
  { p:'Te presentan una «oportunidad» de ganar mucho dinero rápido y te dicen que decidas hoy.', o:[['«Lo pienso y te digo». Y lo consultas.', 1, 'La prisa es una señal de alerta.'], ['Entras ya, que no quede mal.', 0, 'Es lo que buscan.'], ['Pides a un amigo que entre contigo.', 0, 'Arrastras a otros a un problema.']] },
  { p:'En tu grupo siempre te hacen bromas pesadas y últimamente no te hacen gracia.', o:[['«Esa no me ha hecho gracia». Y si se repite, hablas en privado.', 1, 'Claro y sin dramas.'], ['Te ríes siempre para encajar.', 0, 'Aguantas lo que te duele.'], ['Les contestas con una broma peor.', 0, 'Escalas el conflicto.']] },
  { p:'Una chica con quien quedas siempre deja que pagues tú todo y nunca ofrece nada.', o:[['Propones dividir o turnarte, y miras cómo reacciona.', 1, 'La reacción te da información.'], ['Sigues pagando para gustarle.', 0, 'Crea desequilibrio.'], ['Dejas de verla sin decir nada.', 0, 'Primero prueba a hablarlo.']] }
);

/* Adaptación del bloque de calle */
ADAPTA_TEMA_BLOQUE.unshift([/calle|aprovech/i, 'calle']);
ADAPTA.calle = {
  ansiedad: 'Cuando alguien te presiona, la ansiedad te empuja a ceder. Respira, di «lo pienso y te digo» y toma la decisión con calma.',
  autoestima: 'Poner límites es una muestra de valor propio. Cada no que dices con calma te hace más fuerte, y quien te quiere lo respeta.',
  inexperto: 'No necesitas haber vivido mucho para tener calle: con observar los hechos repetidos y confiar poco a poco, vas muy bien.',
  'liga-amigo': 'Con amigos que ligan fácil o más «de calle», no copies su estilo: aprende de ellos lo que te sirva y mantén tu forma de ser.',
  'beber-valor': 'Con alcohol se decide peor y se detecta peor a quien quiere aprovecharse. Cuida tu vaso y no tomes decisiones de dinero ni de intimidad bebido.',
  introvertido: 'Tu forma de observar es una ventaja: usa tu tiempo para leer a las personas antes de dar confianza.',
  'planes-bcn': 'En Barcelona hay zonas con timos (Rambla, locales de «invitación», carteristas). Con unas reglas sencillas disfrutas igual y sin sustos.',
  tecnologia: 'Con apps y redes, la regla es simple: no envíes dinero ni datos a quien no hayas conocido en persona, y desconfía de ofertas demasiado buenas.',
  terapia: 'Este tema es muy bueno para trabajar en terapia: aprender a poner límites y a detectar patrones se entrena.'
};

/* Rehacer «Tips rápidos» con todos los tips cargados */
(() => {
  const d = DOCS.find(x => x.id === 'd-tips');
  if (d) d.secciones = [...new Set(TIPS.map(t => t[0]))].map(c => [c, TIPS.filter(t => t[0] === c).map(t => t[1])]);
})();

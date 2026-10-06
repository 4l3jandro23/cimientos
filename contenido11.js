/* Contenido ampliado 10: más situaciones (en grupo, citas, primeras semanas, tú contigo, ir solo) y más tips. */
'use strict';
const S11 = (id, titulo, pasa, hacer, sale, practica, extra) => ({ id, titulo, pasa, hacer, ejemplos: [], cierre: '', extra: extra || [], sale, practica });

GUIA.push(
  { bloque:'En grupo y en conversación', items:[
    S11('g-silencio-grupo', 'Se hace un silencio en el grupo', 'Todos callan un momento y tú sientes que tienes que decir algo.', [
      'Un silencio corto es normal y no es culpa de nadie. Muchas veces ni se nota.',
      'No lo rellenes con lo primero que se te ocurra. Respira y espera dos segundos.',
      'Si quieres romperlo, pregunta algo ligero: «¿Qué planes tenéis para el finde?».',
      'O vuelve a algo que se dijo antes: «Antes dijiste lo de ___, ¿al final qué pasó?».'
    ], 'Si nadie dice nada, tampoco pasa nada. Los silencios cómodos son señal de confianza.', 'Esperar dos segundos antes de rellenar un silencio'),
    S11('g-interrumpen', 'Te interrumpen cuando hablas', 'Estás contando algo y alguien te corta o cambia de tema.', [
      'No siempre es mala intención: mucha gente se emociona y habla encima.',
      'Si es puntual, deja que hable y retoma después: «Como te decía…».',
      'Si pasa mucho con la misma persona, díselo con calma: «Déjame acabar y te escucho».',
      'Cuenta las cosas más cortas y con un gancho al principio: así es más difícil que te corten.'
    ], 'Si te dolió, apúntalo. Verás si es con todos o solo con alguien concreto.', 'Contar una historia en tres frases'),
    S11('g-anecdota', 'Te toca contar algo en un grupo', 'Todos cuentan historias y a ti te da miedo que la tuya sea aburrida.', [
      'Elige algo pequeño y real: algo que te pasó esta semana, un viaje, algo gracioso.',
      'Estructura sencilla: dónde estabas, qué pasó, cómo acabó. Sin dar demasiadas vueltas.',
      'Cuéntalo con ganas, no con perfección. Lo que se recuerda es la emoción.',
      'Acaba con una frase corta y deja que reaccionen. No expliques el chiste.'
    ], 'Si no hace gracia, sonríe y sigue. Pasa a todos y se olvida en un minuto.', 'Preparar dos anécdotas cortas por si me piden contar algo'),
    S11('g-no-entiendes', 'No entiendes una broma o una referencia', 'Todos se ríen de algo y tú no lo pillas.', [
      'Pregunta sin miedo: «No lo he pillado, ¿qué es?». Es lo más natural.',
      'Sonríe con los demás. No hace falta fingir que lo has entendido.',
      'Si es un tema que te interesa, es una buena excusa para conocer a esa persona.'
    ], 'Preguntar da más confianza que fingir.', 'Preguntar «¿qué es eso?» la próxima vez que no entienda algo'),
    S11('g-exagerar', 'Te tienta exagerar o mentir un poco para quedar bien', 'Sientes que lo tuyo es poco y quieres adornarlo.', [
      'Lo que cuentas con calma y sin adornar suele caer mejor que lo exagerado.',
      'Las mentiras pequeñas se complican: luego hay que recordarlas.',
      'Si te preguntan algo que no has hecho, di: «No lo he probado, pero me apetece».',
      'Tu sinceridad, con poca experiencia incluida, es más atractiva de lo que crees.'
    ], 'Si exageraste, no pasa nada: puedes aclararlo cuando haya ocasión.', 'Decir «no lo he hecho nunca, ¿cómo es?» sin vergüenza'),
    S11('g-callado', 'Te dicen «eres muy callado»', 'Alguien comenta que casi no hablas y te quedas cortado.', [
      'No es un insulto: hay gente que habla poco y escucha mucho.',
      'Contesta con humor: «Estoy observando». Y suéltalo.',
      'Si quieres soltarte más, haz una pregunta a quien te lo ha dicho: así se centra en ella.',
      'Un buen oyente es muy valioso. No tienes que hablar como otros.'
    ], 'Si te molesta, puedes ir aumentando poco a poco tu participación.', 'Hacer una pregunta cada vez que alguien me diga algo así'),
    S11('g-buena-persona', 'Te dicen «eres muy buena persona»', 'Lo oyes a menudo y a veces suena a «pero no como pareja».', [
      'Es un halago de verdad, aunque a veces duela según el contexto.',
      'Ser buena persona es una base preciosa: lo importante es sumarle seguridad e iniciativa.',
      'Si lo dice en una cita, mira el resto: ¿te mira, propone cosas, escribe después?',
      'No lo tomes como etiqueta. Eres también divertido, curioso y mucho más.'
    ], 'La bondad más la iniciativa es una combinación muy buena.', 'Proponer yo un plan esta semana'),
    S11('g-pedir-ayuda', 'Te cuesta pedir ayuda', 'Algo no sale y prefieres aguantar antes que pedirlo.', [
      'Pedir ayuda es de las cosas más sanas. Casi todo el mundo se siente bien al ayudar.',
      'Sé concreto: «¿Me echas una mano con esto?».',
      'Si es algo emocional, empieza por una persona de confianza.',
      'Dar las gracias después suma mucho.'
    ], 'Pedir ayuda no te hace menos: te hace más fuerte.', 'Pedir una pequeña ayuda a alguien esta semana')
  ]},
  { bloque:'Citas: personas y momentos distintos', items:[
    S11('g-comer-fuera', 'Comer fuera en una cita y hay cosas que no comes', 'Tienes ingredientes que no toleras o no te gustan y te da corte decirlo.', [
      'Elige tú el sitio o propón dos opciones donde sepas que hay algo que te gusta.',
      'Decirlo es normal: «Yo esto no lo como, ¿pedimos para compartir otra cosa?».',
      'Si no hay nada, una caña y algo de picar es suficiente.',
      'Nadie se acuerda de lo que pediste. Sí de cómo te sentiste.'
    ], 'Si pasa, siempre se puede salir a tomar algo y cenar luego en casa.', 'Mirar la carta del sitio antes de proponerlo'),
    S11('g-muy-guapa', 'Ella te intimida porque es muy guapa o muy segura', 'Te da la sensación de que juega en otra liga.', [
      'La belleza no es una liga. Lo que decide si hay conexión es el trato y la conversación.',
      'Trátala como a cualquier persona: pregunta, escucha, cuenta.',
      'Si la pones en un pedestal, ella lo nota y se siente menos persona. Bájala a tierra.',
      'Si estás nervioso, díselo con humor: «Me pones un poco nervioso, no sé por qué».'
    ], 'Que te intimide es normal. Pasa con las ganas de que salga bien.', 'Hacerle una pregunta curiosa como a cualquier persona'),
    S11('g-gustos', 'Tus gustos y los suyos son muy distintos', 'Ella va a conciertos de otra música, hace planes que no son los tuyos.', [
      'Lo distinto da tema: pregúntale por qué le gusta eso.',
      'Descubre cosas nuevas sin tener que fingir que te encantan.',
      'Propón tú algo de lo tuyo: la gente suele agradecer que le enseñes algo.',
      'Mira si compartís valores: eso importa más que los gustos.'
    ], 'No hace falta que os gusten las mismas cosas. Sí que os dé curiosidad.', 'Preguntarle algo de sus gustos que no conozca'),
    S11('g-extranjera', 'Ella es de otro país y habláis en otro idioma', 'En Barcelona conoces a gente de fuera y te frena el idioma.', [
      'Habla despacio, con frases simples. Se agradece y se ríen juntos de los errores.',
      'Pregúntale por su ciudad, su comida, cómo llegó aquí. Les encanta contarlo.',
      'Enséñale cosas de la ciudad: un buen plan es hacerle de guía.',
      'No te agobies por la gramática: lo que cuenta es el esfuerzo.'
    ], 'Un idioma que no es perfecto hace la conversación más cercana.', 'Practicar inglés o el idioma que haga falta con alguien nuevo'),
    S11('g-mas-experta', 'Ella tiene mucha más experiencia que tú', 'Te sientes inocente y temes que te juzgue.', [
      'Lo que cuenta es que estés a gusto y que sepas escuchar. La experiencia no es una competición.',
      'Si lo comentas con tranquilidad, suele valorarse la honestidad.',
      'No finjas lo que no sabes. Pregunta y aprende juntos.',
      'Una persona con experiencia suele valorar a alguien atento más que a alguien que presume.'
    ], 'Que ella sepa más es una ventaja para ti: puedes aprender con ganas.', 'Decir sin miedo «esto lo hago por primera vez»'),
    S11('g-distancia', 'Te gusta alguien que vive lejos', 'Os llevaréis bien pero hay kilómetros o horarios de por medio.', [
      'Antes de nada, mira si hay ganas por ambas partes de que funcione.',
      'Hablad claro de qué queréis y cuánto os veréis.',
      'Quedar con regularidad (fines de semana, viajes) ayuda mucho.',
      'Si te agobia, decirlo pronto es mejor que alargarlo.'
    ], 'La distancia no mata el interés: lo hace la falta de comunicación.', 'Imaginar qué haría falta para que a mí me funcionase'),
    S11('g-sudor', 'Sudas o te tiembla la voz por los nervios', 'Estás en una cita y te notas sudar o la voz distinta.', [
      'Casi nadie lo nota tanto como tú. Y si lo nota, lo entiende.',
      'Respira soltando el aire largo y bebe agua.',
      'Ropa ligera y de tejidos que transpiren ayuda.',
      'Si te sientes fatal, puedes decirlo con humor: «Estoy un poco nervioso».'
    ], 'El cuerpo se calma al aceptar lo que pasa.', 'Probar una camisa o camiseta cómoda para citas'),
    S11('g-amigos-cita', 'Os encontráis a sus amigos o a tus amigos en plena cita', 'Aparecen conocidos y no sabes cómo actuar.', [
      'Presenta con naturalidad: «Os presento a ___».',
      'Si te sientes incómodo, charla un par de minutos y vuelve al plan.',
      'No te dejes arrastrar a otro plan si no quieres. Un «luego os vemos» vale.',
      'Que alguien la vea contigo no es un examen: es un buen momento para estar tranquilo.'
    ], 'Si se hace raro, una broma lo suaviza.', 'Practicar una presentación sencilla'),
    S11('g-cita-dia', 'Cita de día o de noche: qué elegir', 'No sabes qué es mejor para una primera vez.', [
      'De día suele ser más relajado: café, paseo, mercado, vermut. Menos presión y menos alcohol.',
      'De noche suele ser más íntimo, pero también más largo y con más alcohol.',
      'Para una primera cita, de día o al final de la tarde es una buena idea.',
      'Si va bien, siempre se puede alargar con una cena o una copa.'
    ], 'Lo mejor es lo que te haga estar tranquilo.', 'Proponer una primera cita de tarde')
  ]},
  { bloque:'Las primeras semanas', items:[
    S11('g-me-gustas', 'Decirle «me gustas»', 'Hay buen rollo y quieres decirle lo que sientes sin que sea incómodo.', [
      'Elige un momento tranquilo, no entre ruido ni delante de gente.',
      'Sé simple y directo: «Me gustas, y me apetecía decírtelo».',
      'Ofrece una salida: «Si no te pasa lo mismo, no pasa nada».',
      'Después, deja que conteste sin llenar el silencio.'
    ], 'Si no es mutuo, agradece que te lo haya dicho con sinceridad. Ya lo has hecho: eso es valentía.', 'Practicar la frase «me gustas» en voz alta'),
    S11('g-ritmo-distinto', 'Cada uno va a un ritmo distinto', 'Tú quieres ir más despacio, o ella, y no sabéis cómo decirlo.', [
      'Hablarlo es mejor que adivinarlo: «Me gusta esto y quiero ir poco a poco».',
      'Pregunta lo mismo: «¿Tú cómo lo ves?».',
      'Ir despacio no es falta de interés. Es cuidar lo que hay.',
      'Si los ritmos son muy distintos, se nota pronto y se puede decidir con calma.'
    ], 'La claridad al principio ahorra malentendidos después.', 'Decir con calma qué ritmo me gusta'),
    S11('g-espacio', 'Necesitas tiempo para ti', 'Estás empezando algo y a veces necesitas estar solo para recargar.', [
      'Es normal y sano. No significa que te guste menos.',
      'Dilo con cariño: «Hoy necesito estar tranquilo, pero me apetece verte mañana».',
      'Concreta cuándo volvéis a veros para que no parezca un rechazo.',
      'Si ella necesita espacio, respétalo sin tomártelo como algo contra ti.'
    ], 'Un poco de espacio suele hacer bien a las dos partes.', 'Decir una vez «hoy me recargo, mañana te veo»'),
    S11('g-te-quiero', 'Cuándo decir «te quiero»', 'Sientes algo fuerte y no sabes si es pronto.', [
      'No hay fecha. Lo importante es que lo sientas de verdad y que no lo digas por presión.',
      'Mira si el ritmo de la relación y las señales de ella van en la misma línea.',
      'Si lo sientes y quieres decirlo, hazlo con calma y sin esperar nada a cambio.',
      'Si ella no lo dice, no pasa nada: cada uno tiene su momento.'
    ], 'Decirlo y que no te lo digan duele, pero no es el fin.', 'Pensar qué es lo que de verdad siento antes de decirlo'),
    S11('g-redes-ella', 'Ves en sus redes cosas que te hacen dudar', 'Likes, fotos o ex que te generan inseguridad.', [
      'Las redes enseñan una parte mínima y sin contexto.',
      'No le preguntes con tono de acusación. Si te inquieta, habla de cómo te sientes: «Me noto un poco inseguro con esto».',
      'Reduce el tiempo que miras sus perfiles. Mirar más no te da tranquilidad.',
      'La confianza se construye con hechos, no con vigilancia.'
    ], 'Si no confías, mejor decirlo con calma que callarlo.', 'No mirar sus redes durante un día'),
    S11('g-presentar', 'Presentarle tus amigos', 'Quieres que se conozcan y temes que no encajen.', [
      'Empieza con algo corto y relajado: unas cañas, un plan de una hora.',
      'Cuéntales antes algo de ella para que tengan de qué hablar.',
      'No hagas un examen: déjales hablar y quédate cerca sin agobiar.',
      'Si no encajan del todo, no pasa nada: no tienen que ser mejores amigos.'
    ], 'Que tus amigos y ella se vean te da una idea de cómo sois juntos.', 'Presentar a una persona concreta con un plan corto'),
    S11('g-ella-termina', 'Ella termina contigo', 'Te dice que no sigue y te quedas descolocado.', [
      'Escucha sin discutir ni pedir mil explicaciones. Agradece su sinceridad.',
      'Date tiempo: es normal estar mal unos días. No tienes que estar bien enseguida.',
      'Apóyate en amigos, en la terapia o en el diario.',
      'No le escribas mil mensajes ni busques «arreglarlo» ahora. Cuando pase el golpe, lo ves distinto.'
    ], 'Duele, pero no define tu valor ni lo que viene después.', 'Escribir en el diario lo que he aprendido de esta relación'),
    S11('g-volver-ex', 'Tu ex te escribe o quieres volver con ella', 'Tienes ganas de contestar o de escribirle.', [
      'Pregúntate qué buscas: compañía, costumbre o de verdad a ella.',
      'Si volvéis, que sea con cambios concretos, no por soledad.',
      'Si lo dudas, déjalo unos días y habla con alguien de confianza.',
      'Dar otra oportunidad no es malo, pero hazlo con calma.'
    ], 'No tienes que decidir hoy.', 'Escribir en el diario por qué terminó y qué querría ahora')
  ]},
  { bloque:'Tú contigo, entre semana', items:[
    S11('g-sin-ganas', 'Un día sin ganas de nada', 'No te apetece quedar, ni escribir, ni hacer cosas.', [
      'Hay días así y no pasa nada. No te castigues por ello.',
      'Haz solo lo mínimo: comer algo, salir un rato a la calle, hablar con alguien cercano.',
      'No tomes decisiones grandes ese día.',
      'Si dura muchos días, habla con tu psicóloga o con tu médico.'
    ], 'El ánimo sube y baja. Mañana puede ser distinto.', 'Hacer una sola cosa pequeña un día malo'),
    S11('g-agobio-semana', 'Semana agobiante de trabajo', 'Llegas a casa agotado y sin energía para nada social.', [
      'Prioriza lo básico: dormir, comer bien, descansar.',
      'Mantén un solo plan pequeño: un mensaje a alguien, un café corto.',
      'No te exijas ligar ni hacer planes grandes esa semana.',
      'El fin de semana, recarga y luego quedas con ganas.'
    ], 'Cuidarte ahora te prepara para disfrutar después.', 'Mantener un plan pequeño aunque sea una semana difícil'),
    S11('g-sabado-solo', 'Un sábado solo y con ganas de salir', 'No tienes plan y ves a todos con planes en redes.', [
      'Antes de compararte, recuerda que las redes enseñan lo mejor.',
      'Propón algo tú a alguien: «¿Te apetece que quedemos?».',
      'Si no sale, haz un plan para ti: paseo, cine, concierto, un buen disco, cocinar.',
      'Estar solo no es estar mal: es estar contigo.'
    ], 'Si te da bajón, apúntalo y mañana lo ves distinto.', 'Proponer un plan a alguien antes del viernes'),
    S11('g-domingo', 'El bajón del domingo por la noche', 'Notas ansiedad por el lunes o sensación de vacío.', [
      'Es muy común. Es anticipación, no un problema real.',
      'Prepara el lunes: ropa, comida y una cosa agradable (un desayuno o un café).',
      'Cierra el día con algo tranquilo: música, ducha, lectura.',
      'Apunta tres cosas buenas del fin de semana.'
    ], 'El lunes casi nunca es tan malo como el domingo por la noche.', 'Preparar algo agradable para el lunes por la mañana'),
    S11('g-redes-comparar', 'Las redes te hacen sentir menos', 'Ves a todos de viaje, con pareja o de fiesta y te hundes.', [
      'Las redes enseñan lo bueno y editado. No es la vida real de nadie.',
      'Reduce el tiempo: limita la app o silencia cuentas que te sientan mal.',
      'Sigue cuentas que te inspiren o te hagan reír.',
      'Cuando estés mal, no mires redes. Haz algo en el mundo real.'
    ], 'Mirar menos tiempo suele mejorar el ánimo en pocos días.', 'Silenciar una cuenta que me sienta mal'),
    S11('g-expectativas', 'Lo que ves en internet y la realidad', 'Has visto cosas en pelis, series o internet y piensas que lo normal es otra cosa.', [
      'Lo que se ve en pantallas está hecho para impactar, no para ser realista.',
      'La intimidad real incluye conversación, risas, torpeza y hablar de lo que gusta.',
      'Nadie rinde como en una película. Es normal que a veces salga raro o corto.',
      'Si te preocupa, habla con un sexólogo: orienta mucho y sin juzgar.'
    ], 'La realidad es más tranquila y más humana, y suele gustar más.', 'Recordar que la intimidad real es hablar, reír y ajustar'),
    S11('g-mal-dormir', 'Duermes mal y se nota', 'Con poco sueño todo cuesta más: ánimo, ansiedad y conversación.', [
      'Acuéstate más o menos a la misma hora y deja el móvil lejos del cuerpo.',
      'Evita café por la tarde y alcohol para dormir.',
      'Una rutina corta antes de dormir (ducha, luz baja, lectura) ayuda.',
      'Si lo llevas mal mucho tiempo, habla con tu médico.'
    ], 'Dormir bien mejora casi todo lo demás.', 'Acostarme a una hora fija esta semana')
  ]},
  { bloque:'Planes en Barcelona y ir solo', items:[
    S11('g-ir-solo', 'Ir solo a un bar, un concierto o un cine', 'No tienes con quién ir y te da vergüenza.', [
      'Ir solo es de las cosas que más seguridad dan. Te hace independiente.',
      'En un concierto, no se nota: todos miran al escenario.',
      'En un bar, la barra es ideal para charlar con quien tengas al lado.',
      'Empieza por planes cortos y fáciles: un café, una peli.'
    ], 'Cada vez que vas solo, te sientes más capaz.', 'Ir solo a un plan pequeño esta semana'),
    S11('g-meetup', 'Una quedada de gente que no conoces (grupo, club, actividad)', 'Llegas a un sitio donde nadie te conoce.', [
      'Llega un poco pronto: hay menos gente y es más fácil entrar en conversación.',
      'Presenta tu nombre y di por qué has venido.',
      'Pregunta a quien tengas al lado qué le ha traído.',
      'Quédate al menos 30 minutos antes de decidir si te gusta o no.'
    ], 'La primera vez es la más difícil. A la tercera ya eres uno más.', 'Ir tres veces a la misma actividad antes de decidir'),
    S11('g-playa', 'En la playa o en una terraza al sol', 'Un plan relajado y con poca ropa que genera algo de corte.', [
      'Ve cómodo y con ropa que te guste. Si estás a gusto, se nota.',
      'Un plan de playa es largo: lleva algo que hacer (música, un juego, bebida).',
      'La conversación fluye más tumbados y con tiempo. No hay prisa.',
      'Cuida el sol y el alcohol: el calor sube el agotamiento y el bajón.'
    ], 'No tienes que lucir nada: lo que importa es estar bien.', 'Ir a un plan de playa con ropa en la que me sienta cómodo'),
    S11('g-casa-amigos', 'Fiesta o cena en casa de amigos de amigos', 'Conoces a pocas personas y todos tienen vínculos entre sí.', [
      'Llega con algo para compartir (bebida, postre). Es una excusa de conversación.',
      'Quédate cerca de la cocina o la mesa, donde pasa todo.',
      'Pregunta: «¿Y tú de qué conoces a ___?». Funciona siempre.',
      'Despídete del anfitrión con un agradecimiento.'
    ], 'Si no conectas con nadie, has practicado y has hecho vida social.', 'Llevar algo a una cena y hablar con dos personas nuevas'),
    S11('g-mercado', 'Un plan de mercado, vermut o paseo', 'Te encantan los planes tranquilos pero no sabes cómo proponerlos.', [
      'Propón algo concreto: «Hay un vermut el domingo por la mañana, ¿te apetece?».',
      'Los planes tranquilos y con algo que ver ayudan mucho a la conversación.',
      'Lleva tú una idea: un sitio, una hora y una alternativa.',
      'Si dice que sí, genial. Si no, otra vez será.'
    ], 'Tus planes tranquilos son un punto fuerte: úsalos.', 'Proponer un plan de vermut o mercado a alguien')
  ]}
);

TIPS.push(
  ['Primera cita', 'Elige un sitio que tenga donde sentarse con calma y que no sea muy ruidoso. Así os escucháis.'],
  ['Primera cita', 'Llega un poco antes, tranquilo, y cuida lo básico: ropa limpia, aliento y buen ánimo.'],
  ['Primera cita', 'Lleva dos o tres temas en la cabeza (viajes, música, planes) por si hay silencio.'],
  ['Primera cita', 'Pregunta por lo que le apasiona: se nota cuando alguien habla de lo que le gusta.'],
  ['Primera cita', 'No hace falta que sea perfecta. Basta con que os sintáis a gusto.'],
  ['Primera cita', 'Pagar: si invitas tú, hazlo con naturalidad; si prefiere pagar a medias, acepta sin problema.'],
  ['Primera cita', 'Cierra el plan con algo claro: «Me lo he pasado muy bien. ¿Repetimos?».'],
  ['Primera cita', 'Al día siguiente, un mensaje corto y cálido. Sin esperar otra cosa.'],
  ['Pareja temprana', 'Al principio, mejor ir poco a poco: conocerse, disfrutar y hablar de lo que cada uno quiere.'],
  ['Pareja temprana', 'Decir lo que sientes con claridad evita muchos malentendidos.'],
  ['Pareja temprana', 'Respeta sus espacios y pide los tuyos. Estar juntos no es estar pegados.'],
  ['Pareja temprana', 'Pregunta «¿cómo lo llevas?» de vez en cuando. Cuida más que mil regalos.'],
  ['Pareja temprana', 'No des por hecho lo que quiere: pregunta, no adivines.'],
  ['Pareja temprana', 'Los pequeños detalles (un mensaje, una canción, un café) valen más que los grandes gestos.'],
  ['Pareja temprana', 'Las discusiones pequeñas son normales. Lo que importa es cómo las resolvéis.'],
  ['Redes', 'Un «me gusta» no es una declaración ni un desinterés. No analices cada gesto.'],
  ['Redes', 'Mira menos sus redes y más tu vida. Tu atención es tuya.'],
  ['Redes', 'Evita contestar a historias de madrugada o con alcohol. Mejor de día.'],
  ['Redes', 'Un perfil con fotos reales, naturales y sonriendo funciona más que uno muy trabajado.'],
  ['Redes', 'En tu perfil, cuenta algo concreto que te guste (música, viajes) para que haya de qué hablar.'],
  ['Rechazo', 'Un rechazo es el precio de intentarlo. Quien intenta, de vez en cuando recibe un no.'],
  ['Rechazo', 'Despídete siempre con educación. Cómo reaccionas es lo que se recuerda.'],
  ['Rechazo', 'No lo cuentes como tragedia a tus amigos. Cuéntalo como anécdota.'],
  ['Rechazo', 'Tras un no, haz algo físico: andar, ejercicio, ducha. Ayuda a soltar.'],
  ['Rechazo', 'Cuenta tus intentos, no tus éxitos. Cada intento suma práctica.'],
  ['Rechazo', 'Un «no» a un plan no es un «no» a ti. Puede ser agenda, momento o ganas.'],
  ['Bienestar', 'Moverte tres o cuatro veces por semana mejora el ánimo y la confianza más de lo que parece.'],
  ['Bienestar', 'Duerme lo que necesites: con sueño, la ansiedad y la inseguridad suben.'],
  ['Bienestar', 'Pasar tiempo al aire libre y con luz natural ayuda a bajar la ansiedad.'],
  ['Bienestar', 'Comer a horas regulares te estabiliza el ánimo.'],
  ['Bienestar', 'Apunta una cosa que te ha hecho gracia o ilusión cada día. Es un entrenamiento de ánimo.'],
  ['Bienestar', 'La música que te gusta es una herramienta: una lista para antes de salir sube la energía.'],
  ['Bienestar', 'Dedicar un rato a lo que te apasiona te hace más interesante y más feliz.'],
  ['Presencia', 'Llegar relajado cambia todo: antes de entrar, respira y suelta los hombros.'],
  ['Presencia', 'Habla con calma, mira a la cara y sonríe. Con eso ya transmites mucho.'],
  ['Presencia', 'Una buena postura te hace parecer (y sentirte) más seguro. Hombros atrás y cabeza alta.'],
  ['Presencia', 'Cuida los detalles: pelo, ropa limpia y planchada, zapatos limpios.'],
  ['Presencia', 'Quédate en el momento: deja el móvil y mira a quien tengas delante.'],
  ['Presencia', 'La confianza que se nota es la tranquila: no necesitas llamar la atención.'],
  ['Presencia', 'Ocupa tu espacio: no te encojas en el sofá ni te pegues a la pared.'],
  ['Escucha', 'Escuchar de verdad es mirar, asentir y preguntar por lo que ha dicho.'],
  ['Escucha', 'Si ella cuenta algo difícil, no des consejos de golpe: pregunta primero «¿qué necesitas?».'],
  ['Escucha', 'Repite con tus palabras lo que has entendido: «O sea, que te sentiste un poco sola».'],
  ['Escucha', 'Evita comparar su problema con uno tuyo. Mejor que se sienta escuchada.'],
  ['Escucha', 'Las preguntas abiertas («¿cómo fue?», «¿qué sentiste?») dan más que las de sí o no.'],
  ['Dinero', 'Invitar a veces es un detalle bonito. Que todo lo pague siempre uno no es obligatorio.'],
  ['Dinero', 'Si no quieres gastar mucho, propón un plan barato y bonito: paseo, mercado, un vermut.'],
  ['Dinero', 'Hablar con naturalidad de quién paga evita tensión: «Hoy invito yo, la próxima tú».'],
  ['Dinero', 'Alguien que espera que el otro pague siempre, no es una buena señal. Lo mejor es el reparto sano.'],
  ['Ropa', 'Elige ropa en la que te sientas tú: la comodidad se nota más que la marca.'],
  ['Ropa', 'Una camisa o camiseta de tu talla, tejanos limpios y zapatillas cuidadas funcionan casi siempre.'],
  ['Ropa', 'Prueba tu ropa de cita antes: si te aprieta o te pica, cámbiala.'],
  ['Ropa', 'Una prenda de color que te favorezca (verde, azul) da un toque sin pasarse.'],
  ['Ropa', 'Una chaqueta o capa extra da seguridad y sirve para el frío o los nervios.'],
  ['Conversación', 'Una buena pregunta de apertura: «¿Qué es lo mejor que has hecho este mes?».'],
  ['Conversación', 'Otra pregunta fácil: «Si pudieras irte de viaje mañana, ¿adónde irías?».'],
  ['Conversación', 'Cuando alguien cuenta algo, haz una pregunta de seguimiento: «¿Y cómo acabó?».'],
  ['Conversación', 'Habla de planes, no solo de pasado: «¿Qué te gustaría hacer este verano?».'],
  ['Conversación', 'Si llevas rato hablando de trabajo, cambia de tema con una pregunta personal ligera.'],
  ['Conversación', 'Una conversación que fluye alterna: tú cuentas, ella cuenta, tú preguntas, ella pregunta.'],
  ['Conversación', 'Las bromas internas (algo que dijo antes) crean complicidad muy rápido.'],
  ['Conversación', 'Que haya silencios no es fracaso. Mirarse y sonreír también comunica.'],
  ['Cabeza', 'Antes de salir, recuerda tres cosas que haces bien. Entra con eso en la cabeza.'],
  ['Cabeza', 'No esperes sentirte seguro para actuar. Actúa y la seguridad llegará después.'],
  ['Cabeza', 'Si te pillas pensando «seguro que piensa mal de mí», pregúntate: ¿qué pruebas hay?'],
  ['Cabeza', 'Mirar el pasado para buscar errores no sirve. Mira solo qué harías distinto la próxima vez.'],
  ['Cabeza', 'Tu valor no depende de a quién le gustes. Depende de cómo te tratas.'],
  ['Cabeza', 'Anota tus pequeñas victorias. Tu cerebro tiende a olvidarlas.'],
  ['Cabeza', 'Cada noche que sales, aunque sea sin resultados, entrenas algo. No se pierde.'],
  ['Cabeza', 'Pensar menos y hacer más: con acción pequeña, el miedo baja.'],
  ['Cabeza', 'Cuando el cerebro dice «no puedo», pregunta: «¿qué podría hacer en pequeño?».'],
  ['Salir', 'Si llegas a un sitio y no te gusta el ambiente, puedes cambiar de local. No es fracasar.'],
  ['Salir', 'Pon un límite de gasto y de copas antes de salir.'],
  ['Salir', 'Ten claro cómo vuelves a casa antes de beber.'],
  ['Salir', 'Si ves a alguien de tu círculo que te cae bien, acércate y saluda: es una vía fácil para conocer a sus amigos.'],
  ['Salir', 'La gente suele ser más receptiva al principio de la noche que al final.'],
  ['Salir', 'Si la conversación se corta, despídete con amabilidad. No hay que alargar nada.'],
  ['Salir', 'El mejor plan del finde puede ser no salir. Descansar también es un plan.'],
  ['Ligar', 'Hablar con alguien es un paso en sí. No tiene que acabar en nada para que valga.'],
  ['Ligar', 'Intenta que la conversación sea de igual a igual: ni la pongas por encima ni te pongas por debajo.'],
  ['Ligar', 'La mayoría de la gente agradece que le hablen con respeto, aunque no esté interesada.'],
  ['Ligar', 'Que te guste alguien y se lo digas, aunque salga mal, es mejor que quedarte con la duda.'],
  ['Ligar', 'Mejor pocas conversaciones buenas que muchas a medias.'],
  ['Ligar', 'Si sientes que no hay conexión después de un rato, está bien cerrar la conversación con amabilidad.'],
  ['Ligar', 'Fíjate en cómo trata a los demás (camareros, amigos). Dice mucho de ella.'],
  ['Ligar', 'No hace falta ser el más gracioso ni el más guapo. Hace falta ser amable, curioso y atento.'],
  ['Ligar', 'Un cumplido específico sobre algo que ha dicho o elegido funciona mejor que uno general.'],
  ['Intimidad', 'Un buen ambiente (calma, sin prisa, sin móvil) hace que todo sea más fácil.'],
  ['Intimidad', 'Hablar mientras os tocáis («esto me gusta») es de lo más bonito. No es raro: es cercanía.'],
  ['Intimidad', 'Lo que ves en vídeos o pelis no es lo normal. La realidad es más humana y más variada.'],
  ['Intimidad', 'Si algo no te gusta o te incomoda, puedes decirlo y parar. Tu cuerpo, tus límites.'],
  ['Intimidad', 'Cuidarte (preservativo, pruebas si hace falta) es de adultos y suma confianza.'],
  ['Barcelona', 'Los conciertos pequeños en salas de Barcelona son perfectos para melómanos: hablar de música es tema fácil.'],
  ['Barcelona', 'Muchas ciudades cercanas (Sitges, Girona, Tarragona) son escapadas fáciles para un plan de cita.'],
  ['Barcelona', 'La montaña (Collserola, Montseny) es un buen plan para conocerse hablando mientras camináis.'],
  ['Barcelona', 'Las terrazas del Born, Gràcia y Poblenou son buenos sitios para planes relajados.'],
  ['Barcelona', 'Las bibliotecas, cafeterías de especialidad y librerías son sitios donde se conoce gente con aficiones parecidas.']
);

/* Rehacer «Tips rápidos» con todos los tips cargados */
(() => {
  const d = DOCS.find(x => x.id === 'd-tips');
  if (d) d.secciones = [...new Set(TIPS.map(t => t[0]))].map(c => [c, TIPS.filter(t => t[0] === c).map(t => t[1])]);
})();

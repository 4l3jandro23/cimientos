/* Contenido ampliado 16: kino, microgestos, lenguaje corporal, trucos curiosos, frases y situaciones de intimidad. */
'use strict';
const S17 = (id, titulo, pasa, hacer, sale, practica, extra) => ({ id, titulo, pasa, hacer, ejemplos: [], cierre: '', extra: extra || [], sale, practica });

DOCS.push(
  { id:'d-kino', grupo:'ligar', icono:'🤏', titulo:'Kino: el contacto físico poco a poco', sub:'Cómo pasar de cero a cercano sin incomodar', secciones:[
    ['Qué es', ['Es el contacto físico natural entre dos personas: un toque en el brazo, un abrazo, ir de la mano. Se llama «kino» en el mundo del ligue.', 'Funciona cuando es gradual, cálido y mirando cómo reacciona ella.']],
    ['La escalera del contacto', ['1. Saludo con un beso o un abrazo (según el sitio).', '2. Un toque ligero en el brazo o el hombro al reírte o enfatizar algo.', '3. Rozarse al sentaros juntos o pasar cerca.', '4. Un toque en la espalda o en la mano al caminar.', '5. Tomarle la mano si hay buen rollo.', '6. Abrazo más largo o un beso, si hay señales claras y se pregunta o se nota el sí.', 'Un peldaño cada vez. Si ella se aparta o se queda quieta, no subas.']],
    ['Cómo leer su respuesta', ['Se acerca, te devuelve el toque, sonríe: puedes seguir con calma.', 'Se aparta, se pone rígida, cambia de tema: baja un peldaño o para.']],
    ['Cuidados', ['Siempre en un sitio y momento adecuados. Nada de sorpresas ni de tocar zonas íntimas sin que haya claridad.', 'El contacto con alcohol necesita más cuidado y más claridad.']]
  ]},
  { id:'d-microgestos', grupo:'ligar', icono:'🔎', titulo:'Microgestos: qué pueden significar', sub:'Pistas pequeñas, siempre en conjunto', secciones:[
    ['Aviso', ['Ningún gesto significa nada por sí solo. Cuenta lo repetido y lo que coincide: tres o cuatro señales a la vez.', 'Y el contexto: nervios, frío o costumbre pueden explicar muchos gestos.']],
    ['Señales que suman a favor', ['Se inclina o gira el cuerpo y los pies hacia ti.', 'Te mira a los ojos y a los labios de forma breve.', 'Se toca el pelo, el cuello o juega con un objeto mientras habla contigo.', 'Sonríe con los ojos (arruguitas al sonreír): sonrisa auténtica.', 'Copia tu postura o tu ritmo al hablar (efecto espejo).', 'Se acerca y reduce la distancia sin que se lo pidas.', 'Se ríe con facilidad y te toca el brazo al reírse.']],
    ['Señales que restan', ['Cruza los brazos y gira el cuerpo hacia otro lado.', 'Mira a los lados o al móvil con frecuencia.', 'Se aparta cuando te acercas.', 'Sonrisa de cortesía solo con la boca, sin los ojos.', 'Respuestas cortas y sin devolver preguntas.']],
    ['Las pupilas', ['Se dilatan con la emoción o el interés, pero también con la poca luz. No es una prueba fiable: úsalo solo como curiosidad.']],
    ['Qué hacer con esto', ['Úsalo para ir con más calma, no para sacar conclusiones. Si dudas, pregunta con una frase amable o propón algo pequeño y mira su respuesta.']]
  ]},
  { id:'d-tu-cuerpo', grupo:'ligar', icono:'🕴️', titulo:'Tu lenguaje corporal: qué transmites', sub:'Cómo estar relajado, abierto y presente', secciones:[
    ['Lo que comunica seguridad', ['Espalda recta y hombros relajados hacia atrás, sin rigidez.', 'Movimientos lentos y suaves, sin prisas.', 'Manos visibles y tranquilas.', 'Mirada tranquila y sonrisa natural.', 'Ocupar tu espacio sin invadir el de los demás.']],
    ['Lo que comunica nervios', ['Encogerte, cruzar brazos, tocarte la cara, mirar al suelo, mover mucho las manos o los pies.']],
    ['Un truco: la postura de poder suave', ['Antes de una conversación importante, abre el pecho, suelta los hombros y respira hondo. El cuerpo manda el mensaje a la cabeza y calma.']],
    ['Mito de «hombre alfa»', ['No necesitas dominar ni ocupar un montón de espacio. Mostrar calma, interés y respeto es mucho más atractivo y real.']],
    ['Ensayo', ['Grábate un minuto hablando y míralo. Seguramente te sorprenda lo bien que se te ve.']]
  ]},
  { id:'d-trucos-curiosos', grupo:'ligar', icono:'🎩', titulo:'Trucos curiosos que casi nadie nota', sub:'Psicología cotidiana, usada con cariño', secciones:[
    ['Para usar con honestidad', ['Estos «trucos» son pequeñas costumbres que mejoran el trato. No son para manipular: si lo usas para hacer sentir bien a alguien, funciona; si lo usas para engañar, se nota.']],
    ['Mirar el color de los ojos', ['Un truco sencillo para mirar a los ojos sin agobiarte: al saludar, fíjate en el color de sus ojos. Fuerza una mirada de un segundo y natural.']],
    ['La pausa antes de contestar', ['Un segundo de pausa antes de responder da sensación de calma y de que piensas lo que dices.']],
    ['Efecto espejo', ['Sin exagerar, adapta tu tono y ritmo al suyo (más tranquilo si habla tranquilo). La gente se siente más cómoda con quien se le parece.']],
    ['Pedir un pequeño favor', ['A las personas nos suele caer bien quien nos pide un favor pequeño (que nos presten el cargador, que nos recomienden un sitio). Funciona porque nos sentimos útiles.']],
    ['Dejar algo abierto', ['Acabar la conversación con un hilo pendiente («luego me cuentas cómo acabó lo de ___») hace que quede ganas de verse otra vez.']],
    ['Cambiar de sitio', ['Pasar de un lugar a otro (del bar a un paseo) crea la sensación de que habéis vivido más cosas juntos. Es un buen truco en una primera cita.']],
    ['Nombrar la emoción', ['«Qué ilusión te hace, se te nota» hace que alguien se sienta visto. Es de lo más potente y completamente honesto.']],
    ['Lo que más se recuerda', ['De una cita se recuerda sobre todo lo más intenso y el final. Termina con una despedida cálida y una frase clara.']],
    ['Recordar detalles', ['Anota después de una conversación una cosa que te contó (su hermano, su viaje). Preguntarlo otro día es lo que más impresiona.']],
    ['Sonreír con los ojos', ['Piensa en algo que te hace feliz un segundo antes de sonreír: la sonrisa llega a los ojos y se nota auténtica.']]
  ]},
  { id:'d-frases', grupo:'ligar', icono:'💬', titulo:'Cosas que puedes decir', sub:'Frases cálidas, de coqueteo suave y de cierre', secciones:[
    ['Para empezar', ['«Hola, soy ___, ¿tú de qué conoces a ___?».', '«Perdona, ¿sabes qué canción es esta?».', '«Me ha parecido que lo estabas pasando genial, ¿qué tal la noche?».']],
    ['Para coquetear con suavidad', ['«Me caes muy bien, se me pasa el tiempo volando».', '«Tienes una forma muy bonita de contar las cosas».', '«Me gusta cómo te ríes».', '«No me esperaba pasarlo tan bien esta noche».']],
    ['Para proponer un plan', ['«¿Te apetece que tomemos algo el jueves?».', '«Hay un concierto el sábado que te va a gustar, ¿te vienes?».']],
    ['Para pedir contacto', ['«Me ha gustado hablar contigo. ¿Te importa si te pido el Instagram?».']],
    ['Para pedir un beso', ['«¿Puedo besarte?».', '«Me apetece mucho besarte. ¿Y a ti?».']],
    ['Para cerrar con cariño', ['«Me lo he pasado genial. Repetimos pronto».', '«Gracias por esta noche».']],
    ['Para cuando te quedas en blanco', ['«Me he quedado en blanco, jaja. Dame un segundo».', '«Perdona, me he perdido pensando en lo que has dicho».']],
    ['Para cuando te dicen que no', ['«Vale, sin problema. Me alegro de haber hablado contigo».']]
  ]},
  { id:'d-tension', grupo:'ligar', icono:'⚡', titulo:'Crear complicidad y un poco de tensión, sin incomodar', sub:'Qué significa de verdad «poner nerviosa»', secciones:[
    ['Lo que no es', ['No es hacerla sentir mal, incómoda o insegura. Eso es manipular y suele salir mal.']],
    ['Lo que sí es', ['Un poco de emoción y de anticipación: sentir mariposas porque hay interés, no porque haya miedo.']],
    ['Cómo se crea', ['Contacto visual con una sonrisa y una pausa.', 'Cercanía física suave, sin invadir.', 'Una broma ligera y un comentario cálido y sincero.', 'Proponer algo con ilusión y concretar.']],
    ['Cuándo parar', ['Si ella se pone seria, se aparta o se calla, vuelve al tono normal. Siempre manda la comodidad.']]
  ]},
  { id:'d-labia', grupo:'ligar', icono:'🎙️', titulo:'Siete trucos para tener labia', sub:'Saber qué decir siempre', secciones:[
    ['1. Pregunta de seguimiento', ['Después de cada respuesta, «¿y cómo fue?» o «¿y por qué?».']],
    ['2. Tres pilares', ['Habla de hechos, de opiniones y de emociones. Si hablas siempre de hechos, aburre.']],
    ['3. Conecta con lo que ve y oye', ['Comentar el entorno siempre da tema.']],
    ['4. Cuenta historias cortas', ['Principio, giro, final. Sin dar demasiadas vueltas.']],
    ['5. Ten tu lista', ['Anota temas que te interesen (música, IA, viajes, planes) para tener qué contar.']],
    ['6. Acepta los silencios', ['Un silencio breve es normal. Respira y sigue.']],
    ['7. Practica', ['Habla con camareros, vecinos, compañeros. La labia es una costumbre, no un don.']]
  ]},
  { id:'d-miedo-rechazo', grupo:'ligar', icono:'🛡️', titulo:'Gestionar el miedo al rechazo', sub:'Lo que hacen quienes lo han trabajado', secciones:[
    ['Entender el miedo', ['Tu cerebro lo vive como una amenaza, porque antes ser rechazado era peligroso. Hoy no lo es: es un dato.']],
    ['Cómo bajarlo', ['Ponte objetivos de intentos, no de «sí».', 'Practica con rechazos pequeños: pedir una rebaja, una recomendación, algo sin importancia.', 'Después de un no, haz algo físico y cuenta lo que has aprendido.', 'Recuerda que la gente que más intenta es la que más «no» recibe y la que más «sí» acaba teniendo.']],
    ['Cómo responder a un no', ['«Vale, gracias por decírmelo. Pásalo muy bien».']],
    ['Si tiene novio o pareja', ['«Ah, genial, encantado igualmente». Sin incomodarla y sin discutir.']]
  ]}
);

GUIA.push(
  { bloque:'Intimidad: qué hacer en cada momento', items:[
    S17('g-pedir-intimidad', 'Quieres proponer ir a más y no sabes cómo', 'Hay buen rollo y besos, pero no sabes cómo dar el paso sin incomodar.', [
      'Mira que haya señales claras: cercanía, besos, ganas de estar a solas.',
      'Propón con calma: «¿Te apetece que sigamos en un sitio más tranquilo?».',
      'Deja fácil decir que no. Un «no» o un «hoy no» se acepta sonriendo.',
      'Mejor sin mucho alcohol.'
    ], 'Pedir con claridad y respeto es de lo más atractivo.', 'Practicar la frase «¿te apetece que sigamos en un sitio más tranquilo?»'),
    S17('g-preliminares-vez', 'No sabes cómo empezar los preliminares', 'Estáis en la cama y no sabes por dónde.', [
      'Empieza por besar y acariciar despacio. Cuello, espalda, brazos.',
      'Pregunta y fíjate en su respiración.',
      'No tengas prisa por llegar a ningún sitio.',
      'Si te quedas en blanco, vuelve a los besos: siempre funciona.'
    ], 'Lo importante es disfrutar, no hacerlo perfecto.', 'Dedicar más tiempo a besos y caricias'),
    S17('g-dedos', 'Quieres acariciarla con la mano y no sabes cómo', 'Estás con ella y quieres ir más allá con las caricias.', [
      'Manos limpias y uñas cortas.',
      'Empieza fuera, despacio, sobre la ropa y luego debajo. El clítoris es la zona más sensible, por fuera.',
      'Movimientos suaves y constantes, y pregunta cómo le gusta.',
      'Solo entras con un dedo y lubricado si ella lo quiere, y sin prisa.'
    ], 'Atención y calma valen más que técnica.', 'Leer la guía «Caricias con la mano» y practicar la comunicación'),
    S17('g-condon-vez', 'No sabes cómo ponerte el preservativo en el momento', 'Los nervios hacen que lo coloques mal o tardes.', [
      'Pellizca la punta y desenrolla hasta la base.',
      'Si te lo pones al revés, tíralo y coge otro.',
      'Si te cuesta, pídele que te lo ponga ella o hacedlo juntos como juego.',
      'Practicar a solas antes quita mucho miedo.'
    ], 'Es muy común equivocarse la primera vez.', 'Practicar a solas con un preservativo'),
    S17('g-se-rompe', 'Se rompe o se sale el preservativo', 'Notas que se ha roto o se ha caído.', [
      'Para y dilo con calma.',
      'La píldora del día después se compra en la farmacia sin receta; cuanto antes se tome, mejor.',
      'Para infecciones, ve a tu médico o a un centro de pruebas rápidas (en Barcelona hay centros comunitarios).',
      'No te culpes: pasa. Cuidaros es lo que importa.'
    ], 'Actuar pronto lo arregla casi todo.', 'Saber dónde está la farmacia y el centro de pruebas más cercanos'),
    S17('g-ella-no-llega', 'Ella no llega al orgasmo', 'Pasa y no sabes qué decir o hacer.', [
      'No lo vivas como un fracaso. Es muy común, sobre todo al principio.',
      'Pregunta con cariño: «¿Qué te gusta?».',
      'Dedica más tiempo al clítoris y a las caricias, no solo a la penetración.',
      'No presiones ni preguntes demasiado: el orgasmo no es la meta.'
    ], 'La conexión y la confianza lo hacen más probable con el tiempo.', 'Preguntar «¿qué te gusta?» en vez de adivinar'),
    S17('g-ella-sequedad', 'Ella no está lubricada o le molesta', 'Notas que no está cómoda o que duele.', [
      'Para y pregunta con calma.',
      'Más tiempo de preliminares, más lubricante y otro ritmo.',
      'No lo tomes como un rechazo: depende de muchos factores.',
      'Si se repite, que lo consulte con su ginecólogo.'
    ], 'La comodidad lo cambia todo.', 'Tener siempre lubricante a mano'),
    S17('g-despues-sexo', 'Después de estar con alguien, no sabes qué hacer', 'Acabáis y te quedas en blanco.', [
      'Un abrazo, agua y un comentario cálido.',
      'No te vayas corriendo ni mires el móvil.',
      'Pregunta cómo está: «¿Todo bien?».',
      'Al día siguiente, un mensaje cariñoso.'
    ], 'Lo que más se recuerda es cómo os tratáis después.', 'Practicar decir «me lo he pasado genial» con cariño'),
    S17('g-no-quieres-seguir', 'Tú no quieres seguir en medio de un momento íntimo', 'Estás con alguien y dudas o no te sientes bien.', [
      'Puedes parar siempre. No necesitas una razón perfecta.',
      'Dilo con calma: «Prefiero parar un momento».',
      'Una buena pareja lo respeta sin problema.',
      'Si te sientes incómodo, vete a casa o llama a un amigo.'
    ], 'Tu cuerpo, tus límites.', 'Ensayar la frase «prefiero parar» en voz alta'),
    S17('g-sexting', 'Te propone mensajes picantes o fotos', 'Te sorprende y no sabes si seguir.', [
      'Solo si tú quieres y confías en ella.',
      'Nunca mandes ni reenvíes fotos íntimas sin consentimiento total, y piensa en el riesgo de que circulen.',
      'Si no te apetece, puedes decirlo con tranquilidad.',
      'Si te manda algo, no lo compartas jamás.'
    ], 'Cuidar la intimidad de ambos es lo primero.', 'Decidir con antelación qué haría'),
    S17('g-pide-algo', 'Te pide algo que no te apetece', 'En un momento íntimo, te propone algo con lo que no te sientes cómodo.', [
      'Puedes decir que no con cariño: «Eso no me apetece, pero me gusta esto».',
      'Una buena pareja lo respeta.',
      'Si te sientes presionado, pare y hablad con calma.',
      'No hace falta justificarte.'
    ], 'Tus límites cuentan tanto como los de ella.', 'Practicar un «no me apetece» tranquilo'),
    S17('g-pruebas', 'Hablar de pruebas de ITS con alguien', 'Quieres cuidaros pero te da corte sacarlo.', [
      'Hazlo antes de estar en el momento: «Me gusta cuidarnos, ¿te has hecho pruebas hace poco?».',
      'Cuéntale tú también cuándo te las hiciste.',
      'Podéis ir juntos a un centro de pruebas.',
      'Es de adultos y suma confianza.'
    ], 'Quien se cuida, se respeta.', 'Mirar dónde hacerme pruebas rápidas en Barcelona')
  ]}
);

TIPS.push(
  ['Kino', 'Empieza el contacto físico con un toque suave en el brazo en un momento de risa. Luego observa su respuesta.'],
  ['Kino', 'Si ella se acerca o te devuelve el toque, puedes continuar. Si se aparta o se queda quieta, para.'],
  ['Kino', 'Un abrazo largo al despedirte, con calma, comunica cariño sin presión.'],
  ['Kino', 'En un sitio ruidoso, acercarte al oído para hablar es un contacto natural y bien aceptado, si ella no se aparta.'],
  ['Kino', 'Tocar a alguien con la mano en la espalda al pasar por una puerta es un gesto amable y educado.'],
  ['Kino', 'Antes de dar un beso o ir a más, mira sus labios y sus ojos, y pregunta si no estás seguro.'],
  ['Kino', 'Cuanto más cómodo estés tú con el contacto, más cómodo se sentirá ella.'],
  ['Microgestos', 'Si sonríe y se le arrugan los ojos, la sonrisa es auténtica.'],
  ['Microgestos', 'Cuando alguien está a gusto, tiende a copiar tu postura sin darse cuenta: es una pista bonita.'],
  ['Microgestos', 'Pies y cuerpo orientados hacia ti suelen indicar interés; hacia la salida, ganas de irse.'],
  ['Microgestos', 'Jugar con el pelo, el collar o la copa mientras te habla puede ser un gesto de interés. No lo tomes como una prueba.'],
  ['Microgestos', 'Si te mira, aparta y vuelve a mirar varias veces en poco rato, probablemente le llamas la atención.'],
  ['Microgestos', 'Un asentimiento lento y una ceja levantada suelen indicar atención y curiosidad.'],
  ['Microgestos', 'Si se muerde el labio o se humedece los labios mientras te mira, puede haber interés, pero también es un gesto común de nervios.'],
  ['Microgestos', 'Cuando se ríe fuerte con algo que dices y se tapa la boca, suele ser desinhibición y buen rollo.'],
  ['Cuerpo', 'Respira por la nariz y suelta el aire despacio antes de hablar: se te nota más tranquilo.'],
  ['Cuerpo', 'Cuando estés nervioso, relaja la mandíbula y los hombros: son las zonas donde se acumula la tensión.'],
  ['Cuerpo', 'No cruces las piernas ni los brazos si quieres parecer cercano.'],
  ['Cuerpo', 'Al saludar, mira a los ojos y sonríe un segundo antes de hablar.'],
  ['Cuerpo', 'Camina con los hombros relajados y la mirada al frente, no al suelo.'],
  ['Trucos curiosos', 'Mira el color de sus ojos al saludar: es una forma fácil de sostener la mirada sin agobiarte.'],
  ['Trucos curiosos', 'Hacer una pausa de un segundo antes de responder da calma y mejora lo que dices.'],
  ['Trucos curiosos', 'Pedir una recomendación («¿qué me aconsejas de aquí?») es un truco amable que invita a conversar.'],
  ['Trucos curiosos', 'Nombrar lo que ves que siente («se te nota la ilusión») hace que se sienta vista.'],
  ['Trucos curiosos', 'Recordar y preguntar un detalle de la vez anterior es de lo que más conecta.'],
  ['Trucos curiosos', 'Acabar la conversación con un hilo abierto («luego me cuentas») deja ganas de volver.'],
  ['Trucos curiosos', 'Una actividad compartida (cocinar, bailar, un juego) crea cercanía más rápido que solo hablar.'],
  ['Trucos curiosos', 'Los recuerdos de una cita se forman sobre todo por lo más intenso y por el final. Cuida la despedida.'],
  ['Trucos curiosos', 'Un cumplido sobre algo que ha elegido (no solo su aspecto) se queda más.'],
  ['Trucos curiosos', 'Agradecer detalles pequeños («gracias por venir») genera cariño.'],
  ['Cosas que decir', '«¿Qué es lo que más te ha gustado de esta semana?» abre conversaciones agradables.'],
  ['Cosas que decir', '«Me caes muy bien» es una frase sencilla, sincera y que casi nunca falla.'],
  ['Cosas que decir', '«Me apetece verte otra vez» es clara, cálida y fácil de responder.'],
  ['Cosas que decir', '«¿Puedo besarte?» es una de las frases más atractivas, no lo contrario.'],
  ['Cosas que decir', '«Cuéntame más de eso» es la mejor frase para quedar como alguien que escucha.'],
  ['Cosas que decir', '«Me he quedado en blanco, jaja» desactiva la tensión con humor.'],
  ['Cosas que decir', '«Tengo un plan, ¿te apuntas?» es una invitación más clara que «a ver si quedamos».'],
  ['Primera vez', 'La primera vez con alguien casi nunca sale como en las películas. Sale como sale, y está bien.'],
  ['Primera vez', 'Hablar antes de lo que os apetece y de lo que no quita mucha presión.'],
  ['Primera vez', 'Lubricante y preservativos a mano: es de adultos, no de inexpertos.'],
  ['Primera vez', 'No tienes que hacer «todo». Con besos y caricias ya es una experiencia completa.'],
  ['Primera vez', 'Si hay nervios, una pausa, un abrazo y un chiste suelen arreglarlo.'],
  ['Primera vez', 'No compares con lo que has visto en vídeos: es un guion, no la realidad.'],
  ['Preliminares', 'Mucha gente disfruta más de los preliminares que de la penetración. Dedícales tiempo.'],
  ['Preliminares', 'Cuello, orejas, espalda y muslos suelen ser zonas muy agradables. Empieza suave.'],
  ['Preliminares', 'Cambia de ritmo y de presión poco a poco y fíjate en su respiración.'],
  ['Preliminares', 'Las uñas cortas y las manos limpias son la base de cualquier caricia.'],
  ['Preliminares', 'El clítoris responde mejor a un contacto suave y constante que a uno rápido y fuerte.'],
  ['Preliminares', 'Pregunta «¿así?» y escucha. Es lo más útil que puedes hacer.'],
  ['Cuerpo y salud', 'Hazte pruebas de ITS de forma regular si tienes parejas nuevas.'],
  ['Cuerpo y salud', 'Después del sexo, orinar ayuda a evitar infecciones, especialmente a las mujeres.'],
  ['Cuerpo y salud', 'Los ejercicios de suelo pélvico (Kegel) pueden ayudar a controlar mejor la eyaculación.'],
  ['Cuerpo y salud', 'Si hay dolor, picor o escozor repetidos, consulta con tu médico. No es nada de lo que avergonzarse.'],
  ['Cuerpo y salud', 'Un preservativo de tu talla se siente mejor y falla menos.'],
  ['Cuerpo y salud', 'Si sientes mucha ansiedad con el sexo, un sexólogo puede ayudarte con ejercicios sencillos y sin juzgar.'],
  ['Rechazo', 'Un buen ejercicio: pide algo pequeño cada día (una recomendación, un descuento). El «no» se vuelve normal.'],
  ['Rechazo', 'Quien te dice que no con educación te hace un favor: te ahorra tiempo.']
);

/* Rehacer «Tips rápidos» con todos los tips cargados */
(() => {
  const d = DOCS.find(x => x.id === 'd-tips');
  if (d) d.secciones = [...new Set(TIPS.map(t => t[0]))].map(c => [c, TIPS.filter(t => t[0] === c).map(t => t[1])]);
})();

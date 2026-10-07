/* Simulador de escenas: sin respuesta «correcta». Cada opción da algo y cuesta algo, y el resultado depende en parte del azar.
   Formato de opción del primer paso: [texto, estilo, lo que te da, lo que te cuesta, cómo se ve desde fuera, si sale bien, si sale regular]
   Formato de opción del segundo paso: [texto, estilo, lo que te da, lo que te cuesta, cómo se ve desde fuera] */
'use strict';

const SIM_ESCENAS = [
  { id:'cola', ico:'🎟️', t:'La cola del concierto', setup:'Estás en la cola de un concierto. La chica de delante se gira, te mira un segundo y sonríe. Luego se vuelve. Tus amigos están a tres metros.',
    o1:[
      ['Le dices algo sobre el concierto o la cola', 'acerca', 'Una conversación con tema ya dado. Sabes pronto si hay algo.', 'Puede quedarse en una frase y sentirte expuesto un momento.', 'Alguien sencillo y con iniciativa.', 'Ella se gira del todo y te cuenta que ha venido sola.', 'Contesta amable, sonríe y se vuelve. Fin.'],
      ['Le devuelves la sonrisa y esperas a ver si se gira otra vez', 'espera', 'Poco riesgo y ves si hay algo más.', 'Si no pasa nada, la cola acaba y te quedas con la duda.', 'Simpático. No se sabe si interesado.', 'Se gira otra vez y dice «¡qué ganas!».', 'No vuelve a girarse.'],
      ['Miras el móvil: seguro que ha sonreído por otra cosa', 'evita', 'Cero riesgo y calma inmediata.', 'Casi siempre acabas dándole vueltas más tarde. Cuesta más el recuerdo que el intento.', 'Alguien ocupado o cerrado.', 'La cola avanza, entras con tus amigos y estás tranquilo.', 'Toda la noche con la duda de «qué habría pasado».'],
      ['Haces una broma a tus amigos, en voz alta, para que la oiga', 'humor', 'Indirecto y ligero. Mides su reacción sin comprometerte.', 'Es ambiguo: puede no leerse como una invitación.', 'Divertido, pero no se sabe si le hablas a ella.', 'Ella se ríe y te mira.', 'Con el ruido, ni lo oye.']
    ],
    q2:'Pasan unos minutos y la cola avanza. ¿Cómo lo dejas?',
    o2:[
      ['«Nos vemos dentro, ¿te vienes con nosotros a la barra?»', 'acerca', 'Un plan concreto y fácil de aceptar o rechazar.', 'Un «no» es más claro y más visible.', 'Alguien resuelto y amable.'],
      ['«Me ha hecho gracia hablar contigo, a ver si nos vemos dentro»', 'sincero', 'Dices lo que sientes sin exigir nada.', 'Es una puerta abierta, no una cita: puede quedarse ahí.', 'Cálido y poco presionante.'],
      ['Cada uno por su lado y ya', 'evita', 'Tranquilidad.', 'Si había algo, se acaba aquí.', 'Neutro.']
    ],
    dato:'Quien se acerca tiende a arrepentirse menos con los años que quien se queda (Gilovich y Medvec, 1995). Y casi todo el mundo subestima cuántos «sí» recibe al pedir algo razonable (Flynn y Lake, 2008).',
    puente:'Si alguien me sonríe en una cola, diré una frase sobre lo que hacemos ahí (la música, la espera).' },

  { id:'amigo-chica', ico:'🍻', t:'Tu amigo se va con una chica', setup:'En un bar, tu amigo se pone a hablar con una chica y su amiga se queda a tu lado. Se hace un silencio de unos cuatro segundos.',
    o1:[
      ['Le preguntas de qué conoce a la otra', 'pregunta', 'Un tema fácil que no depende de ti.', 'Puede sentirse como una conversación «de favor».', 'Amable, sin presión.', 'Ella se anima y acabáis hablando de otras cosas.', 'Contesta en dos frases y mira hacia su amiga.'],
      ['Dices: «Nos han dejado aquí tirados, jaja»', 'humor', 'Complicidad inmediata sobre la situación compartida.', 'Si suena a queja, enfría.', 'Natural y con gracia.', 'Se ríe y se relaja contigo.', 'Sonríe, pero no entra al juego.'],
      ['Vas a la barra a pedir algo para los dos', 'agrada', 'Un gesto amable y sales de la tensión.', 'Pierdes el momento de hablar y puedes sentirte camarero.', 'Atento, aunque algo callado.', 'Vuelves y ella te agradece y hablan.', 'Vuelves y ella ya habla con su amiga.'],
      ['Te quedas a su lado esperando a ver si ella empieza', 'espera', 'No arriesgas nada.', 'El silencio crece y se nota más para ti que para ella.', 'Tranquilo, o quizá distante.', 'Ella rompe el hielo con una pregunta.', 'El silencio se alarga y cada uno mira su móvil.']
    ],
    q2:'Pasan diez minutos. La conversación ha ido más o menos. ¿Cómo sigues?',
    o2:[
      ['Le pides el contacto con una frase sencilla', 'acerca', 'Una respuesta clara.', 'Puede ser un no, incómodo un momento.', 'Directo y respetuoso.'],
      ['Sigues charlando sin más y ya veremos', 'espera', 'No hay riesgo y la conversación fluye.', 'Es fácil que se acabe la noche sin nada.', 'Agradable, sin intención clara.'],
      ['Te despides con un «ha sido un placer» y vuelves con tu amigo', 'sincero', 'Cierre limpio y amable.', 'Renuncias a una posibilidad que quizá existía.', 'Educado y tranquilo.']
    ],
    dato:'Los silencios de unos 4 segundos empiezan a notarse (Koudenburg, 2011). Y tras una conversación, la otra persona suele valorarte mejor de lo que crees (Boothby, 2018).',
    puente:'Si me quedo solo con alguien tras un silencio, haré una pregunta sobre la última cosa que ha dicho.' },

  { id:'mensaje', ico:'📱', t:'Te contesta que «esta semana es difícil»', setup:'Llevas tres días hablando con alguien de una app. Propones quedar y contesta cinco horas después: «jaja a ver, esta semana lo veo complicado».',
    o1:[
      ['«Sin problema, ¿qué tal el siguiente fin de semana?»', 'acerca', 'Pones otra opción y ves si ella concreta.', 'Puede parecer insistencia, aunque sea razonable.', 'Interesado, flexible.', 'Ella contesta con un día concreto.', 'Ella contesta «ya te digo» y se pierde.'],
      ['No contestas y dejas que ella proponga', 'espera', 'Mantienes distancia y ves su iniciativa.', 'Si ella también espera, nadie propone nada.', 'Tranquilo o desinteresado, según cómo se lea.', 'Ella escribe dos días después con un plan.', 'Pasan los días y nadie escribe.'],
      ['«Entiendo. Me apetecía quedar contigo, así que dime tú cuándo te va bien»', 'sincero', 'Dejas claro tu interés y le das la decisión.', 'Te expones más: si no responde, duele un poco.', 'Claro y seguro.', 'Ella agradece que seas directo y propone.', 'Ella contesta amable y vaga.'],
      ['«Claro, tranquila, cuando puedas ☺️» y le mandas un meme', 'agrada', 'Ligereza y buen ambiente.', 'Das la sensación de que no te importa cuándo.', 'Simpático, algo pasivo.', 'Ella ríe con el meme y retoma el hilo.', 'Ella pone un emoji y no continúa.']
    ],
    q2:'Pasan dos días sin respuesta. ¿Qué haces?',
    o2:[
      ['Dejarlo estar sin más', 'evita', 'Descanso mental y sigues con tu vida.', 'Nunca sabrás si fue una ocasión perdida.', 'Neutro.'],
      ['Un mensaje ligero y distinto, sin pedir nada', 'acerca', 'Una última oportunidad sin presión.', 'Puede quedar sin respuesta y sentirte tonto un rato.', 'Cercano, sin agobio.'],
      ['«Veo que no encaja ahora, mucha suerte»', 'sincero', 'Cierras con claridad y dignidad.', 'Puedes cerrar algo que aún estaba vivo.', 'Maduro y claro.']
    ],
    dato:'Subestimamos lo bien que sienta que alguien nos escriba (Liu y otros, 2023). Y no hay pruebas de que hacerte esperar funcione: lo que sí ayuda es igualar el ritmo y mostrar interés claro.',
    puente:'Si no contesta en dos días, mandaré un único mensaje ligero y, pase lo que pase, dejo de escribir.' },

  { id:'cita-soltero', ico:'☕', t:'«¿Y por qué sigues soltero?»', setup:'Primera cita. Hay un silencio y ella pregunta, sonriendo, «¿y tú por qué sigues soltero?».',
    o1:[
      ['«Hasta hace poco me costaba, he trabajado en ello»', 'sincero', 'Una respuesta real que crea cercanía.', 'Te expones, y cuesta decir algo vulnerable.', 'Seguro y honesto, mucho más de lo que sientes.', 'Ella asiente y cuenta algo suyo.', 'Ella escucha, sonríe y cambia de tema con tacto.'],
      ['«Soy muy exigente, jaja»', 'humor', 'Ligero, sales airoso.', 'Es una evasiva: puede sonar a presunción.', 'Gracioso, algo distante.', 'Ella ríe y replica con otra broma.', 'Ella sonríe, pero nota que esquivas.'],
      ['«¿Y tú? ¿Cuánto llevas soltera?»', 'pregunta', 'Devuelves el foco, ella suele disfrutar contando.', 'Si lo haces siempre, parece que evitas hablar de ti.', 'Curioso y educado.', 'Ella cuenta con ganas y os acercáis.', 'Ella contesta corto y repite la pregunta.'],
      ['«No sé, supongo que no ha surgido»', 'evita', 'Respuesta corta y cómoda.', 'Se queda superficial y ella no aprende nada de ti.', 'Tímido, un poco cerrado.', 'Ella dice «a mí me pasaba igual» y se abre.', 'Un silencio y vuelve el móvil.']
    ],
    q2:'Ella cuenta algo personal (una ruptura reciente). ¿Cómo respondes?',
    o2:[
      ['Una pregunta de seguimiento: «¿Y cómo lo llevas ahora?»', 'pregunta', 'Se siente escuchada.', 'Ella puede alargarse y no hablar tú.', 'Atento y empático.'],
      ['Cuentas algo tuyo parecido, más pequeño', 'sincero', 'Reciprocidad: crece la cercanía.', 'Corres el riesgo de quitarle protagonismo.', 'Cercano y humano.'],
      ['Intentas aliviar con una broma', 'humor', 'Quitas peso al momento.', 'Puede parecer que minimizas lo que siente.', 'Ligero, a veces poco sensible.']
    ],
    dato:'Compartir cosas personales de forma gradual y mutua crea cercanía (Aron, 1997). Y la gente ve la vulnerabilidad ajena como valentía y la propia como debilidad (Bruk, 2018).',
    puente:'Si me preguntan algo personal, contestaré con una verdad pequeña y devolveré la pregunta.' },

  { id:'toque', ico:'🤲', t:'Te toca el brazo al reírse', setup:'En una cena de amigos, mientras habláis, ella te toca el antebrazo un segundo al reírse. No sabes si significa algo.',
    o1:[
      ['Le devuelves un toque ligero en el brazo o el hombro', 'acerca', 'Respuesta natural; lees su reacción.', 'Si era solo un gesto de amistad, se queda en nada.', 'Cómodo y correspondiente.', 'Ella sonríe y se queda más cerca.', 'Ella no reacciona; era solo un gesto.'],
      ['No haces nada y sigues hablando', 'espera', 'No te precipitas ni te equivocas.', 'Si había algo, no recibe respuesta.', 'Tranquilo, difícil de leer.', 'Ella lo vuelve a hacer más tarde.', 'La cena sigue y no vuelve a ocurrir.'],
      ['Aprovechas y propones: «Me apetece seguir hablando, ¿tomamos algo luego?»', 'sincero', 'Pides lo que quieres sin esperar señales perfectas.', 'Un «no» llega directo y en medio de un grupo.', 'Seguro y claro.', 'Ella dice «claro, ¡me apetece!».', 'Ella dice «hoy me voy pronto» con amabilidad.'],
      ['Te pones algo rígido y cambias de tema por los nervios', 'evita', 'Control de la situación y alivio.', 'Un posible interés se queda sin respuesta.', 'Parecería incómodo.', 'Ella sigue la conversación sin darle importancia.', 'Ella nota la rigidez y se aparta un poco.']
    ],
    q2:'Termina la cena. ¿Cómo la despides?',
    o2:[
      ['Un abrazo largo y «me lo he pasado genial hablando contigo»', 'sincero', 'Cierras con calidez y claridad.', 'Quedas más visible si no es recíproco.', 'Cálido y seguro.'],
      ['Te despides de todos igual', 'espera', 'Cómodo y sin riesgo.', 'No marcas nada especial.', 'Correcto y neutro.'],
      ['Le pides su contacto para «mandarle esa canción»', 'acerca', 'Un motivo natural y concreto.', 'Puede ser un no o un «claro» frío.', 'Con iniciativa y sencillez.']
    ],
    dato:'Un toque aislado es una señal débil: puede ser amistad. Los estudios dicen que los hombres tienden a sobreinterpretar interés (Abbey, 1982) y quien tiene ansiedad social a infraestimarlo. Por eso lo fiable no es el gesto, sino qué pasa cuando propones algo pequeño.',
    puente:'Si dudo de una señal, propondré algo pequeño y miraré cómo responde, en vez de interpretar el gesto.' },

  { id:'le-gusta-otro', ico:'💔', t:'«Me gusta otro chico»', setup:'Una amiga con la que hay buen rollo (y a ti te gusta) te cuenta que le gusta otro. Te pide tu opinión.',
    o1:[
      ['Le dices que te cuesta oírlo porque a ti te gusta ella', 'sincero', 'Te quitas peso y tomas la decisión de decirlo.', 'La amistad puede cambiar; quizá ella se incomode.', 'Valiente, aunque la sitúa en un aprieto.', 'Ella agradece la sinceridad y habláis con calma.', 'Ella se queda incómoda y se distancia un tiempo.'],
      ['Le das consejos amables y te lo tragas', 'agrada', 'Conservas la amistad y la imagen de buen amigo.', 'Acumulas lo que sientes y puede doler más adelante.', 'Un amigo estupendo y generoso.', 'Ella te lo agradece y todo sigue igual.', 'Te sientes mal los días siguientes sin saber por qué.'],
      ['Cambias de tema y te distancias poco a poco', 'evita', 'Te proteges del dolor.', 'Perdéis una amistad y quizá lo que podía haber sido.', 'Distante, sin explicación.', 'Ella respeta tu espacio.', 'Ella se pregunta qué ha pasado y se aleja.'],
      ['Bromeas para quitarle drama y escondes lo que sientes', 'humor', 'El momento se aligera.', 'Lo que sientes sigue sin salir.', 'Divertido, poco accesible.', 'Se ríen y el tema pasa.', 'Ella se queda sin saber qué piensas realmente.']
    ],
    q2:'Días después te escribe para quedar «como amigos». ¿Qué haces?',
    o2:[
      ['Aceptas y pones un límite: «Voy a necesitar un tiempo»', 'sincero', 'Cuidas de ti y de la amistad.', 'Tendrás que explicarlo y sentirás culpa.', 'Maduro y claro.'],
      ['Aceptas como si nada', 'agrada', 'Sigues cerca de ella.', 'Te hace daño si lo que sientes no ha pasado.', 'Disponible, quizás demasiado.'],
      ['Declinas con una excusa', 'evita', 'Te ahorras el malestar inmediato.', 'La amistad se enfría y no se resuelve.', 'Evasivo.']
    ],
    dato:'Reprimir lo que sientes cansa y hace que los demás te sientan menos cercano (Butler, 2003). Ponerle nombre a la emoción calma (Lieberman, 2007).',
    puente:'Si me gusta alguien con quien tengo confianza, decidiré en una semana si se lo digo, en vez de esperar meses.' },

  { id:'rambla', ico:'🕵️', t:'Te invitan a «un sitio aquí al lado»', setup:'Una chica te aborda en la Rambla: «Hola, ¿nos ayudas? Es el cumple de mi amiga, vamos a un sitio aquí al lado, te invitamos a una copa».',
    o1:[
      ['Vas: no quieres ser maleducado', 'agrada', 'Evitas la incomodidad de decir que no.', 'Es un timo muy conocido: pueden cobrarte una cuenta enorme.', 'Amable, y fácil de persuadir.', 'Resulta ser un local normal y no pasa nada.', 'Te cobran más de 150 € y no tienes escapatoria fácil.'],
      ['«No, gracias» y sigues andando', 'evita', 'Te quitas el problema al instante.', 'Puede que te sientas algo brusco.', 'Seguro, sin explicaciones.', 'Ella dice «vale» y se va.', 'Ella insiste un poco y te suelta enseguida.'],
      ['Preguntas el nombre del sitio y los precios antes de decidir', 'pregunta', 'Información real antes de comprometerte.', 'Reconoce la situación y puede ponerse tensa.', 'Prudente y con calle.', 'Ella cambia de tema y se despide.', 'Ella te presiona: «¡No pasa nada, vente!».'],
      ['«Me encanta la idea, pero hoy no. ¡Gracias!»', 'sincero', 'Un no amable y claro.', 'Si insiste, hay que repetirlo.', 'Educado y firme.', 'Ella sonríe y se va.', 'Ella intenta convencerte unos segundos más.']
    ],
    q2:'Te insisten, se acerca otra persona y te cogen del brazo. ¿Qué haces?',
    o2:[
      ['«He dicho que no» y te sueltas con firmeza', 'sincero', 'Dejas claro tu límite.', 'La tensión sube un momento.', 'Firme.'],
      ['Te vas rápido hacia donde hay más gente', 'evita', 'Sales de la situación y estás más seguro.', 'Te quedas con el mal rato.', 'Prudente.'],
      ['Pides ayuda en voz alta', 'acerca', 'La gente alrededor reacciona y los otros se van.', 'Atraes atención incómoda.', 'Decidido.']
    ],
    dato:'Estos timos usan principios de persuasión muy estudiados: reciprocidad («te invitamos»), compromiso («ven un momento») y presión social (Cialdini). La cortesía no es una obligación de aceptar.',
    puente:'Si me abordan en la calle con una invitación, diré «no, gracias» sin parar de andar, sin explicar nada.' },

  { id:'no-contacto', ico:'🙅', t:'«Mejor no, perdona»', setup:'Tras 15 minutos hablando con alguien, le pides su Instagram y te dice, con educación, «mejor no, perdona».',
    o1:[
      ['«Vale, gracias por decírmelo. Que pases buena noche»', 'sincero', 'Sales con dignidad y te sientes en paz.', 'Duele un poco en el momento.', 'Maduro y elegante.', 'Ella sonríe aliviada y se despide con calidez.', 'Ella asiente y se va. Todo bien.'],
      ['Te vas sin decir nada', 'evita', 'Escapas del momento.', 'Cargas con la vergüenza más tiempo.', 'Brusco o dolido.', 'Ella ni se da cuenta.', 'Ella te nota enfadado y se siente incómoda.'],
      ['«¿Pasa algo? ¿Por qué no?»', 'pregunta', 'Intentas entender.', 'Pones a la otra persona en un aprieto y suele empeorarlo.', 'Insistente.', 'Ella se explica con amabilidad.', 'Ella se incomoda y corta la conversación.'],
      ['«Me lo temía, jaja. Buen concierto»', 'humor', 'Quitas tensión y sales con ligereza.', 'Puede esconder que te dolió.', 'Ligero y sociable.', 'Ella ríe y se relaja.', 'Ella sonríe incómoda y se despide.']
    ],
    q2:'Vuelves con tus amigos y te preguntan qué tal. ¿Qué cuentas?',
    o2:[
      ['Lo cuentas como anécdota, con humor', 'humor', 'Le quitas peso y la gente te sigue sin juicio.', 'Puede esconder que te dolió.', 'Con soltura.'],
      ['Te lo callas', 'evita', 'No tienes que explicar nada.', 'Se te queda dentro y alimenta la idea de «fallé».', 'Reservado.'],
      ['Lo cuentas tal cual, incluida la parte que te dolió', 'sincero', 'Descargas y te sientes acompañado.', 'Exige confiar en ellos.', 'Abierto y cercano.']
    ],
    dato:'Predecimos que un rechazo dolerá más y durará más de lo que luego dura (Gilbert, 1998). Y que ella diga que no a tu petición no dice nada de tu valor.',
    puente:'Si recibo un no, diré «gracias por decírmelo», me iré y lo contaré como anécdota esa misma noche.' },

  { id:'broma-pesada', ico:'🎯', t:'La broma pesada de un amigo', setup:'Delante de una chica que te interesa, un amigo suelta: «este lleva dos años sin comerse un colín». Todos ríen.',
    o1:[
      ['Te ríes y le devuelves la broma', 'humor', 'Salvas el momento sin conflicto.', 'Aceptas que se pueda hablar así de ti.', 'Con buen humor, aunque se ve forzado.', 'Ella ríe contigo y te mira con simpatía.', 'Ella no ríe y te mira algo incómoda.'],
      ['«Esa no me ha hecho gracia, tío»', 'sincero', 'Pones un límite claro.', 'Puede parecer tenso y romper el ambiente.', 'Firme.', 'Tu amigo se disculpa y ella lo valora.', 'El ambiente se corta un momento.'],
      ['Te pones rojo y callas', 'evita', 'No hay conflicto.', 'Te sientes mal y se queda sin respuesta.', 'Cortado, quizá humillado.', 'Ella te dice «no le hagas caso» con simpatía.', 'Ella cambia de tema y tú te hundes.'],
      ['Te ríes con ellos como si nada', 'agrada', 'Encajas.', 'Tragas lo que te ha dolido.', 'Buen rollo, algo sumiso.', 'Se pasa rápido y siguen.', 'Te lo repites toda la noche.']
    ],
    q2:'Ella te dice al oído: «No hagas caso, son tontos». ¿Qué respondes?',
    o2:[
      ['«Jaja, me conocen demasiado. ¿Y tú quién eres de este grupo?»', 'pregunta', 'Giras la conversación hacia ella.', 'Quedas sin hablar de lo que te dolió.', 'Con soltura.'],
      ['«Gracias, la verdad es que me ha dolido un poco»', 'sincero', 'Cercanía y confianza.', 'Es una exposición en un momento tenso.', 'Honesto y valiente.'],
      ['«Tranquila, no pasa nada»', 'espera', 'Mantienes la calma.', 'Dejas escapar un momento de conexión.', 'Correcto y neutro.']
    ],
    dato:'Reírte de ti mismo con ligereza cae bien, pero aguantar burlas que te duelen no. La diferencia es si tú lo eliges (efecto pratfall, Aronson 1966).',
    puente:'Si una broma me duele, lo diré una vez, con una sonrisa: «esa no me ha hecho gracia».' },

  { id:'tres-de-la-manana', ico:'🌙', t:'Las 3 de la mañana', setup:'Has bebido, tu amigo ha ligado y tú no. En el móvil tienes abierto el chat de una chica que conociste ayer. Te sientes mal contigo.',
    o1:[
      ['Le escribes algo cariñoso', 'acerca', 'Desahogo inmediato.', 'Escrito con bajón y alcohol, es fácil de lamentar.', 'Inesperado y a deshoras.', 'Ella lo ve por la mañana y contesta con simpatía.', 'Ella lo ve por la mañana y no sabe cómo contestar.'],
      ['Dejas el móvil y te duermes', 'evita', 'Te proteges de un arrepentimiento.', 'Te quedas con el malestar sin ordenar.', 'Neutro.', 'Por la mañana lo ves todo menos oscuro.', 'Te despiertas con un nudo y la cabeza llena.'],
      ['Lo escribes en notas sin enviarlo', 'sincero', 'Sueltas lo que sientes sin consecuencias.', 'No resuelve el malestar de golpe.', 'Nadie lo ve.', 'Al día siguiente lo relees y te hace ver lo que pasaba.', 'Al día siguiente ni lo abres, pero dormiste mejor.'],
      ['Escribes a tu amigo para que te anime', 'agrada', 'Apoyo humano.', 'Interrumpes su noche y puedes sentirte dependiente.', 'Un amigo que pide ayuda.', 'Te contesta con cariño y te calma.', 'No contesta y te sientes peor.']
    ],
    q2:'Al día siguiente, con resaca, ¿qué haces?',
    o2:[
      ['Agua, desayunar y no sacar conclusiones hasta la tarde', 'espera', 'Cuidas el cuerpo antes de pensar.', 'Aplazas la conversación contigo.', 'Sensato.'],
      ['Escribir en el diario lo que pasó, sin juzgarte', 'sincero', 'Orden y aprendizaje.', 'Con resaca cuesta y todo parece peor.', 'Reflexivo.'],
      ['Mirar sus redes y analizar todo', 'evita', 'Calma inmediata de curiosidad.', 'Alimenta la rumia.', 'Nada visible.']
    ],
    dato:'Con mal ánimo recordamos más lo malo y leemos lo ambiguo como negativo. Y el bajón del día siguiente al alcohol es más fuerte en personas tímidas. Tus conclusiones de madrugada son poco fiables.',
    puente:'Si me siento mal de madrugada, escribiré en notas sin enviar y decidiré por la mañana.' },

  { id:'cuerpo-nervios', ico:'🌗', t:'Tu cuerpo no responde', setup:'Estás con alguien, hay ganas y por los nervios tu cuerpo no responde como esperabas. Empiezas a pensar «va a notarlo».',
    o1:[
      ['Dices: «Estoy nervioso, vamos despacio»', 'sincero', 'Se va gran parte de la presión.', 'Es difícil decirlo en voz alta.', 'Cercano, honesto y confiado.', 'Ella te abraza y seguís con calma.', 'Ella asiente y os quedáis charlando abrazados.'],
      ['Pones una excusa y te vas', 'evita', 'Escapas de la tensión.', 'Te quedas con el miedo intacto.', 'Confuso para ella.', 'Ella entiende que estabas cansado.', 'Ella se queda sin saber qué ha pasado.'],
      ['Sigues intentándolo con más fuerza', 'espera', 'Mantienes el plan.', 'La vigilancia aumenta la ansiedad.', 'Tenso.', 'Se relaja solo y acabáis bien.', 'Empeora y el momento se enfría.'],
      ['Cambias a caricias y le preguntas qué le gusta', 'pregunta', 'Quitas el foco de ti y ella se implica.', 'Hay que ser capaz de soltar el objetivo.', 'Atento y generoso.', 'Ella disfruta y tú te relajas.', 'Se queda en caricias y lo dejáis para otro día.']
    ],
    q2:'Después, tumbados. ¿Qué haces?',
    o2:[
      ['«Gracias por tener paciencia. Me ha pasado por los nervios»', 'sincero', 'Cierre cálido y real.', 'Exige mostrarte un poco vulnerable.', 'Cercano.'],
      ['Haces una broma ligera', 'humor', 'Quitas peso.', 'Puede sonar a evadirlo.', 'Simpático.'],
      ['No dices nada del tema', 'evita', 'Evitas incomodar.', 'La duda se queda con los dos.', 'Neutro.']
    ],
    dato:'Vigilarte durante el sexo (spectatoring) es una causa muy común de perder la erección. La ansiedad por rendir se alimenta de intentar «arreglarlo». Decirlo con calma suele acercar más que alejar.',
    puente:'Si mi cuerpo no responde, bajaré el ritmo, pasaré a caricias y lo diré con una frase tranquila.' },

  { id:'amigas', ico:'👯', t:'Sus amigas apenas te hacen caso', setup:'Te presenta a sus amigas. Hablan entre ellas de gente y cosas que no conoces. Casi no te miran.',
    o1:[
      ['Preguntas por lo que hablan', 'pregunta', 'Entras con curiosidad y te explican.', 'Puedes sentirte «el novato».', 'Interesado y abierto.', 'Se animan a contarte y te incluyen.', 'Te lo explican en una frase y siguen entre ellas.'],
      ['Te quedas sonriendo y escuchando', 'espera', 'Cero esfuerzo y observas.', 'Si nadie te incluye, te quedas fuera.', 'Tranquilo o apagado.', 'Una amiga te pregunta algo y entras.', 'Pasa media hora y casi no has hablado.'],
      ['Bromeas con que eres «el nuevo»', 'humor', 'Rompes el hielo con humor.', 'Puede quedar poco gracioso o forzado.', 'Simpático.', 'Se ríen y te hacen hueco.', 'Sonríen con cortesía y siguen.'],
      ['Sales a «coger aire» y miras el móvil', 'evita', 'Alivio inmediato.', 'Refuerzas la sensación de no encajar.', 'Distante.', 'Vuelves más tranquilo.', 'Ella te busca con la mirada y no te ve.']
    ],
    q2:'Ella te dice al oído: «¿Estás bien?». ¿Qué respondes?',
    o2:[
      ['«Sí, solo estoy conociendo el terreno. Me caen genial»', 'sincero', 'Tranquilizas y muestras interés.', 'Exiges algo de seguridad.', 'Seguro.'],
      ['«Un poco cortado, la verdad. Me ayudas a entrar?»', 'sincero', 'Honesto y cercano.', 'Te muestras vulnerable.', 'Valiente y encantador.'],
      ['«Todo bien, tranquila»', 'espera', 'Mantienes la calma.', 'Pierdes la oportunidad de que te ayude.', 'Correcto.']
    ],
    dato:'En un grupo nuevo, la mayoría se siente fuera al principio. Los primeros 20-30 minutos son los más difíciles y la segunda vez es mucho más fácil. Y mostrar un poco de vulnerabilidad suele acercar (Bruk, 2018).',
    puente:'Si entro en un grupo que no conozco, haré una pregunta a una persona en los primeros diez minutos.' }
];

/* Cómo lo leemos: descripción de cada estilo, sin juicio */
const SIM_ESTILOS = {
  acerca:['🧭', 'Tomas la iniciativa', 'Sueles dar el paso tú. Te expone, pero te quita dudas.'],
  pregunta:['❓', 'Preguntas y muestras curiosidad', 'Llevas la conversación hacia el otro. Es muy valorado; cuida contar también cosas tuyas.'],
  humor:['😄', 'Ligereza y humor', 'Sueles quitar peso con humor. Va bien; fíjate en cuándo esconde lo que sientes.'],
  sincero:['💬', 'Dices lo que sientes', 'Eres directo con lo que te pasa. Cuesta y acerca.'],
  espera:['⏳', 'Esperas una señal más clara', 'Prefieres ver más antes de actuar. Protege, pero a veces la señal no llega.'],
  evita:['🚪', 'Te retiras o evitas', 'Cuando algo da miedo, tiendes a salir. Es humano y se entrena poco a poco.'],
  agrada:['🤝', 'Cedes o buscas agradar', 'Cuidas el ambiente y a los demás. Cuida también lo que tú quieres.']
};

/* Contenido ampliado 8: muchas más situaciones (intimidad, mensajes, trabajo, citas, noche). */
'use strict';
const S9 = (id, titulo, pasa, hacer, sale, practica, extra) => ({ id, titulo, pasa, hacer, ejemplos: [], cierre: '', extra: extra || [], sale, practica });

GUIA.push(
  { bloque:'Intimidad, con calma y con respeto', items:[
    S9('g-primera-vez', 'Tu primera vez con alguien (o la primera en mucho tiempo)', 'Sientes que no sabes qué hacer, que te van a juzgar por tu poca experiencia y que lo vas a hacer mal.', [
      'La experiencia no se nota tanto como crees. Se nota mucho más la atención: mirar, escuchar, preguntar.',
      'Díselo con tranquilidad si sale el tema: «Tengo poca experiencia, así que iremos con calma». Casi siempre se agradece la sinceridad.',
      'Pregunta y pide que te pregunten: «¿Así bien?», «¿Te gusta esto?». Nadie lee la mente y preguntar es de las cosas más atractivas.',
      'No hay prisa ni guion. Besaros, abrazaros y tocaros ya es intimidad; no tiene que ser «todo o nada».',
      'Si algo no te apetece o te sientes mal, puedes parar. Parar también es de valientes.'
    ], 'Si sale torpe, es lo normal. Reíros un momento y seguir (o parar) es lo que hace la gente que se lleva bien.', 'Pensar qué tres frases le diría para ir con calma y con confianza', [
      ['Lo que de verdad importa', ['Que los dos estéis a gusto, no que parezcas un experto.', 'Escuchar sus señales y sus palabras, y respetar un «no» o un «espera» al instante.', 'Cuidaros: preservativo y, si hace falta, hablar de pruebas y de anticonceptivos.']]
    ]),
    S9('g-cuerpo-no-responde', 'Los nervios y tu cuerpo: no responde como esperas', 'Estás con alguien, hay ganas, pero por los nervios el cuerpo no responde como creías. Y la cabeza se llena de «lo van a notar».', [
      'Es muy común, sobre todo la primera vez con alguien y cuando hay nervios o alcohol. No es un fallo tuyo ni dice nada de tu valor.',
      'Cuanto más te vigilas («a ver si funciona»), más difícil se pone. Baja la presión: no hay nada que demostrar esta noche.',
      'Sal del objetivo único y vuelve a sentir: besos, caricias, abrazos, conversar. La intimidad es mucho más que una cosa.',
      'Dilo con calma, sin dramatizar: «Estoy un poco nervioso. Vamos despacio». Lo que más suele provocar es ternura, no rechazo.',
      'El alcohol empeora esto. Si quieres estar bien en la intimidad, bebe poco o nada esa noche.',
      'Si pasa muchas veces o te agobia, habla con tu médico o un sexólogo. Tiene solución y es un tema muy habitual en consulta.'
    ], 'Si hoy no salió, no pasa nada. Quedaos igual de bien, dormid abrazados o dejadlo para otro día. Que te acepte así dice mucho de ella.', 'Recordarme que un día así no define nada, y que se habla con calma'),
    S9('g-condon', 'Hablar de preservativo y de límites', 'Te da corte sacar el tema y no sabes cómo decirlo sin que quede raro.', [
      'Llévalos tú, siempre. Es cuidarte a ti y a ella, y nadie lo ve mal.',
      'Dilo con naturalidad, en el momento: «Tengo preservativos». Como quien dice que hay agua en la nevera.',
      'Hablar antes ayuda: «¿Hay algo que te guste o algo que no quieras?». Es de las preguntas más atractivas.',
      'Un «no» o un «espera» se respeta siempre y al momento, sin preguntar el motivo ni insistir.',
      'Si habéis bebido mucho, mejor dejarlo para otro día. Sin una conformidad clara, no.'
    ], 'Si te da corte, decirlo a medias ya es suficiente. Cuanto más lo digas, más fácil se vuelve.', 'Llevar siempre preservativos en la cartera'),
    S9('g-ella-inicia', 'Ella toma la iniciativa y te quedas bloqueado', 'Te besa, se acerca o te propone algo, y por dentro te quedas en blanco.', [
      'Respira y deja que el cuerpo responda con calma. Con besar y sonreír ya estás contestando.',
      'No tienes que hacerlo todo perfecto. Seguir su ritmo y mirarla a los ojos ya vale.',
      'Si quieres frenar, dilo con cariño: «Me encanta, pero vamos un poco más despacio».',
      'Si estás en blanco, di la verdad: «Me has pillado de sorpresa, jaja». Suele sonar encantador.'
    ], 'Que se te quede la cabeza en blanco no es tontería: le pasa a casi todo el mundo cuando algo le importa.', 'Practicar «me encanta, pero vamos despacio» en voz alta'),
    S9('g-frena', 'Ella frena o dice que no quiere seguir', 'Estáis a gusto y de pronto ella dice que prefiere parar, o que hoy no.', [
      'Para en ese momento, sin pedir explicaciones ni insistir. Un «vale, tranquila» lo dice todo.',
      'No es un rechazo a ti. Puede ser el momento, el cansancio, que quiera ir más despacio o cualquier cosa suya.',
      'Pregúntale si está bien y si quiere que os quedéis charlando o que la acompañes.',
      'No lo tomes como un fallo. Que sepa que contigo puede decir que no sin problema es lo más atractivo.'
    ], 'Si te dolió, es normal. Pero cómo reaccionas ahí es lo que se queda en su recuerdo.', 'Reaccionar a un «hoy no» con tranquilidad y cariño'),
    S9('g-dormir', 'Te quedas a dormir en su casa (o ella en la tuya)', 'No sabes si es para dormir, si hay que hacer algo, o dónde tienes que ponerte.', [
      'No hay obligación: dormir es solo dormir. Puedes decirlo con naturalidad: «Estoy cansado, ¿dormimos?».',
      'Si no tienes claro lo que quiere, pregunta con cariño: «¿Quieres que durmamos abrazados o prefieres espacio?».',
      'Lleva lo básico: cepillo de dientes (o pídelo prestado) y preservativos por si acaso.',
      'Por la mañana, un desayuno juntos o un mensaje bonito más tarde: «Me lo pasé genial. Repetimos».'
    ], 'Si se hace raro, una frase cálida lo arregla. No hace falta nada más.', 'Pensar qué haría si me quedo a dormir con alguien'),
    S9('g-cuerpo-verguenza', 'Te da vergüenza tu cuerpo delante de alguien', 'Tienes la sensación de que van a ver tu barriga, tu pelo, o lo que más te acompleja.', [
      'Casi todo el mundo tiene algo que le acompleja. A la otra persona suele importarle muchísimo menos que a ti.',
      'Lo que enamora es cómo te sientes y cómo la tratas, más que cómo es tu cuerpo.',
      'Ponte cómodo: luz tenue, buen rollo y mucha conversación.',
      'Puedes decirlo con humor y cariño: «Estoy un poco cortado con esto». Se agradece más que el silencio.',
      'Cuidarte (ropa que te quede bien, ejercicio, dormir) ayuda a sentirte mejor, no para gustar, sino para estar a gusto.'
    ], 'Si le das muchas vueltas, escríbelo en el diario. Verlo en papel le quita fuerza.', 'Apuntar tres cosas de mi cuerpo que sí me gustan o me funcionan')
  ]},
  { bloque:'Mensajes y apps, más situaciones', items:[
    S9('g-ghosting', 'Te deja de contestar sin explicación (ghosting)', 'Vais bien, y de repente deja de escribir. No sabes qué hiciste mal.', [
      'Lo más probable es que no tenga que ver con nada que hayas hecho: la gente se agobia, pierde el interés o se desconecta.',
      'Puedes mandar UN mensaje sin presión: «Hola, vi que no hemos vuelto a hablar. Si no te apetece seguir, sin problema». Y dejarlo.',
      'No insistas ni mandes tres mensajes seguidos. Cada mensaje de más resta.',
      'Cierra el capítulo en tu cabeza: «No ha salido, y está bien». Tu valor no depende de su respuesta.',
      'Retoma tu vida: planes, amigos, otras conversaciones.'
    ], 'Si te duele, es normal. Habla con alguien o escríbelo en el diario.', 'Mandar un único mensaje claro y pasar página'),
    S9('g-primer-mensaje', 'Qué escribir en el primer mensaje de una app', 'Tienes un match y no sabes cómo empezar sin sonar soso o forzado.', [
      'Evita el «hola, qué tal». Comenta algo concreto de su perfil: una foto, una canción, un sitio.',
      'Una frase y una pregunta: «Vi que fuiste a Lisboa. ¿Qué es lo mejor que comiste?».',
      'No lo pienses demasiado: es solo un mensaje. Si no contesta, no ha pasado nada.',
      'Si te escribe ella, responde con algo más que una palabra y devuélvele una pregunta.'
    ], 'Si no contesta, no es nada tuyo: los matches caducan muy rápido.', 'Escribir hoy un primer mensaje con una pregunta concreta'),
    S9('g-quedar-app', 'Pasar de la app a quedar de verdad', 'Llevas días hablando y no sabes cuándo proponer vernos.', [
      'Propón quedar tras 4-7 días de buena conversación. Más tiempo suele enfriarlo.',
      'Hazlo concreto: «Me lo estoy pasando genial hablando contigo. ¿Te apetece que tomemos algo el jueves?».',
      'Un plan sencillo y corto: un café o una caña, de una hora. Si va bien, se alarga.',
      'Si dice que sí pero no concreta, dale un día más y propón otra vez. Si no, déjalo estar.'
    ], 'Si no quiere quedar, mejor saberlo pronto y no gastar energía.', 'Proponer un plan concreto a quien lleve días hablando conmigo'),
    S9('g-audio', 'Ella te manda audios', 'Te llega un audio largo y no sabes si contestar con audio, con texto, ni cuándo.', [
      'Contesta cuando puedas, sin culpa. No tienes que responder en el momento.',
      'Si te sientes cómodo, contesta con audio: transmite cercanía. Si no, en texto también vale: «Te contesto por aquí porque estoy en el metro».',
      'Escucha el audio entero antes de contestar y responde a algo concreto de lo que dijo.'
    ], 'Si te da vergüenza tu voz, grábate una vez y escúchate: suele sonar mucho mejor de lo que crees.', 'Mandar un audio corto a un amigo para acostumbrarme'),
    S9('g-madrugada', 'Te escribe de madrugada', 'Son las 2 o las 3 y te llega un mensaje cariñoso.', [
      'Puede ser buena señal (te tiene en la cabeza) o puede ser el alcohol. No saques conclusiones.',
      'Contesta con calidez pero sin compromisos: «Qué bien, te contesto mañana con calma».',
      'Las decisiones y las conversaciones importantes, de día y con la cabeza despejada.',
      'Si estás tú mal o de bajón, no mandes nada. Escríbelo para ti y decides mañana.'
    ], 'Si te escribió y no sabes qué pensar, mañana lo ves con otra luz.', 'Esperar a la mañana antes de contestar o decidir nada importante'),
    S9('g-doble', 'Te da miedo escribir otra vez', 'Escribiste, no contestó y ahora te da miedo parecer pesado.', [
      'Un segundo mensaje, pasado un tiempo, no es ser pesado. Es normal.',
      'Mejor un mensaje distinto, ligero, con algo nuevo: «Acabo de oír esta canción y me acordé de ti».',
      'Si tampoco contesta, ya está: no insistas más. Gracias por intentarlo.',
      'No más de dos mensajes sin respuesta. Es una regla fácil que te cuida.'
    ], 'Mandarlo y soltarlo es de valientes.', 'Mandar un segundo mensaje distinto y dejarlo ahí')
  ]},
  { bloque:'Trabajo, gimnasio y el día a día', items:[
    S9('g-trabajo-nuevo', 'Cambias de trabajo y temes que vuelva la ansiedad', 'Empiezas un sitio nuevo, gente nueva y miedo a volver al punto de antes.', [
      'Tu último año es la prueba: has mejorado mucho socializando. Eso no desaparece al cambiar de sitio; se queda contigo.',
      'Los primeros días son los más incómodos para todo el mundo. Es normal sentirse nuevo.',
      'Marca pequeñas metas: saluda a todos por su nombre, haz una pregunta a un compañero cada día y propón un café al tercer día.',
      'Cuida lo básico esos días: dormir, comer bien, moverte. La ansiedad sube con el cansancio.',
      'Si notas que vuelve fuerte, avisa a tu psicóloga y apúntalo en el diario.'
    ], 'Si el primer mes cuesta, es el mes que cuesta. El segundo suele ser mucho mejor.', 'Saludar a todos por su nombre y hacer una pregunta a un compañero cada día'),
    S9('g-companera', 'Te gusta una compañera de trabajo', 'La ves a diario, te cae bien y no sabes si dar el paso.', [
      'Primero, ganar confianza: cafés, comer juntos, conversar de cosas que no sean de trabajo.',
      'Fíjate en si busca tu compañía y si hay interés mutuo antes de proponer nada.',
      'Si das el paso, que sea ligero y fuera del trabajo: «Me apetece que nos tomemos algo un día después de trabajar».',
      'Cuenta con que, si no sale bien, os seguiréis viendo cada día. Por eso hazlo con tacto y sin presión.',
      'Mejor que no se entere toda la oficina.'
    ], 'Si no es mutuo, mantén el trato amable de siempre. Eso habla bien de ti.', 'Empezar por un café o una comida juntos, sin segundas intenciones'),
    S9('g-gimnasio', 'Te gusta alguien del gimnasio', 'La ves a menudo y piensas en hablarle, pero no hay mucho momento.', [
      'No interrumpas su entrenamiento: auriculares puestos, concentrada. Espera a un descanso o a la entrada y la salida.',
      'Sonríe y saluda cada vez que coincidáis. Poco a poco os reconoceréis.',
      'Una pregunta ligera: «¿Sabes si esta máquina se usa así?» o «¿Hace mucho que vienes?».',
      'Si hay buen rollo tras varias veces, propón un café o un batido después.',
      'Si parece incómoda, déjalo. El gimnasio es un espacio donde mucha gente va a lo suyo.'
    ], 'Ir al mismo horario varias veces ayuda a que haya conversación natural.', 'Saludar con una sonrisa a quien me cruce con frecuencia'),
    S9('g-vecina', 'Te gusta alguien a quien ves siempre (café, metro, barrio)', 'La ves todos los días en el mismo sitio y nunca le has hablado.', [
      'Empieza por saludar: «Buenos días». Sin más, durante varios días.',
      'Después, una frase corta sobre algo del sitio: «Siempre pides lo mismo, ¿eh?».',
      'Si hay buena respuesta, preséntate: «Por cierto, soy ___». Si no, no insistas.',
      'Si te gusta mucho, propón con calma: «Me gusta hablar contigo, ¿te apetece tomar algo algún día?».'
    ], 'Lo bueno de verse a menudo es que no hay prisa. Puedes ir poco a poco.', 'Saludar con una sonrisa a esa persona esta semana'),
    S9('g-circulo', 'Te gusta alguien del círculo de tus amigos', 'Es amiga de un amigo, o la hermana, o alguien con quien coincidís siempre.', [
      'Cuida el contexto: lo que hagas afecta al grupo. Hazlo con respeto y discreción.',
      'Conoce a la persona en planes de grupo antes de proponer nada a solas.',
      'Si hay interés, propón algo suave fuera del grupo: «¿Te apetece que quedemos los dos?».',
      'No se lo cuentes a todo el mundo antes de saber si es mutuo.',
      'Si sale mal, mantén el trato cordial. El grupo lo agradecerá.'
    ], 'Si no pasa nada, la amistad y los planes de siempre siguen ahí.', 'Quedar en grupo y fijarme en cómo se comporta conmigo'),
    S9('g-tiene-pareja', 'Descubres que ella tiene pareja', 'Hay buen rollo, te gusta, y de pronto te enteras de que no está libre.', [
      'Respeta su situación: no insistas ni intentes «ganar» a nadie.',
      'No pasa nada si te sientes decepcionado. Da las gracias por la información.',
      'Puedes seguir siendo su amigo si lo llevas bien. Si te cuesta, toma distancia sin dramas.',
      'Que alguien te guste a pesar de eso no es un error tuyo; actuar sobre ello, sí.'
    ], 'Que alguien te guste así significa que puedes sentir. Es una buena noticia para el futuro.', 'Dar las gracias, bajar un cambio y pasar página'),
    S9('g-dos', 'Te gustan dos personas a la vez', 'No sabes con cuál ir ni qué hacer.', [
      'No es ningún problema: significa que hay varias personas que te interesan.',
      'Conoce a las dos con calma, sin prometer nada. Todavía no hay compromiso.',
      'Con el tiempo se nota con quién estás mejor, con quién te sientes tú mismo y con quién hay más ganas.',
      'Sé honesto con las dos si la cosa avanza: no hace falta dar explicaciones antes de tiempo, pero no engañes.'
    ], 'Tener opciones, aunque sea la primera vez, es buena señal.', 'Quedar con las dos por separado y fijarme en cómo me siento después'),
    S9('g-nuevo-grupo', 'Entras en un grupo nuevo donde todos se conocen', 'Una cena, un plan, un equipo… todos con sus bromas y tú de nuevas.', [
      'Llega con una frase preparada: «Hola, soy ___, vengo con ___».',
      'Busca a una sola persona y habla con ella. Con una basta.',
      'Escucha las bromas del grupo y ríete: es la forma de entrar.',
      'Evita querer impresionar: sé curioso y amable.',
      'Aguanta un rato incómodo: casi siempre pasa a los 20 o 30 minutos.'
    ], 'La segunda vez que veas a esas personas será muchísimo más fácil.', 'Hablar con una sola persona nueva en cada plan'),
    S9('g-presentarte', 'Te toca presentarte delante de gente', 'Dices tu nombre y alguna cosa y sientes que todos te miran.', [
      'Prepara tres cosas: tu nombre, a qué te dedicas y algo que te guste (música, viajar).',
      'Habla más despacio de lo que crees que debes. Pausa y respira.',
      'Mira a una persona amable cada vez, no a todos a la vez.',
      'Termina con una frase corta: «Y eso es todo. Encantado».'
    ], 'A los 10 minutos nadie se acuerda de lo que dijiste, salvo para recordarte con cariño.', 'Preparar mi presentación en tres frases'),
    S9('g-cumplido', 'Te hacen un cumplido y no sabes qué decir', 'Te dicen algo bueno y respondes «bah, no es nada» o te pones rojo.', [
      'Basta con «¡Gracias!». Con una sonrisa y mirándola.',
      'Puedes añadir algo cálido: «Gracias, me hace ilusión que lo digas».',
      'No lo rechaces ni te quites mérito: es como devolver un regalo.',
      'Si te lo dice ella, puedes devolver otro sincero: «Tú también me caes genial».'
    ], 'Practica con amigos: aceptar un cumplido se aprende.', 'Responder «gracias» y nada más a la próxima persona que me felicite')
  ]},
  { bloque:'Citas: más momentos', items:[
    S9('g-ciegas', 'Una cita a ciegas que te organiza un amigo', 'Tu amigo te presenta a una chica «que seguro que te cae bien» y te entra presión.', [
      'Quita presión: es un plan para conocer a alguien, no un examen.',
      'Pide a tu amigo que te cuente tres cosas de ella para tener de qué hablar.',
      'Propón algo corto y sencillo: un café o una caña, sin cena larga.',
      'Si no hay química, termina con amabilidad. Tu amigo lo entenderá.'
    ], 'Si no hay conexión, es normal. Pasar un buen rato ya es suficiente.', 'Aceptar un plan para conocer a alguien sin esperar nada concreto'),
    S9('g-llegas-antes', 'Llegas antes y esperas solo', 'Llegas diez minutos antes y los nervios van a más.', [
      'Mejor llegar un poco antes que tarde. Aprovecha para respirar con calma.',
      'Suelta el aire despacio tres veces. Hombros abajo.',
      'No mires el móvil sin parar: mira alrededor, a la gente, a lo que pasa.',
      'Piensa en dos cosas que quieras preguntarle.',
      'Cuando llegue, sonríe y saluda de pie, no desde la silla.'
    ], 'Si llegas tarde por algo, avisa con un mensaje corto y sin dramas.', 'Llegar diez minutos antes y respirar con calma'),
    S9('g-cancela-2', 'Te cancela dos veces', 'Primero un plan, luego otro, y siempre con una excusa.', [
      'Dos cancelaciones seguidas sin proponer otro día suelen indicar poco interés.',
      'Díselo con suavidad: «Entiendo que estás liada. Si te apetece, dime tú cuándo te viene bien».',
      'Dale la pelota a ella y dedica tu energía a otras cosas.',
      'No te lo tomes como algo contra ti: es información sobre ella, no sobre tu valor.'
    ], 'Quien tiene ganas, encuentra el momento.', 'Dejar que sea ella quien proponga la próxima vez'),
    S9('g-exparejas', 'Hablar de exparejas en una cita', 'Te pregunta por tus ex, o tú no sabes si sacar el tema.', [
      'Sé sincero y breve: «He tenido pocas relaciones y estoy en un buen momento para conocer a alguien».',
      'No hables mal de nadie: es una pista de cómo hablarías de ella algún día.',
      'Si ella cuenta algo, escucha sin juzgar y sin comparar.',
      'No hace falta dar todos los detalles: puedes decir «prefiero contarlo con más calma otro día».'
    ], 'No tener mucha experiencia no es un defecto. Lo importante es cómo estás ahora.', 'Preparar una respuesta corta y tranquila para esta pregunta'),
    S9('g-sin-chispa-cita', 'La cita va bien, pero tú no sientes chispa', 'Es simpática, hay conversación y, aun así, no te late nada.', [
      'Está bien no sentir chispa: pasa mucho y no es culpa de nadie.',
      'No te fuerces a quedar otra vez por compromiso. Mejor ser claro y amable.',
      'Díselo con respeto: «Me lo he pasado muy bien, pero no siento que haya conexión. Te deseo lo mejor».',
      'No desaparezcas sin decir nada: un mensaje claro se agradece mucho.'
    ], 'Si dudas, quédate a una segunda cita. A veces la chispa tarda.', 'Practicar una frase amable para cerrar una cita'),
    S9('g-pedir-beso', 'Cuándo y cómo pedir el primer beso', 'Estáis a gusto, hay cercanía y no sabes si es el momento.', [
      'Mira las señales: se acerca, te mira a los labios, se ríe mucho, se queda cerca.',
      'Pregunta, si te sientes más cómodo: «¿Puedo besarte?». Es muy atractivo, no lo contrario.',
      'Acércate despacio para que pueda apartarse si no quiere. Lo notarás enseguida.',
      'Si se aparta, sonríe y sigue como si nada: «Vale, tranquila».'
    ], 'Si no pasó, no pasó. Quedaros bien con la conversación y la sonrisa ya es mucho.', 'Practicar la frase «¿puedo besarte?» en voz alta hasta que suene natural')
  ]},
  { bloque:'Salir de noche: más situaciones', items:[
    S9('g-amigo-borracho', 'Tu amigo va muy borracho y tú no', 'Ha bebido demasiado, hace tonterías o se pone pesado.', [
      'Primero su seguridad: agua, comida, sentarle un rato y no dejarle solo.',
      'No le regañes en ese momento. Mañana le cuentas lo que viste.',
      'Si hay que irse, acompáñale tranquilo. Cuidar de un amigo también es una noche con sentido.',
      'Si te sientes responsable de todo, pide ayuda a otro amigo o al local.'
    ], 'Cuidar a un amigo no te deja fuera: te hace buen amigo.', 'Tener claro con quién me iré si mi amigo se pasa'),
    S9('g-gusta-otro', 'La que te gusta está hablando con otro', 'La ves reírse con otra persona y se te cae el ánimo.', [
      'No saques conclusiones: puede ser su amigo, un conocido o alguien que le habla sin más.',
      'No te acerques a interrumpir ni a vigilar. Date espacio y haz otra cosa.',
      'Si más tarde ves que sigue libre, puedes saludar con tranquilidad.',
      'Si de verdad hay algo, no es el fin: salir te ha dado información y te quedan muchas noches.'
    ], 'Que le guste hablar con otro no resta nada a quien eres.', 'Hacer algo mío mientras ellos hablan, sin vigilar'),
    S9('g-grupo-chicas', 'Un grupo de chicas: a cuál te acercas', 'Hay un grupo de chicas y te da miedo hablar con todas a la vez.', [
      'Saluda al grupo entero, con una sonrisa y mirando a las que estén abiertas.',
      'Mejor una pregunta divertida y fácil: «¿Vais siempre juntas a salir?».',
      'Habla con todas, no solo con la que te gusta. Eso da buena imagen.',
      'Si notas que no quieren conversación, despídete con simpatía.'
    ], 'Si no sale, ya has practicado entrar en una conversación nueva.', 'Saludar a un grupo con una sonrisa y una pregunta simple'),
    S9('g-copas-valor', 'Beber para atreverte', 'Tomas una copa o dos para soltarte, y a veces va bien y a veces no.', [
      'Una copa puede ayudar a soltarte, pero más de dos suele ser al revés: peor memoria, peor lectura de señales y más bajón después.',
      'Cuando bebes mucho puedes hacer cosas que no harías y sentirte peor al día siguiente.',
      'Prueba también sobrio: cuesta más, pero te enseña que puedes sin ayuda.',
      'Si usas el alcohol para la ansiedad con frecuencia, habla de ello con tu psicóloga. Hay otras formas que funcionan mejor.',
      'Alterna con agua y ponte un límite antes de empezar.'
    ], 'No es malo beber de vez en cuando. Lo importante es que no sea lo único que te hace sentir capaz.', 'Salir una vez con un máximo de dos copas y ver cómo me siento'),
    S9('g-festival', 'Un festival o una fiesta mayor', 'Mucha gente, mucho ruido y muchos grupos. Te sientes pequeño entre tanta gente.', [
      'Ve con un plan: con quién vas, dónde quedáis si os perdéis y a qué hora te vas.',
      'La mayoría habla en las colas (barra, baños, comida). Son los mejores momentos.',
      'Hablar de música es lo más fácil: «¿Les has visto antes?», «¿Qué te ha parecido?».',
      'Haz pausas para descansar del ruido y la gente. Sal un rato a respirar.'
    ], 'Si te agobias, retirarte un rato no es fracasar. Es cuidarte.', 'Hablar con alguien en la cola de la barra'),
    S9('g-santjoan', 'Una verbena o una fiesta de barrio (Gràcia, Sant Joan…)', 'Hay un ambiente muy social, gente de todas las edades y mucho ruido.', [
      'En las fiestas de barrio es muy normal hablar con desconocidos: verás a mucha gente hablando entre sí.',
      'Pregunta por el ambiente: «¿Es la primera vez que vienes?», «¿Esta calle es de las mejores, no?».',
      'Si estás con amigos, únete a los grupos de al lado. Suele ser fácil.',
      'Cuida el alcohol: son fiestas largas y se bebe sin darse cuenta.'
    ], 'Si no hay conversación, también se disfruta mirando y disfrutando del ambiente.', 'Ir a una fiesta de barrio con un objetivo pequeño'),
    S9('g-pedir-contacto-noche', 'Pedir el contacto en plena noche', 'La conversación va bien y no sabes cuándo pedir su Instagram.', [
      'Pídelo cuando la conversación está en lo mejor, no al final cuando ya se va.',
      '«Me ha gustado hablar contigo. ¿Te importa si te pido el Instagram?».',
      'Si dice que no, sonríe: «Sin problema, ¡que pases buena noche!».',
      'Al día siguiente, un mensaje ligero con algo de lo que hablasteis.'
    ], 'Pedir un contacto es de lo más valiente de la noche. Si no sale, ya lo has intentado.', 'Pedir el contacto la próxima vez que haya buen rollo'),
    S9('g-propone-ir', 'Alguien te propone ir a otro sitio o a su casa tras la fiesta', 'Hay buen rollo y te dicen de seguir la noche en otro lado. Dudas por los nervios.', [
      'Decide tú si te apetece, no por presión. «Hoy no, pero me encantaría quedar otro día» es una respuesta perfecta.',
      'Si habéis bebido mucho, mejor otro día: se disfruta más y se decide mejor.',
      'Avisa a un amigo de dónde vas y vuelve en un transporte seguro.',
      'Si decides ir, que los dos estéis de acuerdo en todo, y puedes parar cuando quieras.'
    ], 'Que te apetezca algo y que no quieras hacerlo con alcohol es compatible.', 'Decidir antes de salir qué haría si me lo proponen'),
    S9('g-despedida', 'Despedirte del grupo', 'Te quieres ir pero te da corte dejar el plan o que se note.', [
      'Basta con un «Me voy ya, que mañana madrugo. ¡Me lo he pasado genial!».',
      'Avisa a tu amigo con un mensaje para que no se preocupe.',
      'No necesitas despedirte de todos. Una despedida corta y amable es suficiente.',
      'Llega a casa y escribe una cosa buena de la noche.'
    ], 'Irte cuando estás cansado es ser sensato, no aburrido.', 'Decidir una hora a la que me voy antes de salir')
  ]}
);

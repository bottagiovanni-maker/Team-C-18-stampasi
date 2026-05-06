/**
 * api.js - Data Layer per ScuolaHub / ITE Blaise Pascal Foggia
 * Carica i file JSON con fallback automatico ai dati embedded.
 * Nessun sistema di autenticazione — accesso pubblico.
 */

const API = (() => {

  const KEYS = {
    circolari: 'sh_circolari',
    lette:     'sh_lette'
  };

  /* ─── DATI EMBEDDED (fallback quando non c'è server HTTP) ─── */
  const FALLBACK = {
    circolari: [
      { id:1, numero:'045/2026', titolo:'Assemblea d\'Istituto del 15 Maggio 2026', testo:'Si comunica a tutti gli studenti che il giorno 15 maggio 2026 si terrà l\'assemblea d\'istituto presso l\'auditorium della scuola dalle ore 9:00 alle ore 12:00. È obbligatoria la presenza di tutti gli studenti. I rappresentanti d\'istituto sono tenuti a presentarsi alle ore 8:30 per l\'apertura dei lavori.', data:'2026-05-02', autore:'Dirigente Scolastico', destinatari:['studenti','docenti'], classi:['tutte'], categoria:'eventi', allegati:[], priorita:'alta', letta:false },
      { id:2, numero:'044/2026', titolo:'Calendario Esami di Stato 2025/2026', testo:'Si comunica alle classi quinte che il Ministero dell\'Istruzione ha reso noto il calendario degli Esami di Stato. La prima prova scritta si svolgerà il 17 giugno 2026. La seconda prova il 18 giugno. I colloqui orali avranno inizio il 23 giugno 2026.', data:'2026-04-28', autore:'Dirigente Scolastico', destinatari:['studenti','genitori','docenti'], classi:['5A','5B','5C'], categoria:'comunicazione', allegati:[{nome:'Calendario_Esami.pdf',url:'#'}], priorita:'alta', letta:false },
      { id:3, numero:'043/2026', titolo:'Gita Scolastica Classe 3A - Roma 20-22 Maggio', testo:'Si informa che la gita scolastica della classe 3A a Roma è confermata per i giorni 20-21-22 maggio 2026. La partenza è prevista alle ore 6:00. Quota di partecipazione: €180. Consegnare autorizzazione firmata entro il 10 maggio.', data:'2026-04-25', autore:'Prof.ssa Mancini', destinatari:['studenti','genitori'], classi:['3A'], categoria:'eventi', allegati:[{nome:'Modulo_autorizzazione.pdf',url:'#'}], priorita:'media', letta:false },
      { id:4, numero:'042/2026', titolo:'Ricevimento Genitori - Maggio 2026', testo:'I ricevimenti individuali per il mese di maggio si terranno dal 5 al 23 maggio, ogni martedì e giovedì dalle 16:00 alle 18:00. Prenotazione tramite registro elettronico o segreteria.', data:'2026-04-22', autore:'Dirigente Scolastico', destinatari:['genitori','docenti'], classi:['tutte'], categoria:'comunicazione', allegati:[], priorita:'media', letta:true },
      { id:5, numero:'041/2026', titolo:'Chiusura Scuola - Festività 1° Maggio', testo:'Si ricorda che giovedì 1° maggio 2026, in occasione della Festa del Lavoro, la scuola rimarrà chiusa. Le attività riprenderanno venerdì 2 maggio 2026.', data:'2026-04-29', autore:'Segreteria Didattica', destinatari:['studenti','docenti','genitori'], classi:['tutte'], categoria:'comunicazione', allegati:[], priorita:'bassa', letta:true },
      { id:6, numero:'040/2026', titolo:'Progetto PCTO 2025/2026 - Classi Quarte', testo:'Le attività PCTO si svolgeranno dal 2 al 27 giugno 2026 presso le aziende partner convenzionate. Compilare il modulo di preferenza entro il 15 maggio 2026. Monte ore: 80 ore complessive.', data:'2026-04-18', autore:'Referente PCTO', destinatari:['studenti','genitori'], classi:['4A','4B','4C'], categoria:'didattica', allegati:[{nome:'Elenco_Aziende.pdf',url:'#'}], priorita:'alta', letta:false },
      { id:7, numero:'039/2026', titolo:'Contributi Volontari Anno Scolastico 2025/2026', testo:'Si invitano le famiglie a contribuire volontariamente alle spese per le attività scolastiche integrative. Contributo suggerito: €50 per studente. Versamento tramite bonifico o in segreteria.', data:'2026-04-15', autore:'Dirigente Scolastico', destinatari:['genitori'], classi:['tutte'], categoria:'comunicazione', allegati:[], priorita:'bassa', letta:true },
      { id:8, numero:'038/2026', titolo:'Orario Provvisorio - Settimana 5-9 Maggio', testo:'A causa di assenze programmate per formazione obbligatoria, si comunica l\'orario provvisorio per la settimana 5-9 maggio. Le modifiche riguardano le classi 2A, 2B, 3C e 5A.', data:'2026-05-02', autore:'Vicepresidenza', destinatari:['studenti','docenti'], classi:['2A','2B','3C','5A'], categoria:'comunicazione', allegati:[{nome:'Orario_5-9Maggio.pdf',url:'#'}], priorita:'alta', letta:false },
      { id:9, numero:'037/2026', titolo:'Attività Sportive - Tornei Primaverili', testo:'Sono aperte le iscrizioni per i tornei sportivi primaverili: calcio a 5, pallavolo, basket e atletica. Iscrizioni fino al 9 maggio. Necessario certificato medico sportivo.', data:'2026-04-10', autore:'Prof. Vitale', destinatari:['studenti'], classi:['tutte'], categoria:'eventi', allegati:[], priorita:'bassa', letta:true },
      { id:10, numero:'036/2026', titolo:'Iscrizioni Anno Scolastico 2026/2027', testo:'Le iscrizioni per il 2026/2027 si terranno dal 20 al 31 maggio online tramite il portale ministeriale. Open day per nuovi iscritti: 5 giugno 2026 alle ore 16:00.', data:'2026-04-05', autore:'Segreteria Didattica', destinatari:['genitori','studenti'], classi:['tutte'], categoria:'comunicazione', allegati:[], priorita:'media', letta:false },
      { id:11, numero:'035/2026', titolo:'Certificazioni Linguistiche - Cambridge e DELF', testo:'Date degli esami: Cambridge B1/B2 il 25 maggio, DELF B1/B2 il 28 maggio. Il superamento di una certificazione costituisce credito scolastico aggiuntivo per gli Esami di Stato.', data:'2026-04-01', autore:'Dip. Lingue Straniere', destinatari:['studenti','genitori'], classi:['3A','3B','4A','4B','5A','5B'], categoria:'didattica', allegati:[], priorita:'media', letta:true },
      { id:12, numero:'034/2026', titolo:'Riunione Consigli di Classe - Calendario Maggio', testo:'Consigli di Classe: Classi Prime 12/05, Seconde 13/05, Terze 14/05, Quarte 15/05, Quinte 16/05. Ore 15:00-17:00. Presenza obbligatoria per tutti i docenti.', data:'2026-04-08', autore:'Dirigente Scolastico', destinatari:['docenti'], classi:['tutte'], categoria:'comunicazione', allegati:[], priorita:'alta', letta:false },
      { id:13, numero:'033/2026', titolo:'Libri di Testo Anno 2026/2027', testo:'Gli elenchi dei libri adottati per il 2026/2027 sono disponibili sul sito web e in segreteria. È possibile acquistare libri usati o usufruire del comodato d\'uso della biblioteca scolastica.', data:'2026-03-28', autore:'Vicepresidenza', destinatari:['genitori','studenti'], classi:['tutte'], categoria:'comunicazione', allegati:[{nome:'Elenco_Libri.pdf',url:'#'}], priorita:'media', letta:true },
      { id:14, numero:'032/2026', titolo:'Orientamento Universitario - Classi Quinte', testo:'Attività di orientamento: incontri con referenti universitari (3-4 maggio), simulazione test d\'ingresso (17 maggio), visita campus universitari (ultimo venerdì di maggio).', data:'2026-03-25', autore:'Referente Orientamento', destinatari:['studenti','genitori'], classi:['5A','5B','5C'], categoria:'didattica', allegati:[], priorita:'media', letta:false },
      { id:15, numero:'031/2026', titolo:'Scrutini Finali - Calendario Giugno 2026', testo:'Gli scrutini finali si terranno dal 3 all\'8 giugno 2026. La pubblicazione degli esiti sarà effettuata il 9 giugno 2026. I docenti sono convocati secondo il calendario pubblicato in allegato dalla vicepresidenza.', data:'2026-03-20', autore:'Dirigente Scolastico', destinatari:['studenti','docenti','genitori'], classi:['tutte'], categoria:'comunicazione', allegati:[], priorita:'alta', letta:false }
    ],
    materiali: [
      { id:1, titolo:'Calcolo Differenziale e Integrale', descrizione:'Raccolta di appunti su calcolo differenziale e integrale con esercizi svolti per l\'Esame di Stato.', materia:'Matematica', classe:'5A', tipo:'dispensa', formato:'PDF', dimensione:'4.2 MB', autore:'Prof. Colombo', data:'2026-04-30', url:'#', tag:['calcolo','derivate','integrali'] },
      { id:2, titolo:'L\'Ottocento Letterario - Romanticismo e Realismo', descrizione:'Schema del panorama letterario dell\'Ottocento italiano ed europeo: Leopardi, Manzoni, Verga.', materia:'Italiano', classe:'4A', tipo:'schema', formato:'PDF', dimensione:'2.1 MB', autore:'Prof.ssa Romano', data:'2026-04-28', url:'#', tag:['romanticismo','leopardi','verga'] },
      { id:3, titolo:'Termodinamica - Presentazione Completa', descrizione:'Presentazione multimediale su termodinamica, cicli termodinamici ed entropia con animazioni.', materia:'Fisica', classe:'4B', tipo:'presentazione', formato:'PPTX', dimensione:'8.7 MB', autore:'Prof. Marchetti', data:'2026-04-25', url:'#', tag:['termodinamica','gas','entropia'] },
      { id:4, titolo:'Business English Writing - Exercises', descrizione:'Guida pratica alla scrittura professionale in inglese: email formali, report e lettere di candidatura.', materia:'Inglese', classe:'3A', tipo:'esercizi', formato:'PDF', dimensione:'1.8 MB', autore:'Prof.ssa Conti', data:'2026-04-22', url:'#', tag:['business-english','writing'] },
      { id:5, titolo:'Idealismo Tedesco - Hegel e Kant', descrizione:'Dispensa sulla filosofia idealista: critica kantiana, dialettica hegeliana, glossario dei termini.', materia:'Filosofia', classe:'5B', tipo:'dispensa', formato:'PDF', dimensione:'3.1 MB', autore:'Prof.ssa Ferretti', data:'2026-04-20', url:'#', tag:['hegel','kant','idealismo'] },
      { id:6, titolo:'Genetica e DNA - Mappa Concettuale', descrizione:'Mappa sulla genetica: struttura del DNA, replicazione, trascrizione, mutazioni e mendelismo.', materia:'Biologia', classe:'4C', tipo:'schema', formato:'PDF', dimensione:'2.9 MB', autore:'Prof. Rizzo', data:'2026-04-18', url:'#', tag:['genetica','DNA','mendel'] },
      { id:7, titolo:'Trigonometria - Esercizi con Soluzioni', descrizione:'80 esercizi di trigonometria con soluzione passo-passo, dalla base ai problemi applicativi.', materia:'Matematica', classe:'3B', tipo:'esercizi', formato:'PDF', dimensione:'1.5 MB', autore:'Prof. Colombo', data:'2026-04-15', url:'#', tag:['trigonometria','geometria'] },
      { id:8, titolo:'Prima Guerra Mondiale - Cronologia e Cause', descrizione:'Mappa concettuale della Grande Guerra: cause, evoluzione, trattati di pace e conseguenze.', materia:'Storia', classe:'3A', tipo:'schema', formato:'PDF', dimensione:'2.4 MB', autore:'Prof. Greco', data:'2026-04-12', url:'#', tag:['prima-guerra-mondiale','storia'] },
      { id:9, titolo:'L\'Impressionismo - Arte e Contesto Storico', descrizione:'Presentazione sull\'Impressionismo: Monet, Renoir, Degas. Analisi delle opere con immagini HD.', materia:'Storia dell\'Arte', classe:'3C', tipo:'presentazione', formato:'PPTX', dimensione:'12.3 MB', autore:'Prof.ssa Amato', data:'2026-04-10', url:'#', tag:['impressionismo','monet','pittura'] },
      { id:10, titolo:'Chimica Organica - Reazioni e Meccanismi', descrizione:'Note di chimica organica: nomenclatura IUPAC, classi di composti, principali reazioni.', materia:'Chimica', classe:'5A', tipo:'dispensa', formato:'PDF', dimensione:'5.6 MB', autore:'Prof.ssa Battaglia', data:'2026-04-08', url:'#', tag:['chimica-organica','IUPAC'] },
      { id:11, titolo:'Sintassi del Periodo - Grammatica Italiana', descrizione:'Guida completa alla sintassi: proposizioni principali, coordinate e subordinate con esercizi.', materia:'Italiano', classe:'2A', tipo:'dispensa', formato:'PDF', dimensione:'1.2 MB', autore:'Prof.ssa Romano', data:'2026-04-05', url:'#', tag:['grammatica','sintassi'] },
      { id:12, titolo:'Algoritmi e Strutture Dati - Manuale', descrizione:'Introduzione ad algoritmi e strutture dati: array, liste, alberi, grafi e complessità computazionale.', materia:'Informatica', classe:'3A', tipo:'dispensa', formato:'PDF', dimensione:'3.8 MB', autore:'Prof. Longo', data:'2026-04-02', url:'#', tag:['algoritmi','informatica'] }
    ],
    eventi: [
      /* A.S. 2025/2026 — ITE Blaise Pascal Foggia */
      { id:1, titolo:'Assemblea d\'Istituto', descrizione:'Assemblea generale studenti presso l\'auditorium. Ordine del giorno: relazione comitato studentesco.', data:'2026-05-15', oraInizio:'09:00', oraFine:'12:00', tipo:'evento', classi:['tutte'], luogo:'Auditorium', colore:'#4361ee' },
      { id:2, titolo:'Consiglio di Classe 3A', descrizione:'Riunione del Consiglio di Classe 3A per la valutazione intermedia.', data:'2026-05-10', oraInizio:'15:00', oraFine:'17:00', tipo:'riunione', classi:['3A'], luogo:'Sala Docenti', colore:'#9b59b6' },
      { id:3, titolo:'Gita Roma - Classe 3A', descrizione:'Visita culturale a Roma: Colosseo, Fori Imperiali, Musei Vaticani. Tre giorni.', data:'2026-05-20', oraInizio:'06:00', oraFine:'23:59', tipo:'uscita', classi:['3A'], luogo:'Roma', colore:'#2ecc71' },
      { id:4, titolo:'Saggi Musicali di Fine Anno', descrizione:'Saggio musicale degli studenti: orchestra, coro ed ensemble strumentali. Ingresso libero.', data:'2026-05-25', oraInizio:'18:00', oraFine:'20:30', tipo:'evento', classi:['tutte'], luogo:'Aula Magna', colore:'#e74c3c' },
      { id:5, titolo:'Spettacolo Teatrale', descrizione:'Rappresentazione del gruppo Drama. Due repliche: ore 16:00 e ore 20:00.', data:'2026-05-22', oraInizio:'16:00', oraFine:'19:00', tipo:'evento', classi:['tutte'], luogo:'Teatro Comunale', colore:'#f39c12' },
      { id:6, titolo:'Giornata dello Sport', descrizione:'Tornei di calcio, pallavolo, basket e atletica. Premiazione pomeriggio.', data:'2026-05-30', oraInizio:'08:00', oraFine:'14:00', tipo:'evento', classi:['tutte'], luogo:'Campo Sportivo', colore:'#1abc9c' },
      { id:7, titolo:'Ricevimento Genitori - Maggio', descrizione:'Ricevimento pomeridiano genitori-docenti. Prenotazione obbligatoria.', data:'2026-05-28', oraInizio:'16:00', oraFine:'18:30', tipo:'riunione', classi:['tutte'], luogo:'Aule Docenti', colore:'#9b59b6' },
      { id:8, titolo:'Festa della Repubblica', descrizione:'Festività nazionale. La scuola rimarrà chiusa.', data:'2026-06-02', oraInizio:'00:00', oraFine:'23:59', tipo:'festivita', classi:['tutte'], luogo:'—', colore:'#e74c3c' },
      { id:9, titolo:'Scrutini Finali', descrizione:'Scrutini di fine anno per tutte le classi secondo il calendario della vicepresidenza.', data:'2026-06-08', oraInizio:'08:00', oraFine:'18:00', tipo:'scadenza', classi:['tutte'], luogo:'Sala Docenti', colore:'#e67e22' },
      { id:10, titolo:'Fine Anno Scolastico 2025/2026', descrizione:'Ultimo giorno di lezione per tutti gli studenti. A.S. 2025/2026 — ITE Blaise Pascal Foggia.', data:'2026-06-09', oraInizio:'08:00', oraFine:'14:00', tipo:'scadenza', classi:['tutte'], luogo:'Tutti gli edifici', colore:'#4361ee' },
      { id:11, titolo:'Esami di Stato - Prima Prova', descrizione:'Prima prova scritta Maturità: Italiano. Durata 6 ore.', data:'2026-06-17', oraInizio:'08:30', oraFine:'14:30', tipo:'scadenza', classi:['5A','5B','5C'], luogo:'Aule d\'Esame', colore:'#e74c3c' },
      { id:12, titolo:'Esami di Stato - Seconda Prova', descrizione:'Seconda prova scritta Maturità. Materia caratterizzante. Durata fino a 8 ore.', data:'2026-06-18', oraInizio:'08:30', oraFine:'14:30', tipo:'scadenza', classi:['5A','5B','5C'], luogo:'Aule d\'Esame', colore:'#e74c3c' },
      { id:13, titolo:'Open Day Nuove Iscrizioni', descrizione:'Giornata orientamento famiglie. Visite guidate e presentazione dei corsi AFM, SIA, IT.', data:'2026-06-05', oraInizio:'16:00', oraFine:'19:00', tipo:'evento', classi:['tutte'], luogo:'ITE Blaise Pascal', colore:'#4361ee' },
      { id:14, titolo:'Consiglio Classe 5A - Pre-Esami', descrizione:'Riunione straordinaria per definizione documento del 15 maggio e crediti scolastici.', data:'2026-05-08', oraInizio:'14:00', oraFine:'16:30', tipo:'riunione', classi:['5A'], luogo:'Sala Docenti', colore:'#9b59b6' },
      { id:15, titolo:'Consiglio di Classe - Tutte le Classi Prime', descrizione:'Riunione dei consigli di tutte le classi prime. Valutazione intermedia e programmazione.', data:'2026-05-12', oraInizio:'15:00', oraFine:'17:30', tipo:'riunione', classi:['1A','1B','1C','1D'], luogo:'Sala Docenti', colore:'#9b59b6' }
    ],

    /* ─── ORARI SETTIMANALI PER CLASSE ─── */
    orari: {
      "1A": {
        indirizzo: "Amministrazione Finanza e Marketing",
        settimana: [
          { giorno:"Lunedì",    ore:[{m:"Italiano",p:"Prof.ssa Romano",a:"101"},{m:"Italiano",p:"Prof.ssa Romano",a:"101"},{m:"Matematica",p:"Prof. Colombo",a:"101"},{m:"Matematica",p:"Prof. Colombo",a:"101"},{m:"Inglese",p:"Prof.ssa Martini",a:"101"},{m:"Ed. Fisica",p:"Prof. Bruno",a:"Palestra"}]},
          { giorno:"Martedì",   ore:[{m:"Storia e Geo",p:"Prof. Greco",a:"101"},{m:"Italiano",p:"Prof.ssa Romano",a:"101"},{m:"Informatica",p:"Prof.ssa Vitale",a:"Lab Inf."},{m:"Informatica",p:"Prof.ssa Vitale",a:"Lab Inf."},{m:"Diritto",p:"Prof.ssa Palumbo",a:"101"},{m:"Scienze Naturali",p:"Prof.ssa Fontana",a:"101"}]},
          { giorno:"Mercoledì", ore:[{m:"Matematica",p:"Prof. Colombo",a:"101"},{m:"Matematica",p:"Prof. Colombo",a:"101"},{m:"Inglese",p:"Prof.ssa Martini",a:"101"},{m:"Inglese",p:"Prof.ssa Martini",a:"101"},{m:"Economia Politica",p:"Prof. De Luca",a:"101"},{m:"Ed. Fisica",p:"Prof. Bruno",a:"Palestra"}]},
          { giorno:"Giovedì",   ore:[{m:"Storia e Geo",p:"Prof. Greco",a:"101"},{m:"Storia e Geo",p:"Prof. Greco",a:"101"},{m:"Italiano",p:"Prof.ssa Romano",a:"101"},{m:"Diritto",p:"Prof.ssa Palumbo",a:"101"},{m:"Scienze Naturali",p:"Prof.ssa Fontana",a:"101"},{m:"Economia Politica",p:"Prof. De Luca",a:"101"}]},
          { giorno:"Venerdì",   ore:[{m:"Italiano",p:"Prof.ssa Romano",a:"101"},{m:"Matematica",p:"Prof. Colombo",a:"101"},{m:"Inglese",p:"Prof.ssa Martini",a:"101"},{m:"Informatica",p:"Prof.ssa Vitale",a:"Lab Inf."},{m:"Economia Politica",p:"Prof. De Luca",a:"101"},{m:"Storia e Geo",p:"Prof. Greco",a:"101"}]}
        ]
      },
      "2A": {
        indirizzo: "Amministrazione Finanza e Marketing",
        settimana: [
          { giorno:"Lunedì",    ore:[{m:"Italiano",p:"Prof.ssa Romano",a:"102"},{m:"Italiano",p:"Prof.ssa Romano",a:"102"},{m:"Matematica",p:"Prof. Colombo",a:"102"},{m:"Matematica",p:"Prof. Colombo",a:"102"},{m:"Inglese",p:"Prof.ssa Martini",a:"102"},{m:"Ed. Fisica",p:"Prof. Bruno",a:"Palestra"}]},
          { giorno:"Martedì",   ore:[{m:"Storia",p:"Prof. Greco",a:"102"},{m:"Italiano",p:"Prof.ssa Romano",a:"102"},{m:"Informatica",p:"Prof.ssa Vitale",a:"Lab Inf."},{m:"Informatica",p:"Prof.ssa Vitale",a:"Lab Inf."},{m:"Diritto",p:"Prof.ssa Palumbo",a:"102"},{m:"Scienze Naturali",p:"Prof.ssa Fontana",a:"102"}]},
          { giorno:"Mercoledì", ore:[{m:"Matematica",p:"Prof. Colombo",a:"102"},{m:"Inglese",p:"Prof.ssa Martini",a:"102"},{m:"Inglese",p:"Prof.ssa Martini",a:"102"},{m:"Economia Politica",p:"Prof. De Luca",a:"102"},{m:"Economia Politica",p:"Prof. De Luca",a:"102"},{m:"Ed. Fisica",p:"Prof. Bruno",a:"Palestra"}]},
          { giorno:"Giovedì",   ore:[{m:"Storia",p:"Prof. Greco",a:"102"},{m:"Italiano",p:"Prof.ssa Romano",a:"102"},{m:"Diritto",p:"Prof.ssa Palumbo",a:"102"},{m:"Economia Politica",p:"Prof. De Luca",a:"102"},{m:"Scienze Naturali",p:"Prof.ssa Fontana",a:"102"},{m:"Matematica",p:"Prof. Colombo",a:"102"}]},
          { giorno:"Venerdì",   ore:[{m:"Italiano",p:"Prof.ssa Romano",a:"102"},{m:"Storia",p:"Prof. Greco",a:"102"},{m:"Economia Politica",p:"Prof. De Luca",a:"102"},{m:"Informatica",p:"Prof.ssa Vitale",a:"Lab Inf."},{m:"Inglese",p:"Prof.ssa Martini",a:"102"},{m:"Diritto",p:"Prof.ssa Palumbo",a:"102"}]}
        ]
      },
      "3A": {
        indirizzo: "Informatica e Telecomunicazioni",
        settimana: [
          { giorno:"Lunedì",    ore:[{m:"Italiano",p:"Prof.ssa Romano",a:"103"},{m:"Italiano",p:"Prof.ssa Romano",a:"103"},{m:"Matematica",p:"Prof. Colombo",a:"103"},{m:"Economia Aziendale",p:"Prof. De Luca",a:"103"},{m:"Economia Aziendale",p:"Prof. De Luca",a:"103"},{m:"Ed. Fisica",p:"Prof. Bruno",a:"Palestra"}]},
          { giorno:"Martedì",   ore:[{m:"Storia",p:"Prof. Greco",a:"103"},{m:"Inglese",p:"Prof.ssa Conti",a:"103"},{m:"Inglese",p:"Prof.ssa Conti",a:"103"},{m:"Informatica",p:"Prof. Longo",a:"Lab Inf."},{m:"Informatica",p:"Prof. Longo",a:"Lab Inf."},{m:"Diritto",p:"Prof.ssa Palumbo",a:"103"}]},
          { giorno:"Mercoledì", ore:[{m:"Matematica",p:"Prof. Colombo",a:"103"},{m:"Italiano",p:"Prof.ssa Romano",a:"103"},{m:"Informatica",p:"Prof. Longo",a:"Lab Inf."},{m:"Informatica",p:"Prof. Longo",a:"Lab Inf."},{m:"Informatica",p:"Prof. Longo",a:"Lab Inf."},{m:"Informatica",p:"Prof. Longo",a:"Lab Inf."}]},
          { giorno:"Giovedì",   ore:[{m:"Inglese",p:"Prof.ssa Conti",a:"103"},{m:"Economia Aziendale",p:"Prof. De Luca",a:"103"},{m:"Economia Aziendale",p:"Prof. De Luca",a:"103"},{m:"Economia Aziendale",p:"Prof. De Luca",a:"103"},{m:"Diritto",p:"Prof.ssa Palumbo",a:"103"},{m:"Diritto",p:"Prof.ssa Palumbo",a:"103"}]},
          { giorno:"Venerdì",   ore:[{m:"Storia",p:"Prof. Greco",a:"103"},{m:"Italiano",p:"Prof.ssa Romano",a:"103"},{m:"Matematica",p:"Prof. Colombo",a:"103"},{m:"Economia Aziendale",p:"Prof. De Luca",a:"103"},{m:"Ed. Fisica",p:"Prof. Bruno",a:"Palestra"},{m:"Scienze Naturali",p:"Prof.ssa Fontana",a:"103"}]}
        ]
      },
      "3B": {
        indirizzo: "Informatica e Telecomunicazioni",
        settimana: [
          { giorno:"Lunedì",    ore:[{m:"Matematica",p:"Prof. Colombo",a:"104"},{m:"Matematica",p:"Prof. Colombo",a:"104"},{m:"Italiano",p:"Prof.ssa Romano",a:"104"},{m:"Economia Aziendale",p:"Prof. De Luca",a:"104"},{m:"Economia Aziendale",p:"Prof. De Luca",a:"104"},{m:"Ed. Fisica",p:"Prof. Bruno",a:"Palestra"}]},
          { giorno:"Martedì",   ore:[{m:"Inglese",p:"Prof.ssa Conti",a:"104"},{m:"Inglese",p:"Prof.ssa Conti",a:"104"},{m:"Informatica",p:"Prof.ssa Vitale",a:"Lab Inf."},{m:"Informatica",p:"Prof.ssa Vitale",a:"Lab Inf."},{m:"Storia",p:"Prof.ssa Ferretti",a:"104"},{m:"Diritto",p:"Prof.ssa Palumbo",a:"104"}]},
          { giorno:"Mercoledì", ore:[{m:"Italiano",p:"Prof.ssa Romano",a:"104"},{m:"Matematica",p:"Prof. Colombo",a:"104"},{m:"Informatica",p:"Prof.ssa Vitale",a:"Lab Inf."},{m:"Informatica",p:"Prof.ssa Vitale",a:"Lab Inf."},{m:"Informatica",p:"Prof.ssa Vitale",a:"Lab Inf."},{m:"Informatica",p:"Prof.ssa Vitale",a:"Lab Inf."}]},
          { giorno:"Giovedì",   ore:[{m:"Economia Aziendale",p:"Prof. De Luca",a:"104"},{m:"Economia Aziendale",p:"Prof. De Luca",a:"104"},{m:"Economia Aziendale",p:"Prof. De Luca",a:"104"},{m:"Diritto",p:"Prof.ssa Palumbo",a:"104"},{m:"Diritto",p:"Prof.ssa Palumbo",a:"104"},{m:"Inglese",p:"Prof.ssa Conti",a:"104"}]},
          { giorno:"Venerdì",   ore:[{m:"Italiano",p:"Prof.ssa Romano",a:"104"},{m:"Italiano",p:"Prof.ssa Romano",a:"104"},{m:"Storia",p:"Prof.ssa Ferretti",a:"104"},{m:"Matematica",p:"Prof. Colombo",a:"104"},{m:"Economia Aziendale",p:"Prof. De Luca",a:"104"},{m:"Ed. Fisica",p:"Prof. Bruno",a:"Palestra"}]}
        ]
      },
      "4A": {
        indirizzo: "Sistemi Informativi Aziendali",
        settimana: [
          { giorno:"Lunedì",    ore:[{m:"Economia Aziendale",p:"Prof. De Luca",a:"105"},{m:"Economia Aziendale",p:"Prof. De Luca",a:"105"},{m:"Matematica",p:"Prof.ssa Esposito",a:"105"},{m:"Matematica",p:"Prof.ssa Esposito",a:"105"},{m:"Inglese",p:"Prof.ssa Martini",a:"105"},{m:"Ed. Fisica",p:"Prof. Bruno",a:"Palestra"}]},
          { giorno:"Martedì",   ore:[{m:"Italiano",p:"Prof.ssa Romano",a:"105"},{m:"Italiano",p:"Prof.ssa Romano",a:"105"},{m:"Diritto",p:"Prof.ssa Palumbo",a:"105"},{m:"Diritto",p:"Prof.ssa Palumbo",a:"105"},{m:"Economia Aziendale",p:"Prof. De Luca",a:"105"},{m:"Economia Aziendale",p:"Prof. De Luca",a:"105"}]},
          { giorno:"Mercoledì", ore:[{m:"Matematica",p:"Prof.ssa Esposito",a:"105"},{m:"Inglese",p:"Prof.ssa Martini",a:"105"},{m:"Economia Aziendale",p:"Prof. De Luca",a:"105"},{m:"Economia Aziendale",p:"Prof. De Luca",a:"105"},{m:"Scienze Naturali",p:"Prof.ssa Fontana",a:"105"},{m:"Informatica",p:"Prof.ssa Vitale",a:"Lab Inf."}]},
          { giorno:"Giovedì",   ore:[{m:"Italiano",p:"Prof.ssa Romano",a:"105"},{m:"Italiano",p:"Prof.ssa Romano",a:"105"},{m:"Diritto",p:"Prof.ssa Palumbo",a:"105"},{m:"Economia Aziendale",p:"Prof. De Luca",a:"105"},{m:"Ed. Fisica",p:"Prof. Bruno",a:"Palestra"},{m:"Matematica",p:"Prof.ssa Esposito",a:"105"}]},
          { giorno:"Venerdì",   ore:[{m:"Storia",p:"Prof.ssa Ferretti",a:"105"},{m:"Matematica",p:"Prof.ssa Esposito",a:"105"},{m:"Economia Aziendale",p:"Prof. De Luca",a:"105"},{m:"Economia Aziendale",p:"Prof. De Luca",a:"105"},{m:"Informatica",p:"Prof.ssa Vitale",a:"Lab Inf."},{m:"Inglese",p:"Prof.ssa Martini",a:"105"}]}
        ]
      },
      "5A": {
        indirizzo: "Amministrazione Finanza e Marketing",
        settimana: [
          { giorno:"Lunedì",    ore:[{m:"Italiano",p:"Prof.ssa Romano",a:"106"},{m:"Italiano",p:"Prof.ssa Romano",a:"106"},{m:"Matematica",p:"Prof. Colombo",a:"106"},{m:"Economia Aziendale",p:"Prof. De Luca",a:"106"},{m:"Economia Aziendale",p:"Prof. De Luca",a:"106"},{m:"Ed. Fisica",p:"Prof. Bruno",a:"Palestra"}]},
          { giorno:"Martedì",   ore:[{m:"Storia",p:"Prof.ssa Ferretti",a:"106"},{m:"Inglese",p:"Prof.ssa Martini",a:"106"},{m:"Inglese",p:"Prof.ssa Martini",a:"106"},{m:"Economia Aziendale",p:"Prof. De Luca",a:"106"},{m:"Economia Aziendale",p:"Prof. De Luca",a:"106"},{m:"Diritto",p:"Prof.ssa Palumbo",a:"106"}]},
          { giorno:"Mercoledì", ore:[{m:"Matematica",p:"Prof. Colombo",a:"106"},{m:"Italiano",p:"Prof.ssa Romano",a:"106"},{m:"Economia Aziendale",p:"Prof. De Luca",a:"106"},{m:"Economia Aziendale",p:"Prof. De Luca",a:"106"},{m:"Economia Aziendale",p:"Prof. De Luca",a:"106"},{m:"Ed. Fisica",p:"Prof. Bruno",a:"Palestra"}]},
          { giorno:"Giovedì",   ore:[{m:"Inglese",p:"Prof.ssa Martini",a:"106"},{m:"Economia Aziendale",p:"Prof. De Luca",a:"106"},{m:"Diritto",p:"Prof.ssa Palumbo",a:"106"},{m:"Diritto",p:"Prof.ssa Palumbo",a:"106"},{m:"Storia",p:"Prof.ssa Ferretti",a:"106"},{m:"Matematica",p:"Prof. Colombo",a:"106"}]},
          { giorno:"Venerdì",   ore:[{m:"Italiano",p:"Prof.ssa Romano",a:"106"},{m:"Matematica",p:"Prof. Colombo",a:"106"},{m:"Diritto",p:"Prof.ssa Palumbo",a:"106"},{m:"Economia Aziendale",p:"Prof. De Luca",a:"106"},{m:"Italiano",p:"Prof.ssa Romano",a:"106"},{m:"Inglese",p:"Prof.ssa Martini",a:"106"}]}
        ]
      }
    }
  };

  /* ─── HELPER localStorage ─── */
  function _lsGet(key, fallback = null) {
    try { const r = localStorage.getItem(key); return r ? JSON.parse(r) : fallback; } catch { return fallback; }
  }
  function _lsSet(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); return true; } catch { return false; }
  }

  /* ─── FETCH con fallback ─── */
  async function _fetchJSON(path) {
    const resp = await fetch(path);
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    return resp.json();
  }

  async function _loadBase(type, path) {
    try { const j = await _fetchJSON(path); return j[type] || []; } catch { return FALLBACK[type]; }
  }

  /* ─── API PUBBLICA ─── */
  async function getCircolari() {
    const base  = await _loadBase('circolari', 'data/circolari.json');
    const extra = _lsGet(KEYS.circolari, []);
    const lette = _lsGet(KEYS.lette, {});
    return [...base, ...extra]
      .map(c => ({ ...c, letta: lette[c.id] !== undefined ? lette[c.id] : c.letta }))
      .sort((a, b) => new Date(b.data) - new Date(a.data));
  }

  async function getMateriali() {
    const base  = await _loadBase('materiali', 'data/materiali.json');
    const extra = _lsGet('sh_materiali', []);
    return [...base, ...extra].sort((a, b) => new Date(b.data) - new Date(a.data));
  }

  async function getEventi() {
    const base  = await _loadBase('eventi', 'data/eventi.json');
    const extra = _lsGet('sh_eventi', []);
    return [...base, ...extra].sort((a, b) => new Date(a.data) - new Date(b.data));
  }

  async function searchAll(query) {
    if (!query || query.trim().length < 2) return { circolari:[], materiali:[], eventi:[] };
    const q = query.toLowerCase().trim();
    const [c, m, e] = await Promise.all([getCircolari(), getMateriali(), getEventi()]);
    return {
      circolari: c.filter(x => x.titolo.toLowerCase().includes(q) || x.testo.toLowerCase().includes(q) || x.autore.toLowerCase().includes(q)),
      materiali: m.filter(x => x.titolo.toLowerCase().includes(q) || x.descrizione.toLowerCase().includes(q) || x.materia.toLowerCase().includes(q) || (x.tag||[]).some(t=>t.toLowerCase().includes(q))),
      eventi:    e.filter(x => x.titolo.toLowerCase().includes(q) || x.descrizione.toLowerCase().includes(q) || x.luogo.toLowerCase().includes(q))
    };
  }

  function addCircolare(data) {
    const existing = _lsGet(KEYS.circolari, []);
    const all = [...FALLBACK.circolari, ...existing];
    const newId = Math.max(...all.map(c => c.id), 0) + 1;
    const newC = { ...data, id: newId, letta: false };
    existing.push(newC);
    _lsSet(KEYS.circolari, existing);
    return newC;
  }

  function setLetta(id, stato) {
    const lette = _lsGet(KEYS.lette, {});
    lette[id] = stato;
    _lsSet(KEYS.lette, lette);
  }

  async function getMaterie() {
    const m = await getMateriali();
    return [...new Set(m.map(x => x.materia))].sort();
  }

  async function getClassi() {
    const [c, m] = await Promise.all([getCircolari(), getMateriali()]);
    const s = new Set();
    c.forEach(x => x.classi.forEach(cl => cl !== 'tutte' && s.add(cl)));
    m.forEach(x => s.add(x.classe));
    return [...s].sort();
  }

  function getOrario(classeRaw) {
    const c = classeRaw.trim().toUpperCase().replace(/\s+.*/,'');
    return FALLBACK.orari[c] || null;
  }

  function getClassiOrario() {
    return Object.keys(FALLBACK.orari).sort();
  }

  return { getCircolari, getMateriali, getEventi, searchAll, addCircolare, setLetta, getMaterie, getClassi, getOrario, getClassiOrario };

})();

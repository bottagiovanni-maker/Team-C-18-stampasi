# ScuolaHub · Documento di Analisi del Progetto
**Deep Research - Information Overload nelle Scuole**

---
*Versione 2.0 · Maggio 2026*
*Documento riservato alla progettazione del prodotto*

---

## Sommario Esecutivo

ScuolaHub è un assistente scolastico conversazionale progettato per risolvere il problema dell'**information overload** nelle istituzioni scolastiche italiane. Il progetto nasce dall'osservazione di una frammentazione cronica nei canali di comunicazione scolastica: circolari disperse su bacheche fisiche, email, app proprietarie dei registri elettronici, gruppi WhatsApp non ufficiali, siti web obsoleti e notifiche dei portali ministeriali. Il risultato è che studenti, docenti e famiglie perdono informazioni critiche non per mancanza di comunicazione, ma per eccesso e dispersione di essa.

**Redesign v2.0 — Interfaccia chatbot (maggio 2026)**

La versione iniziale del progetto era una SPA tradizionale con sezioni separate (circolari, materiali, calendario, ricerca). La versione attuale adotta un'architettura completamente diversa: un'interfaccia di chat conversazionale ispirata a ChatGPT, in cui lo studente scrive una domanda in linguaggio naturale e il bot risponde attingendo ai dati scolastici in tempo reale.

Questa scelta elimina il bisogno che l'utente sappia dove cercare un'informazione — non deve navigare tra sezioni, applicare filtri o conoscere la struttura del portale. Basta chiedere.

L'MVP è realizzabile interamente con tecnologie standard del web (HTML, CSS, JavaScript) e gestione dei dati in formato JSON, senza dipendenze da framework complessi o infrastrutture server-side.

---

## 1. Il Problema: L'Information Overload nelle Scuole

### 1.1 Definizione del Fenomeno

L'information overload (sovraccarico informativo) in ambito scolastico è la condizione in cui la quantità, la velocità e la frammentazione delle informazioni superano la capacità di elaborazione e risposta degli utenti. Non si tratta di carenza di informazioni, ma di incapacità strutturale del sistema di comunicazione di renderle accessibili, comprensibili e azionabili nel momento in cui servono.

### 1.2 Le Quattro Dimensioni del Problema

**Dimensione 1 — Frammentazione dei Canali**

Ogni istituzione scolastica tipicamente utilizza in parallelo:
- Il registro elettronico (spesso con interfaccia poco intuitiva e notifiche inaffidabili)
- Il sito web scolastico (aggiornato con cadenza irregolare, struttura non standardizzata)
- La bacheca fisica della segreteria (accessibile solo durante la presenza fisica)
- Il portale ministeriale (per comunicazioni istituzionali di alto livello)
- Canali informali come gruppi di messaggistica istantanea tra genitori e studenti
- Email dirette ai singoli docenti o alla segreteria

Questa moltiplicazione dei canali non è causata dalla volontà di migliorare la comunicazione, ma dall'accumulo storico di strumenti adottati in epoche diverse senza mai razionalizzare il sistema.

**Dimensione 2 — Difficoltà nel Reperire Circolari e Comunicazioni Ufficiali**

Le circolari scolastiche sono lo strumento principale di comunicazione istituzionale, ma presentano criticità strutturali:
- Non esiste un formato standard: alcune hanno numeri progressivi, altre no; alcune hanno destinatari espliciti, altre sono generiche
- La classificazione per argomento, destinatario o urgenza è raramente sistematica
- La ricerca storica è quasi impossibile: trovare una circolare di tre mesi fa richiede tipicamente ore di navigazione
- Le circolari urgenti hanno la stessa visibilità di quelle routinarie, creando una gerarchia dell'attenzione distorta

**Dimensione 3 — Overload dei Canali di Comunicazione**

Il paradosso dei sistemi di comunicazione scolastica moderni è che l'aumento dei canali ha ridotto, non aumentato, l'efficacia comunicativa. I motivi sono:
- Ogni nuovo canale richiede all'utente di monitorare un'altra fonte, aumentando il carico cognitivo
- La notifica diventa rumore di fondo: quando tutto genera notifiche, nulla genera attenzione
- La duplicazione delle informazioni su più canali crea inconsistenze e informazioni contraddittorie
- La mancanza di un registro centralizzato rende impossibile sapere con certezza se una comunicazione è stata ricevuta e letta

**Dimensione 4 — Assenza di un Punto di Accesso Centralizzato**

La conseguenza più grave delle tre dimensioni precedenti è l'assenza di un punto di accesso unico che funga da "sportello digitale" della scuola. Gli effetti pratici sono:
- Studenti che non sanno delle variazioni d'orario perché "era solo sul sito"
- Genitori che non firmano autorizzazioni per tempo perché "la circolare era nel registro e non ho aperto l'app"
- Docenti che comunicano date di verifica in modi diversi in classi diverse, creando disomogeneità
- Segreterie che ricevono centinaia di telefonate per informazioni già pubblicate ma non trovate

### 1.3 Impatto Quantificabile

Sebbene i dati specifici varino per istituzione, le ricerche sull'efficacia della comunicazione scolastica in Italia e in Europa identificano pattern ricorrenti:
- La percentuale di genitori che dichiara di ricevere informazioni scolastiche in modo frammentario o insoddisfacente supera regolarmente il 60% nei sondaggi condotti dalle associazioni di categoria
- Il tempo medio che una segreteria scolastica dedica a rispondere a richieste di informazioni già pubblicate rappresenta una quota significativa delle ore lavorative settimanali
- Le richieste di giustificazione legate a "non sapevo dell'evento/scadenza" sono tra le cause più frequenti di conflitto scuola-famiglia
- La percezione di "non essere informati" è uno dei fattori di disengagement più citati dagli studenti delle secondarie

---

## 2. Analisi del Contesto

### 2.1 Panorama Normativo

Il contesto normativo italiano definisce obblighi e modalità della comunicazione scolastica:

- Il **Codice dell'Amministrazione Digitale** impone la digitalizzazione dei documenti e la pubblicazione trasparente
- Il **Regolamento GDPR** regola il trattamento dei dati personali di minori e adulti, imponendo vincoli precisi su chi può accedere a quali informazioni
- Le **Linee guida per la comunicazione delle istituzioni scolastiche** del MIUR raccomandano l'uso di strumenti digitali integrati, senza tuttavia imporre un sistema specifico
- Il **Piano Nazionale Scuola Digitale (PNSD)** ha finanziato infrastrutture tecnologiche nelle scuole ma non ha standardizzato le piattaforme di comunicazione

Questo vuoto normativo ha generato la frammentazione attuale: ogni scuola ha adottato soluzioni proprie senza interoperabilità.

### 2.2 Analisi della Concorrenza

I principali attori nel mercato delle piattaforme scolastiche italiane presentano caratteristiche e limitazioni precise:

**Registro Elettronico (Classeviva, Argo, RE Nuvola)**: Ottimi per la gestione valutazioni e presenze, ma deboli come strumento di comunicazione istituzionale. Interfaccia complessa, orientata al corpo docente, non pensata per la comunicazione massiva.

**Sito scolastico istituzionale**: Struttura statica, aggiornamenti lenti, nessuna personalizzazione per ruolo utente, nessun sistema di notifica.

**App di messaggistica (WhatsApp, Telegram)**: Efficaci per la velocità, ma informali, non archiviate, senza struttura, prive di controllo sull'autenticità delle informazioni e con problemi di privacy per i minori.

**Google Workspace / Microsoft Teams**: Potenti ma richiedono formazione e adozione sistematica da parte di tutto il personale. Sovradimensionati per la comunicazione scolastica e generativi di ulteriore frammentazione (un canale Teams per classe, una cartella Drive per materia, ecc.).

**Il gap identificato**: Nessuno dei sistemi esistenti offre un punto di accesso unificato, semplice, personalizzato per ruolo, con archivio consultabile e ricercabile, accessibile senza installazione di app, ottimizzato per mobile e desktop.

---

## 3. Utenti Target e Personas

### 3.1 Utenti Primari

**Persona 1 — Lo Studente (16-19 anni)**
Motivazione: Trovare velocemente le circolari che lo riguardano, scoprire se domani c'è un'uscita didattica, scaricare i materiali del prof.
Comportamento digitale: Mobile-first, abituato a interfacce fluide e veloci, alta aspettativa di risposta immediata.
Frustrazione attuale: Deve controllare tre app diverse ogni mattina per sapere se l'orario è cambiato.
Obiettivo nel sistema: Dashboard personalizzata con solo ciò che lo riguarda, accesso rapido ai materiali della sua classe.

**Persona 2 — Il Genitore (40-55 anni)**
Motivazione: Non perdere scadenze, autorizzazioni, pagamenti, comunicazioni urgenti che riguardano il figlio.
Comportamento digitale: Uso prevalente da mobile, non sempre a proprio agio con sistemi complessi, disponibilità di tempo limitata.
Frustrazione attuale: Riceve email dalla scuola, notifiche dal registro, messaggi dal gruppo WhatsApp dei genitori, spesso con informazioni contraddittorie.
Obiettivo nel sistema: Ricezione proattiva di notifiche pertinenti, archivio consultabile, vista semplificata.

**Persona 3 — Il Docente (30-60 anni)**
Motivazione: Pubblicare comunicazioni alla classe, condividere materiali didattici, essere informato sulle circolari di pertinenza.
Comportamento digitale: Variabile, da utenti avanzati a utenti con competenze digitali di base.
Frustrazione attuale: Deve usare il registro elettronico per le valutazioni, il sito per pubblicare materiali, la email della segreteria per le comunicazioni. Tre sistemi separati.
Obiettivo nel sistema: Pubblicazione rapida di circolari e materiali, comunicazione diretta con le proprie classi.

**Persona 4 — Il Dirigente Scolastico**
Motivazione: Garantire che tutte le comunicazioni istituzionali raggiungano i destinatari corretti, monitorare il tasso di lettura.
Comportamento digitale: Orientato ai risultati, interessato a statistiche e reportistica.
Frustrazione attuale: Non sa quante famiglie hanno letto la circolare urgente pubblicata ieri.
Obiettivo nel sistema: Dashboard amministrativa, tracciamento letture, pubblicazione mirata per destinatario.

**Persona 5 — Il Personale di Segreteria**
Motivazione: Ridurre le telefonate per informazioni già disponibili online, gestire le circolari in modo efficiente.
Comportamento digitale: Utente professionale, abituato a gestionali, orientato alla produttività.
Obiettivo nel sistema: Pubblicazione strutturata, archivio ordinato, export dati.

---

## 4. Obiettivi del Progetto

### 4.1 Obiettivi di Business

1. Ridurre del 40% le richieste di informazioni ripetitive alla segreteria entro 6 mesi dall'adozione
2. Raggiungere un tasso di lettura delle circolari urgenti superiore al 75% entro 30 giorni dall'invio
3. Eliminare la dipendenza da canali informali (WhatsApp, email personali) per le comunicazioni ufficiali
4. Fornire uno strumento adottabile da qualsiasi istituzione scolastica italiana senza costi di infrastruttura significativi

### 4.2 Obiettivi di Prodotto

1. Un unico punto di accesso per circolari, materiali didattici e calendario scolastico
2. Navigazione intuitiva per utenti con qualsiasi livello di competenza digitale
3. Accesso da qualsiasi dispositivo (mobile, tablet, desktop) senza installazione di applicazioni native
4. Sistema di notifiche intelligente che distingue la priorità dei contenuti
5. Funzionalità di ricerca potente su tutto il contenuto della piattaforma
6. Accessibilità conforme alle linee guida WCAG 2.1 livello AA

### 4.3 Indicatori di Successo (KPI)

| Indicatore | Target MVP | Target 6 mesi |
|---|---|---|
| Tasso di adozione utenti | 30% della comunità | 70% della comunità |
| Circolari lette entro 48h | 50% | 75% |
| Riduzione telefonate segreteria | 20% | 40% |
| Soddisfazione utenti (1-5) | 3.5 | 4.2 |
| Tempo medio per trovare un'informazione | < 30 sec | < 15 sec |

---

## 5. Requisiti Funzionali

*Aggiornati alla versione 2.0 (interfaccia chatbot)*

### 5.1 Interfaccia Conversazionale

**RF-01 Input Naturale**: Il sistema deve accettare domande in italiano scritto in linguaggio libero, senza obbligare l'utente a usare comandi strutturati o parole chiave precise.

**RF-02 Riconoscimento Pattern NLP**: Il motore del bot deve riconoscere diverse intenzioni tramite un array di pattern regex ordinati dal più specifico al più generico:
- Circolari per argomento (PCTO, gite, assemblea, sciopero, legalità…)
- Circolari per numero progressivo ("circolare 045", "n.045/2026")
- Date e orari di eventi ("quando è l'assemblea?", "che giorno è la gita?")
- Orario per classe ("orario della 3A INF", "orario 4B")
- Docente per materia ("chi insegna matematica?", "prof di inglese")
- Materiali per materia e classe ("matematica per la 5A", "materiali inglese 3B")
- Materiali per classe generica ("materiali della 3A")
- Ricerca full-text generica su tutti i dati

**RF-03 Risposta Contestuale**: Per ogni intenzione riconosciuta il bot deve restituire una risposta appropriata, non una lista generica. Esempi: per una circolare deve mostrare il testo completo; per un orario deve fornire il link diretto a WebMySchool con spiegazione onesta; per un evento deve rispondere con data, ora e luogo in prosa italiana.

**RF-04 Fallback Informativo**: Se nessun pattern corrisponde, il sistema deve eseguire una ricerca full-text e mostrare i risultati, oppure fornire un messaggio di aiuto con esempi di domande supportate.

**RF-05 Schermo di Benvenuto**: All'apertura, il sistema deve mostrare uno schermo con logo, titolo e una lista di esempi di domande per guidare l'utente. Lo schermo si nasconde non appena l'utente invia il primo messaggio.

**RF-06 Animazione di Caricamento**: Durante l'elaborazione della risposta il bot deve mostrare un indicatore visivo di "digitazione" (tre punti animati) per almeno 650ms, simulando l'attività dell'assistente.

### 5.2 Circolari

**RF-07 Recupero per Argomento**: Il sistema deve trovare tutte le circolari che trattano un argomento e mostrarne il contenuto completo (titolo, numero, data, autore, destinatari, classi, testo, allegati).

**RF-08 Recupero per Numero**: Il sistema deve trovare una circolare per numero progressivo (es. "045", "045/2026") e mostrarne il dettaglio completo.

**RF-09 Indicatore Priorità**: Ogni card circolare deve mostrare visivamente la priorità (alta/media/bassa) tramite colore della barra laterale.

**RF-10 Allegati**: Il testo completo della circolare deve includere la lista degli allegati con link di download quando presenti.

### 5.3 Materiali Didattici

**RF-11 Filtro per Materia e Classe**: Il sistema deve supportare domande combinate (es. "matematica per la 5A") e filtrare i materiali per entrambi i criteri simultaneamente.

**RF-12 Filtro per Classe**: Il sistema deve restituire tutti i materiali disponibili per una classe quando la materia non è specificata.

**RF-13 Filtro per Materia**: Il sistema deve restituire tutti i materiali di una materia su tutte le classi quando la classe non è specificata.

**RF-14 Card Materiale**: Ogni materiale deve mostrare: titolo, descrizione, materia, classe, tipo, autore, data, formato e link di download.

### 5.4 Informazioni Docenti

**RF-15 Ricerca Docente per Materia**: Il sistema deve rispondere a domande come "chi insegna matematica?" trovando i docenti autori di materiali per quella materia. La ricerca deve essere robusta rispetto a varianti del nome della materia (singolare/plurale, abbreviazioni).

### 5.5 Calendario ed Eventi

**RF-16 Data Evento per Nome**: Il sistema deve rispondere a domande del tipo "quando è l'assemblea?" o "che giorno è la gita a Roma?" trovando l'evento nel calendario e restituendo la risposta in prosa italiana naturale con data, ora e luogo.

**RF-17 Ricerca Incrociata Circolare-Evento**: Per gli eventi legati a circolari (assemblee, gite) il bot deve cercare anche nelle circolari per trovare informazioni aggiuntive.

### 5.6 Orario Scolastico

**RF-18 Orario per Classe**: Il sistema deve riconoscere richieste di orario per classe (es. "orario 3A INF", "orario della 4B"), estrarre il codice classe dal testo, e fornire link diretti al portale WebMySchool con una spiegazione onesta sul perché non può mostrare l'orario direttamente (nessuna API pubblica disponibile).

### 5.7 Dark Mode e Preferenze

**RF-19 Toggle Dark Mode**: L'utente deve poter passare tra tema chiaro e scuro tramite pulsante nell'header. La preferenza deve essere persistita in localStorage.

**RF-20 Nuova Conversazione**: Il pulsante "nuova chat" deve azzerare la conversazione e tornare alla schermata di benvenuto.

### 5.8 Accessibilità

**RF-21 Input da Tastiera**: La textarea deve supportare invio con Enter (Shift+Enter per andare a capo). Il pulsante invio deve essere disabilitato quando l'input è vuoto.

**RF-22 Area Live ARIA**: L'area messaggi deve avere `role="log"` e `aria-live="polite"` per i lettori di schermo.

**RF-23 Sanitizzazione XSS**: Tutti i testi provenienti da dati esterni o input utente devono essere sanitizzati prima dell'inserimento in innerHTML tramite funzione `_esc()`.

---

## 6. Requisiti Non Funzionali

### 6.1 Prestazioni

**RNF-01**: Il caricamento iniziale della pagina deve avvenire in meno di 3 secondi su una connessione media (10 Mbps).

**RNF-02**: La risposta alle interazioni dell'utente (filtri, ricerca, navigazione) deve avvenire in meno di 300 millisecondi per sembrare istantanea.

**RNF-03**: La ricerca con debounce non deve inviare più di una richiesta ogni 300-400ms durante la digitazione.

### 6.2 Compatibilità

**RNF-04**: L'applicazione deve funzionare correttamente sulle versioni correnti di Chrome, Firefox, Safari ed Edge.

**RNF-05**: L'applicazione deve essere completamente funzionale su dispositivi mobili con schermo da 320px di larghezza.

**RNF-06**: L'applicazione deve funzionare senza una connessione server grazie ai dati embedded di fallback, garantendo l'esperienza completa anche in modalità offline o aperta direttamente da filesystem.

### 6.3 Accessibilità

**RNF-07**: L'interfaccia deve rispettare le linee guida WCAG 2.1 livello AA. In particolare:
- Tutti gli elementi interattivi devono essere accessibili da tastiera
- Le immagini e le icone devono avere testo alternativo appropriato
- Il contrasto colore deve superare il rapporto minimo di 4.5:1 per il testo normale
- Le aree live devono avere attributi ARIA appropriati per i lettori di schermo

**RNF-08**: I form devono includere label associate, messaggi di errore descrittivi e feedback visivo sullo stato di focus.

### 6.4 Sicurezza

**RNF-09**: Le password non devono essere mai mostrate in chiaro nell'interfaccia o nei log.

**RNF-10**: L'applicazione non deve iniettare HTML non sanitizzato nel DOM per prevenire attacchi XSS. Il testo inserito dagli utenti deve essere sempre trattato come testo puro, non come markup.

**RNF-11**: I dati sensibili degli utenti non devono essere inviati a servizi di terze parti non autorizzati.

### 6.5 Manutenibilità

**RNF-12**: Il codice deve essere organizzato in moduli separati con responsabilità chiare (dati, presentazione, logica applicativa).

**RNF-13**: I dati devono essere strutturati in formato JSON con schema consistente e documentato, per facilitare la migrazione a un backend reale.

**RNF-14**: I commenti nel codice devono essere presenti solo dove il comportamento non è ovvio dal nome delle funzioni e variabili.

---

## 7. Architettura dell'Informazione

*Aggiornata alla versione 2.0 (interfaccia chatbot)*

### 7.1 Struttura dell'Applicazione

L'applicazione v2.0 è una singola pagina chat senza sezioni separate. La struttura visiva è:

```
┌─────────────────────────────────────────┐
│  HEADER                                 │
│  [✏ Nuova chat] [ScuolaHub] [🌐] [🌙]  │
├─────────────────────────────────────────┤
│                                         │
│  SCHERMATA BENVENUTO (nascosta dopo     │
│  il primo messaggio)                    │
│  • Logo + titolo                        │
│  • Esempi di domande                    │
│                                         │
│  AREA MESSAGGI (visibile dopo invio)    │
│  • Messaggi utente (allineati destra)   │
│  • Risposte bot (allineate sinistra)    │
│    con card, tabelle, link              │
│                                         │
├─────────────────────────────────────────┤
│  INPUT                                  │
│  [textarea                    ] [▲]     │
│  ITE Blaise Pascal · A.S. 2025/2026     │
└─────────────────────────────────────────┘
```

### 7.2 Flusso dell'Informazione

Quando l'utente invia un messaggio:

1. Il testo viene normalizzato (minuscolo, trim)
2. Viene testato contro l'array `PATTERNS` in ordine (più specifici prima)
3. Il primo pattern che corrisponde esegue la funzione associata
4. La funzione interroga i dati (circolari, materiali, eventi)
5. Il risultato viene formattato come HTML e inserito nella chat
6. Se nessun pattern corrisponde: ricerca full-text, poi fallback con suggerimenti

### 7.3 Gerarchia dei Dati

I dati provengono da tre file JSON indipendenti:

- `data/circolari.json` — 30 comunicazioni ufficiali con testo completo
- `data/materiali.json` — 25 risorse didattiche con autori e classi
- `data/eventi.json` — 23 eventi con date, orari e luoghi

### 7.4 Principi di Organizzazione

- **Zero navigazione**: l'utente non deve sapere dove trovare un'informazione
- **Risposta contestuale**: ogni tipo di domanda ottiene un formato di risposta ottimizzato
- **Onestà sui limiti**: quando un'informazione non è disponibile (es. orario in tempo reale), il bot lo spiega esplicitamente e fornisce l'alternativa
- **Persistenza minima**: solo dark mode in localStorage, nessun dato utente

---

## 8. Modello dei Dati

### 8.1 Entità Principali

Il sistema gestisce quattro entità principali, ciascuna con il proprio schema JSON:

**Circolare**
Ogni circolare rappresenta una comunicazione ufficiale della scuola. Gli attributi fondamentali sono: identificatore univoco, numero progressivo nel formato "NNN/AAAA", titolo, testo completo, data di pubblicazione, autore (nome/qualifica), lista dei destinatari (categorie di utenti), lista delle classi destinatarie, categoria tematica, lista degli allegati con nome e URL, livello di priorità e stato di lettura.

**Materiale Didattico**
Ogni materiale rappresenta un documento o risorsa condivisa da un docente. Gli attributi fondamentali sono: identificatore univoco, titolo, descrizione estesa, materia scolastica, classe destinataria, tipo di materiale (dispensa, schema, presentazione, esercizi, video), formato del file, dimensione del file, autore, data di pubblicazione, URL per il download e lista di tag per la ricerca.

**Evento Calendario**
Ogni evento rappresenta un appuntamento, scadenza o avvenimento nel calendario scolastico. Gli attributi fondamentali sono: identificatore univoco, titolo, descrizione, data, orario di inizio, orario di fine, tipo di evento (riunione, evento, scadenza, uscita didattica), lista delle classi coinvolte, luogo e colore rappresentativo per la visualizzazione nel calendario.

**Utente**
Ogni utente rappresenta un membro della comunità scolastica. Gli attributi fondamentali sono: identificatore univoco, nome completo, email, password (non esposta nell'interfaccia), ruolo (studente, genitore, docente, dirigente, segreteria) e classe di appartenenza (per gli studenti).

### 8.2 Relazioni tra Entità

- Una circolare può avere più classi destinatarie e più categorie di destinatari (utenti per ruolo)
- Un materiale appartiene a una sola materia e una sola classe
- Un evento può coinvolgere più classi
- Un utente ha un solo ruolo e, se studente, una sola classe di appartenenza
- Lo stato di lettura di una circolare è relazionato all'utente che l'ha letta

### 8.3 Persistenza dei Dati

Nell'MVP, i dati sono gestiti in tre livelli:

**Livello 1 — File JSON**: Contengono i dati base predefiniti del sistema (circolari, materiali, eventi campione). Vengono caricati via fetch quando l'applicazione è servita da un server HTTP.

**Livello 2 — Dati Embedded nel JavaScript**: Sono una copia dei dati JSON inclusa direttamente nel codice JavaScript dell'applicazione. Vengono usati come fallback automatico quando il fetch dei file JSON non è possibile (es. apertura locale via file://). Garantiscono che l'applicazione funzioni sempre, anche senza server.

**Livello 3 — localStorage del Browser**: Memorizza le aggiunte dell'utente (nuove circolari create in sessione), lo stato di lettura delle circolari, la sessione autenticata dell'utente, le preferenze di interfaccia (modalità scura). I dati del localStorage vengono uniti con quelli dei livelli superiori a runtime.

### 8.4 Schema di Evoluzione verso il Backend

Quando il progetto evolverà verso un'architettura con backend, ogni entità JSON corrisponderà a una tabella o collezione nel database. Il contratto API sarà:
- Ogni endpoint risponde con la stessa struttura JSON già usata nel frontend
- L'autenticazione passerà da localStorage a JWT con refresh token
- Le operazioni di scrittura saranno validate server-side prima del salvataggio
- I file allegati saranno gestiti tramite storage cloud (es. S3-compatible)

---

## 9. Flussi Utente

### 9.1 Flusso: Primo Accesso e Onboarding

1. L'utente apre l'applicazione → viene visualizzata la Dashboard con dati campione
2. L'utente vede il banner "Benvenuto, Ospite!" e le statistiche aggiornate
3. Se vuole personalizzare l'esperienza, clicca su "Accedi" nell'header
4. Compila il form di login o passa al form di registrazione
5. Dopo l'autenticazione, l'interfaccia si aggiorna con il nome e il ruolo dell'utente
6. Le circolari non ancora lette vengono evidenziate nella dashboard

### 9.2 Flusso: Consultazione Circolare

1. L'utente clicca su "Circolari" nella navigazione
2. Vede l'elenco completo con le più recenti in cima
3. Può filtrare per classe o cercare per parola chiave
4. Clicca su "Leggi" per espandere il testo completo della circolare
5. La circolare viene automaticamente segnata come letta
6. Se necessario, può segnare/desegnare manualmente lo stato di lettura

### 9.3 Flusso: Pubblicazione Circolare (Docente/Dirigente)

1. Il docente autenticato clicca su "Pubblica Circolare" (dashboard o sezione circolari)
2. Il sistema verifica il ruolo: se non autorizzato, mostra un messaggio esplicativo
3. Si apre il form modale con i campi richiesti
4. Il docente compila titolo, testo, data, priorità, categoria, destinatari e classe
5. Clicca "Pubblica": la circolare appare immediatamente in cima all'elenco
6. Una notifica toast conferma il successo dell'operazione
7. Una notifica appare nel pannello delle notifiche a campana

### 9.4 Flusso: Ricerca di Materiali

1. L'utente naviga alla sezione Materiali
2. Filtra per materia (es. "Matematica") e classe (es. "3A")
3. L'elenco si riduce ai materiali corrispondenti
4. Clicca su "Scarica" per ottenere il materiale
5. Una notifica toast conferma il download avviato

### 9.5 Flusso: Verifica Calendario

1. L'utente naviga alla sezione Calendario
2. Il calendario mostra il mese corrente con i giorni evidenziati per gli eventi
3. Il pannello laterale mostra automaticamente gli eventi di oggi
4. L'utente clicca su un giorno futuro per vedere gli eventi previsti
5. Ogni evento mostra titolo, orario, luogo e tipo

### 9.6 Flusso: Ricerca Globale

1. L'utente clicca su "Ricerca" o sul pulsante "Cerca tutto" nella dashboard
2. Digita un termine (es. "gita" o "matematica")
3. I risultati appaiono raggruppati: "Circolari (2)", "Materiali (3)", "Eventi (1)"
4. Le parole cercate sono evidenziate nel testo dei risultati
5. L'utente clicca su un risultato e viene portato alla sezione corrispondente

---

## 10. Design System e UX

### 10.1 Principi di Design

**Semplicità Prima di Tutto**: Ogni funzionalità viene valutata in base alla chiarezza con cui può essere presentata a un utente che non ha ricevuto formazione. Se la comprensione richiede istruzioni, l'interfaccia va riprogettata.

**Feedback Immediato**: Ogni azione dell'utente deve ricevere una risposta visiva entro 100ms. Le operazioni più lente devono mostrare un indicatore di caricamento.

**Gerarchia Visiva Chiara**: Le informazioni più importanti (titolo, priorità, stato di lettura) devono essere percepite immediatamente senza dover leggere ogni elemento. Questo si ottiene attraverso dimensione, colore e posizione.

**Coerenza**: Lo stesso tipo di azione usa sempre lo stesso elemento visivo. I pulsanti primari sono sempre dello stesso colore, i badge di priorità usano sempre gli stessi colori, le icone rappresentano sempre lo stesso concetto.

**Tolleranza all'Errore**: Il sistema deve prevenire gli errori dove possibile (validazione in tempo reale, disabilitazione di azioni non permesse) e permettere il recupero dove gli errori sono inevitabili (messaggi chiari, possibilità di correggere).

### 10.2 Sistema di Colori

**Colore Primario (Blu Indaco)**: Usato per azioni principali, link, stati attivi e accenti. Trasmette affidabilità e istituzionalità, appropriato per un contesto scolastico.

**Colori Semantici**:
- Verde: Successo, conferma, stato positivo, categoria "didattica"
- Arancione: Avviso, attenzione, priorità media, categoria "eventi"
- Rosso/Rosa: Errore, urgenza, priorità alta, categoria "urgente"
- Viola: Neutro premium, riunioni, ruolo docente

**Modalità Scura**: Il sistema supporta una modalità scura completa con variabili CSS che ridefiniscono i colori di sfondo, testo e bordi mantenendo i colori semantici leggibili.

### 10.3 Tipografia

L'applicazione usa la font di sistema "Segoe UI" con fallback alle font di sistema del browser. Questa scelta elimina la dipendenza da CDN esterni per le font, migliora le prestazioni di caricamento e garantisce una resa ottimale su ogni sistema operativo.

La gerarchia tipografica è definita da:
- Titoli di sezione: 1.5rem, grassetto 700
- Titoli card: 1rem, grassetto 600
- Corpo del testo: 0.875rem, normale 400
- Metadata e note: 0.8rem, colore attenuato

### 10.4 Componenti dell'Interfaccia

**Cards**: Usate per circolari e materiali. Includono: barra colorata laterale per la categoria, area titolo con badge, area metadata, anteprima del contenuto, area azioni.

**Filtri**: Barra orizzontale (verticale su mobile) con select e input di ricerca. Si comprimono in colonna su schermi stretti.

**Calendario**: Griglia 7 colonne con altezza adattiva. I giorni con eventi mostrano punti colorati. Il pannello eventi affianca il calendario su desktop, si posiziona sotto su mobile.

**Toast Notifications**: Appaiono nell'angolo in basso a destra (in basso su mobile), con animazione di entrata da destra. Quattro varianti cromatiche (info, successo, avviso, errore). Si chiudono automaticamente o manualmente.

**Modali**: Overlay scuro con blur, centrati, con animazione di entrata dal basso. Chiudibili cliccando l'overlay, il pulsante X o premendo Escape.

### 10.5 Responsive Design

**Desktop (>1024px)**: Layout a piena larghezza, navigazione orizzontale, griglia materiali multi-colonna, calendario con pannello laterale.

**Tablet (768px-1024px)**: Menu hamburger, griglia materiali a due colonne, calendario occupante la larghezza completa con pannello eventi sotto.

**Mobile (<768px)**: Colonna singola per tutti i contenuti, navigazione a menu espandibile, card a tutta larghezza, filtri in colonna, calendario semplificato.

---

## 11. Tecnologie Scelte

### 11.1 Frontend

**HTML5**: Uso di elementi semantici (header, main, section, article, nav, footer) per struttura accessibile e SEO-friendly. Attributi ARIA per l'accessibilità dinamica. Form nativi per la validazione lato client.

**CSS3**: Variabili custom (custom properties) per il sistema di design e il tema scuro. Grid e Flexbox per i layout adattivi. Transizioni e animazioni native per il feedback visivo. Media queries per il design responsivo. Nessun framework CSS: zero dipendenze, massimo controllo.

**JavaScript (ES6+)**: Architettura a moduli tramite pattern IIFE (Immediately Invoked Function Expression) per l'incapsulamento. Async/await per le operazioni asincrone. Fetch API per il caricamento dei dati JSON. LocalStorage API per la persistenza. Event delegation per la gestione efficiente degli eventi DOM. Nessun framework JavaScript: bundle size zero, compatibilità massima.

**Font Awesome 6**: Per le icone, caricato da CDN con fallback graceful se la rete non è disponibile. Gli elementi con icone usano sempre anche testo o attributi ARIA per garantire l'accessibilità.

### 11.2 Gestione dei Dati

**JSON**: Formato universale per la definizione delle strutture dati. Ogni categoria ha il proprio file JSON con header di versione e timestamp dell'ultimo aggiornamento. I file JSON sono indipendenti e possono essere aggiornati separatamente.

**LocalStorage**: Per la persistenza delle preferenze utente, dello stato di sessione e dei dati aggiunti dall'utente durante la sessione. Il limite di circa 5MB del localStorage è sufficiente per un MVP scolastico con dati testuali.

**Dati Embedded**: Copia dei dati JSON inclusa nel codice JavaScript per garantire il funzionamento offline e senza server. Questa ridondanza è il meccanismo di fallback primario.

### 11.3 Perché Nessun Framework

La scelta di non usare framework come React, Vue o Angular per l'MVP è giustificata da:

1. **Zero dipendenze da runtime**: L'applicazione è un file HTML che può essere aperto in qualsiasi browser
2. **Dimensioni ridotte**: Il codice custom è più piccolo di qualsiasi framework, con vantaggi per il caricamento
3. **Compatibilità**: Funziona su browser più vecchi senza transpilation o polyfill
4. **Comprensibilità**: Il codice è leggibile da sviluppatori di qualsiasi livello
5. **Portabilità**: Non richiede un ambiente di sviluppo specifico, strumenti di build o pipeline CI/CD per essere modificato

Nella versione post-MVP, quando la complessità dell'interfaccia crescerà, il passaggio a un framework sarà giustificato e supportato dalla struttura dati già definita.

---

## 12. Sicurezza e Privacy

### 12.1 Autenticazione nell'MVP

L'MVP utilizza un sistema di autenticazione simulato con localStorage. Questo approccio è accettabile per un prototipo e per ambienti demo, ma non è adatto alla produzione. Le limitazioni sono:
- Le password sono memorizzate in chiaro nel localStorage (non in un server sicuro)
- Non c'è crittografia dei dati sensibili
- Non c'è protezione contro accessi fisici al dispositivo

Per la transizione alla produzione, si raccomanda l'implementazione di un'autenticazione server-side con hashing sicuro delle password, token JWT con scadenza breve e refresh token, e https obbligatorio.

### 12.2 Protezione XSS

Il sistema evita l'iniezione di HTML arbitrario nel DOM. Il testo inserito dagli utenti (titolo e testo delle circolari) viene trattato come testo puro e inserito tramite le proprietà `textContent` o template literals con escape dei caratteri speciali, non tramite `innerHTML`. L'unica eccezione è la funzione di highlight della ricerca, che opera su testo di sistema già validato.

### 12.3 GDPR e Privacy

Per la versione production, le considerazioni privacy da implementare sono:

- **Minimizzazione dei dati**: Raccogliere solo le informazioni strettamente necessarie (nome, email, ruolo, classe)
- **Trasparenza**: Informativa privacy chiara e accessibile prima della registrazione
- **Diritto alla cancellazione**: Possibilità per l'utente di eliminare il proprio account e i dati associati
- **Dati dei minori**: Per gli studenti minorenni, il consenso deve essere fornito dai genitori
- **Log di accesso**: I log di accesso ai dati devono essere conservati solo per il tempo strettamente necessario

### 12.4 Controllo Accessi

La separazione delle funzionalità per ruolo deve essere implementata sia lato client (per l'esperienza utente) sia lato server (per la sicurezza effettiva) nella versione production. Nell'MVP, il controllo lato client previene azioni non autorizzate ma non costituisce una barriera di sicurezza reale.

---

## 13. Gestione degli Errori e Sistema di Fallback

### 13.1 Tipologie di Errore Gestite

**Errore di Caricamento Dati**: Quando il fetch dei file JSON fallisce (rete non disponibile, file protocol, CORS), il sistema utilizza automaticamente i dati embedded nel JavaScript. L'utente riceve una notifica informativa non bloccante.

**Errore di Autenticazione**: Credenziali errate → messaggio di errore descrittivo, campo password svuotato, nessun dato sensibile esposto.

**Errore di Validazione Form**: Campi obbligatori non compilati → il browser mostra la validazione nativa HTML5, rinforzata dalla logica JavaScript.

**Ricerca Senza Risultati**: La query non trova corrispondenze → messaggio illustrativo con suggerimento all'utente.

**Azione Non Autorizzata**: Tentativo di pubblicare una circolare senza il ruolo appropriato → notifica esplicativa del perché l'azione non è permessa.

**Sezione Non Trovata**: URL hash non valido → reindirizzamento automatico alla Dashboard.

### 13.2 Principi della Gestione degli Errori

**Graceful Degradation**: L'applicazione deve funzionare sempre, anche in condizioni degradate. La perdita di funzionalità deve essere minima e comunicata.

**Messaggi Umani**: I messaggi di errore devono essere scritti per gli utenti finali, non per gli sviluppatori. Devono spiegare cosa è successo e, dove possibile, cosa fare.

**Non Bloccare l'Utente**: Nessun errore deve impedire all'utente di continuare a usare le parti funzionanti dell'applicazione.

**Logging Non Invasivo**: Gli errori tecnici vengono registrati nella console del browser per il debugging degli sviluppatori, senza impattare l'esperienza utente.

---

## 14. Piano di Test e Qualità

### 14.1 Categorie di Test da Eseguire

**Test Funzionali (16 interazioni verificate)**

| ID | Interazione | Comportamento atteso |
|---|---|---|
| T-01 | Apertura app senza login | Dashboard visibile con dati campione, nome "Ospite" |
| T-02 | Attivazione dark mode | Tutto l'interfaccia passa al tema scuro, preferenza salvata |
| T-03 | Login con credenziali corrette | Sessione aperta, nome utente aggiornato, notifica benvenuto |
| T-04 | Login con credenziali errate | Messaggio di errore, password svuotata |
| T-05 | Registrazione nuovo utente | Account creato, sessione aperta, notifica conferma |
| T-06 | Logout | Sessione chiusa, interfaccia reset a "Ospite" |
| T-07 | Pubblicazione circolare (come docente) | Circolare appare in testa all'elenco, notifica confirmata |
| T-08 | Tentativo di pubblicare senza ruolo autorizzato | Messaggio esplicativo, nessuna azione eseguita |
| T-09 | Filtro circolari per classe | Solo circolari della classe selezionata (+ "tutte le classi") |
| T-10 | Ordinamento circolari per data | Inversione dell'ordine correttamente applicata |
| T-11 | Ricerca testuale nelle circolari | Risultati filtrati in real-time, debounce funzionante |
| T-12 | Segna circolare come letta/non letta | Stato visivo aggiornato, badge "Nuovo" rimosso/ripristinato |
| T-13 | Filtro materiali per materia | Solo materiali della materia selezionata |
| T-14 | Filtro materiali per classe | Solo materiali della classe selezionata |
| T-15 | Navigazione calendario mese precedente/successivo | Mese e anno aggiornati, giorni rigenerati |
| T-16 | Click su giorno con eventi | Pannello eventi aggiornato con eventi del giorno |

**Test di Responsive Design**

Verificare ogni sezione su tre dimensioni: 320px (mobile piccolo), 768px (tablet), 1280px (desktop).

**Test del Sistema di Fallback**

Aprire l'applicazione direttamente da filesystem (file://) e verificare che tutti i dati siano visibili attraverso i dati embedded di fallback.

**Test di Accessibilità**

Navigare l'intera applicazione usando solo la tastiera (Tab, Enter, Escape, frecce). Verificare che tutti gli elementi interattivi siano raggiungibili e attivabili.

**Test di Compatibilità Browser**

Verificare il funzionamento su: Chrome (ultima versione), Firefox (ultima versione), Safari (ultima versione), Edge (ultima versione).

### 14.2 Criteri di Accettazione

- Tutte le 16 interazioni documentate superano il test funzionale
- Il sistema di fallback funziona correttamente con il file protocol
- Nessun errore JavaScript nella console in scenari di utilizzo normale
- L'interfaccia è completamente usabile su mobile 320px
- Il dark mode funziona su tutte le sezioni
- La ricerca globale trova risultati in tutte e tre le categorie

---

## 15. MVP vs Versione Completa

### 15.1 Perimetro dell'MVP

L'MVP include:
- Autenticazione simulata con localStorage
- Dati statici (circolari, materiali, eventi campione) con persistenza locale
- Tutte le funzioni di consultazione (circolari, materiali, calendario, ricerca)
- Pubblicazione circolari persistita in localStorage
- Sistema notifiche client-side
- Dark mode
- Design completamente responsivo
- Fallback offline

### 15.2 Funzionalità Escluse dall'MVP (Roadmap)

**Sprint 2 — Backend e Auth Reale**
- Server Node.js/Python con API REST
- Database relazionale (PostgreSQL) o NoSQL (MongoDB)
- Autenticazione JWT con refresh token
- Hashing sicuro delle password (bcrypt)
- Endpoint per CRUD completo di circolari e materiali

**Sprint 3 — Notifiche Push e Email**
- Service Worker per notifiche push (PWA)
- Invio email automatico per circolari urgenti
- Digest settimanale per genitori
- Preferenze di notifica per utente

**Sprint 4 — Upload File e Allegati**
- Upload di file allegati alle circolari
- Storage cloud per i materiali didattici
- Visualizzazione in-browser dei PDF
- Antivirus scan degli upload

**Sprint 5 — Dashboard Amministrativa**
- Analytics: tasso di lettura per circolare
- Gestione utenti (CRUD)
- Import/export circolari da/verso formati standard
- Configurazione personalizzata per istituzione

**Sprint 6 — Integrazione con Sistemi Esistenti**
- API connector per i principali registri elettronici (Classeviva, Argo)
- Import automatico del calendario da Google Calendar o Outlook
- Single Sign-On (SSO) con Google Workspace for Education
- Sincronizzazione con il portale ministeriale

---

## 16. Metriche di Successo

### 16.1 Metriche di Utilizzo (Post-Launch)

| Metrica | Descrizione | Tool di Misurazione |
|---|---|---|
| Daily Active Users | Utenti che accedono almeno una volta al giorno | Analytics server |
| Session Duration | Tempo medio per sessione | Analytics |
| Pages per Session | Sezioni visitate per sessione | Analytics |
| Circolari aperte/lette | % circolari aperte vs pubblicate | Log applicazione |
| Tempo alla prima lettura | Minuti dalla pubblicazione alla prima apertura | Log applicazione |
| Richieste segreteria | Numero di telefonate/email di richiesta informazioni | Rilevazione manuale |

### 16.2 Metriche di Qualità

| Metrica | Target |
|---|---|
| Uptime applicazione | > 99.5% mensile |
| Errori JavaScript in produzione | < 0.1% delle sessioni |
| Core Web Vitals - LCP | < 2.5 secondi |
| Core Web Vitals - FID | < 100ms |
| Core Web Vitals - CLS | < 0.1 |
| Lighthouse Performance | > 85/100 |
| Lighthouse Accessibility | > 90/100 |

---

## 17. Roadmap e Visione Futura

### 17.1 Evoluzione a 12 Mesi

**Mese 1-3 (MVP stabilization)**
- Raccolta feedback da 2-3 istituti pilota
- Correzione bug e ottimizzazioni UX
- Implementazione backend minimale per persistenza reale

**Mese 4-6 (Espansione funzionale)**
- Sistema di notifiche push (PWA)
- Upload allegati
- Dashboard amministrativa per dirigenti

**Mese 7-9 (Integrazione ecosystem)**
- Connettori per registri elettronici esistenti
- App mobile nativa (React Native o Progressive Web App avanzata)
- Sistema di firma digitale per circolari

**Mese 10-12 (Scalabilità e monetizzazione)**
- Architettura multi-tenant per supportare più istituti
- Piano freemium vs premium
- Marketplace di materiali didattici verificati

### 17.2 Visione a 3 Anni

ScuolaHub aspira a diventare la piattaforma di riferimento per la comunicazione scolastica in Italia, con l'obiettivo di:
- Servire almeno 500 istituti scolastici
- Essere integrato con il sistema ministeriale SIDI
- Offrire un modello di dati aperto e interoperabile per l'ecosistema EdTech italiano
- Diventare un caso di studio sull'applicazione dei principi di design centrato sull'utente nel settore pubblico

---

## 18. Conclusioni

Il progetto ScuolaHub affronta un problema reale, diffuso e sottovalutato: la comunicazione scolastica è rotta non per mancanza di strumenti, ma per eccesso di strumenti non integrati. La soluzione proposta in questo documento è deliberatamente pragmatica: un'applicazione web accessibile, funzionante offline, costruita con tecnologie standard e senza dipendenze, che può essere adottata da qualsiasi istituto senza costi di infrastruttura.

L'MVP descritto rispetta i vincoli di semplicità tecnica (HTML, CSS, JS, JSON) pur offrendo un'esperienza utente moderna e professionale. Le scelte architetturali — dati embedded come fallback, localStorage per la persistenza, moduli JavaScript separati per responsabilità — garantiscono che l'applicazione sia robusta, manutenibile e pronta per l'evoluzione verso un'architettura con backend reale.

Il documento ha identificato 16 interazioni utente distinte, 35 requisiti funzionali, 14 requisiti non funzionali, 5 personas dettagliate e una roadmap a 12 mesi. Questo livello di dettaglio è intenzionale: un MVP ben documentato si trasforma in un prodotto di successo quando ogni decisione di design è collegata a un problema utente reale e misurabile.

---

*Documento preparato per il progetto ScuolaHub · Versione 1.0 · Maggio 2026*
*Proprietà intellettuale riservata. Non riprodurre senza autorizzazione.*

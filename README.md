# ScuolaHub · README

**Assistente scolastico conversazionale per ITE Blaise Pascal di Foggia**

---

## Avvio rapido

Apri `index.html` direttamente nel browser. Non serve installare nulla.

Per caricare correttamente i file JSON (circolari, materiali, eventi), usa un server locale:

```bash
# Python 3
python -m http.server 8080

# Node.js
npx serve .
```

Poi apri `http://localhost:8080` nel browser.

---

## Come funziona

ScuolaHub è un assistente conversazionale che risponde in linguaggio naturale alle domande degli studenti del **ITE Blaise Pascal di Foggia**.

Scrivi una domanda nella casella in basso, ad esempio:

- *"Dimmi la circolare che parla del PCTO"*
- *"Quando c'è l'assemblea d'istituto?"*
- *"Materiali di matematica per la 5A"*
- *"Orario della 3A INF"*
- *"Chi insegna inglese?"*
- *"Circolare numero 045"*

Il bot risponde analizzando circolari, materiali didattici ed eventi del calendario scolastico.

---

## File da includere nella condivisione

Quando condividi il progetto, includi **solo**:

| File / Cartella | Contenuto |
|---|---|
| `index.html` | Pagina principale (interfaccia chat) |
| `css/style.css` | Stili dell'interfaccia + dark mode |
| `js/api.js` | Livello dati: fetch JSON, fallback, localStorage |
| `js/chat.js` | Motore del bot: NLP pattern, risposte, UI |
| `data/circolari.json` | 30 circolari scolastiche |
| `data/materiali.json` | 25 materiali didattici |
| `data/eventi.json` | Calendario eventi scolastici |
| `README.md` | Questa documentazione |
| `analisi.md` | Analisi e progettazione del prodotto |

**Non includere** la cartella `.claude/` (configurazione locale di sviluppo).

---

## Struttura del progetto

```
/
├── index.html              # Pagina principale (chat)
├── css/
│   └── style.css           # Tutti gli stili (tema chiaro/scuro)
├── js/
│   ├── api.js              # Livello dati: fetch JSON + fallback embedded
│   └── chat.js             # Logica bot: NLP, render risposte, gestione UI
├── data/
│   ├── circolari.json      # 30 circolari scolastiche con testo completo
│   ├── materiali.json      # 25 materiali didattici con autori e classi
│   └── eventi.json         # Calendario eventi (assemblee, gite, esami…)
├── analisi.md              # Documento di analisi del progetto
└── README.md               # Questo file
```

---

## Capacità del bot

| Tipo di domanda | Esempio | Risposta |
|---|---|---|
| Circolare per argomento | "circolare sul PCTO" | Testo completo + allegati |
| Circolare per numero | "circolare 045" | Dettaglio circolare |
| Data di un evento | "quando è l'assemblea?" | Data, ora, luogo |
| Orario classe | "orario della 3A INF" | Link diretto a WebMySchool |
| Docente per materia | "chi insegna matematica?" | Nome professore/ssa |
| Materiali per materia e classe | "matematica per la 5A" | Elenco materiali scaricabili |
| Materiali per classe | "materiali della 3A" | Tutti i materiali della classe |
| Gite e uscite | "gita a Napoli" / "gita 4B" | Circolare della gita |
| Ricerca generica | "Kangourou" | Ricerca full-text su tutti i dati |

---

## Sistema di fallback

L'applicazione funziona in tre modalità:

1. **Con server HTTP** — carica i file `data/*.json` via fetch
2. **Senza server (file://)** — usa i dati embedded in `js/api.js` come fallback
3. **Preferenze** — dark mode salvata in localStorage tra le sessioni

---

## Professori nel database

| Professore/ssa | Materie |
|---|---|
| Prof.ssa Anna Romano | Italiano, Storia |
| Prof. Marco Colombo | Matematica, Matematica Applicata |
| Prof.ssa Carla Esposito | Matematica Applicata |
| Prof.ssa Laura Martini | Inglese |
| Prof.ssa Sara Vitale | Informatica |
| Prof. Luca Longo | Informatica |
| Prof. Antonio De Luca | Economia Aziendale |
| Prof.ssa Lucia Palumbo | Diritto ed Economia |
| Prof.ssa Giulia Ferrara | Fisica |
| Prof.ssa Cristina Amato | Storia dell'Arte |
| Prof.ssa Roberta Fontana | Scienze Naturali |
| Prof.ssa Giuseppe Greco | Gite / PCTO |
| Prof.ssa Maria Sorrentino | Dirigente Scolastica |
| Prof. Raffaele Manna | Vicepresidenza |

---

## Tecnologie

- **HTML5, CSS3, JavaScript ES6+** — nessun framework, nessun build tool
- **Font Awesome 6** — icone via CDN
- **JSON** — circolari, materiali ed eventi in file separati

Compatibilità: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+

---

*ScuolaHub · ITE Blaise Pascal Foggia · A.S. 2025/2026*

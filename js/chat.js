/**
 * chat.js — Assistente conversazionale ScuolaHub
 * ITE Blaise Pascal Foggia · A.S. 2025/2026
 *
 * Capisce domande in italiano libero: cerca circolari specifiche,
 * mostra orari per classe, risponde su singoli eventi e materiali.
 */

const Chat = (() => {

  let _data = { circolari: [], materiali: [], eventi: [] };
  let _hasMessages = false;
  let _darkMode = localStorage.getItem('sh_darkmode') === 'true';

  const MONTHS_ABBR = ['GEN','FEB','MAR','APR','MAG','GIU','LUG','AGO','SET','OTT','NOV','DIC'];
  const MONTHS_LONG = ['gennaio','febbraio','marzo','aprile','maggio','giugno',
                       'luglio','agosto','settembre','ottobre','novembre','dicembre'];

  /* ═══════════════════════════════════════════
     PATTERNS — ordine: dal più specifico al generale
  ═══════════════════════════════════════════ */
  const PATTERNS = [

    // ── Meta
    { re: /\b(ciao|salve|buongiorno|buonasera|hey)\b/i,                              fn: _greet },
    { re: /\b(grazie|prego|ok|perfetto|capito|ottimo|👍)\b/i,                         fn: _thanks },
    { re: /\b(aiuto|help|cosa (puoi|sai)|come funzion|presentati|cosa (fai|sei))\b/i, fn: _help },

    // ── Circolare SPECIFICA per argomento (prima dei match generici)
    { re: /\b(circolare|avviso|comunicazione)[^.!?]*\bpcto\b/i,                       fn: () => _circolareSu('pcto') },
    { re: /\bpcto\b[^.!?]*(circolare|avviso|comunicazione)/i,                         fn: () => _circolareSu('pcto') },
    { re: /\b(circolare|avviso)[^.!?]*(gita|viaggio|roma)\b/i,                        fn: () => _circolareSu('gita') },
    { re: /\b(circolare|avviso)[^.!?]*\bassemblea\b/i,                                fn: () => _circolareSu('assemblea') },
    { re: /\b(circolare|avviso)[^.!?]*(esame|maturit[àa])\b/i,                       fn: () => _circolareSu('esami') },
    { re: /\b(circolare|avviso)[^.!?]*\bscrutini\b/i,                                 fn: () => _circolareSu('scrutini') },
    { re: /\b(circolare|avviso)[^.!?]*(ricevimento|colloqui)\b/i,                     fn: () => _circolareSu('ricevimento') },
    { re: /\b(circolare|avviso)[^.!?]*\biscrizioni?\b/i,                              fn: () => _circolareSu('iscrizioni') },
    { re: /\b(circolare|avviso)[^.!?]*(libri|testo)\b/i,                              fn: () => _circolareSu('libri') },
    { re: /\b(circolare|avviso)[^.!?]*(sport|torneo)\b/i,                             fn: () => _circolareSu('sport') },
    { re: /\b(circolare|avviso)[^.!?]*(certificaz|cambridge|delf)\b/i,                fn: () => _circolareSu('certificaz') },
    { re: /\b(circolare|avviso)[^.!?]*(orario provvisorio|supplenz)\b/i,              fn: () => _circolareSu('orario') },
    { re: /\b(circolare|avviso)[^.!?]*(contributi|pagament|quota)\b/i,                fn: () => _circolareSu('contributi') },
    { re: /\b(circolare|avviso)[^.!?]*(consiglio di classe|riunione)\b/i,             fn: () => _circolareSu('consiglio') },

    // ── Circolare per numero (es. "circolare 040" / "circolare 045/2026")
    { re: /\b(?:circolare|avviso|n[°.]?\s*)(\d{3}(?:\/\d{4})?)\b/i,                  fn: (m) => _circolarePerId(m[1]) },

    // ── QUANDO è qualcosa?
    { re: /\b(quando|che (giorno|data|ora))[^.!?]*\bassemblea\b/i,                    fn: () => _quando('assemblea') },
    { re: /\b(quando|che (giorno|data|ora))[^.!?]*(gita|roma|viaggio)\b/i,            fn: () => _quando('gita') },
    { re: /\b(quando|che (giorno|data|ora))[^.!?]*(maturit[àa]|esame di stato|prima prova|seconda prova)\b/i, fn: () => _quando('esami') },
    { re: /\b(quando|che (giorno|data|ora))[^.!?]*\bscrutini\b/i,                     fn: () => _quando('scrutini') },
    { re: /\b(quando|che (giorno|data|ora))[^.!?]*\bricevimento\b/i,                  fn: () => _quando('ricevimento') },
    { re: /\b(quando|che (giorno|data|ora))[^.!?]*(open day|giornata di orientamento)\b/i, fn: () => _quando('open day') },
    { re: /\b(quando|che (giorno|data|ora))[^.!?]*(fine anno|ultimo giorno)\b/i,      fn: () => _quando('fine anno') },
    { re: /\b(quando|che (giorno|data|ora))[^.!?]*(saggio|teatro|spettacolo)\b/i,     fn: () => _quando('saggio') },

    // ── ORARIO per CLASSE (molto specifico — prima del generico)
    { re: /orario[^.!?]*\b([1-5][abcABC](?:\s*[a-z]{2,4})?)\b/i,                     fn: (m) => _orarioClasse(m[1]) },
    { re: /\b([1-5][abcABC](?:\s*[a-z]{2,4})?)\b[^.!?]*orario/i,                     fn: (m) => _orarioClasse(m[1]) },
    { re: /lezioni[^.!?]*\b([1-5][abcABC](?:\s*[a-z]{2,4})?)\b/i,                    fn: (m) => _orarioClasse(m[1]) },

    // ── CHI INSEGNA / PROF DI
    { re: /\b(chi insegna|chi è il prof(?:essore|essoressa)?|docente)[^.!?]*(matematica|fisica|italiano|inglese|storia|filosofia|biologia|chimica|informatica|arte)\b/i, fn: (m) => _profMateria(m[2]) },
    { re: /\b(prof(?:essore|essoressa)?)[^.!?]*(matematica|fisica|italiano|inglese|storia|filosofia|biologia|chimica|informatica|arte)\b/i, fn: (m) => _profMateria(m[2]) },

    // ── MATERIALE materia + classe insieme
    { re: /\b(matematica|fisica|italiano|inglese|storia|filosofia|biologia|chimica|informatica|arte|storia dell.arte)\b[^.!?]*\b([1-5][abcABC])\b/i, fn: (m) => _materialeMatClasse(m[1], m[2].toUpperCase()) },
    { re: /\b([1-5][abcABC])\b[^.!?]*\b(matematica|fisica|italiano|inglese|storia|filosofia|biologia|chimica|informatica|arte)\b/i,                 fn: (m) => _materialeMatClasse(m[2], m[1].toUpperCase()) },

    // ── ORARIO generico
    { re: /\b(orario|fasce orari[ae])\b/i,                                            fn: _orario },
    { re: /\b(lezioni (di )?oggi|cosa c.è oggi a scuola)\b/i,                         fn: _lezioniOggi },
    { re: /\b(lezioni di domani|domani a scuola)\b/i,                                 fn: _lezioniDomani },

    // ── Argomenti specifici (senza "circolare")
    { re: /\b(pcto|stage|tirocinio|alternanza scuola lavoro)\b/i,                     fn: () => _cerca('pcto') },
    { re: /\b(assemblea)\b/i,                                                          fn: () => _cerca('assemblea') },
    { re: /\b(maturit[àa]|esame di stato|prima prova|seconda prova)\b/i,             fn: () => _cerca('esami') },
    { re: /\b(gita|uscita didattica|viaggio)\b/i,                                     fn: () => _cerca('gita') },
    { re: /\b(ricevimento|colloqui genitori)\b/i,                                      fn: () => _cerca('ricevimento') },
    { re: /\b(scrutini?)\b/i,                                                          fn: () => _cerca('scrutini') },
    { re: /\b(chiusura|chiuso|festiv[aà]|vacanza)\b/i,                               fn: () => _cerca('chiusura') },
    { re: /\b(libr[io] di testo|adozion[ei])\b/i,                                     fn: () => _cerca('libri') },
    { re: /\b(iscrizioni?)\b/i,                                                        fn: () => _cerca('iscrizioni') },
    { re: /\b(certificaz|cambridge|delf)\b/i,                                          fn: () => _cerca('certificaz') },
    { re: /\b(sport|torneo)\b/i,                                                       fn: () => _cerca('sport') },
    { re: /\b(consigli di classe|riunione)\b/i,                                        fn: () => _cerca('consiglio') },
    { re: /\b(contributi|pagament)\b/i,                                                fn: () => _cerca('contributi') },
    { re: /\b(orientamento)\b/i,                                                       fn: () => _cerca('orientamento') },

    // ── Liste generiche
    { re: /\b(circolar[ei]|avvis[io]|comunicat[io]|ultime notizie|bacheca)\b/i,       fn: _showCircolari },
    { re: /\b(materiali?|appunti|dispens[ae]|schemi?|esercizi|risorse)\b/i,           fn: _showMateriali },
    { re: /\b(calendario|eventi?|prossim[io]|programma|agenda)\b/i,                   fn: _showEventi },

    // ── Materie singole
    { re: /\b(matematica)\b/i,              fn: () => _perMateria('Matematica') },
    { re: /\b(italian[oa]|letteratura)\b/i, fn: () => _perMateria('Italiano') },
    { re: /\b(fisica)\b/i,                  fn: () => _perMateria('Fisica') },
    { re: /\b(inglese|english)\b/i,         fn: () => _perMateria('Inglese') },
    { re: /\b(storia(?! dell))\b/i,         fn: () => _perMateria('Storia') },
    { re: /\b(filosofia)\b/i,               fn: () => _perMateria('Filosofia') },
    { re: /\b(biologia)\b/i,                fn: () => _perMateria('Biologia') },
    { re: /\b(chimica)\b/i,                 fn: () => _perMateria('Chimica') },
    { re: /\b(informatica)\b/i,             fn: () => _perMateria('Informatica') },
    { re: /\b(arte|storia dell.arte)\b/i,   fn: () => _perMateria("Storia dell'Arte") },

    // ── Classe singola
    { re: /\b([1-5][abcABC])\b/,            fn: (m) => _perClasse(m[1].toUpperCase()) },
  ];

  /* ═══════════════════════════════════════════
     DOM + MESSAGGI
  ═══════════════════════════════════════════ */
  const $ = id => document.getElementById(id);

  function _userMsg(text) {
    _ensureMessages();
    const div = document.createElement('div');
    div.className = 'chat-msg user-msg';
    div.innerHTML = `
      <div class="msg-avatar"><i class="fas fa-user"></i></div>
      <div class="msg-content">${_esc(text)}</div>`;
    $('chat-messages').appendChild(div);
    _scroll();
  }

  function _botMsg(html) {
    const msgs = $('chat-messages');
    const typing = document.createElement('div');
    typing.className = 'chat-msg bot-msg typing-msg';
    typing.innerHTML = `
      <div class="msg-avatar"><i class="fas fa-graduation-cap"></i></div>
      <div class="msg-content">
        <span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span>
      </div>`;
    msgs.appendChild(typing);
    _scroll();
    setTimeout(() => {
      typing.remove();
      const div = document.createElement('div');
      div.className = 'chat-msg bot-msg';
      div.innerHTML = `
        <div class="msg-avatar"><i class="fas fa-graduation-cap"></i></div>
        <div class="msg-content">${html}</div>`;
      msgs.appendChild(div);
      _scroll();
    }, 650);
  }

  function _ensureMessages() {
    if (_hasMessages) return;
    _hasMessages = true;
    $('chat-welcome').classList.add('hidden');
    $('chat-messages').classList.add('visible');
  }

  function _scroll() {
    const m = $('chat-messages');
    m.scrollTop = m.scrollHeight;
  }

  /* ═══════════════════════════════════════════
     ROUTING
  ═══════════════════════════════════════════ */
  function _processInput(text) {
    const t = text.trim();
    if (!t) return;
    _userMsg(t);
    const lower = t.toLowerCase();
    for (const p of PATTERNS) {
      const m = lower.match(p.re);
      if (m) { setTimeout(() => p.fn(m), 80); return; }
    }
    setTimeout(() => _notFound(t), 80);
  }

  /* ═══════════════════════════════════════════
     RISPOSTE META
  ═══════════════════════════════════════════ */
  function _greet() {
    const h = new Date().getHours();
    const s = h < 12 ? 'Buongiorno' : h < 17 ? 'Buon pomeriggio' : 'Buonasera';
    _botMsg(`${s}! 👋 Sono l'assistente del <strong>ITE Blaise Pascal di Foggia</strong>.<br>
      Puoi chiedermi qualcosa in modo naturale, ad esempio:<br>
      <ul style="margin-top:8px;padding-left:18px;line-height:2;font-size:.87rem">
        <li><em>"Dimmi la circolare che parla del PCTO"</em></li>
        <li><em>"Quando c'è l'assemblea?"</em></li>
        <li><em>"Materiali di fisica per la 4B"</em></li>
        <li><em>"Orario della 3A"</em></li>
      </ul>`);
  }

  function _thanks() { _botMsg('Prego! Sono qui se hai altre domande. 😊'); }

  function _help() {
    _botMsg(`Sono l'assistente del <strong>ITE Blaise Pascal</strong>. Puoi parlarmi in modo naturale — ecco cosa so fare:<br><br>
      <ul style="padding-left:18px;line-height:2.1;font-size:.88rem">
        <li>📋 Trovare e leggere una <strong>circolare specifica</strong><br>
            <em style="font-size:.8rem;color:var(--chat-muted)">Es: "la circolare sul PCTO", "circolare 040", "avviso sulla gita"</em></li>
        <li>📅 Dirti <strong>quando</strong> si svolge un evento<br>
            <em style="font-size:.8rem;color:var(--chat-muted)">Es: "quando è l'assemblea?", "che giorno è la maturità?"</em></li>
        <li>📚 Cercare <strong>materiali per materia e/o classe</strong><br>
            <em style="font-size:.8rem;color:var(--chat-muted)">Es: "materiali di matematica per la 5A"</em></li>
        <li>👨‍🏫 Dirti <strong>chi insegna</strong> una materia (dai materiali caricati)<br>
            <em style="font-size:.8rem;color:var(--chat-muted)">Es: "chi è il prof di fisica?"</em></li>
        <li>🕐 Indicarti <strong>quando</strong> si svolgono le attività scolastiche</li>
      </ul>`);
  }

  function _notFound(t) {
    _botMsg(`Non ho trovato informazioni su "<strong>${_esc(t)}</strong>".<br><br>
      Prova a riformulare, ad esempio:<br>
      <ul style="margin-top:6px;padding-left:18px;line-height:2;font-size:.86rem">
        <li><em>"la circolare sul PCTO"</em></li>
        <li><em>"quando è l'assemblea?"</em></li>
        <li><em>"orario della 3A"</em></li>
        <li><em>"materiali di matematica"</em></li>
        <li><em>"chi è il prof di fisica?"</em></li>
      </ul>`);
  }

  /* ═══════════════════════════════════════════
     CIRCOLARE SPECIFICA
  ═══════════════════════════════════════════ */

  /* Cerca la/le circolari su un argomento e mostra i dettagli completi */
  function _circolareSu(keyword) {
    const kw = keyword.toLowerCase();
    const found = _data.circolari.filter(c =>
      c.titolo.toLowerCase().includes(kw) || c.testo.toLowerCase().includes(kw)
    );
    if (!found.length) {
      _botMsg(`Non ho trovato circolari che riguardano "<strong>${_esc(keyword)}</strong>".`);
      return;
    }
    if (found.length === 1) {
      _botMsg(_dettaglioCircolare(found[0]));
    } else {
      let html = `Ho trovato <strong>${found.length}</strong> circolari sull'argomento:<br>`;
      found.forEach((c, i) => {
        html += (i === 0 ? _dettaglioCircolare(c) : _cardCircolareCompatta(c));
      });
      _botMsg(html);
    }
  }

  /* Cerca per numero (es. "040" o "040/2026") */
  function _circolarePerId(numStr) {
    const num = numStr.trim();
    const found = _data.circolari.find(c =>
      c.numero.includes(num) || c.numero.replace(/\/.*/, '') === num.replace(/\/.*/, '').padStart(3, '0')
    );
    if (!found) {
      _botMsg(`Non ho trovato la circolare n° <strong>${_esc(num)}</strong>.`);
      return;
    }
    _botMsg(_dettaglioCircolare(found));
  }

  /* Render completo di UNA circolare */
  function _dettaglioCircolare(c) {
    const classiTxt = c.classi.includes('tutte') ? 'Tutte le classi' : c.classi.join(', ');
    const destTxt   = c.destinatari.join(', ');
    const allegati  = c.allegati?.length
      ? `<p style="margin-top:10px;font-size:.81rem"><strong>📎 Allegati:</strong> ${c.allegati.map(a => _esc(a.nome)).join(', ')}</p>`
      : '';
    return `<p>Ho trovato la circolare. Ecco tutti i dettagli:</p>
      <div class="msg-card prio-${_esc(c.priorita)}" style="margin-top:8px">
        <div class="card-meta-row">
          <span class="card-num">${_esc(c.numero)}</span>
          <span class="card-date">${_fmtDate(c.data)}</span>
        </div>
        <h4 style="font-size:.95rem;margin-bottom:10px">${_esc(c.titolo)}</h4>
        <div style="font-size:.79rem;color:var(--chat-muted);display:flex;flex-direction:column;gap:3px;margin-bottom:10px">
          <span>✍️ <strong>Autore:</strong> ${_esc(c.autore)}</span>
          <span>👥 <strong>Destinatari:</strong> ${_esc(destTxt)}</span>
          <span>🏫 <strong>Classi:</strong> ${_esc(classiTxt)}</span>
        </div>
        <hr style="border:none;border-top:1px solid var(--border);margin-bottom:10px">
        <p style="font-size:.87rem;line-height:1.75;white-space:pre-line">${_esc(c.testo)}</p>
        ${allegati}
        <div class="card-tags" style="margin-top:10px">
          <span class="card-tag ${_esc(c.categoria)}">${_esc(c.categoria)}</span>
          <span class="card-tag">priorità ${_esc(c.priorita)}</span>
        </div>
      </div>`;
  }

  /* Card compatta per lista di circolari */
  function _cardCircolareCompatta(c) {
    return `<div class="msg-card prio-${_esc(c.priorita)}" style="margin-top:8px">
      <div class="card-meta-row">
        <span class="card-num">${_esc(c.numero)}</span>
        <span class="card-date">${_fmtDate(c.data)}</span>
      </div>
      <h4>${_esc(c.titolo)}</h4>
      <p class="card-preview">${_esc(c.testo)}</p>
      <div class="card-tags" style="margin-top:8px">
        <span class="card-tag ${_esc(c.categoria)}">${_esc(c.categoria)}</span>
        ${c.classi.map(cl => `<span class="card-tag">${_esc(cl)}</span>`).join('')}
      </div>
    </div>`;
  }

  /* ═══════════════════════════════════════════
     QUANDO È? (risposta in prosa)
  ═══════════════════════════════════════════ */
  function _quando(keyword) {
    const kw = keyword.toLowerCase();
    const oggi = _today();

    const ev = _data.eventi
      .filter(e => e.titolo.toLowerCase().includes(kw) || e.descrizione.toLowerCase().includes(kw))
      .sort((a, b) => a.data.localeCompare(b.data));
    const circ = _data.circolari.filter(c =>
      c.titolo.toLowerCase().includes(kw) || c.testo.toLowerCase().includes(kw)
    );

    if (!ev.length && !circ.length) {
      _botMsg(`Non ho trovato date specifiche per "<strong>${_esc(keyword)}</strong>" nel calendario scolastico.`);
      return;
    }

    if (ev.length) {
      const prossimo = ev.find(e => e.data >= oggi) || ev[0];
      const d = new Date(prossimo.data + 'T12:00:00');
      const gg = d.getDate();
      const mm = MONTHS_LONG[d.getMonth()];
      const aa = d.getFullYear();
      const ora = prossimo.oraInizio && prossimo.oraInizio !== '00:00'
        ? ` alle ore <strong>${_esc(prossimo.oraInizio)}</strong>` : '';
      const luogo = prossimo.luogo && prossimo.luogo !== '—'
        ? ` presso <strong>${_esc(prossimo.luogo)}</strong>` : '';
      const passato = prossimo.data < oggi ? ' <em>(già svolto)</em>' : '';

      let html = `📅 <strong>${_esc(prossimo.titolo)}</strong> si terrà il
        <strong>${gg} ${mm} ${aa}</strong>${ora}${luogo}.${passato}<br><br>
        <span style="font-size:.84rem;color:var(--chat-muted)">${_esc(prossimo.descrizione)}</span>`;

      if (ev.length > 1) {
        html += `<br><br>Ci sono altri <strong>${ev.length - 1}</strong> appuntamenti correlati nel calendario. Vuoi vederli tutti?`;
      }

      if (circ.length) {
        html += `<br><br>Ho trovato anche <strong>${circ.length}</strong> circolare/i sull'argomento — vuoi che te la legga?`;
      }

      _botMsg(html);
      return;
    }

    /* Solo circolari — estrai date dal testo */
    _botMsg(`Non ho una data precisa nel calendario, ma ho trovato informazioni nelle circolari:<br>` +
      _dettaglioCircolare(circ[0]));
  }

  /* ═══════════════════════════════════════════
     ORARIO PER CLASSE
  ═══════════════════════════════════════════ */
  const _DAYS_IT = ['Domenica','Lunedì','Martedì','Mercoledì','Giovedì','Venerdì','Sabato'];

  function _renderOrario(classe, orario) {
    const todayName = _DAYS_IT[new Date().getDay()];
    let html = `<p style="font-size:.84rem;margin-bottom:8px">Orario settimanale — classe <strong>${_esc(classe)}</strong> · <em>${_esc(orario.indirizzo)}</em></p>
      <div class="msg-orario">
        <div class="orario-grid">
          <div class="og-cell"></div>`;
    orario.settimana.forEach(day => {
      const isToday = day.giorno === todayName;
      html += `<div class="og-cell og-day${isToday ? ' og-today' : ''}">${_esc(day.giorno.slice(0,3).toUpperCase())}</div>`;
    });
    for (let h = 0; h < 6; h++) {
      html += `<div class="og-cell og-hour">${h+1}ª</div>`;
      orario.settimana.forEach(day => {
        const isToday = day.giorno === todayName;
        const slot = day.ore[h];
        if (slot) {
          const profShort = slot.p.replace(/Prof\.ssa?\s+/, '');
          html += `<div class="og-cell og-subject${isToday ? ' og-today' : ''}">
            <span class="os-name">${_esc(slot.m)}</span>
            <span class="os-prof">${_esc(profShort)} · ${_esc(slot.a)}</span>
          </div>`;
        } else {
          html += `<div class="og-cell og-subject${isToday ? ' og-today' : ''}"></div>`;
        }
      });
    }
    html += `</div></div>`;
    if (todayName !== 'Sabato' && todayName !== 'Domenica') {
      html += `<p style="font-size:.74rem;color:var(--chat-muted);margin-top:8px">💡 La colonna <strong>${_esc(todayName)}</strong> è evidenziata (oggi).</p>`;
    }
    return html;
  }

  function _orarioClasse(classeRaw) {
    const classe = classeRaw.trim().toUpperCase().replace(/\s+.*/,'');
    const orario = API.getOrario(classe);
    if (!orario) {
      const disp = API.getClassiOrario().join(', ');
      _botMsg(`Non ho l'orario per la classe <strong>${_esc(classe)}</strong>.<br>
        Classi disponibili: <strong>${_esc(disp)}</strong><br>
        Prova ad esempio: <em>"orario della 3A"</em>`);
      return;
    }
    _botMsg(_renderOrario(classe, orario));
  }

  function _orario() {
    const classi = API.getClassiOrario();
    _botMsg(`Ho gli orari settimanali completi per le seguenti classi:<br>
      <div class="card-tags" style="margin-top:8px;margin-bottom:10px">
        ${classi.map(c => `<span class="card-tag">${_esc(c)}</span>`).join('')}
      </div>
      Chiedi ad esempio: <em>"orario della 3A"</em> oppure <em>"lezioni 5A"</em>`);
  }

  function _lezioniOggi() {
    const today = _DAYS_IT[new Date().getDay()];
    if (today === 'Sabato' || today === 'Domenica') {
      _botMsg(`Oggi è <strong>${_esc(today)}</strong> — nessuna lezione! Buon weekend! 🎉`);
      return;
    }
    _botMsg(`Oggi è <strong>${_esc(today)}</strong>. Dimmi la classe per vedere le lezioni di oggi:<br>
      <em>"orario della 3A"</em> · <em>"lezioni 5A"</em><br><br>
      Classi disponibili: <strong>${API.getClassiOrario().join(', ')}</strong>`);
  }

  function _lezioniDomani() {
    const tomorrowIdx = (new Date().getDay() + 1) % 7;
    const tomorrow = _DAYS_IT[tomorrowIdx];
    if (tomorrow === 'Sabato' || tomorrow === 'Domenica') {
      _botMsg(`Domani è <strong>${_esc(tomorrow)}</strong> — nessuna lezione. Buon weekend! 🎉`);
      return;
    }
    _botMsg(`Domani è <strong>${_esc(tomorrow)}</strong>. Dimmi la classe per vedere le lezioni:<br>
      <em>"orario della 3A"</em> · <em>"lezioni 4A"</em><br><br>
      Classi disponibili: <strong>${API.getClassiOrario().join(', ')}</strong>`);
  }

  /* ═══════════════════════════════════════════
     CHI INSEGNA?
  ═══════════════════════════════════════════ */
  function _profMateria(materia) {
    const kw = materia.toLowerCase();
    const mats = _data.materiali.filter(m => m.materia.toLowerCase().includes(kw));
    if (!mats.length) {
      _botMsg(`Non ho informazioni sui docenti di <strong>${_esc(materia)}</strong> nei materiali disponibili.`);
      return;
    }
    const autori = [...new Set(mats.map(m => m.autore))];
    const nomeMateria = mats[0].materia;

    if (autori.length === 1) {
      _botMsg(`Dai materiali disponibili, il docente di <strong>${_esc(nomeMateria)}</strong> risulta essere <strong>${_esc(autori[0])}</strong>.<br><br>
        Ha caricato <strong>${mats.length}</strong> materiali:
        <ul style="margin-top:6px;padding-left:18px;font-size:.85rem;line-height:2">
          ${mats.map(m => `<li>${_esc(m.titolo)} <span style="color:var(--chat-muted)">(${_esc(m.classe)})</span></li>`).join('')}
        </ul>
        <span style="font-size:.77rem;color:var(--chat-muted)">Nota: info basata sui materiali caricati — potrebbe non essere esaustiva.</span>`);
    } else {
      _botMsg(`Per <strong>${_esc(nomeMateria)}</strong> risultano più docenti dai materiali disponibili:<br>
        <ul style="margin-top:8px;padding-left:18px;font-size:.86rem;line-height:2">
          ${autori.map(a => `<li><strong>${_esc(a)}</strong></li>`).join('')}
        </ul>
        <span style="font-size:.77rem;color:var(--chat-muted)">Dati basati sui materiali caricati.</span>`);
    }
  }

  /* ═══════════════════════════════════════════
     MATERIALI MATERIA + CLASSE
  ═══════════════════════════════════════════ */
  function _materialeMatClasse(materia, classe) {
    const kw = materia.toLowerCase();
    const exact = _data.materiali.filter(m =>
      m.materia.toLowerCase().includes(kw) && m.classe === classe
    );
    if (exact.length) {
      let html = `<p>Ho trovato <strong>${exact.length}</strong> materiali di <strong>${_esc(materia)}</strong> per la classe <strong>${_esc(classe)}</strong>:</p>
        <div class="msg-materials">`;
      exact.forEach(m => { html += _matCard(m); });
      html += '</div>';
      _botMsg(html);
      return;
    }
    /* Fallback: solo materia */
    const byMat = _data.materiali.filter(m => m.materia.toLowerCase().includes(kw));
    if (byMat.length) {
      let html = `Non ho materiali di <strong>${_esc(materia)}</strong> specifici per la <strong>${_esc(classe)}</strong>, ma ho trovato questi per altre classi:<br>
        <div class="msg-materials" style="margin-top:8px">`;
      byMat.forEach(m => { html += _matCard(m); });
      html += '</div>';
      _botMsg(html);
    } else {
      _botMsg(`Non ho trovato materiali di <strong>${_esc(materia)}</strong> per la classe <strong>${_esc(classe)}</strong>.`);
    }
  }

  /* ═══════════════════════════════════════════
     CERCA (argomento libero su circolari + eventi)
  ═══════════════════════════════════════════ */
  function _cerca(keyword) {
    const kw = keyword.toLowerCase();
    const circ = _data.circolari.filter(c =>
      c.titolo.toLowerCase().includes(kw) || c.testo.toLowerCase().includes(kw)
    );
    const oggi = _today();
    const ev = _data.eventi.filter(e =>
      (e.titolo.toLowerCase().includes(kw) || e.descrizione.toLowerCase().includes(kw)) &&
      e.data >= oggi
    ).sort((a, b) => a.data.localeCompare(b.data));

    if (!circ.length && !ev.length) {
      _botMsg(`Non ho trovato informazioni su "<strong>${_esc(keyword)}</strong>" nelle circolari o nel calendario.`);
      return;
    }

    let html = '';
    if (circ.length) {
      html += `<p>📋 ${circ.length === 1 ? 'Ho trovato una circolare' : `Ho trovato <strong>${circ.length}</strong> circolari`} su <strong>${_esc(keyword)}</strong>:</p>`;
      circ.forEach(c => { html += _cardCircolareCompatta(c); });
    }
    if (ev.length) {
      html += `<p style="margin-top:${circ.length ? 12 : 0}px">📅 ${ev.length === 1 ? 'Un evento' : `<strong>${ev.length}</strong> eventi`} in programma:</p>
        <div class="msg-events">`;
      ev.forEach(e => {
        const d = new Date(e.data + 'T12:00:00');
        const ora = e.oraInizio && e.oraInizio !== '00:00' ? ` · ore ${_esc(e.oraInizio)}` : '';
        html += `<div class="msg-event">
          <div class="event-date-box">
            <span class="eday">${d.getDate()}</span>
            <span class="emon">${MONTHS_ABBR[d.getMonth()]}</span>
          </div>
          <div class="event-info">
            <h4>${_esc(e.titolo)}</h4>
            <p>${_fmtDate(e.data)}${ora}${e.luogo && e.luogo !== '—' ? ' · ' + _esc(e.luogo) : ''}</p>
          </div>
        </div>`;
      });
      html += '</div>';
    }
    _botMsg(html);
  }

  /* ═══════════════════════════════════════════
     LISTE GENERICHE
  ═══════════════════════════════════════════ */
  function _showCircolari() {
    const list = _data.circolari.slice(0, 5);
    if (!list.length) { _botMsg('Nessuna circolare disponibile al momento.'); return; }
    let html = `<p>Ecco le ultime <strong>${list.length}</strong> circolari. Puoi chiedermi di una specifica scrivendo ad esempio <em>"dimmi la circolare sul PCTO"</em>.</p>
      <div class="msg-cards">`;
    list.forEach(c => {
      const ante = c.testo.length > 110 ? c.testo.slice(0, 110) + '…' : c.testo;
      html += `<div class="msg-card prio-${_esc(c.priorita)}">
        <div class="card-meta-row">
          <span class="card-num">${_esc(c.numero)}</span>
          <span class="card-date">${_fmtDate(c.data)}</span>
        </div>
        <h4>${_esc(c.titolo)}</h4>
        <p class="card-preview">${_esc(ante)}</p>
        <div class="card-tags">
          <span class="card-tag ${_esc(c.categoria)}">${_esc(c.categoria)}</span>
          <span class="card-tag">${_esc(c.autore)}</span>
          ${c.classi.includes('tutte') ? '<span class="card-tag">Tutte le classi</span>' : c.classi.map(cl => `<span class="card-tag">${_esc(cl)}</span>`).join('')}
        </div>
      </div>`;
    });
    html += '</div>';
    if (_data.circolari.length > 5) html += `<p style="margin-top:8px;font-size:.8rem;color:var(--chat-muted)">Totale: <strong>${_data.circolari.length}</strong> circolari. Chiedimi di una specifica per leggerla per intero.</p>`;
    _botMsg(html);
  }

  function _showEventi() {
    const oggi = _today();
    const list = _data.eventi.filter(e => e.data >= oggi).sort((a, b) => a.data.localeCompare(b.data)).slice(0, 6);
    if (!list.length) { _botMsg('Nessun evento in programma al momento.'); return; }
    let html = `<p>Ecco i prossimi <strong>${list.length}</strong> eventi. Puoi chiedermi <em>"quando è l'assemblea?"</em> per i dettagli.</p>
      <div class="msg-events">`;
    list.forEach(e => {
      const d = new Date(e.data + 'T12:00:00');
      const ora = e.oraInizio && e.oraInizio !== '00:00' ? `ore ${_esc(e.oraInizio)} · ` : '';
      html += `<div class="msg-event">
        <div class="event-date-box">
          <span class="eday">${d.getDate()}</span>
          <span class="emon">${MONTHS_ABBR[d.getMonth()]}</span>
        </div>
        <div class="event-info">
          <h4>${_esc(e.titolo)}</h4>
          <p>${ora}${_esc(e.luogo || '')}</p>
        </div>
      </div>`;
    });
    html += '</div>';
    _botMsg(html);
  }

  function _showMateriali() {
    const list = _data.materiali.slice(0, 5);
    if (!list.length) { _botMsg('Nessun materiale disponibile al momento.'); return; }
    let html = `<p>Ecco i materiali più recenti. Puoi cercare per materia, es. <em>"materiali di fisica"</em> o <em>"appunti 3A"</em>.</p>
      <div class="msg-materials">`;
    list.forEach(m => { html += _matCard(m); });
    html += `</div><p style="margin-top:8px;font-size:.8rem;color:var(--chat-muted)">Totale: <strong>${_data.materiali.length}</strong> materiali disponibili.</p>`;
    _botMsg(html);
  }

  function _perMateria(materia) {
    const list = _data.materiali.filter(m => m.materia.toLowerCase().includes(materia.toLowerCase()));
    if (!list.length) { _botMsg(`Non ho trovato materiali per <strong>${_esc(materia)}</strong>.`); return; }
    let html = `<p>Ho trovato <strong>${list.length}</strong> materiali di <strong>${_esc(materia)}</strong>:</p>
      <div class="msg-materials">`;
    list.forEach(m => { html += _matCard(m); });
    html += '</div>';
    _botMsg(html);
  }

  function _perClasse(classe) {
    const circ = _data.circolari.filter(c => c.classi.includes(classe) || c.classi.includes('tutte')).slice(0, 3);
    const mat  = _data.materiali.filter(m => m.classe === classe).slice(0, 4);
    const oggi = _today();
    const ev   = _data.eventi.filter(e => (e.classi.includes(classe) || e.classi.includes('tutte')) && e.data >= oggi).sort((a,b) => a.data.localeCompare(b.data)).slice(0,3);

    let html = `<p>Informazioni per la classe <strong>${_esc(classe)}</strong>:</p>`;
    if (circ.length) {
      html += `<p class="msg-section-label" style="margin-top:10px">📋 Circolari</p><div class="msg-cards">`;
      circ.forEach(c => { html += _cardCircolareCompatta(c); });
      html += '</div>';
    }
    if (mat.length) {
      html += `<p class="msg-section-label" style="margin-top:10px">📚 Materiali (${mat.length})</p><div class="msg-materials">`;
      mat.forEach(m => { html += _matCard(m); });
      html += '</div>';
    }
    if (ev.length) {
      html += `<p class="msg-section-label" style="margin-top:10px">📅 Prossimi eventi</p><div class="msg-events">`;
      ev.forEach(e => {
        const d = new Date(e.data + 'T12:00:00');
        html += `<div class="msg-event">
          <div class="event-date-box"><span class="eday">${d.getDate()}</span><span class="emon">${MONTHS_ABBR[d.getMonth()]}</span></div>
          <div class="event-info"><h4>${_esc(e.titolo)}</h4><p>${_fmtDate(e.data)}</p></div>
        </div>`;
      });
      html += '</div>';
    }
    if (!circ.length && !mat.length && !ev.length) {
      html += '<p style="color:var(--chat-muted);margin-top:8px">Nessuna informazione specifica trovata per questa classe.</p>';
    }
    _botMsg(html);
  }

  /* ═══════════════════════════════════════════
     HELPERS
  ═══════════════════════════════════════════ */
  function _matCard(m) {
    const fmt = (m.formato || '').toLowerCase();
    const cls = fmt.includes('pdf') ? 'pdf' : fmt.includes('ppt') ? 'pptx' : fmt.includes('doc') ? 'word' : 'other';
    const ico = fmt.includes('pdf') ? 'fa-file-pdf' : fmt.includes('ppt') ? 'fa-file-powerpoint' : fmt.includes('doc') ? 'fa-file-word' : 'fa-file';
    return `<div class="msg-material">
      <div class="mat-icon ${cls}"><i class="fas ${ico}"></i></div>
      <div class="mat-info">
        <h4>${_esc(m.titolo)}</h4>
        <p>${_esc(m.materia)} · Classe ${_esc(m.classe)} · ${_esc(m.autore)}</p>
      </div>
    </div>`;
  }

  function _esc(s) {
    return String(s)
      .replace(/&/g,'&amp;').replace(/</g,'&lt;')
      .replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
  }
  function _fmtDate(iso) {
    if (!iso) return '';
    const [y, m, d] = iso.split('-');
    return `${d}/${m}/${y}`;
  }
  function _today() { return new Date().toISOString().slice(0, 10); }

  /* ═══════════════════════════════════════════
     DARK MODE + SIDEBAR + INPUT
  ═══════════════════════════════════════════ */
  function _applyDark() {
    document.body.classList.toggle('dark-mode', _darkMode);
    const btn = $('dark-toggle');
    if (!btn) return;
    btn.querySelector('i').className = _darkMode ? 'fas fa-sun' : 'fas fa-moon';
  }

  function _setupInput() {
    const input = $('chat-input');
    const send  = $('chat-send');
    input.addEventListener('input', () => {
      input.style.height = 'auto';
      input.style.height = Math.min(input.scrollHeight, 180) + 'px';
      send.disabled = !input.value.trim();
    });
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); if (!send.disabled) _send(); }
    });
    send.addEventListener('click', _send);
  }

  function _send() {
    const input = $('chat-input');
    const text = input.value.trim();
    if (!text) return;
    input.value = '';
    input.style.height = 'auto';
    $('chat-send').disabled = true;
    _processInput(text);
  }

  /* ═══════════════════════════════════════════
     INIT
  ═══════════════════════════════════════════ */
  async function init() {
    _applyDark();
    try {
      const [c, m, e] = await Promise.all([API.getCircolari(), API.getMateriali(), API.getEventi()]);
      _data.circolari = c;
      _data.materiali = m;
      _data.eventi    = e;
    } catch { /* arrays vuoti — bot gestisce gracefully */ }

    $('new-chat-btn')?.addEventListener('click', () => {
      _hasMessages = false;
      $('chat-messages').innerHTML = '';
      $('chat-messages').classList.remove('visible');
      $('chat-welcome').classList.remove('hidden');
    });

    $('dark-toggle')?.addEventListener('click', () => {
      _darkMode = !_darkMode;
      localStorage.setItem('sh_darkmode', _darkMode);
      _applyDark();
    });

    _setupInput();
    $('chat-input')?.focus();
  }

  return { init };

})();

document.addEventListener('DOMContentLoaded', () => Chat.init());

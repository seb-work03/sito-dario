# Sito Dario Tana

Applicazione Next.js con CMS amministrativo, database Neon, media su Vercel Blob e invio email tramite Resend.

## Comandi

- `npm install`
- `npm run dev` — avvia il server di sviluppo
- `npm run typecheck` — verifica TypeScript
- `npm run lint` — verifica ESLint
- `npm run build` — build di produzione

## Configurazione Resend

1. Aggiungere e verificare `dariotana.it` nel pannello Resend, configurando i record DNS richiesti.
2. In Vercel, aprire **Project → Settings → Environment Variables**.
3. Inserire in Production, Preview e Development:
   - `RESEND_API_KEY`
   - `RESEND_FROM_EMAIL` (es. `Dario Tana <noreply@dariotana.it>`)
   - `CONTACT_NOTIFICATION_EMAIL` (es. `info@dariotana.it`)
4. Eseguire un nuovo deploy.

Il briefing contatti invia una notifica a Dario e una conferma al richiedente. La creazione di un admin invia al nuovo utente username e link di accesso, ma non comunica mai la password via email.

## Sicurezza amministrativa

- massimo 5 tentativi di login in 15 minuti per IP e username;
- sessioni JWT di 12 ore, revocate quando cambia la password o viene eliminato l'utente;
- protezione sia nel Proxy sia nelle pagine, API e Server Actions;
- upload limitati a 8 MB e normalizzati tramite Sharp;
- schema di sicurezza Neon creato automaticamente e in modo idempotente al primo utilizzo.

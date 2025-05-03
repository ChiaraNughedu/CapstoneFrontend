# 👑 Boutique Villas - Luxury Villas Management

Status: In Development

Boutique Villas è un'applicazione full-stack progettata per gestire e promuovere ville di lusso situate nella splendida Costa Smeralda. L'applicazione, oltre ad offrire diverse funzionalità per utenti e amministratori, consente all'utente non solo di accedere al servizio di booking diretto delle ville, ma anche di acquisire maggiori informazioni sul territorio su cui si trovano le ville, garantendo una scelta più consapevole per quanto riguarda le località di vacanza. Essendo un'applicazione rivolta ad un determinato target di clienti, ho scelto un'interfaccia semplice, elegante ed intuituva per la mia applicazione, in modo che il focus rimanesse comunque sul prodotto Ville di Lusso nonostante le informazioni e le funzionalità correlate. Lato Admin invece l'applicazione consente la piena gestione del sito, dalle prenotazioni ai prodotti, fino alla gestione degli articoli della sezione Blog.

## 🎇 Funzionalità Principali

### 🤸‍♀️ Per gli utenti:
- **Esplorazione delle ville**: Visualizza una lista di ville di lusso con dettagli come immagini, descrizioni, prezzi e località.
- **Prenotazioni**: Effettua prenotazioni per le ville selezionate, specificando le date di check-in e check-out.
- **Blog**: Leggi articoli informativi sulla Costa Smeralda, inclusi consigli su spiagge, ristoranti e attività.
- **Dettagli villa**: Visualizza informazioni dettagliate su ogni villa, incluse immagini aggiuntive e descrizioni.

### 👩‍🔧 Per gli amministratori:
- **Gestione delle Ville**: CRUD (Create, Read, Update, Delete) per le ville.
- **Gestione delle prenotazioni**: Visualizza e modifica le prenotazioni effettuate dagli utenti.
- **Gestione delle Categorie**: CRUD per le categorie associate alle ville.
- **Gestione del blog**: Crea, modifica o elimina articoli del blog per promuovere la Costa Smeralda e le ville.

- **Autenticazione e Autorizzazione**:
  - Autenticazione basata su JWT.
  - Gestione degli utenti e dei ruoli tramite Identity.


## 👓 Tecnologie utilizzate

- **Frontend**:
  - React.js: Libreria per la creazione di interfacce utente dinamiche.
  - React Router: Gestione delle rotte per la navigazione tra le pagine.
  - Redux Toolkit: Gestione dello stato globale dell'applicazione.
  - Bootstrap: Framework CSS per uno stile moderno e responsive.
  - React-Bootstrap: Componenti React basati su Bootstrap.
  - CSS Personalizzato per dettagli grafici più precisi.


- **Strumenti di sviluppo**:
  - Vite: Strumento di build veloce per applicazioni moderne.
  - ESLint: Linter per mantenere un codice pulito e coerente.

- **Backend**:
  - Linguaggio: C# 12.0
  - Framework: .NET 8
  - Database: SQL Server (Entity Framework Core)
  - Autenticazione: JWT (JSON Web Token)
  - Identity: ASP.NET Core Identity per la gestione di utenti e ruoli.
  - Swagger: Per la documentazione dell'API.
  - Dependency Injection: Per la gestione dei servizi.
  - CORS: Configurazione per consentire richieste da frontend esterni.



## ⚙️ Installazione

- Il file appsettings.json non è visibile nel repository pubblico e deve essere creato manualmente all'interno del progetto incollando il seguente modello: 

### Modello per appsettings.json

{
    "Logging": {
        "LogLevel": {
            "Default": "Information",
            "Microsoft.AspNetCore": "Warning"
        }
    },
    "AllowedHosts": "*",
    "ConnectionStrings": {
        "DefaultConnection": "Server=LAPTOP-F9379OP3\\SQLEXPRESS;Database=APIVILLE;User ID=sa;Password=sa;TrustServerCertificate=true"
    },

    "Jwt": {
        "Key": "t8RgS@9vC!aBz3kLpQmXcTz4wHnE$1GdP2rLuVy!KdXsMnTqFbGhZu",
        "Issuer": "luxuryvilla.api"
    }
}




## Segui questi passaggi per configurare e avviare l'applicazione in locale:

### Clona il repository
git clone 

#### Backend ---> link repository: <https://github.com/ChiaraNughedu/CapstoneApi>
cd backend
dotnet run

#### Frontend ---> link repository: <https://github.com/ChiaraNughedu/CapstoneFrontend>
cd frontend
npm install
npm run dev


## 🖥️ Editor utilizzati e consigliati

-**Backend**: Visual Studio 2022 (o superiori)
Offre strumenti avanzati per lo sviluppo di progetti ASP.NET Core, Entity Framework, debug e integrazione SQL Server.

-**Frontend**: Visual Studio Code
Perfetto per React, Redux Toolkit e sviluppo con Vite. Consigliati i plugin:
-ESLint
-Prettier
-React Dev Tools


## ✨ Licenze 

Questo progetto è sviluppato a scopo educativo come Capstone Finale del Corso Full Stack Developer FS0924 di Epicode.

## 🙇‍♀️ Developers

Chiara Giovanna Nughedu - Epicode Student FS0924 
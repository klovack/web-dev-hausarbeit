# web-dev-hausarbeit
Web-Anwendung zur Planung von amateurastronomischen Beobachtungssitzungen. Eine Sitzung weist dabei die folgenden Eingeschaften auf:
- Geplantes Datum
- Ort (Freitext)
- Geordnete Liste der zu beobachtenden Objekte (Freitext)

Die Clientseitige Anwendung (Public) kann an der Serverseitige Anwendung (Server) REST API anfordern.
Hier wird zurzeit nur Backend implementiert.

### Version
0.6.0

## Anwendung
```
npm install
node server/index.js
```

## Schnittstelle

#### Benutzer
```
POST /users/register
```

Benutzer einloggen
```
POST /users/authenticate
```

#### Sitzungen
```
GET /sitzungen
```

```
GET /sitzungen/:id
```

```
POST /sitzungen
```

```
PATCH /sitzungen/:id
```

```
DELETE /sitzungen/:id
```

## NPM Build Prozesse
- `npm run clean:public` löscht den Public Ordner
- `npm run clean:npm` löscht den NPM Ordner
- `npm run lint` lintet alle JS-Dateien im Projekt auf Grundlage der `.eslintrc.json`
- `npm run build` erzeugt das gesamte Projekt, dabei CSS- und JS-Dateien minifiziert
- `npm run debug` erzeugt das gesamte Projekt, dabei CSS- und JS-Dateien aber nicht minifiziert
- `npm run start` oder `npm start` startet den HTTP-Server an Port 8080 oder `npm run start --port=[Portnummer]` um den HTTP-Server Port zu spezifieren. Stellen Sie sicher, dass MongoDB schon im Hintergrund ausgeführt wird. Aufgrund der unterschiedlichen Installationen von MongoDB kann MongoDB als npm-build-prozess nicht ausgeführt werden.
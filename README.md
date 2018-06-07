# web-dev-hausarbeit
Web-Anwendung zur Planung von amateurastronomischen Beobachtungssitzungen. Eine Sitzung weist dabei die folgenden Eingeschaften auf:
- Geplantes Datum
- Ort (Freitext)
- Geordnete Liste der zu beobachtenden Objekte (Freitext)

Die Clientseitige Anwendung (Public) kann an der Serverseitige Anwendung (Server) REST API anfordern.
Hier wird zurzeit nur Backend implementiert.

### Version
0.4.0

## Anwendung
```
npm install
node server/index.js
```

## Schnittstelle

#### Benutzer
Benutzer sich anzumelden
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
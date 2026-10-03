export default function middleware(request) {
  const basicAuth = request.headers.get('authorization');

  if (basicAuth) {
    try {
      const authValue = basicAuth.split(' ')[1];
      const [user, pwd] = atob(authValue).split(':');

      const validUser = process.env.BASIC_AUTH_USER;
      const validPassword = process.env.BASIC_AUTH_PASSWORD;

      if (user === validUser && pwd === validPassword) {
        // Zugriff gestattet: Anfrage wird normal an die Website weitergeleitet
        return;
      }
    } catch (e) {
      // Fehler beim Dekodieren abfangen
    }
  }

  // Zugriff verweigert: Passwort-Abfrage im Browser auslösen
  return new Response('Zugriff verweigert', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Privater Entwicklungsbereich"',
    },
  });
}

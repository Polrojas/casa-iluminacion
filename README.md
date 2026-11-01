# Casa — iluminación para iPad

Una web app instalable, pensada para ejecutar tus atajos de iluminación desde un iPad. No requiere cuenta, servidor ni dependencias de compilación.

## 1. Ajustar los nombres de los atajos

Las siete escenas globales usan exactamente estos nombres:

- `Apagar todo`
- `Súper tenue`
- `Tenue`
- `Brillante`
- `Súper brillante`
- `Llegue a casa`
- `Cena`

Para cada ambiente, `app.js` genera por defecto los nombres con esta estructura:

```text
Living - Apagar
Vestidor - Trabajar
```

Si tus atajos se llaman de otro modo, modificá la función `shortcutName(room, action)` cerca del inicio de `app.js`. Los nombres siempre se envían con URL encoding mediante `encodeURIComponent`, por lo que se manejan correctamente espacios, acentos y `ñ`.

## 2. Publicar con HTTPS

Safari en iPad necesita un origen HTTPS para la instalación y para que el modo sin conexión funcione de forma confiable. Subí **el contenido de esta carpeta `Casa`** a cualquiera de estas opciones:

- **GitHub Pages:** repositorio público o privado con Pages activado; publicá desde la rama y carpeta elegidas.
- **Netlify / Cloudflare Pages / Vercel:** creá un sitio estático y arrastrá esta carpeta o conectá un repositorio. No hay comando de build.
- **Tu propio servidor:** serví estos archivos estáticos bajo un dominio con certificado TLS válido.

Comprobá en el iPad que la dirección empieza por `https://` y que carga `index.html`. No la abras como un archivo local: `file://` no permite el comportamiento de PWA esperado.

## 3. Instalar en el iPad

1. Abrí la URL HTTPS en **Safari** en el iPad.
2. Tocá Compartir.
3. Elegí **Agregar a pantalla de inicio**.
4. Confirmá el nombre **Casa** y tocá Agregar.
5. Abrí Casa desde su nuevo icono y otorgá cualquier confirmación que iPadOS muestre al abrir Atajos.

La app se abre en una ventana independiente y deja disponibles sus pantallas aunque se pierda la conexión después de la primera carga. Los botones envían una URL del tipo `shortcuts://run-shortcut?name=…`; el atajo correspondiente debe existir en ese mismo iPad y su nombre debe coincidir exactamente.

## Límites de iPadOS que conviene tener presentes

- Una web app no puede abrirse automáticamente al encender o desbloquear la pantalla. Para acceso inmediato, dejá **Casa** en el Dock o en la primera posición de la pantalla de inicio. El acceso al dispositivo sigue protegido por iPadOS.
- iPadOS puede pedir confirmación antes de pasar de Casa a Atajos. La web app no puede omitir esa decisión ni ejecutar el atajo silenciosamente.
- La página no controla HomeKit por sí misma: el control real queda en los Atajos configurados en el iPad.
- Las automatizaciones personales de Atajos son el camino apropiado para acciones basadas en hora, llegada o accesorios; sus condiciones y permisos los administra iPadOS.
- Safari puede vaciar datos de sitios usados muy poco o cambiar su comportamiento entre versiones. Conservá una copia de esta carpeta y de tus Atajos.

## Archivos

- `index.html`: punto de entrada y metadatos para iPadOS.
- `app.js`: escenas, ambientes, nombres de Atajos y navegación.
- `styles.css`: interfaz japandi cálida y adaptable al iPad.
- `manifest.webmanifest` y `sw.js`: instalación y disponibilidad sin conexión.
- `icon.svg`: icono de Casa.

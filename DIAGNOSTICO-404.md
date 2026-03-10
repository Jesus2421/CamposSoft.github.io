# 🔍 Diagnóstico de Error 404 en GitHub Pages

## 📋 Cómo Identificar el Archivo que Falta

### Paso 1: Abrir la Consola del Navegador

1. Ve a tu página en GitHub Pages: **https://jesus2421.github.io/CamposSoft.github.io/**
2. Presiona **F12** (o clic derecho → Inspeccionar)
3. Ve a la pestaña **Console** (Consola)
4. Busca líneas en **ROJO** que digan "404"

### Paso 2: Identificar el Archivo

El error dirá algo como:

```
Failed to load resource: the server responded with a status of 404 (Not Found)
https://jesus2421.github.io/CamposSoft.github.io/css/style.css
```

O:

```
GET https://jesus2421.github.io/CamposSoft.github.io/js/main.js 404 (Not Found)
```

**Copia la URL completa del archivo que da error y dímela.**

---

## 🔧 Posibles Causas y Soluciones

### Causa 1: Los archivos NO se subieron a GitHub

**Verificar:**
1. Ve a: https://github.com/Jesus2421/CamposSoft.github.io
2. Verifica que existan estas carpetas:
   - ✅ `css/`
   - ✅ `js/`
   - ✅ `Img/`
   - ✅ `CV/`

**Solución si faltan:**
```bash
cd /mnt/workspace/L4vo3PK5WqBceqPbAXANyZ6KerwgTgHEMg
git add .
git commit -m "Agregar archivos faltantes"
git push origin main
```

---

### Causa 2: Problema de Mayúsculas/Minúsculas

GitHub Pages es **case-sensitive** (distingue mayúsculas de minúsculas).

**Ejemplo de problema:**
- En tu HTML: `<img src="Img/yo.jpeg">`
- En GitHub: La carpeta se llama `img/` (minúscula)
- Resultado: ❌ 404 Error

**Verificar:**
```bash
# Ver nombres exactos de carpetas
ls -la
```

**Solución:**
Asegúrate de que los nombres en el HTML coincidan EXACTAMENTE con los nombres en GitHub.

---

### Causa 3: El archivo está en .gitignore por error

**Verificar:**
```bash
cat .gitignore
```

**Solución:**
Si `css/` o `js/` están en `.gitignore`, elimínalos de ahí.

---

### Causa 4: GitHub Pages no está activado o apunta a la rama incorrecta

**Verificar:**
1. Ve a: https://github.com/Jesus2421/CamposSoft.github.io/settings/pages
2. Verifica que:
   - Source: **Deploy from a branch**
   - Branch: **main** / **/ (root)**
   - Estado: **Your site is live at...**

**Solución:**
Si no está configurado, selecciona **main** y **/ (root)**, luego guarda.

---

### Causa 5: Caché del navegador

**Solución:**
1. Presiona **Ctrl + Shift + R** (Windows/Linux)
2. O **Cmd + Shift + R** (Mac)
3. Esto recarga la página sin caché

---

## 🚀 Comandos de Diagnóstico Rápido

Ejecuta estos comandos y dime los resultados:

```bash
# 1. Ver qué archivos están en el último commit
cd /mnt/workspace/L4vo3PK5WqBceqPbAXANyZ6KerwgTgHEMg
git ls-files

# 2. Ver el estado actual
git status

# 3. Ver si hay archivos sin subir
git diff --name-only

# 4. Ver el contenido de .gitignore
cat .gitignore
```

---

## 📞 Información que Necesito

Para ayudarte mejor, dime:

1. **¿Qué archivo exacto da el error 404?** (copia la URL completa de la consola)
2. **¿La página se ve en blanco o se ve parcialmente?**
3. **¿Qué ves cuando entras a https://github.com/Jesus2421/CamposSoft.github.io?** (¿están las carpetas css/, js/, Img/?)
4. **¿Cuándo hiciste el último `git push`?** (hace minutos, horas, días)

---

## ✅ Checklist de Verificación

- [ ] Abrí la consola del navegador (F12)
- [ ] Identifiqué el archivo que da 404
- [ ] Verifiqué que las carpetas existen en GitHub
- [ ] Verifiqué que GitHub Pages está activado
- [ ] Intenté recargar sin caché (Ctrl+Shift+R)

---

**Dime qué archivo específico da el error 404 y te ayudo a solucionarlo inmediatamente.** 🔧

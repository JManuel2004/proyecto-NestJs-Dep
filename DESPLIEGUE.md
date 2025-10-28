# 🚀 Guía de Despliegue - Proyecto NestJS

## ✨ OPCIÓN 1: Railway (LA MÁS FÁCIL - RECOMENDADA)

Railway es **GRATIS** y despliega tu proyecto en minutos automáticamente.

### Pasos:

1. **Crear cuenta en Railway** 
   - Ve a: https://railway.app
   - Registrate con GitHub (es gratis)

2. **Crear nuevo proyecto**
   - Click en "New Project"
   - Selecciona "Deploy from GitHub repo"
   - Conecta tu repositorio de GitHub
   - Selecciona este repositorio

3. **Agregar PostgreSQL**
   - En tu proyecto de Railway, click en "+ New"
   - Selecciona "Database" → "PostgreSQL"
   - Railway creará automáticamente la base de datos

4. **Configurar variables de entorno**
   - Click en tu servicio NestJS
   - Ve a "Variables"
   - Agrega estas variables (Railway auto-detectará algunas):
   
   ```
   DB_HOST=<Railway te dará esto automáticamente>
   DB_PORT=5432
   DB_USER=postgres
   DB_PASSWORD=<Railway te dará esto automáticamente>
   DB_NAME=railway
   JWT_SECRET=tu_secreto_super_seguro_aqui_cambialo
   PORT=3000
   NODE_ENV=production
   ```
   
   **NOTA:** Railway conecta automáticamente PostgreSQL, solo necesitas copiar las credenciales que te da.

5. **Desplegar**
   - Railway desplegará automáticamente
   - Te dará una URL pública (ej: `https://tu-app.up.railway.app`)
   - Tu API estará en: `https://tu-app.up.railway.app/api/v1`
   - Documentación Swagger: `https://tu-app.up.railway.app/docs`

6. **¡LISTO! 🎉**
   - Tu app ya está en producción
   - Se actualiza automáticamente con cada push a GitHub

---

## 🐳 OPCIÓN 2: Render (Alternativa Gratuita)

1. Ve a: https://render.com
2. Registrate gratis con GitHub
3. Click en "New +" → "Web Service"
4. Conecta tu repositorio
5. Configura:
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm run start:prod`
6. Click en "Advanced" y agrega:
   - Click en "Add Database" → PostgreSQL (gratis)
7. Agrega las variables de entorno (igual que Railway)
8. Click en "Create Web Service"

---

## 🌐 OPCIÓN 3: Vercel (Solo Frontend recomendado)

**NOTA:** Vercel es mejor para frontend. Para NestJS con PostgreSQL, usa Railway o Render.

---

## ☁️ OPCIÓN 4: AWS/Azure/GCP (Avanzado)

Si necesitas desplegar en servicios cloud profesionales, puedes usar:
- **AWS Elastic Beanstalk** (fácil para principiantes)
- **Azure App Service**
- **Google Cloud Run**

Pero requieren más configuración. Te recomiendo empezar con Railway.

---

## 📋 Checklist Antes de Desplegar

✅ Tu código está en GitHub
✅ Tienes un archivo `.env` con las variables (NO lo subas a GitHub)
✅ Tienes un archivo `.gitignore` que incluye `.env` y `node_modules`
✅ Has probado que tu app funciona localmente
✅ Has creado el Dockerfile (ya incluido)

---

## 🔒 Variables de Entorno Necesarias

```env
# Base de datos (Railway/Render te las darán automáticamente)
DB_HOST=localhost_o_url_de_railway
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=tu_password_seguro
DB_NAME=tu_database_name

# JWT
JWT_SECRET=genera_un_secreto_muy_seguro_aqui

# Servidor
PORT=3000
NODE_ENV=production
```

---

## 🆘 Ayuda

**Si tienes problemas:**
1. Revisa los logs en Railway/Render
2. Verifica que todas las variables de entorno estén configuradas
3. Asegúrate de que la base de datos esté conectada
4. Revisa que el puerto sea el correcto (3000)

**URLs importantes después del despliegue:**
- API: `https://tu-dominio.com/api/v1`
- Documentación: `https://tu-dominio.com/docs`
- Health check: `https://tu-dominio.com/api/v1/health` (si lo implementas)

---

## 💡 Recomendación Final

**USA RAILWAY** - Es la opción más fácil, rápida y completamente gratis para empezar. 
Todo se configura automáticamente y tienes tu app en producción en menos de 10 minutos.

¡Buena suerte! 🚀

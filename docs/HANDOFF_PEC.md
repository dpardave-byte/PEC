# Handoff PEC

## Propósito

Este archivo conserva el estado operativo del proyecto para continuidad entre Windows, Mac y Codex Cloud, sin depender del historial local de la app.

## Fuente de verdad

- Repositorio GitHub: `https://github.com/dpardave-byte/PEC.git`
- Rama operativa actual: `main`
- Script Apps Script asociado: `1n0S1hwtOiWKsaG3AK2sT_x1Mt3orOykHRI38ieS7BZe7elRFZjwVtu3U`

## Regla de sincronización

- El código y la documentación operativa se sincronizan con GitHub.
- El estado local de cada máquina no se sincroniza copiando `.codex`.
- En Mac o en otra superficie de Codex:
  1. clonar o actualizar el repo;
  2. leer `AGENTS.md`;
  3. leer este archivo;
  4. reautenticar herramientas locales si hace falta, por ejemplo `clasp`.

## Estado verificado al 2026-05-24

### Git

- Durante la fase de sincronización que originó este handoff, `main` estaba `ahead 6`.
- Los commits operativos que motivaron esa sincronización fueron:
  - `926b9f6` `fix: speed up PEC shared save and verify confirmed persistence`
  - `33ef4e1` `feat: enforce canonical PEC shared visor link rotation policy`
  - `1f52708` `fix: remove PEC daily user triggers on shutdown`
  - `baa6a70` `fix: disable PEC daily user email deliveries`
  - `ce82e3b` `fix: classify PEC admin email activity by real user changes`
  - `583e13f` `fix: improve PEC admin email user activity traceability`

### Apps Script

- Deployment activo verificado por `clasp deployments`:
  - `AKfycbwDO41v2ncg7p2rjvEjTCICeu8fJoAySOgSNAPe5arZnkK-gYtCH-FioX-jexhfW0k0 @98`
- Deployment legacy adicional publicado:
  - `AKfycbxLpfDE3-ttlXKlGgKto16_2RuLk5w1Kbpclf_BFtMQBdfUQZrZQomANDaZzIaeR2Yq @18`
- Drive Loader histórico:
  - `AKfycbzy7zIVOxGh0R_atZ91XQZhZB_SFdz4HqBYYem0gXHDPFytEc7YpqVF5fBliaX8JZGq @1`

### URLs operativas

- Visor compartido canónico esperado:
  - `https://script.google.com/macros/s/AKfycbwDO41v2ncg7p2rjvEjTCICeu8fJoAySOgSNAPe5arZnkK-gYtCH-FioX-jexhfW0k0/exec?view=visor`
- GitHub Pages público:
  - `https://dpardave-byte.github.io/PEC/visor_seguimiento_pec.html`
- Guía rápida pública:
  - `https://dpardave-byte.github.io/PEC/guia-rapida-visor-pec-dgppcs.html`

## Decisiones recientes importantes

1. Los envíos diarios a usuarios quedaron desactivados por código.
2. El resumen ejecutivo admin sigue siendo un flujo separado.
3. El guardado compartido del drawer debe cerrar solo cuando Apps Script confirma revisión y valores persistidos.
4. La rotación de URL del visor compartido debe manejarse como política operativa:
   - comunicar el enlace nuevo;
   - marcar el enlace anterior como legacy;
   - retirar el deployment viejo si la URL base cambió.

## Diferencia crítica repo vs Apps Script

- `git push` actualiza GitHub y el contexto compartido del proyecto.
- `git push` no publica el Web App de Apps Script.
- Cualquier cambio en:
  - `apps_script/Code.gs`
  - `apps_script/Visor.html`
  - `apps_script/appsscript.json`
  requiere publicación explícita en Apps Script con nueva versión/deployment.

## Archivos que Codex debe leer primero

- `AGENTS.md`
- `docs/HANDOFF_PEC.md`
- `CHECKLIST_OPERATIVO_VISOR_PEC.md`
- `apps_script/Code.gs`
- `apps_script/Visor.html`
- `visor_seguimiento_pec.html`

## No sincronizar entre máquinas

- `.codex/`
- `auth.json`
- `~/.clasprc.json`
- `*.sqlite`
- `*.sqlite-wal`
- caches
- temporales
- sesiones locales activas

## Próximo paso recomendado

1. Empujar los commits pendientes a GitHub.
2. En Mac, hacer `pull` del repo.
3. Revalidar `clasp deployments`.
4. Si se va a continuar trabajo de Apps Script, documentar en este archivo qué commits ya están publicados y cuáles no.

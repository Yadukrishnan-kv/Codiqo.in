import AuditLog from '../models/AuditLog.js'

const VERBS = {
  create: 'Created',
  update: 'Updated',
  delete: 'Deleted',
  toggle: 'Toggled',
  reorder: 'Reordered',
  login: 'Logged in',
}

function labelFor(item) {
  if (!item) return ''
  return item.title || item.name || item.label || item.question || item.siteName || item.email || item.invoiceNumber || ''
}

function buildSummary(action, moduleName, item) {
  const verb = VERBS[action] || action
  if (action === 'login') return verb
  if (action === 'reorder') return `${verb} ${moduleName}`
  const label = labelFor(item)
  return `${verb} ${moduleName}${label ? `: "${label}"` : ''}`
}

// Wraps a mutating route so every successful request is recorded without
// each controller having to know about audit logging. Monkey-patches
// res.json to capture the payload, then writes the entry once the response
// has actually been sent (res.on('finish')) so logging never delays or
// risks the real request.
export function auditLog(moduleName, action) {
  return (req, res, next) => {
    const originalJson = res.json.bind(res)
    res.json = (body) => {
      res.locals.auditBody = body
      return originalJson(body)
    }

    res.on('finish', () => {
      if (res.statusCode >= 400 || !req.admin) return
      const item = res.locals.auditBody?.data?.item || res.locals.auditBody?.data?.admin
      AuditLog.create({
        admin: req.admin._id,
        adminName: req.admin.name,
        action,
        module: moduleName,
        recordId: item?._id || item?.id || req.params.id || undefined,
        summary: buildSummary(action, moduleName, item),
        ip: req.ip,
      }).catch((err) => console.error('[audit] failed to record entry:', err.message))
    })

    next()
  }
}

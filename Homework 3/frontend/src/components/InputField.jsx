import { useId } from 'react'
import { useForm } from '../context/FormContext.js'

export default function InputField({ name, label, type = 'text', options = [], hint }) {
  const id = useId()
  const { values, updateField, errors, attempted, disabled } = useForm()
  const error = attempted ? errors[name] : null
  const describedBy = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(' ') || undefined
  const common = { id, name, disabled, 'aria-required': true, 'aria-invalid': Boolean(error), 'aria-describedby': describedBy }
  const feedback = <>{hint && <p className="field-hint" id={`${id}-hint`}>{hint}</p>}{error && <p className="field-error" id={`${id}-error`}>{error}</p>}</>
  if (type === 'checkbox-group') return <fieldset className="form-field" disabled={disabled} aria-describedby={describedBy} aria-invalid={Boolean(error)}><legend>{label}</legend>{options.map(([value, title]) => <label className="check-label" key={value}><input type="checkbox" checked={values[name].includes(value)} onChange={(event) => { const checked = event.target.checked; updateField(name, (previous) => checked ? [...previous, value] : previous.filter((item) => item !== value)) }} />{title}</label>)}{feedback}</fieldset>
  if (type === 'checkbox') return <div className="form-field"><label className="check-label" htmlFor={id}><input {...common} type="checkbox" checked={values[name]} onChange={(event) => updateField(name, event.target.checked)} />{label}</label>{feedback}</div>
  const change = (event) => updateField(name, event.target.value)
  return <div className="form-field"><label htmlFor={id}>{label}</label>{type === 'select' ? <select {...common} value={values[name]} onChange={change}>{options.map(([value, title]) => <option key={value} value={value}>{title}</option>)}</select> : type === 'textarea' ? <textarea {...common} rows={5} value={values[name]} onChange={change} /> : <input {...common} type={type} value={values[name]} onChange={change} />}{feedback}</div>
}

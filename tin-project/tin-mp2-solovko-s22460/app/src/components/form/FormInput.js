function FormInput(props) {
  const className = props.error === '' ? '' : 'error-input'
  const name = props.name
  const errorSpanId = 'error' + name[0].toUpperCase() + name.slice(1)

  return(
    <>
      <label htmlFor={props.name}>
        {props.label}:
        {props.required && <span className="required">*</span>}
      </label>
      <input
        type={props.type}
        className={className}
        name={props.name}
        id={props.name}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
      />
      <span id={errorSpanId} className="errors-text">{props.error}</span>
    </>
  )
}

export default FormInput
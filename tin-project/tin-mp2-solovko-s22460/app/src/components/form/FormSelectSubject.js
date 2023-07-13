import React from "react";

function FormSelectGrades(props) {
  const name = props.name
  const errorSpanId = 'error' + name[0].toUpperCase() + name.slice(1)


  return (
    <>
      <label htmlFor={props.name}>
        {props.label}:
        {props.required && <span className="required">*</span>}
      </label>
      <select id={props.name} name={props.name} value={props.value} onChange={props.onChange} required>
        <option value="">--- Choose subject ---</option>
        <option value="PE">PE</option>
        <option value="MAD">MAD</option>
        <option value="ASD">ASD</option>
      </select>
      <span id={errorSpanId} className="errors-text">{props.error}</span>
    </>
  )

}

export default FormSelectGrades
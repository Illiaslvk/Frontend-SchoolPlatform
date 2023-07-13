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
        <option value="">--- Choose grades ---</option>
          <option value="1" label="1">1</option>
          <option value="2" label="2">2</option>
          <option value="3" label="3">3</option>
          <option value="4" label="4">4</option>
          <option value="5" label="5">5</option>
        )}
      </select>
      <span id={errorSpanId} className="errors-text">{props.error}</span>
    </>
  )

}

export default FormSelectGrades
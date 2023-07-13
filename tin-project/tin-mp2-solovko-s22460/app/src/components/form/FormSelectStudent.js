import React from "react";

function FormSelectStudent(props) {
  const name = props.name
  const errorSpanId = 'error' + name[0].toUpperCase() + name.slice(1)

  return (
    <>
      <label htmlFor={props.name}>
        {props.label}:
        {props.required && <span className="required">*</span>}
      </label>
      <select id={props.name} name={props.name} value={props.value} onChange={props.onChange} required>
        <option value="">--- Choose student ---</option>
        {props.studs.map((option) =>
          <option key={option._id} value={option._id} label={option.firstName + " " + option.lastName}></option>
        )}
      </select>
      <span id={errorSpanId} className="errors-text">{props.error}</span>
    </>
  )

}

export default FormSelectStudent
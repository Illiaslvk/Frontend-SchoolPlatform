import { Link } from 'react-router-dom';
import FormMode from '../../helpers/formHelper'

function FormButtons(props) {

  const submitButtonLabel = props.formMode === FormMode.NEW ? 'Add' : 'Edit'

  return (
    <div className="form-buttons">
      <p id="errorsSummary" className="errors-text">{props.error}</p>
      <input className="form-button-submit" type="submit" value={submitButtonLabel} />
      <Link to={props.cancelPath} className="form-button-cancel">Cancel</Link>
    </div>
  )
}

export default FormButtons
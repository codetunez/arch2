import { ControlType, applyPropertyControls } from 'property-controls'
import { useSiteInformation } from '../hooks/useSiteInformation';


// TODO: Read data and implement form
const Form = ({data, type, ...props}) => {
  const newProps = {
    ...props,
    className: `${props.className}`
  }

  return (
      <div {...newProps}>Form implementation here</div>
  )
}

applyPropertyControls(Form, {
    data: {
      title: 'Data id',
      type: ControlType.String,
      required: true
    },
    type: {
        title: 'Form type',
        type: ControlType.String,
        required: true
    }
  });


Form.usage = `
  <Form />
`

export default Form;
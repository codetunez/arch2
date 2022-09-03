import { ControlType, applyPropertyControls } from 'property-controls'
import { useSiteInformation } from '../hooks/useSiteInformation';

const Button = ({text, ...props}) => {
  
  const {engine} = useSiteInformation();
  
  let frameworkClasses;
  
  if(engine === "bootstrap3") {
    frameworkClasses = "btn btn-primary";
  } else if(engine === "tailwind") {
    frameworkClasses = `bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`
  } else if(engine === "skeleton") {
    frameworkClasses = "button-primary";
  }
  
  const newProps = {
    ...props,
    className: `${props.className} ${frameworkClasses}`
  }

  return (
      <button {...newProps}>{text || props.children}</button>
  )
}

applyPropertyControls(Button, {
    text: {
      title: 'Button Text',
      type: ControlType.String,
      required: true
    }
  });


Button.usage = `
  <Button text="Button"/>
`

export default Button;
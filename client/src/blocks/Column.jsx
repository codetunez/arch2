import { ControlType, applyPropertyControls } from 'property-controls'
import { useSiteInformation } from '../hooks/useSiteInformation';

const Column = ({classes = '', ...props}, b) => {
  const {engine} = useSiteInformation();

  let frameworkClasses = null;

  if(engine === "bootstrap3") {
    frameworkClasses = "col";
  } else if(engine === "skeleton") {
      frameworkClasses = `six columns`
  }

    const newProps = {
      ...props,
      className: `${props.className} ${frameworkClasses}`
    }

    return (
      <div {...newProps} />
    )
};
  
applyPropertyControls(Column, {
    classes: {
        title: 'Classes',
        type: ControlType.String,
        required: true
    }
});

Column.usage = `
  <Column>Column</Column>
`;


export default Column;
import { ControlType, applyPropertyControls } from 'property-controls'
import { useSiteInformation } from '../hooks/useSiteInformation';

const Row = ({rowClasses = '', ...props}) => {

    const {engine} = useSiteInformation();
  
    let frameworkClasses;
  
    if(engine === "bootstrap3") {
      frameworkClasses = "row";
    } else if(engine === "skeleton") {
        // TODO: The following classes should be sent to children columns 
        // const gridMap = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve'];
        // const numberOfChildren = props.children.length;
        // const gridColumn = numberOfChildren === 1 ? gridMap[gridMap.length - 1] : gridMap[Math.floor(12 / numberOfChildren) - 1];  
        // childClasses = `${gridColumn} columns`
    }

    const newProps = {
      ...props,
      className: `${props.className} ${rowClasses} ${frameworkClasses || ''}`
    }
  
    return (
      <div {...newProps} />
    )
  }
  
applyPropertyControls(Row, {
  rowClasses: {
      title: 'Additional Row Classes',
      type: ControlType.String,
      required: true
  }
});

Row.usage = `
  <Row>Row</Row>
`

export default Row;
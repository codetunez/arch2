import { ControlType, applyPropertyControls } from 'property-controls'

const Heading = ({type, text, ...props}) => {
    switch(type) {
        case "H1":
            return <h1 {...props}>{text || props.children}</h1>
        case "H2":
            return <h2 {...props}>{text || props.children}</h2>
        case "H3":
            return <h3 {...props}>{text || props.children}</h3>
        case "H4":
            return <h4 {...props}>{text || props.children}</h4>
        case "H5":
            return <h5 {...props}>{text || props.children}</h5>
        case "H6":
            return <h6 {...props}>{text || props.children}</h6>
        default:
            return <h1 {...props}>{text || props.children}</h1>
    }
}

applyPropertyControls(Heading, {
    as: {
        title: 'Heading type',
        type: ControlType.Enum,
        options: ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'],
        required: true
    },
    text: {
        title: 'Heading Text',
        type: ControlType.String,
        required: true
    }
  });


Heading.usage = `
  <Heading text="heading!" />
`

export default Heading;
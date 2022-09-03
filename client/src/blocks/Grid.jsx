import { ControlType, applyPropertyControls } from 'property-controls'
import { Link } from '@theme-ui/components'

const Grid = ({gridClasses = '', ...props}) => {
  
  const newProps = {
    ...props,
    className: `${props.className} ${gridClasses} container`
  }
  return (
    <div {...newProps} />
  )
}


applyPropertyControls(Grid, {
  gridClasses: {
    title: 'Additional Grid Classes',
    type: ControlType.String,
    required: true
  }
});


// Grid.ARow = (props) => {
//   const newProps = {
//     ...props,
//     className: `${props.className} rowClass`
//   }
//   return (
//     <div {...newProps} />
//   )
// };


// applyPropertyControls(Grid.ARow, {
//   gridRowClasses: {
//     title: 'Additional Grid Classes',
//     type: ControlType.String,
//     required: true
//   }
// });

// Grid.usage = `
//   <Grid>
//     <Grid.ARow>sadasd</Grid.ARow>
//   </Grid>
// `

// export default Grid



// const Grid = ({gridClasses = '', ...props}) => {
//   const newProps = {
//     ...props,
//     a: 1,
//     className: `${props.className} ${gridClasses} container`
//   }
//   return (
//     <div {...newProps} />
//   )
// }

// Grid.Row = props => {
//   console.log(props);
//   const newProps = {
//     ...props,
//     className: `${props.className} rowClass`
//   }
//   return (
//     <div {...newProps}>logo</div>
//   )
// }


// applyPropertyControls(Grid, {
//   gridClasses: {
//     title: 'Additional Grid Classes',
//     type: ControlType.String,
//     required: true
//   }
// });

// applyPropertyControls(Grid.Row, {
//   gridRowClasses: {
//     title: 'Additional Grid Classes',
//     type: ControlType.String,
//     required: true
//   }
// });

Grid.usage = `
  <Grid>
    grid
  </Grid>
`

export default Grid


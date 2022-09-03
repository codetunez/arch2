import { ControlType, applyPropertyControls } from 'property-controls'

const Date = ({locale, ...props}) => {
  
    let currentDate = null;
    const currentLocale = locale ? locale : 'en-us';

    try {
        currentDate = new window.Date().toLocaleString(currentLocale)
    } catch (e) {
        currentDate = 'Invalid locale';
    }

    return (
        <>{currentDate}</>
    )
}

applyPropertyControls(Date, {
    locale: {
      title: 'Date Locale',
      type: ControlType.String,
      required: true,
      placeholder: 'en-us'
    }
  });


Date.usage = `
  <Date />
`

export default Date;
import { ControlType, applyPropertyControls } from 'property-controls';
import ReactHtmlParser from 'react-html-parser';
import * as library from 'library';
import useContentMap from '../hooks/useContentMap';
import {useSiteInformation} from '../hooks/useSiteInformation';

const Content = ({id, ...props}) => {
    const contentMap = useContentMap();
    const contentSnipperString = contentMap[id] || "";
    const {engine} = useSiteInformation();

    if(!engine) return null;

    const markup = library.content.resolveServer(contentSnipperString, contentMap)
    const resolvedMarkup = library.engines[engine](markup) || "";

    return (
        <>{ReactHtmlParser(resolvedMarkup)}</>
    )
}

applyPropertyControls(Content, {
    id: {
      title: 'Content snippet id',
      type: ControlType.String,
      required: true,
    }
});


Content.usage = `
  <Content id=""/>
`

export default Content;
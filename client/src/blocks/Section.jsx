import { ControlType, applyPropertyControls } from "property-controls";
import { useSiteInformation } from "../hooks/useSiteInformation";

const Section = ({ SectionClasses = "", ...props }) => {
  const { engine } = useSiteInformation();

  const newProps = {
    ...props,
    className: `${props.className} ${SectionClasses} section`,
  };
  return <div {...newProps}> {newProps.children} </div>;
};

applyPropertyControls(Section, {
  SectionClasses: {
    title: "Additional Section Classes",
    type: ControlType.String,
    required: true,
  },
});

Section.usage = `
            <Section>
                A section right here
            </Section>
            `;

export default Section;
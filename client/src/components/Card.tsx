import * as React from 'react';
import {
  DocumentCard,
  DocumentCardActivity,
  DocumentCardPreview,
  DocumentCardTitle,
  IDocumentCardPreviewProps,
} from '@fluentui/react/lib/DocumentCard';
import { ImageFit } from '@fluentui/react/lib/Image';
import { TestImages } from '@fluentui/example-data';

const previewProps: IDocumentCardPreviewProps = {
  previewImages: [
    {
      name: 'Revenue stream proposal fiscal year 2016 version02.pptx',
      linkProps: {
        href: 'http://bing.com',
        target: '_blank',
      },
      previewImageSrc: TestImages.documentPreview,
      iconSrc: TestImages.iconPpt,
      imageFit: ImageFit.cover,
      width: 318,
      height: 196,
    },
  ],
};
const DocumentCardActivityPeople = [{ name: 'Annie Lindqvist', profileImageSrc: TestImages.personaFemale }];

const getJSX=(repeat: number, data: any):JSX.Element[] =>{
  console.log(data);
  const fields: JSX.Element[] = [];
  for (let i = 0; i < repeat; i++) {
    fields.push(
      <div  style={{ display: "flex", flexDirection: "row",  margin: "8px"}}>
      <DocumentCard
        aria-label="Default Document Card with large file name. Created by Annie Lindqvist a few minutes ago."
        onClickHref="http://bing.com"
      >
        <DocumentCardPreview {...previewProps} />
        <DocumentCardTitle
          // title={
          //   'Large_file_name_with_underscores_used_to_separate_all_of_the_words_and_there_are_so_many_words_' +
          //   'it_needs_truncating.pptx'
          // }
          title={data[i]?.fileName}
          shouldTruncate
        />
        <DocumentCardActivity activity={data[i]?.dateModified} people={ [{ name: data[i]?.modifiedBy, profileImageSrc: TestImages.personaFemale }]} />
      </DocumentCard></div>);
      
  }
  return fields;
}

export const Card= (props) => (
  <div style={{display: "flex", flexDirection: "row", margin: "8px"}}>
    {getJSX(props.repeat, props.data)}
  </div>
  // <DocumentCard
  //   aria-label="Default Document Card with large file name. Created by Annie Lindqvist a few minutes ago."
  //   onClickHref="http://bing.com"
  // >
  //   <DocumentCardPreview {...previewProps} />
  //   <DocumentCardTitle
  //     title={
  //       'Large_file_name_with_underscores_used_to_separate_all_of_the_words_and_there_are_so_many_words_' +
  //       'it_needs_truncating.pptx'
  //     }
  //     shouldTruncate
  //   />
  //   <DocumentCardActivity activity="Created a few minutes ago" people={DocumentCardActivityPeople} />
  // </DocumentCard>
);

import React, {FC, useContext, useState} from 'react';
import { observer } from "mobx-react-lite";
import './DocsViewer.scss';
import {Document, Page} from 'react-pdf';
import {Context} from "../../index";
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

const DocsViewer: FC = () => {
  const { store } = useContext(Context);
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  return (
    <div>
      {store.current_document && <Document
        file={new Blob([new Uint8Array(store.current_document.pdf.data).buffer])}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
      </Document> }
    </div>
  )
}

export default observer(DocsViewer);

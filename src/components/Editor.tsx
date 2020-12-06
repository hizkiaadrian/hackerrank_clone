import React from 'react';
import AceEditor from 'react-ace';
import 'brace/mode/python'
import 'brace/theme/monokai'
import '../styles/Editor.css'
import EditorParameters from '../interfaces/EditorParameters.interface'
import Modal from 'react-modal';

const foldMainFunction = (editor: any) => {
  const lines: string[] = editor.session.doc.getAllLines();
  const startLine: number = lines.findIndex((x: string) => x==="if __name__ == \"__main__\":");
  editor.getSession().foldAll(startLine, lines.length);
}

const modalStyles = {
  content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      transform             : 'translate(-50%, -50%)',
      minWidth              : '500px'
  },
  overlay: {zIndex: 10}
};
Modal.setAppElement('#root')

function Editor({defaultValue}: EditorParameters) {
  const [modalIsOpen,setIsOpen] = React.useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={modalStyles}
      >

        <h2>List of libraries supported</h2>
        <button onClick={closeModal}>close</button>
      </Modal>
      <div className="editor">
        <div className="right-aligned-row">
          <button className="help-button" onClick={openModal}>?</button>
        </div>
        <div className="editor-wrapper">
        <AceEditor 
            mode="python"
            theme="monokai" 
            defaultValue={defaultValue}
            onLoad={foldMainFunction}
        />
        </div>
        <div className="right-aligned-row">
          <button onClick={() => console.log("Submitting")}>Submit</button>
          <span className="spacer"></span>
          <button onClick={() => console.log("Running code")}>Run Code</button>
        </div>
      </div>
    </>
  )
}

export default Editor;
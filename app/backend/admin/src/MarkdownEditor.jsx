import ReactMarkdown from 'react-markdown';

const MarkdownEditor = ({markdown, setMarkdown}) => {

  const handleMarkdownChange = (event) => {
    setMarkdown(event.target.value);
  };

  return (
    <div className="markdown-editor">
      <div className="editor-pane">
        <h2>Markdown Editor</h2>
        <textarea
          value={markdown}
          onChange={handleMarkdownChange}
          placeholder="Enter your Markdown here"
        />
      </div>
      <div className="preview-pane">
        <h2>Preview</h2>
        <div className="markdown-preview">
          <ReactMarkdown>{markdown}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default MarkdownEditor;

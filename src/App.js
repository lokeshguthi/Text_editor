// src/components/App.js
import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import LinkIcon from '@mui/icons-material/Link';
import ImageIcon from '@mui/icons-material/Image';
import CodeIcon from '@mui/icons-material/Code';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import TableChartIcon from '@mui/icons-material/TableChart';
import AttachmentIcon from '@mui/icons-material/Attachment';
import './App.css';

function App() {
  const [markdown, setMarkdown] = useState('');
  const textareaRef = useRef();
  const [charCount, setCharCount] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const [headingAnchorEl, setHeadingAnchorEl] = useState(null);
  const [showHeadingDropdown, setShowHeadingDropdown] = useState(false);

  const updateCounts = (text) => {
    const charCount = text.length;
    const wordCount = text.split(/\s+/).filter((word) => word !== '').length;

    setCharCount(charCount);
    setWordCount(wordCount);
  };

  useEffect(() => {
    textareaRef.current.focus();
    updateCounts(markdown);
  }, [markdown]);

  useEffect(() => {
    // Focus on the textarea when the component mounts
    textareaRef.current.focus();
  }, []);

  const handleSaveClick = () => {
    // Perform save operation (e.g., save to a file or API)
    alert('Content saved!');
  };

  const handleClearClick = () => {
    setMarkdown('');
  };

  const handleMarkdownChange = (event) => {
    setMarkdown(event.target.value);
  };

  const insertTextAtCursor = (text) => {
    const startPos = textareaRef.current.selectionStart;
    const endPos = textareaRef.current.selectionEnd;

    setMarkdown((prevMarkdown) => {
      const start = prevMarkdown.substring(0, startPos);
      const end = prevMarkdown.substring(endPos);

      return `${start}${text}${end}`;
    });
    textareaRef.current.focus();
  };

  const handleBoldClick = () => {
    const textarea = textareaRef.current;
    const selectedText = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);
  
    if (selectedText) {
      // Wrap the selected text with bold markdown syntax
      const boldText = `**${selectedText}**`;
  
      // Insert the modified text back into the textarea at the selected position
      insertTextAtCursor(boldText);
  
      // Move the cursor to the end of the inserted text
      setTimeout(() => {
        const cursorPos = textarea.selectionStart + boldText.length - 2;
        textarea.setSelectionRange(cursorPos, cursorPos);
        textarea.focus();
      }, 10);
    } else {
      // If no text is selected, insert the bold markdown syntax at the cursor position
      insertTextAtCursor('****');
  
      // Move the cursor between the two stars
      setTimeout(() => {
        const cursorPos = textareaRef.current.selectionStart - 2; // Adjusted here
        textareaRef.current.setSelectionRange(cursorPos, cursorPos);
        textareaRef.current.focus();
      }, 10);
    }
  };
  
  

  const handleItalicClick = () => {
    const textarea = textareaRef.current;
    const selectedText = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);
  
    if (selectedText) {
      // Wrap the selected text with bold markdown syntax
      const boldText = `*${selectedText}*`;
  
      // Insert the modified text back into the textarea at the selected position
      insertTextAtCursor(boldText);
  
      // Move the cursor to the end of the inserted text
      setTimeout(() => {
        const cursorPos = textarea.selectionStart + boldText.length - 1;
        textarea.setSelectionRange(cursorPos, cursorPos);
        textarea.focus();
      }, 10);
    } else {
      // If no text is selected, insert the bold markdown syntax at the cursor position
      insertTextAtCursor('**');
  
      // Move the cursor between the two stars
      setTimeout(() => {
        const cursorPos = textareaRef.current.selectionStart - 1; // Adjusted here
        textareaRef.current.setSelectionRange(cursorPos, cursorPos);
        textareaRef.current.focus();
      }, 10);
    }
  };
  
  // const handleListClick = (type) => {
  //   const listType = type === 'ordered' ? '1. ' : '- ';
  //   insertTextAtCursor(`\n${listType} List item`);
  // };

  const handleListClick = (type) => {
    let listType;
    let listSymbol;
  
    if (type === 'ordered') {
      listType = '1. ';
      listSymbol = '';
    } else {
      listType = '- ';
      listSymbol = '•'; 
    }
  
    insertTextAtCursor(`\n${listType} List item`, listSymbol);
  };
  

  const handleLinkClick = () => {
    insertTextAtCursor('[Link Text](https://example.com)');
  };

  const handleImageClick = () => {
    insertTextAtCursor('![Alt Text](https://example.com/image.jpg)');
  };

  const handleCodeBlockClick = () => {
    const textarea = textareaRef.current;
    const selectedText = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);
  
    if (selectedText) {
      // Wrap the selected text with bold markdown syntax
      const boldText = `${selectedText}`;
  
      // Insert the modified text back into the textarea at the selected position
      insertTextAtCursor(boldText);
  
      // Move the cursor to the end of the inserted text
      setTimeout(() => {
        const cursorPos = textarea.selectionStart + boldText.length - 1;
        textarea.setSelectionRange(cursorPos, cursorPos);
        textarea.focus();
      }, 10);
    } else {
      // If no text is selected, insert the bold markdown syntax at the cursor position
      insertTextAtCursor('``');
  
      // Move the cursor between the two stars
      setTimeout(() => {
        const cursorPos = textareaRef.current.selectionStart - 1; // Adjusted here
        textareaRef.current.setSelectionRange(cursorPos, cursorPos);
        textareaRef.current.focus();
      }, 10);
    }
  };

  const handleUndoClick = () => {
    textareaRef.current.focus();
    document.execCommand('undo', false, null);
  };

  const handleRedoClick = () => {
    textareaRef.current.focus();
    document.execCommand('redo', false, null);
  };

  const handleTableClick = () => {
    const tableText = `
    |   Header1    |   Header2     |   Header 3   |
    |  ----------- |  ----------   |   ---------  |
    | Row 1,Col 1  | Row 1,Col 2   | Row 1,Col 3  |
    | Row 2,Col 1  | Row 2,Col 2   | Row 2,Col 3  |
    | Row 3,Col 1  | Row 3,Col 2   | Row 3,Col 3  |
  `;
    insertTextAtCursor(tableText);
  };

  const handleInsertImageClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = handleImageInsert;
    input.click();
  };

  const handleImageInsert = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageData = `![Alt Text](${reader.result})`;
        insertTextAtCursor(imageData);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleHeadingSelect = (level) => {
    const newContent = `${'#'.repeat(level)} `;
    const textarea = textareaRef.current;
    const selectedText = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);
  
    insertTextAtCursor(newContent);
    setHeadingAnchorEl(null);
    if (selectedText) {
      // Wrap the selected text with bold markdown syntax
      const boldText = `${'#'.repeat(level)} ${selectedText} `
  
      // Insert the modified text back into the textarea at the selected position
      insertTextAtCursor(boldText);
  
      // Move the cursor to the end of the inserted text
      setTimeout(() => {
        const cursorPos = textarea.selectionStart + boldText.length - 1;
        textarea.setSelectionRange(cursorPos, cursorPos);
        textarea.focus();
      }, 10);
    } 
  };
  

  


  return (
    <div className="App">
      <div className="editor">
      <div className="toolbar">

      <div className="heading-dropdown">
  <IconButton onClick={(e) => setHeadingAnchorEl(e.currentTarget)}>
    <Typography variant="body1">H</Typography>
  </IconButton>

  <div className="heading-dropdown-content">
    {[1, 2, 3, 4, 5, 6].map((level) => (
      <MenuItem key={level} onClick={() => handleHeadingSelect(level)}>
        <Typography variant={`h${level}`}>{`H${level}`}</Typography>
      </MenuItem>
    ))}
  </div>
</div>

       




          <IconButton onClick={handleBoldClick}>
            <FormatBoldIcon />
          </IconButton>
          <IconButton onClick={handleItalicClick}>
            <FormatItalicIcon />
          </IconButton>
          <IconButton onClick={() => handleListClick('ordered')}>
            <FormatListNumberedIcon />
          </IconButton>
          <IconButton onClick={() => handleListClick('unordered')}>
            <FormatListBulletedIcon />
          </IconButton>
          <IconButton onClick={handleLinkClick}>
            <LinkIcon />
          </IconButton>
          <IconButton onClick={handleImageClick}>
            <ImageIcon />
          </IconButton>
          <IconButton onClick={handleCodeBlockClick}>
            <CodeIcon />
          </IconButton>
          <IconButton onClick={handleTableClick}>
            <TableChartIcon />
          </IconButton>
          <IconButton onClick={handleInsertImageClick}>
            <AttachmentIcon />
          </IconButton>
          <IconButton onClick={handleUndoClick}>
            <UndoIcon />
          </IconButton>
          <IconButton onClick={handleRedoClick}>
            <RedoIcon />
          </IconButton>
        </div>
      <div className="editor-container">
        <textarea ref={textareaRef} value={markdown} onChange={handleMarkdownChange} rows={10} cols={50} />
      </div>
      <div className="counts">
        <span>Characters: {charCount}</span>
        <span>Words: {wordCount}</span>
      </div>
      <div>
        <button onClick={handleSaveClick}>Save</button>
        <button onClick={handleClearClick}>Clear</button>
      </div>
      <ReactMarkdown>{markdown}</ReactMarkdown>
      </div>
    </div>
  );
}

export default App;
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
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

import Button from '@mui/material/Button';

import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

function App({ isOpen, onClose }) {
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
    textareaRef.current.focus();
  }, []);

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
      const boldText = `**${selectedText}**`;
      insertTextAtCursor(boldText);
      setTimeout(() => {
        const cursorPos = textarea.selectionStart + boldText.length - 2;
        textarea.setSelectionRange(cursorPos, cursorPos);
        textarea.focus();
      }, 10);
    } else {
      insertTextAtCursor('****');
      setTimeout(() => {
        const cursorPos = textareaRef.current.selectionStart - 2;
        textareaRef.current.setSelectionRange(cursorPos, cursorPos);
        textareaRef.current.focus();
      }, 10);
    }
  };



  const handleItalicClick = () => {
    const textarea = textareaRef.current;
    const selectedText = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);

    if (selectedText) {
      const boldText = `*${selectedText}*`;
      insertTextAtCursor(boldText);
      setTimeout(() => {
        const cursorPos = textarea.selectionStart + boldText.length - 1;
        textarea.setSelectionRange(cursorPos, cursorPos);
        textarea.focus();
      }, 10);
    } else {
      insertTextAtCursor('**');
      setTimeout(() => {
        const cursorPos = textareaRef.current.selectionStart - 1;
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
      const boldText = `${selectedText}`;
      insertTextAtCursor(boldText);
      setTimeout(() => {
        const cursorPos = textarea.selectionStart + boldText.length - 1;
        textarea.setSelectionRange(cursorPos, cursorPos);
        textarea.focus();
      }, 10);
    } else {
      insertTextAtCursor('``');
      setTimeout(() => {
        const cursorPos = textareaRef.current.selectionStart - 1;
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

  // const handleInsertImageClick = () => {
  //   const input = document.createElement('input');
  //   input.type = 'file';
  //   input.accept = 'image/*';
  //   input.onchange = handleImageInsert;
  //   input.click();
  // };

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
      const boldText = `${'#'.repeat(level)} ${selectedText} `
      insertTextAtCursor(boldText);
      setTimeout(() => {
        const cursorPos = textarea.selectionStart + boldText.length - 1;
        textarea.setSelectionRange(cursorPos, cursorPos);
        textarea.focus();
      }, 10);
    }
  };

  const [selectedFile, setSelectedFile] = useState(null);
  const [isImageUploadOpen, setImageUploadOpen] = useState(false);

  const handleFileDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      setSelectedFile(event.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (event) => {
    // You can implement file upload logic here
    console.log(event.target.files);
    // Close the modal after selecting the file
    setImageUploadOpen(false);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleUpload = () => {
    // Placeholder function for handling the file upload process
    console.log('Uploading', selectedFile);
    // Implement file upload logic here
  };

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100',
    minWidth: '500px',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 124,
    p: 4,
    textAlign: 'center',
    outline: 'none',
    display: 'flex',
    flexDirection: 'column',
  };

  const handleInsertImageClick = () => {
    // Open the modal for image upload
    setImageUploadOpen(true);
  };




  return (
    <div className="App">
      <div className="editor">
        <div className="toolbar">
          <div>  <Modal
          open={isImageUploadOpen}
          onClose={() => setImageUploadOpen(false)}
          aria-labelledby="image-upload-modal"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle} className="modalContent">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Insert Media
            </Typography>
            <div 
              className="fileDropArea"
              onDragOver={handleDragOver}
              onDrop={handleFileDrop}
            >
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Drop files to upload or
                <button 
                  className="fileInputButton" 
                  onClick={() => document.getElementById('file-input').click()}
                >
                  Select Files
                </button>
                <input
                  type="file"
                  id="file-input"
                  style={{ display: 'none' }}
                  onChange={handleFileSelect}
                  accept="image/*"
                />
              </Typography>
            </div>
            {/* Add more UI elements here as needed */}
          </Box>
        </Modal></div>

          <div className="heading-dropdown">
            <IconButton
              style={{ width: 50 }}
              onClick={(e) => setHeadingAnchorEl(e.currentTarget)}>
              <Typography variant="body1"><b>H</b></Typography>
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
          <textarea ref={textareaRef} value={markdown} onChange={handleMarkdownChange} rows={20} cols={20} />
        </div>
        <div className="counts">
          <span>Characters: {charCount}</span>
          <span>Words: {wordCount}</span>
        </div>
        <div className="clear">
          <button onClick={handleClearClick}>Clear</button>
        </div>
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </div>
    </div>
  );
}

export default App;
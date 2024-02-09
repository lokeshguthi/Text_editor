import React from 'react';
import ReactMarkdown from 'react-markdown';

const MarkdownRenderer = ({ source }) => {
  return <ReactMarkdown>{source}</ReactMarkdown>;
};

export default MarkdownRenderer;
import React from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { dark } from 'react-syntax-highlighter/dist/styles/prism';
import Block from './Block'

const Code = ({ children }) => (
  <Block title="Code">
    <SyntaxHighlighter language="jsx" style={dark} customStyle={{ margin: 0 }}>
      {children}
    </SyntaxHighlighter>
  </Block>
)

export default Code

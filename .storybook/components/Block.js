import React from 'react'

const wrapperStyle = {
  paddingBottom: '20px',
}

const titleStyle = {
  textTransform: 'uppercase',
  fontSize: '9px',
  letterSpacing: '2px',
  fontFamily: 'Roboto, Arial',
  color: '#999',
  paddingBottom: '5px',
  fontWeight: 'bold',
}

const contentStyle = {
  border: '1px solid #DDD',
}

const Block = ({ children, title }) => (
  <div style={wrapperStyle}>
    <div style={titleStyle}>{title}</div>
    <div style={contentStyle}>{children}</div>
  </div>
)

export default Block

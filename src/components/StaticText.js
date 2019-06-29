import React from 'react';

export default function StaticText(props) {
  const {
    fontSize = '1.2em',
    color = '#535457',
    opacity = '0.6',
    children,
    inline,
    style,
    onClick,
    className,
  } = props;
  const reqStyle = {
    fontSize,
    color,
    opacity,
    display: inline ? 'inline-block' : 'block',
    ...style,
  };
  return (
    <p className={className} onClick={onClick} style={reqStyle}>
      {children}
    </p>
  );
}

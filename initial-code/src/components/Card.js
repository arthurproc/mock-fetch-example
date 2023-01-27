import React from 'react'

function Card(props) {
  const {
    title = '',
    description = '',
    text = '',
    footer = ''
  } = props;
  return (
    <div className="card">
      <h5 className="card-header">{ title }</h5>
      <div className="card-body">
        <h5 className="card-title">{ description }</h5>
        <p className="card-text">{ text }</p>
        <div className="card-footer text-muted">
          { footer }
        </div>
      </div>
    </div>
  )
}

export default Card;

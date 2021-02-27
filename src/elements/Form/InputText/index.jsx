import React from 'react'
import propTypes from 'prop-types'
import schema from './schema'

import './index.scss'

export default function IndexText(props) {
  const {
    value,
    type,
    placeholder,
    name,
    prepend,
    append,
    outerClassName,
    inputClassName,
    errorResponse,
  } = props
  const [HasError, setHasError] = React.useState(null)
  let pattern = ''
  if (type === 'email') pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (type === 'tel') pattern = '[0-9]*'
  const onChange = (event) => {
    const target = {
      target: {
        name: name,
        value: event.target.value,
      },
    }

    if (type === 'email') {
      if (!pattern.test(event.target.value)) setHasError(errorResponse)
      else setHasError(null)
    }

    if (type === 'tel') {
      if (event.target.validity.valid) props.onChange(target)
    } else {
      props.onChange(target)
    }
  }

  return (
    <div className={[`input-text mb-3`, outerClassName].join(' ')}>
      <div className="input-group">
        {prepend && (
          <div className="input-group-prepend bg-gray-900">
            <span className="input-group-text">{prepend}</span>
          </div>
        )}
        <input
          type={type}
          name={name}
          className={[`form-control`, inputClassName].join(' ')}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
        />
        {append && (
          <div className="input-group-append bg-gray-900">
            <span className="input-group-text">{append}</span>
          </div>
        )}
        {HasError && <span className="error-helper">{HasError}</span>}
      </div>
    </div>
  )
}

IndexText.defaultProps = {
  type: 'text',
  pattern: '',
  placeholder: 'Please Type Here',
  errorResponse: 'Please match the requested format',
}

IndexText.propTypes = {
  name: propTypes.string.isRequired,
  value: propTypes.oneOfType([propTypes.number, propTypes.string]).isRequired,
  onChange: propTypes.func.isRequired,
  prepend: propTypes.oneOfType([propTypes.number, propTypes.string]),
  append: propTypes.oneOfType([propTypes.number, propTypes.string]),
  type: propTypes.string,
  placeholder: propTypes.string,
  outerClassName: propTypes.string,
  inputClassName: propTypes.string,
}

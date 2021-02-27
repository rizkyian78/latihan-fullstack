import React from 'react'
import propTypes from 'prop-types'

import './index.scss'
export default function InputFile(props) {
  const [FileName, setFileName] = React.useState('')
  const {
    value,
    accept,
    placeholder,
    name,
    prepend,
    append,
    outerClassName,
    inputClassName,
  } = props
  const refInputFile = React.useRef(null)
  const onChange = (event) => {
    setFileName(event.target.value)
    props.onChange({
      target: {
        name: event.target.name,
        value: event.target.files,
      },
    })
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
          accept={accept}
          ref={refInputFile}
          name={name}
          type="file"
          value={FileName}
          onChange={onChange}
        />
        {append && (
          <div className="input-group-append bg-gray-900">
            <span className="input-group-text">{append}</span>
          </div>
        )}
      </div>
    </div>
  )
}

InputFile.defaultProps = {
  placeholder: 'Please Type Here',
}

InputFile.propTypes = {
  name: propTypes.string.isRequired,
  accept: propTypes.string.isRequired,
  value: propTypes.string.isRequired,
  onChange: propTypes.func.isRequired,
  prepend: propTypes.oneOfType([propTypes.number, propTypes.string]),
  append: propTypes.oneOfType([propTypes.number, propTypes.string]),
  placeholder: propTypes.string,
  outerClassName: propTypes.string,
  inputClassName: propTypes.string,
}

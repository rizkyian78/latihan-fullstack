import React from 'react'
import propTypes from 'prop-types'
import { formatDate, countryCode } from 'helper/Common'
import { DateRange } from 'react-date-range'

import 'react-date-range/dist/styles.css' // main css file
import * as locales from 'react-date-range/dist/locale'
import 'react-date-range/dist/theme/default.css'
import './index.scss'
import IconCalendar from 'assets/images/Icons/ic_calendar.svg'

export default function Date(props) {
  const { value, placeholder, name } = props
  const [isShowed, setIsShowed] = React.useState(false)
  const [locale, setLocale] = React.useState('id')

  const refDate = React.useRef(null)
  const handleClickOutside = (e) => {
    if (refDate && !refDate.current.contains(e.target)) {
      setIsShowed(false)
    }
  }
  const localeOptions = Object.keys(locales)
    .map((key) => ({
      value: key,
      label: countryCode[key],
    }))
    .filter((item) => countryCode[item.value])
  const datePickerChange = (value) => {
    const target = {
      target: {
        value: value.selection,
        name,
      },
    }
    props.onChange(target)
  }
  const check = (focus) => {
    focus.indexOf(1) < 0 && setIsShowed(false)
  }
  const displayDate = `${
    value.startDate ? formatDate(value.startDate, locales[locale].code) : ''
  }${
    value.endDate ? ' - ' + formatDate(value.endDate, locales[locale].code) : ''
  }`
  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  })
  return (
    <div
      ref={refDate}
      className={['input-date mb-3', props.outerClassName].join(' ')}
    >
      <div className="input-group">
        <div className="input-group-prepend bg-gray-900">
          <span className="input-group-text">
            <img src={IconCalendar} alt="icon Calendar" />
          </span>
        </div>
        <input
          readOnly
          type="text"
          className="form-control"
          value={displayDate}
          placeholder={placeholder}
          onClick={() => setIsShowed(!isShowed)}
        />
        {isShowed && (
          <div className="date-range-wrapper">
            <select
              className="custom-select"
              size="1"
              onChange={(e) => setLocale(e.target.value)}
              defaultValue={locale}
            >
              {localeOptions.map((option, i) => {
                return (
                  <option value={option.value} key={i}>
                    {option.label}
                  </option>
                )
              })}
            </select>
            <DateRange
              classNames="calendar-edit"
              locale={locales[locale]}
              showSelectionPreview={true}
              editableDateInputs={true}
              onChange={datePickerChange}
              moveRangeOnFirstSelection={false}
              onRangeFocusChange={check}
              ranges={[value]}
              direction="horizontal"
            />
          </div>
        )}
      </div>
    </div>
  )
}

Date.propTypes = {
  value: propTypes.object,
  onChange: propTypes.func,
  placeholder: propTypes.string,
  outerClassName: propTypes.string,
}

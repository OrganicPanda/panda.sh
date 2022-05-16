import React from 'react'

const Range = ({ value, min, max, ...inputProps }) => {
  return (
    <div className='🐼-stack-row'>
      <div
        className='🐼-stack-inner'
        style={{
          alignItems: 'center'
        }}
      >
        <div className='🐼-stack-item'>
          <p className='🐼-text'>{min}</p>
        </div>
        <div className='🐼-stack-fr 🐼-stack-fr-1'>
          <input
            value={value}
            min={min}
            max={max}
            className='🐼-range'
            type='range'
            {...inputProps}
          />
        </div>
        <div className='🐼-stack-item'>
          <p className='🐼-text'>{max}</p>
        </div>
      </div>
    </div>
  )
}

export default Range

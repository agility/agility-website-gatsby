import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import ColoredScrollbars from '../coloredScrollbars'
import './select-c8.scss'
const RenderSelectC8 = ({ data, onChange, multipleSelect = false, className }, ref) => {
  const [showDropdown, setShowDropdown] = useState(false)
  const [selectedOption, setSelectedOption] = useState(null)
  const [options, setOptions] = useState({})
  const optionKeys = Object.keys(options).map(item => Number(item))

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref])
  useEffect(() => {
    setOptions(data.options)
    setSelectedOption(data.selectedOption)
  }, [data.options, data.selectedOption, data])
  const showScroll = () => {
    const items = document.querySelectorAll('.dropdown-menu-c8.show .list-inline')
    const h = 250
    Array.from(items).forEach(item => {
      if (h >= item.clientHeight) {
        item.parentElement.parentElement.classList.add('hide-scroll')
      } else {
        item.parentElement.parentElement.classList.remove('hide-scroll')
      }
    })
  }
  const toggleDropdown = (e) => {
    e.preventDefault()
    setShowDropdown(!showDropdown)
    setTimeout(() => {
      showScroll()
    }, 100)
  }

  const changeSelectedOption = optionKey => {
    const optionChoose = {}

    if (!multipleSelect) {
      setShowDropdown(false)
      setSelectedOption(optionKey)
      if (onChange) {
        optionChoose.name = data.name
        optionChoose.value = [optionKey]
      }
    } else {
      /* select multiple option */
      let selectedArray = [...selectedOption];

      if (optionKey === 1) { // choose option all topic
        selectedArray = [optionKey]
      } else {
        /* Check user choose or unchoose this select option */
        if (selectedArray.indexOf(optionKey) !== -1) {
          selectedArray.splice(selectedArray.indexOf(optionKey), 1)
          /* check if nothing selected => set select option all */
          if (selectedArray.length === 0) {
            selectedArray = [1]
          }
        } else {
          selectedArray.push(optionKey)
          /* Check if has option all => remove it */
          if (selectedArray.indexOf(1) !== -1) {
            selectedArray.splice(selectedArray.indexOf(1), 1)
          }
        }
      }

      setSelectedOption(selectedArray)
      optionChoose.name = data.name
      optionChoose.value = selectedArray
    }
    console.log(`optionChoose`, optionChoose)
    onChange(optionChoose)
  }

  return (
    <div className={'form-group form-select-c8 ' + className} ref={ref}>
      <div
        className={`dropdown shadow-none dropdown-select-c8 border-0 no-bg h-auto p-0 ps-rv ${showDropdown ? 'show' : ''}`}
      >
        <a
          className="dropdown-toggle form-control shadow-none text-decoration-none ps-rv"
          onClick={(e) => {
            toggleDropdown(e)
          }}
          href="null"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
        >
          <span className="filter-option d-block text-truncate">

            {/* Multiple selected option */}
            {multipleSelect && (
              <>
                {selectedOption && Array.isArray(selectedOption) &&
                  selectedOption.map((selected, index) => {
                    return <span>{options[selected]}{index !== selectedOption.length - 1 ? <span>, </span> : ''}</span>
                  })
                }
                {!selectedOption && `Please select ${data.name}`}
              </>
            )}

            {/* Single selected option */}
            {!multipleSelect &&
              <>
                {selectedOption ? options[selectedOption] : `Please select ${data.name}`}
              </>
            }
          </span>
          <span className="caret-c8">
            <span className="icomoon icon-down-menu"></span>
          </span>
        </a>
        <div
          className={`dropdown-menu dropdown-menu-c8 text-reset w-100 p-0 m-0 ${showDropdown ? 'show' : ''}`}
        >
          <ColoredScrollbars
            autoHeight
            autoHeightMin={0}
            autoHeightMax={1000}>
            <ul className="list-inline m-0">

              {optionKeys.map((optionKey, idx) => {
                return multipleSelect ? (

                  <li
                    key={idx}
                    className={`li-multi-box ps-rv ${selectedOption?.indexOf(optionKey) !== -1 ? 'active' : ''}`}
                    data-value={optionKey}
                    onClick={() => {
                      changeSelectedOption(optionKey)
                    }}
                  >
                    <span className={`sq-checkbox ${selectedOption?.indexOf(optionKey) !== -1 ? 'checked' : ''}`}></span>
                    <span>{options[optionKey]}</span>
                  </li>
                ) : (
                  <li
                    key={idx}
                    className={`${selectedOption[0] === optionKey ? 'active' : ''}`}
                    data-value={optionKey}
                    onClick={() => {
                      changeSelectedOption(optionKey)
                    }}
                  >
                    {options[optionKey]}
                  </li>
                )
              })}
            </ul>
          </ColoredScrollbars>
        </div>
      </div>
    </div>
  )
}
function SelectC8(props) {
  const wrapperRef = useRef(null)
  return RenderSelectC8(props, wrapperRef)
}

SelectC8.propTypes = {
  data: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
}

export default SelectC8

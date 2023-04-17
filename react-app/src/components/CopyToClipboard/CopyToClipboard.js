import { useState, useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import {CopyToClipboard as Copy} from 'react-copy-to-clipboard';
import { Popover, PopoverBody } from 'reactstrap';

const CopyToClipboard = ({text, content, index, textCopied}) => {
  const [copied, setCopied] = useState(false)
  // const id = Math.floor(Math.random() * 100000)

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false)
      }, 2000)
    }
  }, [copied])

  const onCopy = () => {
    setCopied(true)
  }

  return (
    <Fragment>
      <Copy
        text={content}
        onCopy={onCopy}
      >
        <button
          type="button"
          className="btn btn-sm btn-primary text-white mt-sm-0 mt-2 mx-sm-2 mx-0"
          disabled={copied}
          id={`CopyToClipboard${index}`}
        >
          {text}
        </button>
      </Copy>
      <Popover placement="bottom" isOpen={copied} target={`CopyToClipboard${index}`}>
        <PopoverBody>{textCopied}</PopoverBody>
      </Popover>
    </Fragment>
  )
}

export default CopyToClipboard

CopyToClipboard.defaultProps = {
  textCopied: "copied"
}

CopyToClipboard.propTypes = {
  text: PropTypes.string,
  content: PropTypes.string,
  index: PropTypes.number,
  textCopied: PropTypes.string,
}

import React from 'react'
import styled from 'styled-components'
import { space, color } from 'styled-system'

const Icon = ({ size, ...props }) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="currentcolor"
  >
    <path
      d="M12,16c-1.7,0-3-1.3-3-3c0-1.1,0.6-2.1,1.5-2.6l9.7-5.6l-5.5,9.6C14.2,15.3,13.2,16,12,16L12,16
	z M12,3c1.8,0,3.5,0.5,5,1.3l-2.1,1.2C14,5.2,13,5,12,5c-4.4,0-8,3.6-8,8c0,2.2,0.9,4.2,2.3,5.6l0,0c0.4,0.4,0.4,1,0,1.4
	c-0.4,0.4-1,0.4-1.4,0l0,0C3.1,18.3,2,15.8,2,13C2,7.5,6.5,3,12,3L12,3z M22,13c0,2.8-1.1,5.3-2.9,7.1l0,0c-0.4,0.4-1,0.4-1.4,0
	c-0.4-0.4-0.4-1,0-1.4l0,0c1.5-1.4,2.3-3.4,2.3-5.6c0-1-0.2-2-0.5-2.9L20.7,8C21.5,9.5,22,11.2,22,13z"
    />
  </svg>
)

const MileageIcon = styled(Icon)([], space, color)

MileageIcon.displayName = 'MileageIcon'

MileageIcon.defaultProps = {
  size: 24
}

export default MileageIcon

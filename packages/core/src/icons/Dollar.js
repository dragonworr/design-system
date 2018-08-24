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
      d="M12,10.9c-2.3-0.6-3-1.2-3-2.1C9,7.7,10,7,11.7,7c1.8,0,2.4,0.8,2.5,2.1h2.2c-0.1-1.7-1.1-3.3-3.2-3.8V3h-3v2.2
	C8.3,5.6,6.7,6.8,6.7,8.8c0,2.3,1.9,3.5,4.7,4.1c2.5,0.6,3,1.5,3,2.4c0,0.7-0.5,1.8-2.7,1.8c-2.1,0-2.9-0.9-3-2.1H6.5
	c0.1,2.2,1.8,3.4,3.7,3.8V21h3v-2.1c1.9-0.4,3.5-1.5,3.5-3.6C16.7,12.5,14.3,11.5,12,10.9z"
    />
  </svg>
)

const DollarIcon = styled(Icon)([], space, color)

DollarIcon.displayName = 'DollarIcon'

DollarIcon.defaultProps = {
  size: 24
}

export default DollarIcon

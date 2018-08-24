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
      d="M5.3,6.1C4.5,5.5,4.2,4.3,4.9,3.4c0.6-0.9,1.9-1.1,2.8-0.5c0.9,0.6,1.1,1.8,0.4,2.8
	C7.5,6.6,6.3,6.8,5.3,6.1L5.3,6.1z M16,19.5H8.9c-1.5,0-2.7-1.1-3-2.5L4,7.5H2l2,9.8c0.4,2.4,2.5,4.2,4.9,4.2H16V19.5z M16.2,15.5
	h-4.8l-1-4.1c1.6,0.9,3.3,1.5,5.2,1.2v-2.1c-1.8,0.3-3.6-0.3-4.8-1.3L9.1,8C8.9,7.8,8.7,7.7,8.4,7.6c-0.3-0.1-0.7-0.1-1-0.1l0,0
	c-1.2,0.2-2,1.4-1.8,2.6L7,16c0.2,1.5,1.4,2.5,2.8,2.5h6.9l3.8,3L22,20L16.2,15.5z"
    />
  </svg>
)

const SeatBusinessIcon = styled(Icon)([], space, color)

SeatBusinessIcon.displayName = 'SeatBusinessIcon'

SeatBusinessIcon.defaultProps = {
  size: 24
}

export default SeatBusinessIcon

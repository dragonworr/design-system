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
      d="M23,12l-2.4,2.7l0.3,3.5L17.3,19l-1.9,3L12,20.6L8.6,22l-1.9-3l-3.6-0.8l0.3-3.5L1,12l2.4-2.7
	L3.1,5.8L6.7,5l1.9-3L12,3.4L15.4,2l1.9,3l3.6,0.8l-0.3,3.5L23,12z M12.2,11.4c-1.3-0.3-1.8-0.7-1.8-1.3c0-0.6,0.6-1.1,1.6-1.1
	c1,0,1.4,0.5,1.5,1.2h1.3c0-1-0.7-1.9-1.9-2.2V6.7h-1.8V8C10,8.2,9.1,9,9.1,10.1c0,1.3,1.1,2,2.8,2.4c1.5,0.4,1.8,0.9,1.8,1.4
	c0,0.4-0.3,1-1.6,1c-1.2,0-1.7-0.5-1.8-1.2H9c0.1,1.3,1,2,2.2,2.2v1.3h1.8V16c1.1-0.2,2.1-0.9,2.1-2.1C15,12.3,13.6,11.7,12.2,11.4z
	"
    />
  </svg>
)

const DiscountIcon = styled(Icon)([], space, color)

DiscountIcon.displayName = 'DiscountIcon'

DiscountIcon.defaultProps = {
  size: 24
}

export default DiscountIcon

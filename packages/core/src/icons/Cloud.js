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
      d="M18.1,10C17.6,7.2,15,5,12,5C9.6,5,7.5,6.4,6.5,8.4C4,8.6,2,10.8,2,13.3c0,2.8,2.2,5,5,5h10.8
	c2.3,0,4.2-1.9,4.2-4.2C22,12,20.3,10.2,18.1,10z M17.8,16.7H7c-1.8,0-3.3-1.5-3.3-3.3S5.2,10,7,10h0.6C8.1,8.1,9.9,6.7,12,6.7
	c2.5,0,4.6,2.1,4.6,4.6v0.4h1.2c1.4,0,2.5,1.1,2.5,2.5S19.2,16.7,17.8,16.7z"
    />
  </svg>
)

const CloudIcon = styled(Icon)([], space, color)

CloudIcon.displayName = 'CloudIcon'

CloudIcon.defaultProps = {
  size: 24
}

export default CloudIcon

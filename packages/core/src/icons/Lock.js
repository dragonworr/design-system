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
      d="M18,9.5h-1v-2c0-2.8-2.2-5-5-5s-5,2.2-5,5v2H6c-1.1,0-2,0.9-2,2v8c0,1.1,0.9,2,2,2h12
	c1.1,0,2-0.9,2-2v-8C20,10.4,19.1,9.5,18,9.5z M12,17.5c-1.1,0-2-0.9-2-2s0.9-2,2-2s2,0.9,2,2S13.1,17.5,12,17.5z M15.1,9.5H8.9v-2
	c0-1.7,1.4-3.1,3.1-3.1s3.1,1.4,3.1,3.1V9.5z"
    />
  </svg>
)

const LockIcon = styled(Icon)([], space, color)

LockIcon.displayName = 'LockIcon'

LockIcon.defaultProps = {
  size: 24
}

export default LockIcon

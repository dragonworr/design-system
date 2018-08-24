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
      d="M19,13v-2c-1.5,0-3.1-0.8-4.1-1.8l-1.3-1.5c-0.1-0.1-0.3-0.3-0.6-0.4l0,0l0,0
	C12.7,7.1,12.2,7,11.8,7c-1,0.1-1.8,1-1.8,2.1V15c0,1.1,0.9,2,2,2h5v5h2v-5.5c0-1.1-0.9-2-2-2h-3v-3.4C15.3,12.1,17.2,13,19,13z
	 M12.8,18h2.1c-0.5,2.3-2.5,4-4.9,4c-2.8,0-5-2.2-5-5c0-2.4,1.7-4.4,4-4.9v2.1c-1.2,0.4-2,1.5-2,2.8c0,1.7,1.3,3,3,3
	C11.3,20,12.4,19.2,12.8,18z M12,6c-1.1,0-2-0.9-2-2s0.9-2,2-2s2,0.9,2,2S13.1,6,12,6z"
    />
  </svg>
)

const AccessibleIcon = styled(Icon)([], space, color)

AccessibleIcon.displayName = 'AccessibleIcon'

AccessibleIcon.defaultProps = {
  size: 24
}

export default AccessibleIcon

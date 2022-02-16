import React from 'react'
import { InferProps } from 'prop-types'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { Box } from '../Box'
import { Card } from '../Card'
import { Flex } from '../Flex'
import { Text } from '../Text'
import { applyVariations, deprecatedColorValue } from '../utils'

const HugCard = styled(Card)`
  overflow: hidden;
  ${applyVariations('Hug')}
`

const BorderConcealer = styled(Box)`
  & > * {
    border: 0 !important;
  }
`

const propTypes = {
  iconDisplay: PropTypes.arrayOf(PropTypes.string),
  icon: PropTypes.node,
  text: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node), PropTypes.string]),
  color: deprecatedColorValue(),
  borderWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  fontSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

const Hug: React.FC<InferProps<typeof propTypes>> = ({
  bg,
  color,
  p,
  fontSize,
  icon,
  iconDisplay,
  ...props
}) => {
  let iconClone

  if (React.isValidElement(icon)) {
    iconClone = React.cloneElement(icon, {
      style: { display: iconDisplay },
      mr: 2,
      mt: '-2px',
      mb: '2px',
      size: 24,
    })
  }

  return (
    <HugCard {...props} borderColor={bg || color}>
      <Flex bg={bg} color={color} p={p} pl='12px' alignItems='center'>
        {!!iconClone && iconClone}
        <Text fontSize={fontSize}>{props.text}</Text>
      </Flex>
      <BorderConcealer>{props.children}</BorderConcealer>
    </HugCard>
  )
}

Hug.defaultProps = {
  borderRadius: 'xl',
  borderWidth: 1,
  color: 'text.lightest',
  fontSize: 1,
  p: 2,
}

Hug.propTypes = propTypes

export default Hug
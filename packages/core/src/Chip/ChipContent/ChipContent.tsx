import React from 'react'
import PropTypes, { InferProps } from 'prop-types'
import styled from 'styled-components'
import styledSystemPropTypes from '@styled-system/prop-types'
import { ArrowRight } from 'pcln-icons'
import { ChipContentWrapper } from '../ChipContentWrapper'
import { getPaletteColor } from '../../utils'
import { Flex } from '../../Flex'
import { Text } from '../../Text'

const ImageWrapper = styled(Flex)`
  background-color: ${getPaletteColor('background.lightest')};
  border-radius: ${({ theme }) => theme.radii[2]}px;
  ${({ disabled }) => disabled && 'opacity: .33;'}
`

const propTypes = {
  ...styledSystemPropTypes.space,
  ...styledSystemPropTypes.fontSize,
  id: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  selected: PropTypes.bool,
  facet: PropTypes.string,
  label: PropTypes.string,
  bridgeLabel: PropTypes.string,
  BridgeIcon: PropTypes.node,
  Icon: PropTypes.node,
  IconTitle: PropTypes.string,
  action: PropTypes.shape({
    Icon: PropTypes.node,
    title: PropTypes.string,
  }),
  Image: PropTypes.object,
}

const ChipContent: React.FC<InferProps<typeof propTypes>> = ({
  disabled = undefined,
  selected = undefined,
  children = undefined,
  label = undefined,
  /* eslint-disable @typescript-eslint/naming-convention */
  Icon = undefined,
  /* eslint-disable @typescript-eslint/naming-convention */
  IconTitle = undefined,
  facet = undefined,
  action = undefined,
  image = undefined,
  size = undefined,
  bridgeLabel = undefined,
  /* eslint-disable @typescript-eslint/naming-convention */
  BridgeIcon = undefined,
  ...props
}) => (
  <ChipContentWrapper
    data-testid='chipContentWrapper'
    hasChildren={Boolean(children)}
    disabled={disabled}
    selected={selected}
    size={size}
    {...props}
  >
    {children}
    {Boolean(image) && <ImageWrapper disabled={disabled}>{image}</ImageWrapper>}
    {Boolean(Icon) && <Icon title={IconTitle} size='20px' />}
    {Boolean(label) && (
      <Text regular ml={Boolean(Icon) || Boolean(image) ? 2 : 0}>
        {label}
      </Text>
    )}
    {Boolean(facet) && (
      <Text regular ml={1}>
        {facet}
      </Text>
    )}
    {Boolean(bridgeLabel) && <BridgeIcon title='to' size='16px' ml={2} />}
    {Boolean(bridgeLabel) && (
      <Text regular ml={2}>
        {bridgeLabel}
      </Text>
    )}
    {Boolean(action?.Icon) && action.title && <action.Icon title={action.title} size='16px' ml={2} />}
  </ChipContentWrapper>
)

ChipContent.displayName = 'Chip'

ChipContent.propTypes = propTypes
ChipContent.defaultProps = {
  BridgeIcon: ArrowRight,
  size: 'sm',
  color: 'primary',
  py: 1,
  m: 0,
}

export default ChipContent

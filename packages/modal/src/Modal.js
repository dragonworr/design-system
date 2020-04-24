import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Transition } from 'react-transition-group'
import { color, width, height } from 'styled-system'
import { DialogOverlay, DialogContent } from '@reach/dialog'
import { Box, CloseButton, deprecatedPropType, Flex } from 'pcln-design-system'

const OVERLAY_ANIMATION = transitionState => `
  opacity: 0;
  transition: opacity .5s cubic-bezier(0.50, 0.00, 0.25, 1.00);
  ${transitionState === 'entering' ? `opacity: 0;` : ''}
  ${transitionState === 'entered' ? `opacity: 1;` : ''}
  ${transitionState === 'exiting' ? `opacity: 0;` : ''}
  ${transitionState === 'exited' ? `opacity: 0;` : ''}
`

const DIALOG_ANIMATION = transitionState => `
  transform: scale(0.5);
  transition: transform .5s cubic-bezier(0.50, 0.00, 0.25, 1.00);
  ${transitionState === 'entering' ? `transform: scale(0.5);` : ''}
  ${transitionState === 'entered' ? `transform: scale(1);` : ''}
  ${transitionState === 'exiting' ? `transform: scale(0.5);` : ''}
  ${transitionState === 'exited' ? `transform: scale(0.5);` : ''}
`

const getAnimation = ({
  transitionstate,
  defaultAnimation,
  customAnimation = null
}) =>
  typeof customAnimation === 'function'
    ? customAnimation(transitionstate)
    : defaultAnimation(transitionstate)

const Overlay = styled(DialogOverlay)`
  background-color: rgba(0, 0, 0, 0.7);
  bottom: 0;
  left: 0;
  overflow-y: auto;
  position: fixed;
  right: 0;
  top: 0;
  ${props => `
    z-index: ${props.zindex || 100};
    font-family: ${props.theme.font};
    line-height: ${props.theme.lineHeights?.standard};
    font-weight: ${props.theme.fontWeights?.medium};
  `}
  * {
    box-sizing: border-box;
  }
  ${getAnimation};
`

const Dialog = styled(DialogContent)`
  ${color} 
  ${width}
  ${height}
  position: relative;
  margin-left: auto;
  margin-right: auto;
  box-shadow: ${props => props.theme.boxShadows[3]};
  &:focus {
    outline: none;
  }
  ${props =>
    !props.fullScreen
      ? `
    max-height: 100vh;
    max-width: calc(100vw - 32px);
  `
      : `
    width: 100vw;
    height: 100vh;
  `}
  ${props =>
    props.enableoverflow &&
    `
    max-height: none;
  `}
  ${getAnimation}
`

const HeaderWrapper = styled.div`
  flex-shrink: 0;
`

const FloatCloseButton = styled(CloseButton)`
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 2;

  svg {
    vertical-align: top;
  }

  &:focus {
    background-color: ${props => props.theme.colors.borderGray};
    outline: none;
  }
`

const ContentWrapper = styled(Box)`
  position: relative;
  ${props => {
    if (!props.enableoverflow) {
      return `
        overflow-y: auto;
        overflow-x: hidden;
        height: 100%;
        -webkit-overflow-scrolling: touch;
      `
    }
  }}
`

const OverlayWrapper = styled.div`
  display: table;
  height: 100%;
  width: 100%;
`

const DialogWrapper = styled(Box)`
  display: table-cell;
  vertical-align: ${({ verticalAlignment }) => verticalAlignment};
  position: relative;
  height: 100%;
  ${props =>
    props.enableoverflow &&
    `
    padding-top: 24px;
    padding-bottom: 24px;
  `};
`

const DialogInnerWrapper = styled(Flex)`
  position: relative;
  height: 100%;
`

const Modal = ({
  isOpen,
  onClose,
  bg,
  zIndex,
  children,
  imgMode,
  width,
  className,
  header,
  disableCloseButton,
  enableOverflow,
  height,
  timeout,
  dialogAnimation,
  overlayAnimation,
  fullScreen,
  verticalAlignment
}) => {
  let dialogHeight = height

  if (enableOverflow) {
    dialogHeight = null
  } else if (fullScreen) {
    dialogHeight = [1]
  }

  return (
    <Transition in={isOpen} unmountOnExit timeout={timeout}>
      {state => (
        <Overlay
          onDismiss={onClose}
          zindex={zIndex}
          transitionstate={state}
          initialFocusRef={null}
          defaultAnimation={OVERLAY_ANIMATION}
          customAnimation={overlayAnimation}
        >
          <OverlayWrapper>
            <DialogWrapper
              enableoverflow={enableOverflow}
              verticalAlignment={verticalAlignment}
            >
              <Dialog
                width={fullScreen ? 1 : width}
                bg={bg}
                height={dialogHeight}
                transitionstate={state}
                className={className}
                enableoverflow={enableOverflow ? 'true' : null}
                defaultAnimation={DIALOG_ANIMATION}
                customAnimation={dialogAnimation}
                fullScreen={fullScreen}
                data-testid="dialog-content"
              >
                <DialogInnerWrapper flexDirection="column">
                  {header && <HeaderWrapper>{header}</HeaderWrapper>}
                  <ContentWrapper
                    p={imgMode ? 0 : 16}
                    header={header}
                    enableoverflow={enableOverflow}
                  >
                    {enableOverflow && !disableCloseButton && (
                      <FloatCloseButton
                        data-testid="pcln-modal-close"
                        header={header}
                        onClick={onClose}
                      />
                    )}
                    {children}
                  </ContentWrapper>
                </DialogInnerWrapper>
              </Dialog>
            </DialogWrapper>
          </OverlayWrapper>
        </Overlay>
      )}
    </Transition>
  )
}

Modal.defaultProps = {
  isOpen: false,
  disableCloseButton: false,
  enableOverflow: false,
  header: null,
  bg: 'white',
  height: 420,
  timeout: 500,
  overlayAnimation: null,
  dialogAnimation: null,
  verticalAlignment: 'middle'
}

Modal.propTypes = {
  ...width.propTypes,
  ...height.propTypes,
  isOpen: PropTypes.bool,
  fullScreen: PropTypes.bool,
  disableCloseButton: PropTypes.bool,
  enableOverflow: PropTypes.bool,
  onClose: PropTypes.func,
  bg: deprecatedPropType('color'),
  zIndex: PropTypes.number,
  title: PropTypes.string,
  headerBg: PropTypes.string,
  imgMode: PropTypes.bool,
  className: PropTypes.string,
  header: PropTypes.any,
  timeout: PropTypes.number,
  overlayAnimation: PropTypes.func,
  dialogAnimation: PropTypes.func,
  verticalAlignment: PropTypes.string
}

export default Modal

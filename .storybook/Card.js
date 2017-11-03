import React from 'react'
import { storiesOf } from '@storybook/react'
import { Box, Card } from '../src'

storiesOf('Card', module)
  .add('Box Shadows with default border', () => (
    <Box>
      <Card
        boxShadowSize="sm"
        mb={5}
        p={3}
        width={200}
        color="black"
        bg="white"
      >
        Small Shadow
      </Card>
      <Card
        boxShadowSize="md"
        mb={5}
        p={3}
        width={200}
        color="black"
        bg="white"
      >
        Medium Shadow
      </Card>
      <Card
        boxShadowSize="lg"
        mb={5}
        p={3}
        width={200}
        color="black"
        bg="white"
      >
        Large Shadow
      </Card>
      <Card
        boxShadowSize="xl"
        mb={5}
        p={3}
        width={200}
        color="black"
        bg="white"
      >
        XLarge Shadow
      </Card>
    </Box>
  ))
  .add('Box Shadows with focused 2px border', () => (
    <Box>
      <Card
        boxShadowSize="sm"
        mb={5}
        p={3}
        width={200}
        color="black"
        bg="white"
        borderWidth={2}
      >
        Small Shadow
      </Card>
      <Card
        boxShadowSize="md"
        mb={5}
        p={3}
        width={200}
        color="black"
        bg="white"
        borderWidth={2}
      >
        Medium Shadow
      </Card>
      <Card
        boxShadowSize="lg"
        mb={5}
        p={3}
        width={200}
        color="black"
        bg="white"
        borderWidth={2}
      >
        Large Shadow
      </Card>
      <Card
        boxShadowSize="xl"
        mb={5}
        p={3}
        width={200}
        color="black"
        bg="white"
        borderWidth={2}
      >
        XLarge Shadow
      </Card>
    </Box>
  ))
  .add('Box Shadows with varying border radii', () => (
    <Box>
      <Card
        boxShadowSize="sm"
        mb={5}
        p={3}
        width={200}
        color="black"
        bg="white"
        borderRadius={0}
      >
        Small Shadow
      </Card>
      <Card
        boxShadowSize="md"
        mb={5}
        p={3}
        width={200}
        color="black"
        bg="white"
        borderRadius={10}
      >
        Medium Shadow
      </Card>
      <Card
        boxShadowSize="lg"
        mb={5}
        p={3}
        width={200}
        color="black"
        bg="white"
        borderRadius={20}
      >
        Large Shadow
      </Card>
      <Card
        boxShadowSize="xl"
        mb={5}
        p={3}
        width={200}
        color="black"
        bg="white"
        borderRadius="30px"
      >
        XLarge Shadow
      </Card>
    </Box>
  ))

import React from 'react'
import { Grid, Image } from 'semantic-ui-react'

const Containers = () => (
  <div className="containers">
    <Grid container columns={3} >
      <Grid.Column>
        <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
      </Grid.Column>
      <Grid.Column>
        <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
      </Grid.Column>
      <Grid.Column>
        <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
      </Grid.Column>
  </Grid>
  </div>
)

export default Containers;

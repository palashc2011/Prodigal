import React from 'react';
import { Grid, Button } from 'semantic-ui-react';

export default function EmptyScreen() {
  return (
    <Grid centered style={{ margin: '0 auto', marginTop: '100px' }}>
      {<Grid.Row>
          <h1
            style={{
              color: '#000000',
              textAlign: 'center',
            }}
          >
            {"No Call Details Found :/"}
          </h1>
        </Grid.Row>
      }
        {(<Grid.Row>
          <p
            style={{
              height: '2em',
              width: '554px',
              color: '#524E4E',
              lineHeight: '1.5',
              textAlign: 'center',
              margin: '0 auto',
            }}
          >
            {"You dont have any call details corresponding to the selected caller/call duration from the left panel and/or the search term above"}
          </p>
        </Grid.Row>
      )}
    </Grid>
  );
}

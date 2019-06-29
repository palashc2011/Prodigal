import React from 'react';
import { Segment, Grid, Dropdown, Label } from 'semantic-ui-react';

export default function CallerDetails({
  singleCallerData,
  labelList,
  labels,
  handleAddedLabels,
  handleNewLabels,
}) {
  return (
    <Segment
      style={{ marginTop: '2em', width: '100%', cursor: 'pointer' }}
    >
      <Grid style={{ paddingBottom: '1rem' }}>
        <Grid.Row style={{ padding: '2rem 1rem 0rem 1rem' }} verticalAlign="middle">
          <Grid.Column computer="4">
            <span style={{ fontSize: '1.5rem', frontWeight: '300' }}>
            {`Caller: ${singleCallerData.agent_id}`}
            </span>
          </Grid.Column>
          <Grid.Column computer="4">
            <span style={{ fontSize: '1.5rem', frontWeight: '300' }}>
              {`Call-Id: ${singleCallerData.call_id}`}
            </span>
          </Grid.Column>
          <Grid.Column computer="6">
            <span style={{ fontSize: '1.5rem', frontWeight: '300' }}>
            {`Call-Time: ${singleCallerData.call_time}`}
            </span>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row style={{ padding: '2rem 1rem 0rem 1rem' }} verticalAlign="middle">
          <Grid.Column>
          <Label transparent className="addDetails__content--label">
            Labels:
          </Label>
          <Dropdown
            options={labelList.map((val, index) => ( { value: val, text: val }))}
            placeholder="Choose Tags"
            search
            selection
            fluid
            multiple
            allowAdditions
            onAddItem={(e, data) => handleNewLabels(e, data, singleCallerData.call_id)}
            onChange={(e, data) => handleAddedLabels(e, data, singleCallerData.call_id)}
            value={labels}
            color={'blue'}
          />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
}

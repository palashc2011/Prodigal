import React from 'react';
import { Form, Radio, Segment } from 'semantic-ui-react';
const radioOptions = [
  {
    label: 'Caller Name',
    key: 'agent_id',
  },
  {
    label: 'Call ID',
    key: 'call_id',
  },
  {
    label: 'Call Duration',
    key: 'call_time',
  },
];

export default function sortCaller({ onChange, selectedSortIndex }) {
  return (
    <Segment style={{ width: '92%' }}>
      <Form>
        {radioOptions.map((radio, index) => (
          <Form.Field key={index}>
            <Radio
              label={radio.label}
              name="enquirySort"
              value={radio.value}
              checked={selectedSortIndex == index}
              onChange={() => {
                onChange(radio, index);
              }}
            />
          </Form.Field>
        ))}
      </Form>
    </Segment>
  );
}

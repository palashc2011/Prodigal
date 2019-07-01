import React from 'react';
import { Grid, Button, Modal, Dropdown } from 'semantic-ui-react';

export default function LabelModal({ labelList, labelizeMultiple, labels, hideLabelModal, handleAddedLabels }) {
  console.log(labels, 'inside modal');
  return (
    <Modal size="small" defaultOpen={true} closeOnEscape={true} closeOnDimmerClick={false} onClose={hideLabelModal} dimmer="blurring" >
      <Modal.Header>
        Select Labels
      </Modal.Header>
      <Modal.Content>
        <Dropdown
          options={labelList.map((val, index) => ( { value: val, text: val }))}
          placeholder="Choose Tags"
          search
          selection
          fluid
          multiple
          allowAdditions
          onChange={(e, data) => handleAddedLabels(data)}
          onAddItem={() => {}}
          value={labels}
          color={'blue'}
        />

      </Modal.Content>
      <Modal.Actions>
        <Button primary onClick={labelizeMultiple} >
          Labelize
        </Button>
        <Button onClick={hideLabelModal} >
          Cancel
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

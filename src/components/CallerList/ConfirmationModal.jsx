import React from 'react';
import { Grid, Button, Modal } from 'semantic-ui-react';

export default function ConfirmationModal({ text, hideModal }) {
  return (
    <Modal size="small" defaultOpen={true} closeOnEscape={true} closeOnDimmerClick={false} onClose={hideModal} dimmer="blurring" >
      <Modal.Header>
        Success
      </Modal.Header>
      <Modal.Content>
        {text}
      </Modal.Content>
      <Modal.Actions>
        <Button primary onClick={hideModal} >
          OK
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

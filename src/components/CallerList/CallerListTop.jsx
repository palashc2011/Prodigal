import React from 'react';
import { Grid, Button, Input, Dropdown } from 'semantic-ui-react';
const pageResultsOptions = [
  { text: "10", value: 10 },
  { text: "20", value: 20 },
  { text: "30", value: 30 },
  { text: "40", value: 40 },
]

const style1 = {
  fontSize: "13px",
  color: "rgba(0, 0, 0, 0.6)"
}
function CallerTop({ searchTerm, onSearchTermChange, resultsPerPageChange, pageNumberChange, pageNumberOptions }) {
  return (
    <Grid verticalAlign="middle" className="mt-6 ml-3">
      <Grid.Row className="pl-3 pr-3">
        <Grid.Column className="pl-0" computer="2">
          <span style={{ fontSize: '30px', frontWeight: '400' }}> {"Callers"} </span>
        </Grid.Column>
        <Grid.Column computer="8">
          <Input
            transparent
            icon="search"
            iconPosition="left"
            placeholder="Search For A Caller"
            value={searchTerm}
            onChange={onSearchTermChange}
          />
        </Grid.Column>
        <Grid.Column computer="3">
          <React.Fragment><span style={style1}>Results per page</span>
          <Dropdown
            placeholder="Results per page"
            fluid
            defaultValue={10}
            onChange={resultsPerPageChange}
            selection
            options={pageResultsOptions}
            style={{ width: '50%', color: '#dbdbdb', 'margin-left': '0.5rem' }}
          />
          </React.Fragment>
        </Grid.Column>
        <Grid.Column computer="3">
        <React.Fragment><span style={style1}>Page No</span>
          <Dropdown
            placeholder="Results per page"
            fluid
            defaultValue={1}
            onChange={pageNumberChange}
            selection
            options={pageNumberOptions}
            style={{ width: '50%', color: '#dbdbdb', 'margin-left': '0.5rem' }}
          />
          </React.Fragment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default CallerTop;

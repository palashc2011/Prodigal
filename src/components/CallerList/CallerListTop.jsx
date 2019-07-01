import React from 'react';
import { Grid, Button, Input, Dropdown } from 'semantic-ui-react';
import SVGprev from '../../images/previous.svg';

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
function CallerTop(props) {
  const { labelizeMode } = props
  return (
    <Grid verticalAlign="middle" className="mt-6 ml-3">
      <Grid.Row className="pl-3 pr-3">
        {labelizeMode ? getLabelizeDiv(props) : getDefaultDiv(props)}
      </Grid.Row>
    </Grid>
  );
}
const getDefaultDiv = (props) => {
  const { searchTerm, onSearchTermChange, resultsPerPageChange, pageNumberChange, pageNumberOptions, totalResults, labelizeModeOn } = props;
  return (<React.Fragment>
    <Grid.Column className="pl-0" computer="2">
      <span style={{ fontSize: '30px', frontWeight: '400' }}>Calls</span>
    </Grid.Column>
    <Grid.Column computer="5">
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
      <Button primary disabled={!totalResults} onClick={labelizeModeOn}>
        Labelize Multiple Calls
      </Button>
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
  </React.Fragment>)
}
const getLabelizeDiv = (props) => {
  const { selectAll, deSelectAll, isAllSelected, applyLabels, selectedCount, labelizeModeOff } = props
  const selectDeselect = isAllSelected ? <Button onClick={deSelectAll} primary>Deselect All</Button> : <Button onClick={selectAll} primary>Select All</Button>
  return (<React.Fragment>
    <Grid.Column className="pl-0" computer="1">
      <img src={SVGprev} alt="previous" style={{ cursor: 'pointer'}} onClick={labelizeModeOff} />
    </Grid.Column>
    <Grid.Column className="pl-0" computer="3">
      <span style={{ fontSize: '30px', frontWeight: '400' }}>Labelize Multiple Calls</span>
    </Grid.Column>
    <Grid.Column className="pl-0" computer="2">
      {selectDeselect}
    </Grid.Column>
    <Grid.Column className="pl-0" computer="2">
      <Button onClick={applyLabels} primary>Apply Labels</Button>
    </Grid.Column>
    <Grid.Column className="pl-0" computer="2">
      {selectedCount} calls selected.
    </Grid.Column>
  </React.Fragment>);}

export default CallerTop;

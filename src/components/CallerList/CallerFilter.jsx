import React, { Component } from 'react';
import { Segment, Checkbox, Grid } from 'semantic-ui-react';
import StaticText from '../StaticText';
import { Accordion, Form, Menu } from 'semantic-ui-react'
import arrowUp from "../../images/arrow-up.png"
import arrowDown from "../../images/arrow-down.png"
import SortCaller from "./SortCaller"
function CallerNameFilter({ filter, updateCallerFilter }) {
  return (
    <Grid className="pt-3">
      {filter &&
        filter.map((checkBox, index) => (
          <Grid.Row className="pt-1" key={index}>
            <Checkbox
              style={{ marginLeft: '1rem' }}
              value={checkBox.value}
              checked={checkBox.checked}
              label={checkBox.label}
              onChange={() => updateCallerFilter(checkBox.value, checkBox.checked)}
            />
          </Grid.Row>
        ))}
    </Grid>
  );
}

function DurationFilter({ filter, updateDurationFilter }) {
  return (
    <Grid className="pt-3">
      {filter &&
        filter.map((value, index) => (
          <Grid.Row className="pt-1" key={index}>
            <Checkbox
              style={{ marginLeft: '1rem' }}
              value={index}
              checked={value.checked}
              label={value.label}
              onChange={() => updateDurationFilter(value.min, value.checked)}
            />
          </Grid.Row>
        ))}
    </Grid>
  );
}

export default class CallerFilter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeIndex: 0
    }
  }

  handleClick(activeIndex){

    this.setState({
      ...this.state,
      activeIndex: (this.state.activeIndex == activeIndex) ? NaN : activeIndex
    })
  }
  render() {
    const {
      callerFilterOptions,
      durationFilterOptions,
      updateCallerFilter,
      updateDurationFilter,
      onChangeSort,
      selectedSortIndex
    } = this.props
    const { activeIndex } = this.state
    return (
      // <React.Fragment style={{ width: '92%' }}>
      //   <EnquiryStatusFilter
      //     filter={enquiryStatusFilterOptions}
      //     updateEnquiryStatusFilter={updateEnquiryStatusFilter}
      //   />

      //   <FollowupTypeFilter
      //     filter={followUpTypeFilterOptions}
      //     updateFollowUpTypeFilter={updateFollowUpTypeFilter}
      //   />
      // </React.Fragment>

      <Accordion style={{ width: "92%" }} as={Menu} vertical>
        <Menu.Item>
          <Accordion.Title
            active={activeIndex === 1}
            index={1}
            onClick={() => this.handleClick(1)}
          > <StaticText style={{ marginLeft: '1rem' }} fontSize="0.9rem">
              Caller <img className="float-right" src={activeIndex === 1 ? arrowDown : arrowUp} />
            </StaticText>
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 1} >
            <CallerNameFilter
              filter={callerFilterOptions}
              updateCallerFilter={updateCallerFilter}
            />
          </Accordion.Content>
        </Menu.Item>
        <Menu.Item>
          <Accordion.Title
            active={activeIndex === 2}
            index={2}
            onClick={() => this.handleClick(2)}
          > <StaticText style={{ marginLeft: '1rem' }} fontSize="0.9rem">
              Call Duration<img className="float-right" src={activeIndex === 2 ? arrowDown : arrowUp} />
            </StaticText> </Accordion.Title>
          <Accordion.Content style={{ paddingTop: "10px" }} active={activeIndex === 2} >
            <DurationFilter
              filter={durationFilterOptions}
              updateDurationFilter={updateDurationFilter}
            />
          </Accordion.Content>
        </Menu.Item>
        <Menu.Item>
          <Accordion.Title
            active={activeIndex === 3}
            index={2}
            onClick={() => this.handleClick(3)}
          > <StaticText style={{ marginLeft: '1rem' }} fontSize="0.9rem">
              Sort By<img className="float-right" src={activeIndex === 3 ? arrowDown : arrowUp} />
            </StaticText> </Accordion.Title>
          <Accordion.Content style={{ paddingTop: "10px" }} active={activeIndex === 3} >
            <SortCaller onChange={onChangeSort} selectedSortIndex={selectedSortIndex} />
          </Accordion.Content>
        </Menu.Item>
      </Accordion>
    );
  }
}

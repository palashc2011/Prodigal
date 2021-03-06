import React from 'react';
import CallerFilter from '../../components/CallerList/CallerFilter'
import { getCallerList, getDuration, fetchFilteredcalls, getLabelledCallers, fetchLabelList, addLabel } from './../../services/index';
import { Grid, Loader } from 'semantic-ui-react';
import { get, sortBy } from 'lodash'
import CallerDetails from '../../components/CallerList/CallerDetails'
import CallerTop from '../../components/CallerList/CallerListTop'
import EmptyScreen from '../../components/CallerList/EmptyCallerList'
import LabelModal from '../../components/CallerList/LabelModal'
import ConfirmationModal from '../../components/CallerList/ConfirmationModal'

import { Helmet } from 'react-helmet';
import { labelActions } from './constants'
const durationFilterSegments = 5

class CallerList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      callerFilterOptions: [],
      appliedCallerFilter: [],
      appliedDurationFilter: [],
      filteredCalls: [],
      showLoader: false,
      searchTerm: '',
      selectedSortIndex: -1,
      resultsPerPage: 10,
      pageNumber: 1,
      callWiseLabels: {},
      infoLoaded: false,
      labelizeMode: false,
      isAllSelected: false,
      selectedCalls: [],
      deselectedArray: [],
      labelModal: false,
      multipleLabelizeLabels: []
    }
  }
  componentDidMount() {
    Promise.all(
      [
        this.getCallerList(),
        this.getDuration(),
        this.getLabelledCallers(),
        this.fetchLabelList()

      ]
    ).then(() => {
      this.setState({
        infoLoaded: true
      })
      this.getAllFilteredCalls()
    });
  }
  render() {
    const { confirmationModal, infoLoaded, labelModal } = this.state
    if(!infoLoaded) return this.getLoader();
    return (<div>
      {labelModal && this.getLabelModal()}
      {confirmationModal && this.getConfirmationModal()}
      <Grid divided>
        <Grid.Row>
          <Grid.Column computer="3">
            <div>{this.getCallerFiltersPanel()}</div>
          </Grid.Column>
          <Grid.Column computer="10">
              {
                this.getTopPanel()
              }
              <Grid.Row>
              {
                this.getCallerDetailsDiv()
              }
            </Grid.Row>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>);
  }
  getCallerDetailsDiv() {
    if(this.state.showLoader) return this.getLoader();
    const filteredCalls = this.getFilteredCalls()
    if(!filteredCalls.length) return this.getEmptyScreen()
    return filteredCalls.map(val => <CallerDetails
      labels={this.state.callWiseLabels[val.call_id] || []}
      singleCallerData={val}
      labelList={this.state.labelList}
      handleNewLabels={this.handleNewLabels}
      handleAddedLabels={this.handleAddedLabels}
      isSelected={this.state.selectedCalls.indexOf(val.call_id) != -1}
      isAllSelected={this.state.isAllSelected}
      handleCheckboxChange={this.handleCheckboxChange}
      labelizeMode={this.state.labelizeMode}
      />)
  }

  getFilteredCalls = () => {
    const filteredCalls = this.getSearchFilteredCalls()
    return this.getPaginatedCalls(filteredCalls)
  }
  getSearchFilteredCalls = () => {
    let filteredCalls
    if(!this.state.searchTerm) filteredCalls = this.state.filteredCalls;
    else {
      const searchTerm = this.state.searchTerm.toLowerCase();
      filteredCalls = this.state.filteredCalls.filter(val => val.agent_id.toLowerCase().includes(searchTerm));
    }
    return filteredCalls
  }
  getPaginatedCalls = calls => {
    const { pageNumber, resultsPerPage } = this.state
    const startIndex = (pageNumber-1) * resultsPerPage;
    const endIndex = startIndex + resultsPerPage;
    return calls.slice(startIndex, endIndex)
  }
  showLoader = () => this.setState({ showLoader: true });
  hideLoader = () => this.setState({ showLoader: false })
  getLoader = () => {
    return (
      <Grid verticalAlign="middle" style={{ height: '100vh' }}>
        <Grid.Column>
          <Loader active inline="centered" />
        </Grid.Column>
      </Grid>
    );
  };
  getEmptyScreen = () => {
    return <EmptyScreen />;
  }

  setDurationFilterOptions = (data) => {
    const minDuration = Math.floor(data.minimum);
    const maxDuration = Math.ceil(data.maximum);
    if (this.isUndefined(maxDuration) || this.isUndefined(minDuration)) return;
    const interval = Math.floor((maxDuration - minDuration)/durationFilterSegments);
    let range1 = minDuration - minDuration % 10;
    const durationFilterOptions = []
    for(;;) {
      const modifiedRange1 = range1;
      let modifiedRange2 = range1 + interval
      modifiedRange2 = modifiedRange2 + (modifiedRange2 % 10 ? (10 - modifiedRange2 % 10) : 0) ;
      durationFilterOptions.push({
        label: `${modifiedRange1} - ${modifiedRange2}`,
        min: modifiedRange1,
        max: modifiedRange2,
        checked: false,
      })
      if(modifiedRange2 > maxDuration) break;
      range1 = modifiedRange2 + 1
    }
    this.setState({
      durationFilterOptions
    })
  }
  updateCallerFilter = (value, checked) => {
    const ind = this.state.appliedCallerFilter.indexOf(value);
    const callerFilterOptions = this.state.callerFilterOptions.map(val => {
      if (val.value === value) return { ...val, checked: !val.checked }
      return val
    })
    let appliedCallerFilter
    if(!checked) {
      appliedCallerFilter = [...this.state.appliedCallerFilter, value]
    } else {
      this.state.appliedCallerFilter.splice(ind, 1);
      appliedCallerFilter = [...this.state.appliedCallerFilter];
    }
    this.setState({
      appliedCallerFilter,
      callerFilterOptions
    }, this.getAllFilteredCalls)
  }

  updateDurationFilter = (value, checked) => {
    const durationFilterOptions = this.state.durationFilterOptions.map(val => {
      if (val.min === value) return { ...val, checked: !val.checked }
      return val
    })
    this.setState({
      durationFilterOptions
    }, this.getAllFilteredCalls)
  }

  getCallerFiltersPanel() {
    return (
      <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Prodigal | Callers</title>
      </Helmet>

      <CallerFilter
        callerFilterOptions={this.state.callerFilterOptions}
        durationFilterOptions={this.state.durationFilterOptions}
        updateCallerFilter={this.updateCallerFilter}
        updateDurationFilter={this.updateDurationFilter}
        onChangeSort={this.onChangeSort}
        selectedSortIndex={this.state.selectedSortIndex}
      />
      </div>
    );
  }
  onSearchTermChange = (e, data) => { this.setState({ searchTerm: data.value }) }
  getTopPanel = () => <CallerTop
  resultsPerPageChange={this.resultsPerPageChange}
  searchTerm={this.state.searchTerm} onSearchTermChange={this.onSearchTermChange}
  pageNumberOptions={this.getPageNumberOptions()}
  pageNumberChange={this.pageNumberChange}
  totalResults={this.getFilteredCalls().length}
  labelizeModeOn={this.labelizeModeOn}
  labelizeMode={this.state.labelizeMode}
  selectAll={this.selectAll}
  deSelectAll={this.deSelectAll}
  isAllSelected={this.state.isAllSelected}
  applyLabels={this.applyLabels}
  selectedCalls={this.state.selectedCalls}
  deselectedArray={this.state.deselectedArray}
  selectedCount={this.getSelectedCount()}
  labelizeModeOff={this.labelizeModeOff}
  />
  getSelectedCount = () => {
    return this.state.isAllSelected ? (this.getFilteredCalls().length - this.state.deselectedArray.length) : this.state.selectedCalls.length;
  }
  labelizeModeOn = () => this.setState({ labelizeMode: true })
  labelizeModeOff = () => this.setState({ labelizeMode: false })
  setCallerFilterOptions(callerList) {
    this.setState({
      callerFilterOptions: callerList.map(val => ({ checked: false, label: val, value: val }))
    })
  }
  getCallerList() {
    const handleSuccess = (response) => { this.setCallerFilterOptions(get(response, 'data.listofagents', []));}
    return getCallerList( { handleSuccess } )
  }
  getLabelledCallers() {
    const handleSuccess = (response) => {
      const callWise = {}
      get(response,'data.call_data', []).forEach(val => {
        callWise[val.call_id] = val.label_id
      });
      this.setState({
        callWiseLabels: callWise,
      })
    }
    return getLabelledCallers( { handleSuccess } )
  }
  fetchLabelList() {
    const handleSuccess = (response) => {
      const callWise = {}
      const labelList = get(response,'data.unique_label_list', [])
      this.setState({
        labelList
      })
    }
    return fetchLabelList( { handleSuccess } )

  }
  getDuration() {
    const handleSuccess = response => {
      this.setDurationFilterOptions(response.data || {});
    }
    return getDuration({ handleSuccess })
  }

  getAllFilteredCalls() {
    const minMaxDurations = this.getMinimizedDurations();
    if(!minMaxDurations) this.setState({ filteredCalls: [] })
    else minMaxDurations.map(val => this.fetchFilteredcalls(val))
  }
  isUndefined = val => typeof val == 'undefined'
  getMinimizedDurations() {
    const allDurations = [];
    const { durationFilterOptions } = this.state
    let minDur = durationFilterOptions[0].min;
    const durationArray = []
    durationFilterOptions.forEach((val, ind) => {
      if(val.checked) {
        if(minDur == null) minDur = val.min
        if (!((ind < (durationFilterOptions.length-1))  && durationFilterOptions[ind + 1].checked))
          {
            durationArray.push([minDur, val.max]);
            minDur = null;
          }
      }
      else {
        minDur = null;
      }
    })
    return durationArray
  }
  fetchFilteredcalls(minMaxDuration) {
    this.showLoader();
    const body = {
        "info": {
            "filter_agent_list": this.state.appliedCallerFilter, "filter_time_range": minMaxDuration
                }
    }
    const handleSuccess = response => { this.setState({ filteredCalls: this.getSortedCalls(response.data || {}) }, this.hideLoader); }
    return fetchFilteredcalls({ handleSuccess, body })

  }
  getSortedCalls = (data) => {
    if(this.state.selectedSortKey) return sortBy(data, function(val) {
            return val[this.state.selectedSortKey];
          })
    return data
  }
  onChangeSort = (data, index) => {
    this.showLoader()
    const sortedFilteredCalls = sortBy(this.state.filteredCalls, function(val) {
            return val[data.key];
          })
    this.setState({
      selectedSortIndex: index,
      selectedSortKey: data.key,
      filteredCalls: sortedFilteredCalls
    }, this.hideLoader)
  }

  resultsPerPageChange = (e, data) => {
    this.setState({
      resultsPerPage: data.value
    })
  }
  pageNumberChange = (e, data) => {
    this.setState({
      pageNumber: data.value
    })
  }
  getPageNumberOptions = (e, data) => {
    const pageNumberOptions = [];
    for(let i=0; i<this.getSearchFilteredCalls().length/this.state.resultsPerPage;i++) pageNumberOptions.push({
      value: (i+1),
      text: (i+1)
    })
    return pageNumberOptions
  }
// label functions

handleCheckboxChange = (data, callId) => {
  let { selectedCalls, deselectedArray, isAllSelected }  = this.state
  if(data.checked) {
    selectedCalls.push(callId);
    if(isAllSelected)
    {
      const index = deselectedArray.indexOf(callId);
      if(index!=-1) deselectedArray.splice(index, 1);
    }
  } else {
    const index = selectedCalls.indexOf(callId);
    selectedCalls.splice(index, 1);
    if(isAllSelected)
    {
      const index = deselectedArray.indexOf(callId);
      if(index==-1) deselectedArray.push(callId);
    }
  }
  this.setState({
    selectedCalls: [...selectedCalls],
    deselectedArray: [...deselectedArray]
  })
}

handleAddedLabels = (e, { value }, callId) => {
  const result = []
  const currentLabels = this.state.callWiseLabels[callId] || []
  if(value.length > currentLabels.length)
  {
      const newValue = value[value.length-1];
      if(this.state.labelList.indexOf(newValue) != -1)
        this.addLabel(newValue, callId, false);
  }
  else if(value.length < currentLabels.length)
  {
    const newValue = currentLabels.filter(val => (value.indexOf(val) === -1))[0];
      //console.log(newValue, 'removenewvalue');
    this.removeLabel(newValue, callId);
  }
  // value.map((c) => {
  //   if (typeof c !== "string") {
  //     result.push(c)
  //   }
  // })
  // this.setState({ tags: result })
}
handleAddedLabelsMultiple = ({ value }) => {
  this.setState({
    multipleLabelizeLabels: [...value]
  })
  // const result = []
  // const currentLabels = this.state.callWiseLabels[callId] || []
  // value.map((c) => {
  //   if (typeof c !== "string") {
  //     result.push(c)
  //   }
  // })
  // this.setState({ tags: result })
}


  addLabel = (value, callId, isNew) => {
    const handleSuccess = () => {
      let labelList = this.state.labelList
      if (isNew) labelList = [...this.state.labelList, value]
      const currentLabels = this.state.callWiseLabels[callId] || [];
      this.setState({
        labelList,
        callWiseLabels: {
          ...this.state.callWiseLabels,
          [callId]: [...currentLabels, value]
        }
      })
    }
    addLabel({
      handleSuccess,
      callList: [callId],
      labelList: [value],
      operation: labelActions.ADD,
    })
  }
  removeLabel = (value, callId) => {
//    console.log(value)
    let currentLabels = this.state.callWiseLabels[callId] || [];
    const currentIndex = currentLabels.indexOf(value);
    if(currentIndex === -1) return
    const handleSuccess = () => {
      currentLabels.splice(currentIndex, 1);
      this.setState({
        callWiseLabels: {
          ...this.state.callWiseLabels,
          [callId]: [...currentLabels]
        }
      })
    }
    addLabel({
      handleSuccess,
      callList: [callId],
      labelList: [value],
      operation: labelActions.REMOVE,
    })
  }
  handleNewLabels = (e, { value }, callId) => {
    this.addLabel(value, callId, true);
  }
  deSelectAll = () => {
    this.setState({ isAllSelected: false, selectedCalls: [], deselectedArray: [] })
  }
  selectAll = () => this.setState({ isAllSelected: true, selectedCalls: [], deselectedArray: [] })

  getLabelModal = () => {
    return <LabelModal
      hideLabelModal={this.hideLabelModal}
      labelList={this.state.labelList}
      labels={this.state.multipleLabelizeLabels}
      handleAddedLabels={this.handleAddedLabelsMultiple}
      labelizeMultiple={this.labelizeMultiple} />
  }
  labelizeMultiple = () => {
    const { isAllSelected, deselectedArray, callWiseLabels } = this.state
    let selectedCalls = this.state.selectedCalls
    if(isAllSelected) {
      const filteredCalls = this.getFilteredCalls();
      selectedCalls = filteredCalls.filter(val => deselectedArray.indexOf(val.call_id) === -1).map(val => val.call_id);
    }
    const { multipleLabelizeLabels, labelList } = this.state;
    const handleSuccess = () => {
      selectedCalls.map(val => {
          let current = callWiseLabels[val];
          const newLabels = multipleLabelizeLabels.filter(val => (current.indexOf(val) === -1));
          current = [...current, ...newLabels];
          callWiseLabels[val] = current;
      });
      const newLabels = multipleLabelizeLabels.filter(val => (labelList.indexOf(val) === -1));
      this.setState({
        callWiseLabels: { ...callWiseLabels },
        labelList: [...labelList, ...newLabels],
        multipleLabelizeLabels: [],
        labelModal: false,
        labelizeMode: false
      }, () => this.showConfirmationModal(selectedCalls.length+ " calls labelized successfully."));
    }
    addLabel({
      handleSuccess,
      callList: selectedCalls,
      labelList: multipleLabelizeLabels,
      operation: labelActions.ADD,
    })

  }
  applyLabels = () => {
    const { isAllSelected, deselectedArray, selectedCalls } = this.state
    const filteredCalls = this.getFilteredCalls();
    if( !(isAllSelected && (deselectedArray.length < filteredCalls.length)) && !selectedCalls.length) {
      alert("Please Select atleast one of the calls");
      return;
    }
    this.setState({ labelModal: true })
  }
  showConfirmationModal = (text) => {
    this.setState({
      confirmationModal: true,
      confirmationModalText: text
    })
  }
  hideLabelModal = () => this.setState({ labelModal: false, multipleLabelizeLabels: [] })
  getConfirmationModal = () => <ConfirmationModal text={this.state.confirmationModalText} hideModal={() => this.setState({ confirmationModal: false})} />
}
export default CallerList

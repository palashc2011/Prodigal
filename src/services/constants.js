import { map } from 'lodash'
export const CALLER_LIST_API = "/getlistofagents";
export const CALLER_DURATION = "/getdurationrange";
export const CALLER_FILTERED_CALLS = "/getfilteredcalls"
export const LABELLED_CALLS = "/getcalllist"
export const LABEL_LIST = "/getlistoflabels"
export const APPLY_LABEL = "/applyLabels"

function getQueryString(options) {
  let queryString = ''
  let useQuestionConnector = true
  if (options) {
    map(options, (value, prop) => {
      if (useQuestionConnector) {
        queryString += `?${prop}=${value}`
        useQuestionConnector = false
      }
      else {
        queryString += `&${prop}=${value}`
      }
    })
  }
  return queryString
}

function encodeUrlComponent(templateVar) {
  let modifiedTemplateVar = templateVar
  const charsWithSpecialMeaning = ['&']
  charsWithSpecialMeaning.forEach(character => {
    if (templateVar && templateVar.includes && templateVar.includes(character)) {
      modifiedTemplateVar = encodeURIComponent(templateVar)
    }
  })
  return modifiedTemplateVar
}

export function getMappedUrl(urlTemplate = '', templateVars = [], queryParams = '') {
  let mappedUrl = urlTemplate
  templateVars.forEach((templateVar, index) => {
    mappedUrl = mappedUrl.replace(`$${index + 1}`, encodeUrlComponent(templateVar))
  })
  return `${mappedUrl}${getQueryString(queryParams)}`
}


export function getQueryString(options) {
  let queryString = ''
  let useQuestionConnector = true
  if (options) {
    map(options, (value, prop) => {
      if (useQuestionConnector) {
        queryString += `?${prop}=${value}`
        useQuestionConnector = false
      }
      else {
        queryString += `&${prop}=${value}`
      }
    })
  }
  return queryString
}

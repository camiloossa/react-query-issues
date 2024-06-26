import { useState } from 'react';
import { IssueList } from '../components/IssueList';
import { LabelPicker } from '../components/LabelPicker';
import { useIssues } from '../hooks';
import { LoadingIcon } from '../../search/components/LoadingIcon';
import { State } from '../interfaces';


export const ListView = () => {

  const [state, setState] = useState<State>()
  const [seletecLabels, setSeletecLabels] = useState<string[]>([]);
  const { issuesQuery, page, nextPage, prevPage } = useIssues({ state, labels: seletecLabels });

  const onLabelChanged = (labelName: string) => {
    ( seletecLabels.includes( labelName ) )
    ? setSeletecLabels( seletecLabels.filter( label => label !== labelName ))
    : setSeletecLabels( [...seletecLabels, labelName ])
  }

  return (
    <div className="row mt-5">
      
      <div className="col-8">
        {
          ( issuesQuery.isLoading )
          ? <LoadingIcon />
          : <IssueList issues={ issuesQuery.data || [] } state={ state } onStateChanged= { (newState) => setState(newState)}/>
        }
        <div className='d-flex mt-2 justify-content-between align-items-center'>
          <button className='btn btn-outline-primary' onClick={ prevPage } disabled = { issuesQuery.isFetching } >Prev</button>
          <span>{ page }</span>
          <button className='btn btn-outline-primary' onClick={ nextPage } disabled = { issuesQuery.isFetching } >Next</button>
        </div>
      </div>
      
      <div className="col-4 ">
        <LabelPicker selectedLabel = { seletecLabels } onChange={ (labelName) => onLabelChanged(labelName)} />
      </div>
    </div>
  )
}

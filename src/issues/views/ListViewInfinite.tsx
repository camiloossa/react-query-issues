import { useState } from 'react';
import { IssueList } from '../components/IssueList';
import { LabelPicker } from '../components/LabelPicker';
import { useIssueInfinite, useIssues } from '../hooks';
import { LoadingIcon } from '../../search/components/LoadingIcon';
import { State } from '../interfaces';


export const ListViewInfinite = () => {

  const [state, setState] = useState<State>()
  const [seletecLabels, setSeletecLabels] = useState<string[]>([]);
  const { issuesQuery } = useIssueInfinite({ state, labels: seletecLabels });

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
          : <IssueList issues={ issuesQuery.data?.pages.flat() || [] } state={ state } onStateChanged= { (newState) => setState(newState)}/>
        }
        <button className='btn btn-outline-primary mt-2' onClick={ () => issuesQuery.fetchNextPage() } disabled = { !issuesQuery.hasNextPage }>
          Load More..
        </button>
      </div>
      
      <div className="col-4 ">
        <LabelPicker selectedLabel = { seletecLabels } onChange={ (labelName) => onLabelChanged(labelName)} />
      </div>
    </div>
  )
}

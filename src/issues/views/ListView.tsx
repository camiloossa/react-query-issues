import { useState } from 'react';
import { IssueList } from '../components/IssueList';
import { LabelPicker } from '../components/LabelPicker';
import { useIssues } from '../hooks';
import { LoadingIcon } from '../../search/components/LoadingIcon';


export const ListView = () => {

  const [seletecLabels, setSeletecLabels] = useState<string[]>([]);
  const { issuesQuery } = useIssues();

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
          : <IssueList issues={ issuesQuery.data || [] }/>
        }
        
      </div>
      
      <div className="col-4 ">
        <LabelPicker selectedLabel = { seletecLabels } onChange={ (labelName) => onLabelChanged(labelName)} />
      </div>
    </div>
  )
}

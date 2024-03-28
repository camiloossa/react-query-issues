import { FC } from 'react';
import { LoadingIcon } from '../../search/components/LoadingIcon';
import { useLabels } from '../hooks/useLabels'

interface Props {
  selectedLabel: string[];
  onChange: (label:string) => void;
}


export const LabelPicker: FC<Props> = ({selectedLabel, onChange}) => {

  const { labelsQuery } = useLabels();

  if (labelsQuery.isLoading) 
    return (<LoadingIcon />);

  return (
    <div>

      {
        labelsQuery.data?.map( label => (
          <span
            key={ label.id }
            className={`badge rounded-pill m-1 label-picker ${ ( selectedLabel.includes(label.name) ? 'label-active' : '')}`} 
            style={{ border: `1px solid #${label.color}`, color: `#${label.color}` }}
            onClick={ () => onChange(label.name)}
          >
            { label.name }
          </span>
        ))
      }

    </div>
  )
}

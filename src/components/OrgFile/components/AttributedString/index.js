import React, { PureComponent } from 'react';

import { getNextId } from '../../../../lib/parse_org';

import TablePart from './components/TablePart';

export default class AttributedString extends PureComponent {
  render() {
    const {
      parts,
      onTableCellSelect,
      selectedTableCellId,
      inTableEditMode,
      onExitTableEditMode,
      onTableCellValueUpdate,
    } = this.props;

    return (
      <span>
        {parts.map(part => {
          switch (part.get('type')) {
          case 'text':
            return part.get('contents');
          case 'link':
            const uri = part.getIn(['contents', 'uri']);
            const title = part.getIn(['contents', 'title']) || uri;

            return <a key={getNextId()} href={uri}>{title}</a>;
          case 'table':
            return (
              <TablePart key={part.get('id')}
                         table={part}
                         onCellSelect={onTableCellSelect}
                         selectedTableCellId={selectedTableCellId}
                         inTableEditMode={inTableEditMode}
                         onExitEditMode={onExitTableEditMode}
                         onCellValueUpdate={onTableCellValueUpdate} />
            );
          default:
            console.error(`Unrecognized attributed string part type ${part.get('type')}`);
            return '';
          }
        })}
      </span>
    );
  }
}

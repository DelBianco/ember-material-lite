import { isEmpty } from '@ember/utils';
import { A } from '@ember/array';
import BaseComponent from './-base-child-component';
import ChildComponentSupport from 'ember-composability/mixins/child-component-support';
import MdlTable from './mdl-table';
import layout from '../templates/components/mdl-table-col';

export default BaseComponent.extend(ChildComponentSupport, {
  tagName: 'td',
  layout,
  classNameBindings: ['isNonNumeric:mdl-data-table__cell--non-numeric'],
  init() {
    this._super(...arguments);
    this.set('_parentComponentTypes', new A([MdlTable]))
  },
  shouldRegisterToParent(parentComponent) {
    let childComponents = parentComponent.getComposableChildren();
    if (isEmpty(childComponents)) {
      return true;
    } else {
      let labels = parentComponent.getComposableChildren().map((x) => x.label);
      return labels.indexOf(this.get('label')) < 0;
    }
  }
});

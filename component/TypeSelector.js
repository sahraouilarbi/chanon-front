import { types } from '../constants';
import classificationStyle from '../styles/Classification.module.css';
const TypeSelector = ({type, language, onChange}) => {
  return (
    <div className={classificationStyle.typeSelectorDiv}>
      <label>
        Type
        <select
        disabled={!language}
        id="type-select"
        className={classificationStyle.formSelect}
        value={type}
        onChange={onChange}>
          <option value="" key='select_a_type'>-- Select a type</option>
          {
            types.map(
              (item) => (
                <option key={item.key} value={item.key}>{item.value}</option>
              )
            )
          }
        </select>
      </label>
    </div>
  );
}
export default TypeSelector;
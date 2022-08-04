import 'water.css';
import './styles.css';
import { $ } from './lib/manipulateDom';
import { getFilltextUrl, User } from './api/filltext';
import { render } from './main';

const container = <HTMLDivElement>$('#container');
const reloadBtn = <HTMLButtonElement>$('#reload');
const dataSetCheckbox = <HTMLInputElement>$('#data-set');

const renderTable = (size: 'small' | 'big' = 'small') => {
  const url = getFilltextUrl({ datasetSize: size });
  render<User[]>(url, container);
};

reloadBtn.addEventListener('click', () => {
  const size = dataSetCheckbox.checked ? 'big' : 'small';
  renderTable(size);
});

renderTable();

import 'water.css';
import { getFilltextData } from './api/getFilltextData';

const container = document.getElementById('container') as HTMLDivElement;
const data = await getFilltextData();
container.textContent = JSON.stringify(data, null, 2);

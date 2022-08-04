import { createElement } from './lib/manipulateDom';
import { fetchData } from './lib/fetchData';

export const render = async <T extends any[]>(
  datasetUrl: URL,
  container: HTMLElement
): Promise<void> => {
  const existingTable = <HTMLTableElement>(
    container.querySelector('[data-table=lib]')
  );
  if (existingTable) container.removeChild(existingTable);

  const data = await fetchData<T>(datasetUrl);
  const headings = ['ID', 'First name', 'Last name', 'Email', 'Phone'];
  const fields = ['id', 'firstName', 'lastName', 'email', 'phone'] as const;

  const table = createElement('table', { 'data-table': 'lib' }, [
    createElement(
      'thead',
      {},
      createElement(
        'tr',
        {},
        headings.map((text) => createElement('td', { text }))
      )
    ),
    createElement(
      'tbody',
      {},
      data.map((user) =>
        createElement(
          'tr',
          {},
          fields.map((key) => createElement('td', { text: String(user[key]) }))
        )
      )
    ),
  ]);

  container.append(table);
};

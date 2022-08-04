export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: {
    streetAddress: string;
    city: string;
    state: string;
    zip: string;
  };
  description: string;
}

const searchParams = new URLSearchParams({
  rows: '32',
  id: '{number|1000}',
  firstName: '{firstName}',
  lastName: '{lastName}',
  email: '{email}',
  phone: '{phone|(xxx)xxx-xx-xx}',
  address: '{addressObject}',
  description: '{lorem|32}',
});

interface getFilltextUrlOptions {
  datasetSize: 'small' | 'big';
}

const defaultOptions: getFilltextUrlOptions = {
  datasetSize: 'small',
};

export const getFilltextUrl = (
  options?: Partial<getFilltextUrlOptions>
): URL => {
  const { datasetSize } = { ...defaultOptions, ...options };

  const url = new URL('http://www.filltext.com');
  url.search = searchParams.toString();

  if (datasetSize === 'big') {
    url.searchParams.set('rows', '1000');
    url.searchParams.append('delay', '3');
  }

  return url;
};

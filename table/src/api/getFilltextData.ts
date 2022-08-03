interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  adress: {
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
  adress: '{addressObject}',
  description: '{lorem|32}',
});

const url = new URL('http://www.filltext.com');
url.search = searchParams.toString();

export const getFilltextData = async (
  amount: 'small' | 'large' = 'small'
): Promise<User[]> => {
  if (amount === 'large') {
    url.searchParams.set('rows', '1000');
    url.searchParams.append('delay', '3');
  }

  const response = await fetch(url);
  const { ok, status, statusText } = response;

  if (!ok)
    throw new Error(`Failed to fetch the table data: ${status}, ${statusText}`);

  return response.json();
};

const apiURL = `${process.env.REACT_APP_BASE_URL}/products?`;
const cartURL = `${process.env.REACT_APP_BASE_URL}/carts`;

export const handleTrackEAN = async (usrID: string, eanNo: number): Promise<void> => {
  const postBody = {
    eans: [eanNo],
  };

  const response = await fetch(cartURL, {
    method: 'POST',
    headers: {
      Authorization: usrID,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postBody),
  });
  if (response.status === 422) {
    const resp = await response.json();
    console.log(resp);
    return;
  }
  if (response.status === 201) {
    console.log('ean added', response.status);
    return;
  } else {
    console.log('new error code', response.status);
  }
};

export const exportCSVtoFile = async (usrID: string, queryString: string): Promise<void> => {
  const response = await fetch(apiURL + queryString.replace('&limit=100', ''), {
    method: 'POST',
    headers: {
      Authorization: usrID,
    },
  });
  const queryRes = await response.blob();
  const url = window.URL.createObjectURL(queryRes);
  const a = document.createElement('a');
  a.href = url;
  a.download = `exported_eans.txt`;
  document.body.appendChild(a);
  a.click();
  a.remove();
};

export const deleteEAN = async (usrID: string, ean: number): Promise<void> => {
  const postBody = {
    eans: [ean],
  };
  await fetch(cartURL, {
    method: 'DELETE',
    headers: {
      Authorization: usrID,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postBody),
  });
};

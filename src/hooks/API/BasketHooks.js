import { useQuery, queryCache, useMutation } from "react-query";

export function useBasketGroceres() {
  return useQuery("basketGroceres", () =>
    fetch(`${process.env.REACT_APP_LOCAL_HTTP}/basketGroceries`).then((res) =>
      res.json()
    )
  );
}

export function useBasketProducts() {
  return useQuery("basketProducts", () =>
    fetch(`${process.env.REACT_APP_LOCAL_HTTP}/basketProducts`).then((res) =>
      res.json()
    )
  );
}

export function useBasketDishes() {
  return useQuery("basketDishes", () =>
    fetch(`${process.env.REACT_APP_LOCAL_HTTP}/basketDishes`).then((res) =>
      res.json()
    )
  );
}

export function useBasketSavedLists() {
  return useQuery("basketSavedLists", () =>
    fetch(`${process.env.REACT_APP_LOCAL_HTTP}/basketSavedLists`).then((res) =>
      res.json()
    )
  );
}

const addBasketGroceries = async ({ data }) => {
  const response = await fetch(
    `${process.env.REACT_APP_LOCAL_HTTP}/basketGroceries`,
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  return await response.json();
};

const addBasketProducts = async ({ data }) => {
  const response = await fetch(
    `${process.env.REACT_APP_LOCAL_HTTP}/basketProducts`,
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  return await response.json();
};

const addBasketDishes = async ({ data }) => {
  const response = await fetch(
    `${process.env.REACT_APP_LOCAL_HTTP}/basketDishes`,
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  return await response.json();
};

const addBasketSavedLists = async ({ data }) => {
  const response = await fetch(
    `${process.env.REACT_APP_LOCAL_HTTP}/basketSavedLists`,
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  return await response.json();
};

export function useAddBasketGroceries() {
  return useMutation(addBasketGroceries, {
    onSuccess() {
      queryCache.invalidateQueries("basketGroceres");
    },
  });
}

export function useAddBasketProducts() {
  return useMutation(addBasketProducts, {
    onSuccess() {
      queryCache.invalidateQueries("basketProducts");
    },
  });
}

export function useAddBasketDishes() {
  return useMutation(addBasketDishes, {
    onSuccess() {
      queryCache.invalidateQueries("basketDishes");
    },
  });
}

export function useAddBasketSavedLists() {
  return useMutation(addBasketSavedLists, {
    onSuccess() {
      queryCache.invalidateQueries("basketSavedLists");
    },
  });
}

const putBasketGroceries = async ({ data, id }) => {
  const response = await fetch(
    `${process.env.REACT_APP_LOCAL_HTTP}/basketGroceries/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  return await response.json();
};

const putBasketProducts = async ({ data, id }) => {
  const response = await fetch(
    `${process.env.REACT_APP_LOCAL_HTTP}/basketProducts/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  return await response.json();
};

const putBasketDishes = async ({ data, id }) => {
  const response = await fetch(
    `${process.env.REACT_APP_LOCAL_HTTP}/basketDishes/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  return await response.json();
};

const putBasketSavedLists = async ({ data, id }) => {
  const response = await fetch(
    `${process.env.REACT_APP_LOCAL_HTTP}/basketSavedLists/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  return await response.json();
};

export function usePutBasketGroceries() {
  return useMutation(putBasketGroceries, {
    onSuccess() {
      queryCache.invalidateQueries("basketGroceres");
    },
  });
}

export function usePutBasketProducts() {
  return useMutation(putBasketProducts, {
    onSuccess() {
      queryCache.invalidateQueries("basketProducts");
    },
  });
}

export function usePutBasketDishes() {
  return useMutation(putBasketDishes, {
    onSuccess() {
      queryCache.invalidateQueries("basketDishes");
    },
  });
}

export function usePutBasketSavedLists() {
  return useMutation(putBasketSavedLists, {
    onSuccess() {
      queryCache.invalidateQueries("basketSavedLists");
    },
  });
}

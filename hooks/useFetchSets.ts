import * as React from "react";

import { IOptions } from "../types/interfaces";

const useFetchSelects = (url: string) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [data, setData] = React.useState<IOptions[]>([]);
  const [error, setError] = React.useState<any>(null);

  React.useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        const newData = data.data.map((set: { name: string; id: string }) => {
          return { label: set.name, value: set.id };
        });

        setData(newData);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { isLoading, data, error };
};

export default useFetchSelects;
